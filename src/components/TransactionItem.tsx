
import { StyleSheet, Text, View } from 'react-native';

import type { Transaction } from '@/features/wallet/mockTransactions';

type TransactionItemProps = {
  transaction: Transaction;
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function TransactionItem({
  transaction,
}: TransactionItemProps) {
  const isIncome = transaction.type === 'income';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{transaction.icon}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.description}>
          {transaction.description}
        </Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>

      <Text
        style={[
          styles.amount,
          isIncome ? styles.income : styles.expense,
        ]}
      >
        {isIncome ? '+' : '−'}
        {currencyFormatter.format(transaction.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#EEF3F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  details: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: '#17231E',
    fontSize: 15,
    fontWeight: '600',
  },
  description: {
    color: '#78827C',
    fontSize: 12,
  },
  date: {
    color: '#929A95',
    fontSize: 11,
  },
  amount: {
    fontSize: 13,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  income: {
    color: '#17845B',
  },
  expense: {
    color: '#26332D',
  },
});
