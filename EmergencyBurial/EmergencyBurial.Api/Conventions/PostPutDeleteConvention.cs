using System.Linq;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.Routing;
using EmergencyBurial.Api.Filters;
using Core.Resources;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace EmergencyBurial.Api.Conventions;

public class PostPutDeleteConvention : IActionModelConvention
{
    public void Apply(ActionModel action)
    {
        var httpMethods = action.Selectors
            .SelectMany(s => s.ActionConstraints)
            .OfType<HttpMethodActionConstraint>()
            .SelectMany(c => c.HttpMethods)
            .ToList();
        
        if (httpMethods.Any(m => m == "POST" || m == "PUT" || m == "DELETE"))
        {
            action.Filters.Add(new ApiExceptionFilter(UserMessage.ErrorSave));
        }
    }
}