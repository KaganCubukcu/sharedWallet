using System.Text.Json.Serialization;

namespace SharedWallet.Api.Models;

public class Category
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public string Icon {get; set;} = "💰";

    [JsonIgnore]
    public ICollection<Transaction> Transactions {get; set;} = new List<Transaction>();
}