
export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  icon: string;
};

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    title: 'Salário',
    description: 'Transferência recebida',
    amount: 5200,
    type: 'income',
    date: 'Hoje, 09:30',
    icon: '↙',
  },
  {
    id: 'txn-002',
    title: 'Mercado',
    description: 'Alimentação',
    amount: 156.8,
    type: 'expense',
    date: 'Hoje, 08:15',
    icon: '🛒',
  },
  {
    id: 'txn-003',
    title: 'Netflix',
    description: 'Assinatura mensal',
    amount: 39.9,
    type: 'expense',
    date: 'Ontem',
    icon: '▶',
  },
  {
    id: 'txn-004',
    title: 'Freelance',
    description: 'Transferência recebida',
    amount: 850,
    type: 'income',
    date: '17 out, 14:20',
    icon: '💻',
  },
  {
    id: 'txn-005',
    title: 'Restaurante',
    description: 'Alimentação',
    amount: 82.5,
    type: 'expense',
    date: '16 out, 20:10',
    icon: '🍽',
  },
];
