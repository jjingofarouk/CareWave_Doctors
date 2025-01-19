import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width

const Marquee = ({ tips, duration = 10000 }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    // Function to cycle through tips
    const cycleTips = () => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    };

    // Start the marquee animation
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration, // Duration determines the speed of the animation
        useNativeDriver: true,
      })
    );

    animation.start();

    // Change the tip at the end of each cycle
    const interval = setInterval(cycleTips, duration);

    // Cleanup animation and interval
    return () => {
      animation.stop();
      clearInterval(interval);
    };
  }, [duration, tips.length]);

  // Calculate animation transformation for the marquee
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, -width], // Moves text from right to left
  });

  return (
    <View style={styles.marqueeContainer}>
      <Animated.Text
        style={[
          styles.marqueeText,
          { transform: [{ translateX }] }, // Apply animation
        ]}
      >
        {tips[currentTipIndex]}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  marqueeContainer: {
    height: 40, // Fixed height for the marquee
    justifyContent: 'center',
    overflow: 'hidden', // Hide overflowing text
    backgroundColor: '#27c7b8',
    borderRadius: 5,
    marginVertical: 10,
  },
  marqueeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Marquee;
