// ImageGallery.js
import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { ImageItem } from './ImageItem';
import { ImageNavigationBar } from './ImageNavigationBar';
import { styles } from './FullStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ImageGallery = ({
  selectedCase,
  currentImageIndex,
  setCurrentImageIndex,
  handleImageSwipe,
  setIsImageLoading
}) => {
  if (!selectedCase) return null;
  
  const images = Array.isArray(selectedCase.imageUrl) 
    ? selectedCase.imageUrl 
    : [selectedCase.imageUrl];

  return (
    <View style={styles.fullscreenImageContainer}>
      <FlatList
        horizontal
        data={images}
        keyExtractor={(item, index) => `image-${index}`}
        renderItem={({ item }) => (
          <ImageItem 
            imageUrl={item} 
            setIsImageLoading={setIsImageLoading}
          />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const direction = xOffset > SCREEN_WIDTH * currentImageIndex ? 'next' : 'prev';
          handleImageSwipe(direction);
        }}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setCurrentImageIndex(newIndex);
        }}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
      <ImageNavigationBar
        currentImageIndex={currentImageIndex}
        totalImages={images.length}
        handleImageSwipe={handleImageSwipe}
      />
    </View>
  );
};
