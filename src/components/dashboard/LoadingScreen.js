// components/common/LoadingScreen.js
import React from 'react';
import { View, ActivityIndicator , Text} from 'react-native';
import { useTheme } from '../utils/useTheme';

const LoadingScreen = ({ message = 'Loading...' }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  }
};

export default LoadingScreen;