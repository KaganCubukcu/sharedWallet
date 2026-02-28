using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SharedWallet.Api.Data;
using System.Security.Claims;

namespace SharedWallet.Api.Hubs;

[Authorize]
public class WalletHub : Hub
{
    private readonly ApplicationDbContext _context;

    public WalletHub(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task JoinWalletGroup(Guid accessId)
    {
        var userId = Guid.Parse(Context.User!.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var isMember = await _context.WalletMembers
            .AnyAsync(m => m.Wallet.AccessId == accessId && m.UserId == userId && !m.IsDeleted);
        if (isMember)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Wallet_{accessId}");
        }
    }

    public async Task LeaveWalletGroup(Guid accessId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Wallet_{accessId}");
    }
}