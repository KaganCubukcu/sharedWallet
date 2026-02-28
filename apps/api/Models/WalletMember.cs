namespace SharedWallet.Api.Models;

public class WalletMember : BaseEntity
{
    public int Id { get; set; }
    public int WalletId { get; set; }
    public Wallet? Wallet { get; set; }

    public Guid UserId { get; set; }
    public User? User { get; set; }

    public string Role { get; set; } = "Member";
}