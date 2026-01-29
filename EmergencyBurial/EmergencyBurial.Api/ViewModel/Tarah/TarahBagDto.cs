using System;

namespace EmergencyBurial.Api.ViewModel;

public class TarahBagDto
{
    public Guid Id { get; set; }
    public string BagNumber { get; set; }
    public int BagProcessStatus { get; set; }
    public Guid? BurialLicenseFileId { get; set; }
    public string PartDescription { get; set; }
}
