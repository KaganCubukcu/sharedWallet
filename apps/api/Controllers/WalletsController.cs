using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SharedWallet.Api.Data;
using SharedWallet.Api.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace SharedWallet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WalletsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WalletsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Wallet>>> GetMyWallets()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        return await _context.WalletMembers
            .Where(m => m.UserId == userId && !m.IsDeleted)
            .Include(m => m.Wallet)
            .Select(m => m.Wallet!)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Wallet>> CreateWallet(Wallet wallet)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        wallet.CreatedByUserId = userId;
        _context.Wallets.Add(wallet);
        await _context.SaveChangesAsync();
        
        var member = new WalletMember {
            WalletId = wallet.Id,
            UserId = userId,
            Role = "Admin"
        };

        _context.WalletMembers.Add(member);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetMyWallets), new {id = wallet.Id}, wallet);
    }
}