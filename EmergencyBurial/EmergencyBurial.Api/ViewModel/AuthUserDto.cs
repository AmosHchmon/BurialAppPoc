using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel
{
    public class AuthUserDto
    {
        public string FullName { get; set; }
        public OrganizationType OUnit { get; set; }
        public RoleAccessType Policy { get; set; }
        public string OrganizationDesc { get; set; }
        
        public string StationDesc { get; set; }
    }
}
