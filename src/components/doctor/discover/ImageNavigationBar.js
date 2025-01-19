import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { ChevronLeft, ChevronRight } from 'react-native-feather';

export const ImageNavigationBar = ({ 
  currentImageIndex, 
  totalImages, 
  handleImageSwipe,
  style 
}) => {
  const insets = useSafeAreaInsets();
  
  if (totalImages <= 1) return null;

  const handlePress = (direction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    handleImageSwipe(direction);
  };

  const progress = ((currentImageIndex + 1) / totalImages) * 100;

  return (
    <Animated.View style={[styles.container, { paddingBottom: insets.bottom }, style]}>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="dark"
        blurAmount={20}
      />
      
      {/* Navigation Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentImageIndex === 0 && styles.disabledButton,
          ]}
          onPress={() => handlePress('prev')}
          disabled={currentImageIndex === 0}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ChevronLeft 
            stroke={currentImageIndex === 0 ? "#666" : "#fff"} 
            width={24} 
            height={24} 
          />
        </TouchableOpacity>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            <Text style={styles.currentIndex}>{currentImageIndex + 1}</Text>
            <Text style={styles.totalImages}> / {totalImages}</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentImageIndex === totalImages - 1 && styles.disabledButton,
          ]}
          onPress={() => handlePress('next')}
          disabled={currentImageIndex === totalImages - 1}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ChevronRight 
            stroke={currentImageIndex === totalImages - 1 ? "#666" : "#fff"} 
            width={24} 
            height={24} 
          />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            { width: `${progress}%` }
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  navigationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.5,
  },
  counterContainer: {
    flex: 1,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  currentIndex: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  totalImages: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '400',
  },
  progressContainer: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
});