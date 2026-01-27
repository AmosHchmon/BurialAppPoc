namespace Core.Config
{
    public class SmsConfiguration
    {
        public SmsConfig SmsConfig { get; set; }
        public SmsMessage SmsOtpMessage { get; set; }
    }

    public class SmsConfig
    {
        public string Url { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string SenderCellNumber { get; set; }
        public string IgnoreUnsubscribeCheck { get; set; }
    }

    public class SmsMessage
    {
        public string Content { get; set; }
    }
}