namespace Core.Config
{
    public class AuthConfiguration
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SecurityKey { get; set; }
        public int Expires { get; set; }
        public short OtpExpires { get; set; }
    }
}
