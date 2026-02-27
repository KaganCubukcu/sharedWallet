using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SharedWallet.Api.Data;
using SharedWallet.Api.Hubs;
using SharedWallet.Api.Models;
using System.Collections.Generic;
using System.Security.Claims;

namespace SharedWallet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransactionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHubContext<WalletHub> _hubContext;

    public TransactionsController(ApplicationDbContext context, IHubContext<WalletHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        return await _context.Transactions
            .Include(t => t.Category)
            .Where(t => t.UserId == userId && !t.IsDeleted)
            .OrderByDescending(t => t.TransactionDate)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        transaction.UserId = userId;
        transaction.AddedBy = User.FindFirstValue(ClaimTypes.Name)!;

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        await _context.Entry(transaction).Reference(t => t.Category).LoadAsync();

        await _hubContext.Clients.All.SendAsync("ReceiveTransaction", transaction);

        return CreatedAtAction(nameof(GetTransactions), new {id = transaction.Id}, transaction);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTransaction(int id)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var transaction = await _context.Transactions.FindAsync(id);

        if (transaction == null) return NotFound();

        if (transaction.UserId != userId) return Unauthorized("You can only delete your own transactions.");

        transaction.IsDeleted = true;
        transaction.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _hubContext.Clients.All.SendAsync("TransactionDeleted", id);

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
    {
        if (id != transaction.Id) return BadRequest();

        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var existingTransaction = await _context.Transactions.FindAsync(id);

        if (existingTransaction == null) return NotFound();

        if (existingTransaction.UserId != userId) return Unauthorized();

        existingTransaction.Amount = transaction.Amount;
        existingTransaction.Description = transaction.Description;
        existingTransaction.CategoryId = transaction.CategoryId;
        existingTransaction.TransactionDate = transaction.TransactionDate;
        existingTransaction.UpdatedAt = DateTime.UtcNow;
        
        try 
        {
            await _context.SaveChangesAsync();
            await _context.Entry(existingTransaction).Reference(t => t.Category).LoadAsync();
            await _hubContext.Clients.All.SendAsync("TransactionUpdated", existingTransaction);
        } catch (DbUpdateConcurrencyException) {
            if (!_context.Transactions.Any(e => e.Id == id)) return NotFound();
            else throw;
        }

        return NoContent();
    }
}