import React, { createContext, useContext, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const themes = {
  light: {
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      surface: '#F2F2F7',
      text: '#000000',
      textSecondary: '#6B6B6B',
      border: '#E5E5E5',
      error: '#FF3B30',
      success: '#34C759',
      warning: '#FF9500'
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    roundness: {
      sm: 4,
      md: 8,
      lg: 12
    }
  },
  dark: {
    colors: {
      primary: '#0A84FF',
      background: '#000000',
      surface: '#1C1C1E',
      text: '#FFFFFF',
      textSecondary: '#8E8E93',
      border: '#38383A',
      error: '#FF453A',
      success: '#32D74B',
      warning: '#FF9F0A'
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    roundness: {
      sm: 4,
      md: 8,
      lg: 12
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(colorScheme);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const theme = themes[themeMode];

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
};