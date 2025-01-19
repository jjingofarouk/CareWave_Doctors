import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window'); // Get the screen width

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.carouselItem, { width }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      {/* Dots */}
      <View style={styles.dotContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={goToPreviousSlide}>
          <Text style={styles.navText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextSlide}>
          <Text style={styles.navText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#004C54',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54',
  },
});

export default Carousel;
