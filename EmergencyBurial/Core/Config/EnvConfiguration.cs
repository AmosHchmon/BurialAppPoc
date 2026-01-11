namespace Core.Config;

public class EnvConfiguration
{
    public EnvSampleMessage SampleConfig { get; set; }
    public EnvReport EnvReportConfig { get; set; }
    public EnvScheduler Scheduler { get; set; }
}

public struct EnvSampleMessage
{
    public string MessageSample { get; set; }
}

public struct EnvReport
{
    public string EndPointUrl { get; set; }
    public string Folder { get; set; }
    public string MaxSize { get; set; }
    public string UN { get; set; }
    public string PW { get; set; }
    public string DM { get; set; }
}

public struct EnvScheduler
{
    public bool EnableCasualtyCreationJob { get; set; }
    public int CasualtyCreationIntervalMinutes { get; set; }
}