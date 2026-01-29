using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataModel.Abstract;
namespace DataModel.Entities;

public class Event : BaseUpdatedEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public bool IsExercise { get; set; }
    
    [ForeignKey(nameof(CreatedBy))]
    public virtual Member CreateMember { get; set; }

    [ForeignKey(nameof(UpdateBy))]
    public virtual Member UpdateMember { get; set; }
    
    public virtual ICollection<Deceased> Deceaseds { get; set; }
}