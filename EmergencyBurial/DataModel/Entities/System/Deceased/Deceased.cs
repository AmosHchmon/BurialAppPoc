using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;
using DataModel.Abstract;

namespace DataModel.Entities;

public class Deceased: BaseUpdatedEntity
{
    [Key]
    public Guid Id { get; set; }

    public string? IdentityNumber { get; set; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? FatherName { get; set; }
    
    public string? Gender { get; set; }
    
    public string? Nationality { get; set; }
    
    public string? HomeCity { get; set; }
    
    public string? PeleNumber { get; set; }
    
    public string? HomeAddress { get; set; }
    
    public string? Notes { get; set; }

    [Description("שיוך ארגוני")]
    public Affiliation? Affiliation { get; set; }
    
    public DeceasedProcessStatus DeceasedProcessStatus { get; set; }
    
    [Description("האם רשות האוכלוסין עודכנה")]
    public bool IsPopulationRegistryUpdated { get; set; }
    
    [Description("קובץ רישיון קבורה")]
    public Guid? BurialLicenseFileId { get; set; }
    
    [Description("האם ניתן לזהות את החלל בהיכרות אישית")]
    public bool CanBeIdentifiedByAcquaintance { get; set; }
    
    [Description("חפצים שנמצאו על החלל")]
    public string? ObjectsOnDeceased { get; set; }
    
    [Description("האם נמסרה הודעה מרה")]
    public bool IsBadMessageReceived { get; set; }
    
    [Description("האם החלל נקבר")]
    public bool IsBuried { get; set; }
    
    [Description("תאריך קבורה")]
    public DateTime? BurialDate { get; set; }
    
    [Description("תאריך מסירת הודעה מרה")]
    public DateTime? BadMessageStartDate { get; set; }
    
    public Guid? EventId { get; set; }
    
    [ForeignKey(nameof(EventId))]
    public virtual Event Event { get; set; }
    
    public virtual ICollection<DeceasedStatusHistory> StatusHistory { get; set; }

    public virtual ICollection<DeceasedBag> DeceasedBags { get; set; }

    public virtual DeceasedBurialDetails DeceasedBurialDetails { get; set; } = new ();

    public virtual DeceasedTaharahDetails DeceasedTaharahDetails { get; set; } = new ();

    public virtual DeceasedTarahDetails DeceasedTarahDetails { get; set; } = new ();

    public virtual DeceasedBurialCoordination DeceasedBurialCoordination { get; set; } = new ();
}