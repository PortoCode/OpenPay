import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TransactionItem } from '@/components/TransactionItem';
import { filterTransactions, type TransactionFilter } from '@/features/wallet/filterTransactions';
import { useWallet } from '@/features/wallet/WalletProvider';

const filters: { label: string; value: TransactionFilter }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Entradas', value: 'income' },
  { label: 'Saídas', value: 'expense' },
];

export default function TransactionsScreen() {
  const { transactions } = useWallet();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('all');

  const filteredTransactions = useMemo(
    () =>
      filterTransactions({
        transactions,
        search,
        filter: activeFilter,
      }),
    [search, activeFilter],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para a tela anterior"
            onPress={() => router.replace('/(tabs)')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.heading}>Movimentações</Text>
            <Text style={styles.subtitle}>
              Consulte suas entradas e saídas
            </Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            accessibilityLabel="Buscar transações"
            placeholder="Buscar por nome ou categoria"
            placeholderTextColor="#929A95"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            returnKeyType="search"
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        <View style={styles.filters}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <Pressable
                key={filter.value}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                onPress={() => setActiveFilter(filter.value)}
                style={[
                  styles.filterButton,
                  isActive && styles.filterButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          <Text style={styles.counter}>
            {filteredTransactions.length}{' '}
            {filteredTransactions.length === 1 ? 'transação' : 'transações'}
          </Text>
        </View>

        {filteredTransactions.length > 0 ? (
          <View>
            {filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              Nenhuma transação encontrada
            </Text>
            <Text style={styles.emptyDescription}>
              Tente outro termo de busca ou selecione um filtro diferente.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setSearch('');
                setActiveFilter('all');
              }}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Limpar filtros</Text>
            </Pressable>
          </View>
        )}

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
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#E8EFEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#153E35',
    fontSize: 32,
    lineHeight: 36,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  heading: {
    color: '#172B23',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#78827C',
    fontSize: 13,
  },
  searchContainer: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EBE7',
  },
  searchIcon: {
    color: '#78827C',
    fontSize: 26,
  },
  searchInput: {
    flex: 1,
    color: '#172B23',
    fontSize: 14,
    paddingVertical: 12,
  },
  filters: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    marginBottom: 28,
  },
  filterButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E9EEEB',
  },
  filterButtonActive: {
    backgroundColor: '#153E35',
  },
  filterText: {
    color: '#526159',
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#172B23',
    fontSize: 18,
    fontWeight: '700',
  },
  counter: {
    color: '#78827C',
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
    gap: 12,
  },
  emptyTitle: {
    color: '#172B23',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#78827C',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  clearButton: {
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#DCEAE2',
  },
  clearButtonText: {
    color: '#153E35',
    fontSize: 13,
    fontWeight: '700',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#929A95',
    fontSize: 11,
    marginTop: 28,
  },
});
