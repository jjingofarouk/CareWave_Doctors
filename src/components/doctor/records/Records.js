import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  coralCloud: '#DFE4E5',
  oceanObsidian: '#002432',
  tealTide: '#27C7B8',
  tangerineTango: '#F78837',
};

// Custom hook for animation
const useAnimatedValue = (initialValue) => {
  const [animation] = useState(new Animated.Value(initialValue));
  return animation;
};

// Reusable animated card component
const AnimatedCard = ({ item, index, onPress }) => {
  const scale = useAnimatedValue(1);
  const opacity = useAnimatedValue(0);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 100),
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const animatedStyle = {
    transform: [{ scale }],
    opacity,
  };

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(item)}
        style={styles.cardTouchable}
      >
        <SharedElement id={`item.${item.id}.image`}>
          <ImageBackground
            source={item.backgroundImage}
            style={styles.cardBackground}
            imageStyle={styles.cardImage}
          >
            <LinearGradient
              colors={['rgba(0, 36, 50, 0)', 'rgba(0, 36, 50, 0.95)']}
              style={styles.gradient}
            >
              <View style={styles.contentContainer}>
                <View style={styles.glassEffect}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={30}
                    color={COLORS.tealTide}
                  />
                  <Text style={styles.cardTitle}>{item.text}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </SharedElement>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Records = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);

  const recordOptions = [
    {
      id: '1',
      to: 'PHistory',
      text: 'Medical History',
      subtitle: 'View your complete medical timeline',
      icon: 'hospital-box',
      backgroundImage: require('./assets/stethoscope.jpg'),
    },
    {
      id: '2',
      to: 'Lab Tests & Results',
      text: 'Lab Results',
      subtitle: 'Access all your test results',
      icon: 'test-tube',
      backgroundImage: require('./assets/lab.jpg'),
    },
    {
      id: '3',
      to: 'Visit History',
      text: 'Visit History',
      subtitle: 'Track your hospital visits',
      icon: 'calendar-clock',
      backgroundImage: require('./assets/visits.jpg'),
    },
    {
      id: '4',
      to: 'Your Vital Signs',
      text: 'Vital Signs',
      subtitle: 'Manage Your Patients\' Vital Signs',
      icon: 'file-document',
      backgroundImage: require('./assets/docs.jpg'),
    },
    {
      id: '5',
      to: 'Prescriptions',
      text: 'Prescriptions',
      subtitle: 'Manage Your Patients\' Prescriptions',
      icon: 'file-document',
      backgroundImage: require('./assets/docs.jpg'),
    },
    {
      id: '6',
      to: 'Your Consultation Notes',
      text: 'Clinical Notes',
      subtitle: 'Hub to Manage Clinical Notes',
      icon: 'file-document',
      backgroundImage: require('./assets/docs.jpg'),
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const handleCardPress = (item) => {
    navigation.navigate(item.to, { item });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('./consultation.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical{'\n'}Records</Text>
        <TouchableOpacity style={styles.searchButton}>
          <MaterialCommunityIcons name="magnify" size={24} color={COLORS.tealTide} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {recordOptions.map((item, index) => (
            <AnimatedCard
              key={item.id}
              item={item}
              index={index}
              onPress={handleCardPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.coralCloud,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.coralCloud,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.oceanObsidian,
    lineHeight: 40,
  },
  searchButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: `${COLORS.tealTide}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: Dimensions.get('window').width * 0.44,
    marginBottom: 20,
  },
  cardTouchable: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.oceanObsidian,
    elevation: 5,
    shadowColor: COLORS.oceanObsidian,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardBackground: {
    height: 200,
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: 20,
  },
  gradient: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 15,
  },
  glassEffect: {
    backgroundColor: `${COLORS.coralCloud}15`,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backdropFilter: 'blur(10px)',
      },
      android: {
        backgroundColor: `${COLORS.coralCloud}20`,
      },
    }),
    borderWidth: 1,
    borderColor: `${COLORS.tealTide}30`,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.coralCloud,
    marginTop: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.tealTide,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Records;