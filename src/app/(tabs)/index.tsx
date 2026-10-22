import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BalanceCard } from '@/components/BalanceCard';
import { QuickAction } from '@/components/QuickAction';

export default function HomeScreen() {
  const balance = 8420.75;

  function showComingSoon(action: string) {
    Alert.alert(
      action,
      'Funcionalidade demonstrativa. Vamos implementá-la em uma próxima etapa.',
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, bem-vindo 👋</Text>
            <Text style={styles.heading}>Sua carteira</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>OP</Text>
          </View>
        </View>

        <BalanceCard balance={balance} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso rápido</Text>

          <View style={styles.actions}>
            <QuickAction
              icon="↗"
              label="Enviar"
              onPress={() => showComingSoon('Enviar dinheiro')}
            />
            <QuickAction
              icon="+"
              label="Adicionar"
              onPress={() => showComingSoon('Adicionar dinheiro')}
            />
            <QuickAction
              icon="⇄"
              label="Transferir"
              onPress={() => showComingSoon('Transferir')}
            />
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Movimentações</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver todas as transações"
            onPress={() => router.push('/transactions')}
            hitSlop={8}
          >
            <Text style={styles.counter}>Ver todas ›</Text>
          </Pressable>
        </View>

        <Text style={styles.disclaimer}>
          OpenPay • Ambiente demonstrativo
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 13,
    color: '#78827C',
    marginBottom: 5,
  },
  heading: {
    fontSize: 27,
    fontWeight: '800',
    color: '#172B23',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DCEAE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#153E35',
    fontSize: 15,
    fontWeight: '800',
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#172B23',
    fontSize: 18,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  transactionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  counter: {
    fontSize: 12,
    color: '#78827C',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#929A95',
    fontSize: 11,
    marginTop: 46,
  },
});
