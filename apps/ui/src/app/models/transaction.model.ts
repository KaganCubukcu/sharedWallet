export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Transaction {
  id?: number;
  amount: number;
  description: string;
  transactionDate: Date;
  categoryId: number;
  category?: Category;
  addedBy: string;
}
