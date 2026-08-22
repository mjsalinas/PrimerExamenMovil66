import { Pressable, StyleSheet, Text } from 'react-native';

type AnswerButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'default' | 'correct' | 'wrong';
};

export default function AnswerButton({
  label,
  onPress,
  disabled = false,
  variant = 'default',
}: AnswerButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return '#FFFFFF'; 
    if (variant === 'correct') return '#4CAF50';
    if (variant === 'wrong') return '#E53935';
    return '#FFFFFF';
  };

  const getTextColor = () => {
    if (disabled) return '#1A1A2E'; 
    if (variant === 'correct' || variant === 'wrong') return '#FFFFFF';
    return '#1A1A2E';
  };

  const getBorderColor = () => {
    if (variant === 'correct' || variant === 'wrong') return 'transparent';
    return '#4A90D9';
  };

  return (
    <Pressable onPress={onPress} style={[styles.button, { backgroundColor: getBackgroundColor(), borderColor: getBorderColor() }]}>
      <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    alignItems: 'center',
    opacity: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    backgroundColor: '#DBEAFE',
  },
});
