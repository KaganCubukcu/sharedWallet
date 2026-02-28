namespace SharedWallet.Api.Models;

public class Wallet : BaseEntity
{
    public int Id {get; set;}
    public Guid AccessId { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Currency { get; set; } = "USD";

    public Guid CreatedByUserId { get; set; }
    public User? CreatedByUser { get; set; }

    public ICollection<WalletMember> Members { get; set; } = new List<WalletMember>();
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}