using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace EmergencyBurial.Services.RealTime;

public class NotificationHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
    
    public async Task SendNewDeceased(object deceased)
    {
        await Clients.All.SendAsync("NewDeceased", deceased);
    }
    
    public async Task SendDeceasedUpdate(object deceased)
    {
        await Clients.All.SendAsync("DeceasedUpdate", deceased);
    }
}