export interface Transaction {
  id: string;
  productId: string;
  userId: string;
  timestamp: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  timestamp: number;
}

export interface SupplierProfile {
  id: string;
  name: string;
  rAndDInvestmentUSD?: number;
  avgWorkerSalaryUSD?: number;
  execAverageAge?: number;
  execAverageIncomeUSD?: number;
  // more fields...
}

export const db = {
  transactions: [] as Transaction[],
  reviews: [] as Review[],
  suppliers: [] as SupplierProfile[]
};
