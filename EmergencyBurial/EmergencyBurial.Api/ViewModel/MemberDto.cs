using System;

namespace EmergencyBurial.Api.ViewModel
{
    public class MemberDto
    {
        public Guid? Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Mail { get; set; }

        public string PhoneNumber { get; set; }

        public int? MemberTypeId { get; set; }

        public bool IsActive { get; set; }
        
        public string MemberTypeDescription { get; set; }
    }
}
