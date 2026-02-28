export interface Wallet {
  id?: number;
  accessId?: string;
  name: string;
  currency: string;
  createdByUserId: string;
}

export interface WalletMember {
  walletId: number;
  userId: string;
  role: string;
}
