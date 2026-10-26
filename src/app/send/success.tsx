import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const currency = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export default function SendSuccessScreen() {
  const { recipient, amount: amountParam } =
    useLocalSearchParams<{ recipient: string; amount: string }>();

  const amount = Number(amountParam);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>Envio concluído!</Text>
        <Text style={styles.subtitle}>
          Sua operação demonstrativa foi registrada.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Valor enviado</Text>
          <Text style={styles.amount}>
            {Number.isFinite(amount) && amount > 0
              ? currency(amount)
              : '—'}
          </Text>
          <View style={styles.divider} />
          <Text style={styles.label}>Destinatário</Text>
          <Text style={styles.recipient}>{recipient || '—'}</Text>
          <Text style={styles.notice}>
            Esta confirmação é fictícia e não representa uma transação bancária real.
          </Text>
        </View>

        <View style={styles.spacer} />

        <Pressable
          accessibilityRole="button"
          onPress={() => router.dismissAll()}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Voltar para a carteira</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/transactions')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Ver movimentações</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9F7' },
  content: { flex: 1, padding: 20, paddingTop: 48, alignItems: 'stretch' },
  successIcon: {
    alignSelf: 'center',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#DCEFE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  check: { color: '#087443', fontSize: 42, fontWeight: '700' },
  title: { color: '#172B23', fontSize: 27, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#78827C', fontSize: 14, textAlign: 'center', marginTop: 10 },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EBE7',
    borderRadius: 20,
    padding: 20,
    marginTop: 32,
  },
  label: { color: '#78827C', fontSize: 13 },
  amount: { color: '#153E35', fontSize: 30, fontWeight: '800', marginTop: 8 },
  divider: { height: 1, backgroundColor: '#E8ECE9', marginVertical: 18 },
  recipient: { color: '#172B23', fontSize: 16, fontWeight: '700', marginTop: 6 },
  notice: { color: '#78827C', fontSize: 12, lineHeight: 18, marginTop: 20 },
  spacer: { flex: 1 },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: '#004D40',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryButton: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  secondaryButtonText: { color: '#153E35', fontSize: 15, fontWeight: '700' },
});
