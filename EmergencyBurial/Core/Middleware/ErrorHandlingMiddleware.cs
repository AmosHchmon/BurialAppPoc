using System;
using System.Net;
using System.Threading.Tasks;
using Common.Model;
using Core.Resources;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Core.Middleware
{
    public class ErrorHandlingMiddleware
    {
        readonly RequestDelegate next;
        readonly ILogger logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            this.next = next;
            this.logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var msg = UserMessage.ErrorSystem;

            logger.LogError($"Exception information: {exception.InnerException ?? exception}");

            if (exception is UnauthorizedAccessException) code = HttpStatusCode.Unauthorized;

            if (exception is ApplicationException)
            {
                code = HttpStatusCode.BadRequest;
                msg = exception.Message;
            }

            if (exception is InvalidProgramException)
            {
                code = HttpStatusCode.MethodNotAllowed;
            }

            if (exception is InvalidOperationException)
            {
                code = HttpStatusCode.BadRequest;
            }

            var response = new AppResponse
            {
                IsValid = false,
                Title = UserMessage.ErrorDialogTitle,
                ErrorMessage = msg
            };

            var result = JsonConvert.SerializeObject(response);

            context.Response.ContentType = "application/json";

            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }
    }
}
