// components/referral/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  disabled = false,
  style = {}
}) => {
  const buttonStyles = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
    danger: styles.dangerButton
  };

  const textStyles = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
    danger: styles.dangerText
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyles[variant],
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#007AFF' : '#fff'} />
      ) : (
        <Text style={[styles.text, textStyles[variant]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};