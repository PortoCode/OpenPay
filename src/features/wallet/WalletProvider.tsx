import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { mockTransactions, type Transaction } from './mockTransactions';

type WalletContextValue = {
  balance: number;
  transactions: Transaction[];
  sendMoney: (recipient: string, amount: number) => Transaction;
};

const initialBalance = 8420.75;

const WalletContext = createContext<WalletContextValue | null>(null);

type WalletProviderProps = {
  children: ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const sendMoney = useCallback(
    (recipient: string, amount: number) => {
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error('Informe um valor válido.');
      }

      if (amount > balance) {
        throw new Error('Saldo insuficiente.');
      }

      const now = new Date();
      const time = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const transaction: Transaction = {
        id: `mock-${now.getTime()}`,
        title: recipient,
        description: 'Transferência enviada',
        amount,
        type: 'expense',
        date: `Hoje, ${time}`,
        icon: '↗',
      };

      setBalance(currentBalance => currentBalance - amount);
      setTransactions(currentTransactions => [
        transaction,
        ...currentTransactions,
      ]);

      return transaction;
    },
    [balance],
  );

  const value = useMemo(
    () => ({ balance, transactions, sendMoney }),
    [balance, transactions, sendMoney],
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error(
      'useWallet deve ser utilizado dentro de WalletProvider.',
    );
  }

  return context;
}
