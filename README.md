# Shared Wallet

Real-time shared budget tracking application designed for families and partners to manage their finances in perfect sync.

![Shared Wallet Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-.NET%20%7C%20Angular%20%7C%20PostgreSQL-blue)

## 🌟 Key Features

- **Real-time Sync**: Instant expense updates across all connected devices using SignalR.
- **Secure by Design**: Robust authentication system with JWT and HMACSHA512 password hashing.
- **Categorized Ledger**: Easily track where your money goes with categorized transactions and intuitive icons.

## 🛠️ Tech Stack

### Backend

- **Framework**: .NET 8 Web API
- **Database**: PostgreSQL (via Entity Framework Core)
- **Real-time**: SignalR Hubs
- **Security**: JWT Bearer Authentication, HMACSHA512 Hashing
- **Infrastructure**: Docker & Docker Compose

### Frontend

- **Framework**: Angular 21 (Standalone Components)
- **State Management**: NgRx (Store, Effects, Selectors)
- **Styling**: Tailwind CSS 4.0
- **Real-time**: SignalR Client Integration

## 🚀 Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js (v18+)
- Docker

### Environment Setup

Before running the application, you need to configure your environment files:

#### Frontend

1. Navigate to `apps/ui/src/environments/`
2. Copy `environment.template.ts` and rename it to `environment.ts`
3. Fill in your local variables (the template has the default development values).

#### Backend

1. Navigate to `apps/api/`
2. Create or verify `appsettings.json` and `appsettings.Development.json`
3. Ensure your `ConnectionStrings:DefaultConnection` and `AppSettings:Token` (JWT Secret) are properly configured.

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
