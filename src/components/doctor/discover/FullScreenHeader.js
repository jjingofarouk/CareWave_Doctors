import React from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';

export const FullscreenHeader = ({
  selectedCase,
  onClose,
  onNavigate,
  filteredCases,
}) => {
  const insets = useSafeAreaInsets();
  const currentIndex = filteredCases.findIndex(item => item.id === selectedCase.id);
  const isFirstCase = currentIndex === 0;
  const isLastCase = currentIndex === filteredCases.length - 1;

  // Progress indicator
  const progress = ((currentIndex + 1) / filteredCases.length) * 100;

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>

      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Left Section */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>

        {/* Center Section */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {selectedCase.title}
          </Text>
          <Text style={styles.subtitle}>
            {`${currentIndex + 1} of ${filteredCases.length}`}
          </Text>
        </View>

        {/* Right Section */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[
              styles.navButton,
              isFirstCase && styles.navButtonDisabled
            ]}
            onPress={() => onNavigate('prev')}
            disabled={isFirstCase}
          >
            <Icon 
              name="chevron-back" 
              size={24} 
              color={isFirstCase ? '#999' : '#000'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.navButton,
              isLastCase && styles.navButtonDisabled
            ]}
            onPress={() => onNavigate('next')}
            disabled={isLastCase}
          >
            <Icon 
              name="chevron-forward" 
              size={24} 
              color={isLastCase ? '#999' : '#000'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 88,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  titleWrapper: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  progressContainer: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
});