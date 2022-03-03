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