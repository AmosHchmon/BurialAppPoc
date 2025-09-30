using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            PermissionRequirement requirement)
        {
            var permissions = context.User.FindAll("Permission").Select(c => c.Value);

            if (permissions.Contains(nameof(RoleAccessType.Admin)) || permissions.Contains(requirement.Permission))
            {
                context.Succeed(requirement);
            }

            if (permissions.Contains(nameof(RoleAccessType.Edit)) && requirement.Permission.Contains(nameof(RoleAccessType.View)))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class PermissionRequirement : IAuthorizationRequirement
    {
        public string Permission { get; }

        public PermissionRequirement(string permission)
        {
            Permission = permission;
        }
    }
    
}
