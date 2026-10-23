
import { describe, expect, it } from '@jest/globals';

import { filterTransactions } from '../filterTransactions';
import { mockTransactions } from '../mockTransactions';

describe('filterTransactions', () => {
  it('returns all transactions when search is empty and filter is all', () => {
    const result = filterTransactions({
      transactions: mockTransactions,
      search: '',
      filter: 'all',
    });

    expect(result).toHaveLength(mockTransactions.length);
  });

  it('filters by transaction title without case sensitivity', () => {
    const result = filterTransactions({
      transactions: mockTransactions,
      search: 'mercado',
      filter: 'all',
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Mercado');
  });

  it('searches in the transaction description', () => {
    const result = filterTransactions({
      transactions: mockTransactions,
      search: 'Alimentação',
      filter: 'all',
    });

    expect(result).toHaveLength(2);
  });

  it('returns only income transactions', () => {
    const result = filterTransactions({
      transactions: mockTransactions,
      search: '',
      filter: 'income',
    });

    expect(result.every((item) => item.type === 'income')).toBe(true);
    expect(result).toHaveLength(2);
  });

  it('combines search and type filter', () => {
    const result = filterTransactions({
      transactions: mockTransactions,
      search: 'transferência',
      filter: 'income',
    });

    expect(result).toHaveLength(2);
    expect(result.every((item) => item.type === 'income')).toBe(true);
  });

  it('returns an empty array when there are no matches', () => {
    const result = filterTransactions({
      transactions: mockTransactions,
      search: 'transação inexistente',
      filter: 'all',
    });

    expect(result).toEqual([]);
  });
});
