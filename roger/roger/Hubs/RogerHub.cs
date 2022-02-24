using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace roger;


enum VoteEnum {
    ONE = 1,
    TWO,
    THREE,
    FIVE,
    EIGHT,
    THIRTEEN,
    TWENTY_ONE,
}

public class VoteRequest 
{
    public string? Name { get; set; }
    public int Vote { get; set; }
}

public class VoteResponse 
{
    public List<int> Votes { get; set; }
    public VoteResponse(List<int> votes) 
    {
        this.Votes = votes;
    }
}

public class RogerHub : Hub
{
    private List<int> Votes = new List<int>();

    public async Task Vote(VoteRequest request)
    {

        if (string.IsNullOrWhiteSpace(request.Name)) {

        }

        int vote = request.Vote;
        this.Votes.Add(vote);

        await Clients.All.SendAsync("messageReceived", new VoteResponse(this.Votes));
    }

    public async Task PrintVotes()
    {
        await Clients.All.SendAsync("messageReceived", this.Votes.ToString());
    }
}