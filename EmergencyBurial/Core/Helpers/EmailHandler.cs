using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using Core.Config;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Common.Helpers
{
    public class EmailHandler
    {
        private readonly SmtpConfig smtpConfig;
        private readonly ILogger logger;
        private readonly bool isDevEnv;

        public EmailHandler(IOptions<EmailConfiguration> emailConfig, ILogger<EmailHandler> logger, IHostingEnvironment env)
        {
            this.logger = logger;
            smtpConfig = emailConfig.Value.SmtpConfig;
            isDevEnv = env.IsDevelopment();
        }

        private SmtpClient InitSmtpClient()
        {
            SmtpClient smtpClient;

            if (isDevEnv)
            {
                smtpClient = new SmtpClient(smtpConfig.MailServer)
                {
                    Port = smtpConfig.Port,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(smtpConfig.MailServerUsername, smtpConfig.MailServerPassword)
                };
            }
            else
            {
                smtpClient = new SmtpClient(smtpConfig.MailServer, smtpConfig.Port);
            }

            return smtpClient;
        }

        private MailMessage InitMailMessage(string subject, string body, Dictionary<string, string> attachments = null)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpConfig.SenderEmail),
                Body = body,
                Subject = subject,
                IsBodyHtml = true
            };

            if (attachments != null)
            {
                foreach (var file in attachments)
                {
                    var attch = new Attachment(file.Key)
                    {
                        Name = file.Value
                    };

                    mailMessage.Attachments.Add(attch);
                }
            }

            return mailMessage;
        }

        public void SendEmail(string toEmail, string subject, string body, Dictionary<string, string> attachments = null)
        {
            SmtpClient client = InitSmtpClient();

            MailMessage mailMessage = InitMailMessage(subject, body, attachments);

            mailMessage.To.Add(toEmail);

            try
            {
                client.Send(mailMessage);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Send mail exception information: {ex.InnerException ?? ex}");
            }

        }

    }
}
