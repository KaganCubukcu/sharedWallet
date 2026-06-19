namespace SharedWallet.Api.Models;

public class Transaction : BaseEntity
{
    public const string SystemUser = "System";

    public int Id {get; set;}
    public decimal Amount {get; set;}
    public string Description {get; set;} = string.Empty;
    public DateTime TransactionDate {get; set;} = DateTime.UtcNow;

    public int CategoryId {get; set;}
    public Category? Category {get; set;}

    public string AddedBy {get; set;} = SystemUser;
    public Guid UserId {get; set;}
    public User? User {get; set;}

    public int WalletId { get; set; }
    public Wallet? Wallet { get; set; }
}