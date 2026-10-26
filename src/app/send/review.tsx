import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWallet } from '@/features/wallet/WalletProvider';

const currency = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export default function SendReviewScreen() {
  const { recipient, amount: amountParam } =
    useLocalSearchParams<{ recipient: string; amount: string }>();
  const { balance, sendMoney } = useWallet();
  const [submitting, setSubmitting] = useState(false);

  const amount = Number(amountParam);

  function confirmSend() {
    if (submitting) return;

    if (!recipient || !Number.isFinite(amount) || amount <= 0) {
      Alert.alert('Dados inválidos', 'Volte e confira os dados do envio.');
      return;
    }

    if (amount > balance) {
      Alert.alert('Saldo insuficiente', 'Seu saldo mudou. Revise o valor.');
      return;
    }

    setSubmitting(true);

    try {
      sendMoney(recipient, amount);

      router.replace({
        pathname: '/send/success',
        params: { recipient, amount: String(amount) },
      });
    } catch (error) {
      setSubmitting(false);
      Alert.alert(
        'Não foi possível enviar',
        error instanceof Error ? error.message : 'Tente novamente.',
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Pressable
          accessibilityRole="button"
          disabled={submitting}
          onPress={() => router.back()}
          style={styles.back}
        >
          <Text style={styles.backText}>‹ Voltar</Text>
        </Pressable>

        <Text style={styles.eyebrow}>CONFIRMAÇÃO</Text>
        <Text style={styles.title}>Revise seu envio</Text>
        <Text style={styles.subtitle}>
          Confira os dados antes de confirmar.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Você está enviando</Text>
          <Text style={styles.amount}>{currency(amount)}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Destinatário</Text>
          <Text style={styles.value}>{recipient}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Origem</Text>
          <Text style={styles.value}>Carteira OpenPay</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Saldo após o envio</Text>
          <Text style={styles.value}>{currency(balance - amount)}</Text>
        </View>

        <Text style={styles.disclaimer}>
          Operação simulada. Nenhum dinheiro real será movimentado.
        </Text>

        <View style={styles.spacer} />

        <Pressable
          accessibilityRole="button"
          disabled={submitting}
          onPress={confirmSend}
          style={[styles.primaryButton, submitting && styles.disabled]}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Confirmar envio</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9F7' },
  content: { flex: 1, padding: 20, paddingTop: 12 },
  back: { alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 24 },
  backText: { color: '#153E35', fontSize: 15, fontWeight: '600' },
  eyebrow: { color: '#78827C', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  title: { color: '#172B23', fontSize: 27, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#78827C', fontSize: 14, marginTop: 8 },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EBE7',
    borderRadius: 20,
    padding: 20,
    marginTop: 28,
  },
  label: { color: '#78827C', fontSize: 13 },
  amount: { color: '#153E35', fontSize: 30, fontWeight: '800', marginTop: 8 },
  value: { color: '#172B23', fontSize: 16, fontWeight: '700', marginTop: 6 },
  divider: { height: 1, backgroundColor: '#E8ECE9', marginVertical: 18 },
  disclaimer: { color: '#78827C', fontSize: 12, lineHeight: 18, marginTop: 18 },
  spacer: { flex: 1 },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: '#004D40',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  disabled: { opacity: 0.6 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
