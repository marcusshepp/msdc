using Newtonsoft.Json;

namespace roger;

public class PointerUpdate 
{

    [JsonProperty("name")]
    public string Name { get; set; } = string.Empty;


    [JsonProperty("votes")]
    public List<int> Votes { get; set; } = new List<int>();
}