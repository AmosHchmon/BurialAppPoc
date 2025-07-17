using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.ServiceModel;
using System.Threading.Tasks;
using Core.Config;
using Core.Helpers;
using Core.Model;
using Core.Resources;
using DataModel;
using Microsoft.Extensions.Logging;
using RSExecutionReferenceAgent;

namespace EmergencyBurial.Services
{
    public class ReportHandler(EnvConfiguration config, EmergencyBurialContext ctx, ILogger<ReportHandler> logger)
    {
        public async Task<byte[]> RenderReport(ReportRequest renderedReport)
        {
            try
            {
                ReportExecutionServiceSoapClient rs = CreateClient();

                // Render arguments
                string reportFolder = string.IsNullOrEmpty(renderedReport.ReportServerFolder) ? config.EnvReportConfig.Folder : renderedReport.ReportServerFolder;

                if (string.IsNullOrEmpty(reportFolder) || string.IsNullOrEmpty(renderedReport.ReportName))
                {
                    throw new ApplicationException(UserMessage.ErrorLoadReport);
                }

                string reportPath = reportFolder + renderedReport.ReportName;

                LoadReportResponse loadReponse = await rs.LoadReportAsync(null, reportPath, null);

                string format = renderedReport.DocFormat.ToString();

                List<ParameterValue> reportParameters = new();

                if (renderedReport.Parameters != null && renderedReport.Parameters.Count > 0)
                {
                    reportParameters = renderedReport.Parameters.Select(parameter => new ParameterValue()
                    {
                        Name = parameter.Name,
                        Value = parameter.Value
                    }).ToList();

                }

                SetExecutionParametersResponse setParamsResponse = await rs.SetExecutionParametersAsync(loadReponse.ExecutionHeader, null, reportParameters.ToArray(), "he-IL");

                var renderRequest = new RenderRequest(loadReponse.ExecutionHeader, null, format, null);

                RenderResponse response = await rs.RenderAsync(renderRequest);

                return response.Result;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, message: UserMessage.ErrorLoadReport);
                throw new ApplicationException(UserMessage.ErrorLoadReport);
            }
        }


        #region [private methods]
        private ReportExecutionServiceSoapClient CreateClient()
        {
            var rsBinding = new BasicHttpBinding();

            rsBinding.Security.Transport.ClientCredentialType = HttpClientCredentialType.Windows;
            rsBinding.MaxBufferPoolSize = int.Parse(config.EnvReportConfig.MaxSize);
            rsBinding.MaxBufferSize = int.Parse(config.EnvReportConfig.MaxSize); ;
            rsBinding.MaxReceivedMessageSize = int.Parse(config.EnvReportConfig.MaxSize);
            rsBinding.Security.Mode = BasicHttpSecurityMode.TransportCredentialOnly;

            NetworkCredential credentials = new()
            {
                UserName = FileHelper.Decode(config.EnvReportConfig.UN),
                Password = FileHelper.Decode(config.EnvReportConfig.PW),
                Domain = FileHelper.Decode(config.EnvReportConfig.DM)
            };

            var rsEndpointAddress = new EndpointAddress(config.EnvReportConfig.EndPointUrl);

            var rsClient = new ReportExecutionServiceSoapClient(rsBinding, rsEndpointAddress);

            rsClient.ClientCredentials.Windows.ClientCredential = credentials;

            return rsClient;
        }
        #endregion

    }
}
