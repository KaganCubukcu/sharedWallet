# Shared Wallet 💎

A premium, real-time shared budget tracking application designed for families and partners to manage their finances in perfect sync.

![Shared Wallet Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-.NET%20%7C%20Angular%20%7C%20PostgreSQL-blue)

## 🌟 Key Features

- **Real-time Sync**: Instant expense updates across all connected devices using SignalR.
- **Midnight UI**: A modern, sleek dark-themed dashboard designed with Tailwind CSS for eye comfort during late-night budgeting.
- **Secure by Design**: Robust authentication system with JWT and PBKDF2-style password hashing/salting.
- **Smart Analytics**: Real-time spending Pulse and Total Outflow calculation via NgRx selectors.
- **Categorized Ledger**: Easily track where your money goes with categorized transactions and intuitive icons.

## 🛠️ Tech Stack

### Backend

- **Framework**: .NET 8 Web API
- **Database**: PostgreSQL (via Entity Framework Core)
- **Real-time**: SignalR Hubs
- **Security**: JWT Bearer Authentication, HMACSHA512 Hashing
- **Infrastructure**: Docker & Docker Compose

### Frontend

- **Framework**: Angular 18+ (Standalone Components)
- **State Management**: NgRx (Store, Effects, Selectors)
- **Styling**: Tailwind CSS 4.0
- **Real-time**: SignalR Client Integration

## 🚀 Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js (v18+)
- Docker Desktop

### Installation & Run

1. **Clone the repository**:

   ```bash
   git clone <this repo>
   cd sharedWallet
   ```

2. **Start the Database**:

   ```bash
   docker-compose up -d
   ```

3. **Install Dependencies**:

   ```bash
   npm run install:all
   ```

4. **Update Database**:

   ```bash
   cd apps/api
   dotnet ef database update
   ```

5. **Run the Application**:
   ```bash
   # From the root directory
   npm run dev
   ```

The API will be available at `http://localhost:5155` and the UI at `http://localhost:4200`.

## 📁 Project Structure

```text
sharedWallet/
├── apps/
│   ├── api/          # .NET Core Web API
│   └── ui/           # Angular Frontend
├── docker-compose.yml # PostgreSQL & Infrastructure
└── package.json      # Monorepo management scripts
```

---
