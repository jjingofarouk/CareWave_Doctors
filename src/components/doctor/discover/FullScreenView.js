// FullscreenView.js
import React from 'react';
import { Animated, SafeAreaView, ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import { FullscreenHeader } from './FullScreenHeader';
import { ImageGallery } from './ImageGallery';
import { CaseDetails } from './CaseDetails';
import { StyleSheet, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export const FullscreenView = ({
  selectedCase,
  isFullscreenView,
  animation,
  onClose,
  onNavigate,
  filteredCases,
  currentImageIndex,
  setCurrentImageIndex,
  onImageSwipe,
  isImageLoading,
  setIsImageLoading,
  selectedSection,
  setSelectedSection,
  fullscreenScrollRef
}) => {
  if (!selectedCase || !isFullscreenView) return null;

  return (
    <Animated.View
      style={[
        styles.fullscreenContainer,
        {
          opacity: animation,
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [SCREEN_HEIGHT, 0],
            }),
          }],
        },
      ]}
    >
      <SafeAreaView style={styles.fullscreenContent}>
        <FullscreenHeader
            selectedCase={selectedCase}
            onClose={onClose}
          onNavigate={onNavigate}
          filteredCases={filteredCases}
        />

        <ScrollView
          ref={fullscreenScrollRef}
          style={styles.fullscreenScroll}
          showsVerticalScrollIndicator={false}
        >
<ImageGallery
  selectedCase={selectedCase}
  currentImageIndex={currentImageIndex}
  setCurrentImageIndex={setCurrentImageIndex}
  onImageSwipe={onImageSwipe}  // Changed from handleImageSwipe
  setIsImageLoading={setIsImageLoading}
/>
          {isImageLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0066cc" />
            </View>
          )}
          <CaseDetails
            selectedCase={selectedCase}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  fullscreenContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  fullscreenScroll: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  loadingContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.3,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 12,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },

  headerButton: {
    padding: 8,
    borderRadius: 8,
  },

  // Image Gallery Styles
  galleryContainer: {
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: '#000000',
  },

  image: {
    width: SCREEN_WIDTH,
    height: '100%',
    resizeMode: 'contain',
  },

  imageIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  indicatorDotActive: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  // Case Details Styles
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },

  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A4A4A',
    marginBottom: 24,
  },

  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },

  tabActive: {
    backgroundColor: '#007AFF',
  },

  tabText: {
    fontSize: 15,
    color: '#4A4A4A',
  },

  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Navigation Controls
  navigationControls: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },

  navigationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});