using System.Threading.Tasks;
using Core.Model;
using Microsoft.AspNetCore.SignalR;

namespace EmergencyBurial.Services.RealTime;

public class NotificationService(IHubContext<NotificationHub> hubContext)
{
    public async Task NotifyDeceasedCreatedAsync(ExternalDeceasedDto deceased)
    {
        await hubContext.Clients.All.SendAsync("NewDeceased", deceased);
    }

    public async Task NotifyDeceasedUpdatedAsync(ExternalDeceasedDto deceased)
    {
        await hubContext.Clients.All.SendAsync("DeceasedUpdate", deceased);
    }
}