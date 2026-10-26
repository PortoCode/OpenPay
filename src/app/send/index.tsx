import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const recipients = [
  { id: '1', name: 'Mariana Costa', detail: '•••.482.190-••' },
  { id: '2', name: 'Lucas Oliveira', detail: '•••.715.230-••' },
  { id: '3', name: 'Ana Souza', detail: '•••.091.650-••' },
];

export default function SendScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.back}
        >
          <Text style={styles.backText}>‹ Voltar</Text>
        </Pressable>

        <Text style={styles.eyebrow}>PIX • AMBIENTE DEMONSTRATIVO</Text>
        <Text style={styles.title}>Enviar dinheiro</Text>
        <Text style={styles.subtitle}>
          Para quem você quer enviar?
        </Text>

        {recipients.map((recipient) => (
          <Pressable
            key={recipient.id}
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: '/send/amount',
                params: { recipient: recipient.name },
              })
            }
            style={({ pressed }) => [
              styles.recipient,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {recipient.name
                  .split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')}
              </Text>
            </View>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName}>{recipient.name}</Text>
              <Text style={styles.detail}>{recipient.detail}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}

        <Text style={styles.disclaimer}>
          Destinatários fictícios para demonstração.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9F7' },
  content: { padding: 20, paddingTop: 12, flexGrow: 1 },
  back: { alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 24 },
  backText: { color: '#153E35', fontSize: 15, fontWeight: '600' },
  eyebrow: { color: '#78827C', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  title: { color: '#172B23', fontSize: 28, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#78827C', fontSize: 15, marginTop: 8, marginBottom: 24 },
  recipient: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EBE7',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  pressed: { opacity: 0.7 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DCEAE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#153E35', fontSize: 14, fontWeight: '800' },
  recipientInfo: { flex: 1, gap: 4 },
  recipientName: { color: '#172B23', fontSize: 15, fontWeight: '700' },
  detail: { color: '#78827C', fontSize: 12 },
  chevron: { color: '#78827C', fontSize: 25 },
  disclaimer: {
    color: '#929A95',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 24,
  },
});
