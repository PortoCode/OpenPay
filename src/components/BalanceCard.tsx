
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type BalanceCardProps = {
  balance: number;
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function BalanceCard({ balance }: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>Saldo disponível</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
          onPress={() => setIsVisible((current) => !current)}
          hitSlop={12}
        >
          <Text style={styles.eye}>
            {isVisible ? '◉' : '◎'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.balance}>
        {isVisible ? currencyFormatter.format(balance) : 'R$ ••••••'}
      </Text>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Carteira OpenPay</Text>
          <Text style={styles.footerValue}>Conta demonstrativa</Text>
        </View>
        <Text style={styles.cardMark}>OP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#153E35',
    borderRadius: 24,
    padding: 24,
    minHeight: 190,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#D1E5DC',
    fontSize: 14,
  },
  eye: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingHorizontal: 4,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginVertical: 20,
    fontVariant: ['tabular-nums'],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLabel: {
    color: '#D1E5DC',
    fontSize: 12,
  },
  footerValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  cardMark: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
