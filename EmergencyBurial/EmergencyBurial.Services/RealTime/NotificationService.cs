using System;
using System.Threading.Tasks;
using DataModel.Entities;
using Microsoft.AspNetCore.SignalR;

namespace EmergencyBurial.Services.RealTime;

public class NotificationService(IHubContext<NotificationHub> hubContext)
{
    public async Task SendDeceasedNotificationAsync(Deceased deceased)
    {
        await hubContext.Clients.All.SendAsync("sendDeceased", deceased);
    }
}