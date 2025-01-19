import React from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  ActivityIndicator 
} from 'react-native';

const BlurOverlay = ({ children, isVisible = true }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.blurContainer}>
          {children || <ActivityIndicator size="large" color="#00BCD4" />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Frosted glass effect
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BlurOverlay;