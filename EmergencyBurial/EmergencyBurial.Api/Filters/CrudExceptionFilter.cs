using System;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EmergencyBurial.Api.Filters;

public class CrudExceptionFilter : IExceptionFilter
{
    private readonly string _errorMessage;

    public CrudExceptionFilter(string errorMessage)
    {
        _errorMessage = errorMessage;
    }

    public void OnException(ExceptionContext context)
    {
        throw new ApplicationException(_errorMessage, context.Exception);
    }
}