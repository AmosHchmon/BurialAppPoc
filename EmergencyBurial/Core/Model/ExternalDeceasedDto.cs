namespace Core.Model;

// נתאים את האובייקט כאשר נעשה איתם אינטגרציה
public class ExternalDeceasedDto
{
    public string HalalNumber { get; set; }
    
    public string IdentityNumber { get; set; }
    
    public string ExternalId { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string FatherName { get; set; }
    
    public string Gender { get; set; }
    
    public string Nationality { get; set; }
    
    public string HomeCity { get; set; }
    
    public string FindingLocation { get; set; }
    
    public string BodyCondition { get; set; }
    
    public string Affiliation { get; set; }
    
    public bool IsIdentified { get; set; }
    
    public string SourceSystem { get; set; } // Police, Health, etc.
}