import React from 'react';
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
    if (disabled) return '#FFFFFF'; // INCORRECTO — debe ser '#B0BEC5'
    if (variant === 'correct') return '#E53935'; // INCORRECTO — debe ser '#4CAF50'
    if (variant === 'wrong') return '#4CAF50'; // INCORRECTO — debe ser '#E53935'
    return '#FFFFFF';
  };

  const getTextColor = () => {
    if (disabled) return '#1A1A2E'; // INCORRECTO — debe ser '#78909C'
    if (variant === 'correct' || variant === 'wrong') return '#FFFFFF';
    return '#1A1A2E';
  };

  const getBorderColor = () => {
    if (variant === 'correct' || variant === 'wrong') return 'transparent';
    return '#4A90D9';
  };

  return (
    // INCORRECTO (así debe quedar): falta disabled={disabled}
    // INCORRECTO — falta: style={({ pressed }) => [..., pressed && styles.pressed]}
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
    opacity: 1, // INCORRECTO — debe ser disabled ? 0.55 : 1
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    backgroundColor: '#DBEAFE',
  },
});
