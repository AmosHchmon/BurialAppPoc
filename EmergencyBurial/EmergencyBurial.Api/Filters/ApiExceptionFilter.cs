using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Common.Model;
using Core.Resources;

namespace EmergencyBurial.Api.Filters;

public class ApiExceptionFilter : IExceptionFilter
{
    private readonly string _errorMessage;

    public ApiExceptionFilter(string errorMessage)
    {
        _errorMessage = errorMessage;
    }

    public void OnException(ExceptionContext context)
    {
        var logger = context.HttpContext.RequestServices.GetService<ILogger<ApiExceptionFilter>>();

        if (logger != null)
        {
            logger.LogError(context.Exception, $"Error captured by ApiExceptionFilter: {context.Exception.Message}");
        }

        var response = new AppResponse
        {
            IsValid = false,
            Title = UserMessage.ErrorDialogTitle,
            ErrorMessage = _errorMessage
        };

        context.Result = new ObjectResult(response)
        {
            StatusCode = 500
        };

        context.ExceptionHandled = true;
    }
}