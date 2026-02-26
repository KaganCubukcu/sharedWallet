using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SharedWallet.Api.Data;
using SharedWallet.Api.Hubs;
using SharedWallet.Api.Models;
using System.Collections.Generic;

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
        return await _context.Transactions
            .Include(t => t.Category)
            .OrderByDescending(t => t.TransactionDate)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
    {
        _context.Transactions.Add(transaction);

        await _context.SaveChangesAsync();

        await _context.Entry(transaction).Reference(t => t.Category).LoadAsync();

        await _hubContext.Clients.All.SendAsync("ReceiveTransaction", transaction);

        return CreatedAtAction(nameof(GetTransactions), new {id = transaction.Id}, transaction);
    }
}