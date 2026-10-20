
import { Pressable, StyleSheet, Text } from 'react-native';

type QuickActionProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

export function QuickAction({
  icon,
  label,
  onPress,
}: QuickActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 94,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8ECE9',
    gap: 10,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  icon: {
    fontSize: 24,
    color: '#153E35',
  },
  label: {
    color: '#18352D',
    fontSize: 13,
    fontWeight: '600',
  },
});
