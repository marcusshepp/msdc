using Microsoft.AspNetCore.SignalR;

namespace roger;

public class RogerHub : Hub
{
    private List<int> Votes = new List<int>();
    private List<string> Users = new List<string>();

    private PointerUpdate response = new PointerUpdate();

    public async Task Vote() 
    {
        var response = new PointerUpdate 
        {
            Votes = new List<int> 
            {
                1, 2, 3
            }
        };
        await Clients.All.SendAsync("pointerUpdate", response);
    }

    public async Task RegisterUser(string name) 
    {
        if (!this.Users.Contains(name)) {
            this.Users.Add(name);
        }

        await Clients.All.SendAsync("userRegistered", this.Users);
    }
}