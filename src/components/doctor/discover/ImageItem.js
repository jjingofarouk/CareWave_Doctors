import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { BlurView } from '@react-native-community/blur';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DOUBLE_TAP_DELAY = 300;
const MIN_SCALE = 0.5;
const MAX_SCALE = 5;

export const ImageItem = ({ imageUrl, setIsImageLoading, onZoomChange }) => {
  // Animated Values
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Refs for gesture state
  const baseScale = useRef(1);
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);
  const lastTap = useRef(0);
  const doubleTapTimeout = useRef(null);

  // Component state
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => {
      const screenRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
      const imageRatio = width / height;
      
      let displayWidth, displayHeight;
      if (imageRatio > screenRatio) {
        displayWidth = SCREEN_WIDTH;
        displayHeight = SCREEN_WIDTH / imageRatio;
      } else {
        displayHeight = SCREEN_HEIGHT;
        displayWidth = SCREEN_HEIGHT * imageRatio;
      }

      setImageSize({
        width: displayWidth,
        height: displayHeight,
        originalWidth: width,
        originalHeight: height,
        ratio: imageRatio,
      });

      baseScale.current = displayWidth / width;
      lastScale.current = baseScale.current;
      scale.setValue(baseScale.current);
    });

    return () => {
      if (doubleTapTimeout.current) {
        clearTimeout(doubleTapTimeout.current);
      }
    };
  }, [imageUrl]);

  // Gesture Handlers
  const pinchRef = useRef();
  const panRef = useRef();

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const constrainTranslation = (value, bound) => {
    return Math.min(Math.max(-bound, value), bound);
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const pinchScale = event.nativeEvent.scale;
      const newScale = lastScale.current * pinchScale;
      const constrainedScale = Math.min(
        Math.max(baseScale.current * MIN_SCALE, newScale),
        baseScale.current * MAX_SCALE
      );
      
      lastScale.current = constrainedScale;
      const isNowZoomed = constrainedScale > baseScale.current;
      
      if (isZoomed !== isNowZoomed) {
        setIsZoomed(isNowZoomed);
        onZoomChange?.(isNowZoomed);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      Animated.spring(scale, {
        toValue: constrainedScale,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();
    }
  };

  const onPanStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newTranslateX = lastTranslateX.current + event.nativeEvent.translationX;
      const newTranslateY = lastTranslateY.current + event.nativeEvent.translationY;

      const currentScale = lastScale.current;
      const boundsX = ((imageSize.width * currentScale) - SCREEN_WIDTH) / 2;
      const boundsY = ((imageSize.height * currentScale) - SCREEN_HEIGHT) / 2;

      lastTranslateX.current = constrainTranslation(newTranslateX, boundsX);
      lastTranslateY.current = constrainTranslation(newTranslateY, boundsY);

      Animated.spring(translateX, {
        toValue: lastTranslateX.current,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();

      Animated.spring(translateY, {
        toValue: lastTranslateY.current,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();
    }
  };

  const handleDoubleTap = async (event) => {
    const now = Date.now();
    
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      const currentScale = lastScale.current;
      const targetScale = currentScale > baseScale.current 
        ? baseScale.current 
        : baseScale.current * 2;

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      Animated.parallel([
        Animated.spring(scale, {
          toValue: targetScale,
          useNativeDriver: true,
          bounciness: 0,
          speed: 20,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
          speed: 20,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
          speed: 20,
        }),
      ]).start(() => {
        lastScale.current = targetScale;
        lastTranslateX.current = 0;
        lastTranslateY.current = 0;
        setIsZoomed(targetScale > baseScale.current);
        onZoomChange?.(targetScale > baseScale.current);
      });
    }
    
    lastTap.current = now;
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        ref={panRef}
        simultaneousHandlers={pinchRef}
        onGestureEvent={onPanEvent}
        onHandlerStateChange={onPanStateChange}
        minDist={10}
        enabled={isZoomed}
      >
        <Animated.View style={styles.gestureContainer}>
          <PinchGestureHandler
            ref={pinchRef}
            simultaneousHandlers={panRef}
            onGestureEvent={onPinchEvent}
            onHandlerStateChange={onPinchStateChange}
          >
            <Animated.View style={styles.imageContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleDoubleTap}
                style={styles.touchable}
              >
                <SharedElement id={`image.${imageUrl}`}>
                  <Animated.Image
                    source={{ uri: imageUrl }}
                    style={[
                      styles.image,
                      {
                        width: imageSize.width,
                        height: imageSize.height,
                        opacity,
                        transform: [
                          { scale },
                          { translateX },
                          { translateY },
                        ],
                      },
                    ]}
                    resizeMode="contain"
                    onLoadStart={() => {
                      setIsImageLoading(true);
                      opacity.setValue(0);
                    }}
                    onLoadEnd={() => {
                      setIsImageLoading(false);
                      Animated.timing(opacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                      }).start();
                    }}
                  />
                </SharedElement>
              </TouchableOpacity>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  gestureContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'transparent',
  },
});