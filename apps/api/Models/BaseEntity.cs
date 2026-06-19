namespace SharedWallet.Api.Models;

public abstract class BaseEntity
{
    public DateTime CreatedAt {get; set;}
    public DateTime? UpdatedAt {get; set;}
    public bool IsDeleted {get; set;} = false;
    public DateTime? DeletedAt {get; set;}
}