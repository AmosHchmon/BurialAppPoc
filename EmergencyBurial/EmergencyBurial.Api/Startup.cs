using System;
using System.Text;
using System.Threading.Tasks;
using Common.Helpers;
using Coravel;
using Core.Config;
using Core.Middleware;
using DataModel;
using DataModel.Triggers;
using EmergencyBurial.Api.Jobs;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

namespace EmergencyBurial.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            var storageConfig = new StorageConfiguration();
            var emailConfig = new EmailConfiguration();
            var smsConfig = new SmsConfiguration();
            var authConfig = new AuthConfiguration();
            var envConfig = new EnvConfiguration();

            Configuration.Bind("EmailConfiguration", emailConfig);
            Configuration.Bind("SmsConfiguration", smsConfig);
            Configuration.Bind("EnvConfiguration", envConfig);
            Configuration.Bind("Authorization", authConfig);
            Configuration.Bind("Storage", storageConfig);

            services.AddSingleton(storageConfig);
            services.AddSingleton(emailConfig);
            services.AddSingleton(smsConfig);
            services.AddSingleton(authConfig);
            services.AddSingleton(envConfig);

            services.AddCors();

            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<EmergencyBurialContext>(options =>
            {
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                options.UseSqlServer(Configuration.GetConnectionString("EmergencyBurialDbConfig"))
                    .UseTriggers(triggerOption =>
                    {
                        triggerOption.AddTrigger<SaveMembersTrigger>();
                    });
            });

            //inject services
            services.Configure<EmailConfiguration>(Configuration.GetSection(EmailConfiguration.SectionName));

            services.AddScoped<EmailHandler>();
            services.AddScoped<SmsHandler>();
            services.AddScoped<ListService>();
            services.AddScoped<AccountService>();
            services.AddScoped<DeceasedService>();
            
            services.AddScheduler();

            services.AddTransient<CreateCasualtyJob>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidateAudience = true,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   ValidIssuer = authConfig.Issuer,
                   ValidAudience = authConfig.Audience,
                   ClockSkew = TimeSpan.Zero,
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.SecurityKey)),
               };
               options.Events = new JwtBearerEvents()
               {
                   OnMessageReceived = context =>
                   {
                       context.Token = context.Request.Cookies["user_token"];
                       return Task.CompletedTask;
                   }
               };
           });

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                })
                .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "System.Api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EmergencyBurial.Api v1"));
            }
            
            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.ApplicationServices.UseScheduler(scheduler =>
            {
                var interval = Configuration.GetValue<int>("Scheduler:CasualtyCreationIntervalMinutes", 3);
                scheduler
                    .Schedule<CreateCasualtyJob>()
                    .Cron($"*/{interval} * * * *")
                    .Zoned(TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time"));
            });

            app.UseCors(x => x
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
