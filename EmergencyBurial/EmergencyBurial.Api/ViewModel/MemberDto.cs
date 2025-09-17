using System;

namespace EmergencyBurial.Api.ViewModel;

public class MemberDto
{
    public Guid? Id { get; set; }

    public string UserName { get; set; }

    public string FullName { get; set; }

    public string Mail { get; set; }

    public string PhoneNumber { get; set; }

    public string? OrganizationDesc { get; set; }

    public string? RoleDesc { get; set; }

    public string? StationDesc { get; set; }

    public string? SubStationDesc { get; set; }

    public string? OtpNumber { get; set; }

    public DateTime? OtpExpired { get; set; }

    public bool IsActive { get; set; }
}