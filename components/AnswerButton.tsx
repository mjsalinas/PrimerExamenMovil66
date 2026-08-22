import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type AnswerButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "default" | "correct" | "wrong";
};

export default function AnswerButton({
  label,
  onPress,
  disabled = false,
  variant = "default",
}: AnswerButtonProps) {
  const getBackgroundColor = () => {
    if (variant === "correct") return "#4CAF50"; 
    if (variant === "wrong") return "#E53935"; 
    if (disabled) return "#B0BEC5";
    return "#FFFFFF";
  };

  const getTextColor = () => {
    if (variant === "correct" || variant === "wrong") return "#FFFFFF";
    if (disabled) return "#78909C"; 
    return "#1A1A2E";
  };

  const getBorderColor = () => {
    if (variant === "correct" || variant === "wrong") return "transparent";
    return "#4A90D9";
  };

  const getOpacity = () => {
    return disabled ? 0.55 : 1;
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: getOpacity(),
        },
        pressed && styles.pressed,
      ]}
    >
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
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: {
    backgroundColor: "#DBEAFE",
  },
});
