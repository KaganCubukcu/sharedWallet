namespace SharedWallet.Api.Models;

public class User: BaseEntity
{
    public Guid Id {get; set;}
    public string Username {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;
    public byte[] PasswordHash {get; set;} = new byte[32];
    public byte[] PasswordSalt {get; set;} = new byte[32];
}

