import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWallet } from '@/features/wallet/WalletProvider';

const currency = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export default function SendAmountScreen() {
  const { recipient } = useLocalSearchParams<{ recipient: string }>();
  const { balance } = useWallet();
  const [amountText, setAmountText] = useState('');

  const normalizedAmount = amountText.trim().replace(/\s/g, '');

  const amount = Number(
    normalizedAmount.includes(',')
      ? normalizedAmount.replace(/\./g, '').replace(',', '.')
      : normalizedAmount,
  );

  const validAmount =
    normalizedAmount.length > 0 &&
    Number.isFinite(amount) &&
    amount > 0 &&
    amount <= balance;

  function continueToReview() {
    if (!recipient) {
      Alert.alert('Destinatário inválido', 'Selecione novamente quem receberá o dinheiro.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      Alert.alert('Valor inválido', 'Informe um valor maior que zero.');
      return;
    }

    if (amount > balance) {
      Alert.alert('Saldo insuficiente', 'O valor excede o saldo disponível.');
      return;
    }

    router.push({
      pathname: '/send/review',
      params: { recipient, amount: String(amount) },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>‹ Voltar</Text>
        </Pressable>

        <Text style={styles.eyebrow}>NOVO ENVIO</Text>
        <Text style={styles.title}>Quanto deseja enviar?</Text>
        <Text style={styles.subtitle}>Para {recipient || 'destinatário'}</Text>

        <View style={styles.amountBox}>
          <Text style={styles.currency}>R$</Text>
          <TextInput
            accessibilityLabel="Valor do envio"
            keyboardType="decimal-pad"
            placeholder="0,00"
            placeholderTextColor="#929A95"
            value={amountText}
            onChangeText={setAmountText}
            style={styles.amountInput}
            autoFocus
          />
        </View>

        <Text style={styles.balance}>
          Saldo disponível: {currency(balance)}
        </Text>

        {amountText.length > 0 && amount > balance && (
          <Text style={styles.error}>O valor excede seu saldo disponível.</Text>
        )}

        <View style={styles.spacer} />

        <Pressable
          accessibilityRole="button"
          disabled={!validAmount || !recipient}
          onPress={continueToReview}
          style={[
            styles.primaryButton,
            (!validAmount || !recipient) && styles.disabledButton,
          ]}
        >
          <Text style={styles.primaryButtonText}>Continuar</Text>
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
  subtitle: { color: '#78827C', fontSize: 15, marginTop: 8 },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#153E35',
    marginTop: 48,
    paddingBottom: 12,
  },
  currency: { color: '#153E35', fontSize: 25, fontWeight: '700', marginRight: 10 },
  amountInput: { flex: 1, color: '#172B23', fontSize: 34, fontWeight: '800', padding: 0 },
  balance: { color: '#78827C', fontSize: 13, marginTop: 16 },
  error: { color: '#B42318', fontSize: 13, marginTop: 10 },
  spacer: { flex: 1 },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: '#004D40',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  disabledButton: { opacity: 0.4 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
