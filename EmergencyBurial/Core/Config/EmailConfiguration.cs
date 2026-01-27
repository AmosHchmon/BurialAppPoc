namespace Core.Config;

public class EmailConfiguration
{
    public const string SectionName = "EmailConfiguration";
    public SmtpConfig SmtpConfig { get; set; }
    public EmailMessage UserOtp { get; set; }
}

public class SmtpConfig
{
    public string MailServer { get; set; }
    public int Port { get; set; }
    public string MailServerUsername { get; set; }
    public string MailServerPassword { get; set; }
    public string SenderName { get; set; }
    public string SenderEmail { get; set; }
}

public struct EmailMessage
{
    public string Subject { get; set; }
    public string Body { get; set; }
}