using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace EmergencyBurial.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
             Host.CreateDefaultBuilder(args)
                 .UseSerilog()
                 .ConfigureAppConfiguration((context, config) =>
                 {
                     var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                     config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                         .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
                         .AddJsonFile("appsettings.email.json", optional: false, reloadOnChange: true)
                         .Build();

                     Log.Logger = new LoggerConfiguration()
                         .ReadFrom.Configuration(config.Build())
                         .CreateLogger();
                 })
                 .ConfigureWebHostDefaults(webBuilder =>
                 {
                     webBuilder.UseStartup<Startup>();
                 });
    }
}
