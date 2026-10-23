
import type { Transaction, TransactionType } from './mockTransactions';

export type TransactionFilter = 'all' | TransactionType;

type FilterTransactionsParams = {
  transactions: Transaction[];
  search: string;
  filter: TransactionFilter;
};

export function filterTransactions({
  transactions,
  search,
  filter,
}: FilterTransactionsParams): Transaction[] {
  const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');

  return transactions.filter((transaction) => {
    const matchesFilter =
      filter === 'all' || transaction.type === filter;

    const searchableText =
      `${transaction.title} ${transaction.description}`
        .toLocaleLowerCase('pt-BR');

    const matchesSearch = searchableText.includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });
}
