using System;
using System.Net.Http;
using System.Threading.Tasks;
using Core.Config;
using Core.Resources;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace Common.Helpers
{
    public class SmsHandler
    {
        private readonly SmsConfig smsConfig;
        private readonly ILogger logger;
        private readonly bool isDevEnv;

        public SmsHandler(SmsConfiguration SmsConfig, ILogger<SmsHandler> logger, IHostingEnvironment env)
        {
            this.logger = logger;
            smsConfig = SmsConfig.SmsConfig;
            isDevEnv = env.IsDevelopment();
        }

        public async Task SendSms(string url)
        {

            try
            {
                HttpClient httpClient = new HttpClient();

                HttpResponseMessage response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode) { }
                else
                {
                    throw new HttpRequestException($"Request failed with status code {response.StatusCode}");
                }
            }

            catch (HttpRequestException ex)
            {
                throw new ApplicationException(UserMessage.ErrorDialogTitle, ex);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Send SMS exception information: {ex.InnerException ?? ex}");
            }

        }

    }
}