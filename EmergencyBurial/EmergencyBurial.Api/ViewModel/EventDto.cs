using System;

namespace EmergencyBurial.Api.ViewModel;

public class EventDto
{
    public Guid? Id { get; set; }
    
    public string Name { get; set; }
    
    public bool IsExercise { get; set; }
}