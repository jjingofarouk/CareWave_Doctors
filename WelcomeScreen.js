import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Animated, 
  FlatList,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const insets = useSafeAreaInsets();

  // Telemedicine color scheme
  const colorScheme = {
    primary: '#004C54', // Deep Teal for a calm and professional feel
    secondary: '#009688', // Medium Teal for accents and buttons
    accent: '#FF7043', // Coral Orange for interactive elements
    background: ['#F5F7FA', '#E0F7FA'], // Light Gray with a soft blue gradient for the background, which is soothing
    text: '#333333', // Dark Gray for text to ensure readability
  };

  const carouselItems = [
    {
      lottieSource: require('./animations/consultation.json'),
      title: 'Efficient Consultations',
      description: 'Connect with patients instantly through secure video calls, offering timely and effective consultations for various medical needs.',
      color: colorScheme.primary
    },
    {
      lottieSource: require('./animations/video-call.json'),
      title: 'Clinical Tools',
      description: 'Access advanced clinical tools directly during video consultations, enabling precise diagnostics and decision-making without leaving your practice.',
      color: colorScheme.secondary
    },
    {
      lottieSource: require('./animations/messaging.json'),
      title: 'Secure Messaging',
      description: 'Engage in private, encrypted conversations with your patients, allowing for follow-up care, prescription updates, and ongoing health management.',
      color: colorScheme.accent
    },
    {
      lottieSource: require('./animations/scheduling.json'),
      title: 'Effortless Scheduling',
      description: 'Simplify your appointment booking with AI-powered tools that automatically adjust to your availability, reducing administrative time and maximizing patient access.',
      color: colorScheme.primary
    },
    {
      lottieSource: require('./animations/security.json'),
      title: 'Top-Notch Security',
      description: 'Protect sensitive patient data with end-to-end encryption and strict privacy measures, ensuring your practice adheres to the highest security standards.',
      color: colorScheme.secondary
    },
    {
      lottieSource: require('./animations/health-records.json'),
      title: 'Comprehensive Health Records',
      description: 'Store and access all patient health records in one secure digital space, from medical histories to test results, making information sharing seamless and efficient.',
      color: colorScheme.accent
    },
    {
      lottieSource: require('./animations/prescription-management.json'),
      title: 'Efficient Prescription Management',
      description: 'Generate and send digital prescriptions with ease, reducing errors, streamlining workflows, and improving medication adherence for your patients.',
      color: colorScheme.secondary
    },
    {
      lottieSource: require('./animations/billing-payment.json'),
      title: 'Integrated Billing & Payments',
      description: 'Automate billing processes and offer your patients convenient, secure online payment options, ensuring smooth financial transactions and minimizing administrative overhead.',
      color: colorScheme.secondary
    }
  ];

  useEffect(() => {
    // Animated entry sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(newIndex);
  };

  const renderCarouselItem = ({ item }) => (
    <Animated.View 
      style={[ 
        styles.carouselItemContainer, 
        { 
          opacity: fadeAnim, 
          transform: [{ scale: scaleAnim }], 
          width: screenWidth 
        }
      ]}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <LottieView
          source={item.lottieSource}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
        <Text style={[styles.titleText, { color: item.color }]}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </BlurView>
    </Animated.View>
  );

  const handleSignUp = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => navigation.navigate('SignUp'));
  };

  const handleLogin = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => navigation.navigate('Login'));
  };

  return (
    <LinearGradient
      colors={colorScheme.background}
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
{/* Logo, App Name, and Tagline */}
<View style={styles.logoContainer}>
  <View style={styles.logoWrapper}>
    <Image source={require('./assets/logo.png')} style={styles.logo} />
  </View>
  
  <View style={styles.textContainer}>
    <Text style={styles.appNameText}>CareWave</Text> {/* App Name */}
    <Text style={styles.taglineText}>Health Can't Wait</Text> {/* Tagline */}
  </View>
</View>


      <FlatList
        ref={flatListRef}
        data={carouselItems}
        renderItem={renderCarouselItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.paginationContainer}>
        {carouselItems.map((_, index) => {
          const isActive = currentIndex === index;

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: isActive ? '#FF7043' : '#002432', // Active: #FF7043, Inactive: #002432
                  opacity: isActive ? 1 : 0.6, // Inactive dots are slightly faded
                },
              ]}
            />
          );
        })}
      </View>

      {/* Sign Up and Login Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.signUpButton, { backgroundColor: colorScheme.secondary }]} 
          onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.loginButton, { borderColor: colorScheme.secondary }]} 
          onPress={handleLogin}>
          <Text style={[styles.buttonTextLogin]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row', // Horizontal alignment of logo and text
    alignItems: 'center', // Center align vertically
    marginBottom: 50, // Add more spacing below the logo section
    width: '100%',
    paddingHorizontal: 20, // Ensure spacing from screen edges
  },
  
  logo: {
    width: 120, // Larger size for prominence
    height: 120, // Match height to width for a circular shape
    borderRadius: 60, // Ensure a perfect circle
    backgroundColor: '#004C54', // Optional: Background color for contrast
    borderWidth: 2, // Optional: Add a border
    borderColor: '#009688', // Teal border color for a refined look
  },
  
  appNameText: {
    fontSize: 40, // Larger font for app name
    fontWeight: 'bold',
    color: '#004C54',
    marginLeft: 20, // More spacing between the logo and text
    textAlign: 'left', // Align text to the left
    flex: 1, // Allow text to take available space
  },
  
  taglineText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002432',
    textAlign: 'left', // Align text to the left
    marginTop: 5,
    marginLeft: 20, // Keep aligned with app name
    letterSpacing: 1,
    fontStyle: 'italic', // Adds a sleek, modern touch

  },

  carouselItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  blurContainer: {
    width: '90%',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 36, 50, 0.75)',
    overflow: 'hidden',
    marginBottom: 30,
  },
  lottieAnimation: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  descriptionText: {
    fontSize: 16,
    color: '#B2D7D6',
    textAlign: 'center',
    opacity: 0.9,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 30,
    paddingHorizontal: 10, // Space around the dots
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8, // More spacing between dots
    backgroundColor: '#FF7043',
    elevation: 4,
    opacity: 0.6,
    transition: 'all 0.3s ease-in-out', // Smooth transition
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 6,

  },
  signUpButton: {
    backgroundColor: '#FF7043', 

  },
  loginButton: {
    backgroundColor: '#FF7043',

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default WelcomeScreen;
