using System;
using System.Security.Claims;

namespace Core.Helpers
{
    public static class ClaimHelper
    {
        public const string UserId = "UserId";
        public const string RoleId = "RoleId";
        public const string CouncilId = "CouncilId";

        public static string ClaimValue(this ClaimsPrincipal claimsPrincipal, string claimType)
        {
            if (claimsPrincipal.HasClaim(x => x.Type == claimType))
            {
                return claimsPrincipal.FindFirst(claimType).Value;
            }

            throw new UnauthorizedAccessException();
        }
    }
}
