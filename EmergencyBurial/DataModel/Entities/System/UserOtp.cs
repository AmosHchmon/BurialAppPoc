namespace DataModel.Entities.System;

public class UserOtp
{
    public string UserName { get; set; }

    public string Mail { get; set; }

    public string PhoneNumber { get; set; }

    public string OtpNumber { get; set; }

    public bool IsSmsMethod { get; set; }

}