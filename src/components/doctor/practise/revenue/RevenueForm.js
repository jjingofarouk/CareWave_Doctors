import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Platform,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomSelect from '../../../utils/CustomSelect';
import { PaymentSection } from './PaymentSection';
import { InsuranceSection } from './InsuranceSection';
import { PatientSection } from './PatientSection';
import { OperationalSection } from './OperationalSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const RevenueForm = ({ revenue, setRevenue, handleAddRevenue, currencySymbol }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef(null);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [shakeAnim] = useState(new Animated.Value(0));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    payment: {
      method: '',
      status: '',
    },
    insurance: {
      provider: '',
      claimNumber: '',
      copayAmount: '',
    },
    patient: {
      id: '',
      name: '',
      type: '',
    },
    operational: {
      providerName: '',
      duration: '',
      appointmentTime: '',
      showTimePicker: false,
    },
  });

  const medicalServices = [
    { label: 'Initial Consultation', value: 'initial_consultation' },
    { label: 'Follow-up Visit', value: 'follow_up' },
    { label: 'Physical Examination', value: 'physical_exam' },
    { label: 'Diagnostic Testing', value: 'diagnostic_testing' },
    { label: 'Preventive Care', value: 'preventive_care' },
    { label: 'Vaccination', value: 'vaccination' },
    { label: 'Minor Surgery', value: 'minor_surgery' },
    { label: 'Specialist Referral', value: 'specialist_referral' },
    { label: 'Medical Certificate', value: 'medical_certificate' }
  ];

  const sections = [
    {
      title: 'Patient Information',
      icon: 'account',
      component: (
        <PatientSection
          patient={formData.patient}
          setPatient={(patient) => setFormData({ ...formData, patient })}
        />
      ),
    },
    {
      title: 'Service Selection',
      icon: 'medical-bag',
      component: (
        <View style={styles.sectionContent}>
          <CustomSelect
            options={medicalServices}
            placeholder="Select a service"
            onSelect={(option) => setRevenue({ ...revenue, service: option.value })}
            value={medicalServices.find(service => service.value === revenue.service)}
            label="Service"
          />
        </View>
      ),
    },
    {
      title: 'Payment Details',
      icon: 'credit-card',
      component: (
        <View style={styles.sectionContent}>
          <PaymentSection
            payment={formData.payment}
            setPayment={(payment) => setFormData({ ...formData, payment })}
          />
          {formData.payment.method === 'insurance' && (
            <InsuranceSection
              insurance={formData.insurance}
              setInsurance={(insurance) => setFormData({ ...formData, insurance })}
              show={true}
            />
          )}
        </View>
      ),
    },
    {
      title: 'Amount & Date',
      icon: 'calendar-clock',
      component: (
        <View style={styles.sectionContent}>
          <View style={styles.amountContainer}>
            <MaterialCommunityIcons name="currency-usd" size={24} color="#6B7280" />
            <TextInput
              style={styles.amountInput}
              placeholder={`Amount (${currencySymbol})`}
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={revenue.amount}
              onChangeText={(text) => setRevenue({ ...revenue, amount: text })}
            />
          </View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialCommunityIcons name="calendar" size={24} color="#6B7280" />
            <Text style={styles.dateButtonText}>
              {revenue.date || 'Select Date'}
            </Text>
          </TouchableOpacity>
          {(showDatePicker || Platform.OS === 'ios') && (
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={revenue.date ? new Date(revenue.date) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    setRevenue({ ...revenue, date: selectedDate.toISOString().split('T')[0] });
                  }
                }}
                style={styles.datePicker}
              />
            </View>
          )}
        </View>
      ),
    },
    {
      title: 'Operational Details',
      icon: 'cog',
      component: (
        <OperationalSection
          operational={formData.operational}
          setOperational={(operational) => setFormData({ ...formData, operational })}
        />
      ),
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: progressAnimation } } }],
    { useNativeDriver: false }
  );

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, (sections.length - 1) * SCREEN_WIDTH],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const navigateToStep = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentStep(index);
    }
  };

  const validateAndSubmit = () => {
    if (!revenue.service || !revenue.amount || !revenue.date ||
        !formData.payment.method || !formData.patient.id) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }
    
    const enhancedRevenue = {
      ...revenue,
      ...formData,
    };
    
    handleAddRevenue(enhancedRevenue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Revenue Entry</Text>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>
      </View>

      <View style={styles.stepsContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.stepButton,
              currentStep === index && styles.activeStep,
            ]}
            onPress={() => navigateToStep(index)}
          >
            <MaterialCommunityIcons
              name={section.icon}
              size={24}
              color={currentStep === index ? '#4F46E5' : '#6B7280'}
            />
            <Text
              style={[
                styles.stepText,
                currentStep === index && styles.activeStepText,
              ]}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {sections.map((section, index) => (
          <View
            key={index}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.component}
          </View>
        ))}
      </ScrollView>

      <View style={styles.navigationButtons}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateToStep(currentStep - 1)}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#4F46E5" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.navButton, styles.primaryButton]}
          onPress={() => {
            if (currentStep === sections.length - 1) {
              validateAndSubmit();
            } else {
              navigateToStep(currentStep + 1);
            }
          }}
        >
          <LinearGradient
            colors={['#4F46E5', '#4338CA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.primaryButtonText}>
              {currentStep === sections.length - 1 ? 'Submit' : 'Next'}
            </Text>
            <MaterialCommunityIcons
              name={currentStep === sections.length - 1 ? 'check' : 'arrow-right'}
              size={24}
              color="#FFFFFF"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  stepButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
  },
  activeStep: {
    backgroundColor: '#EEF2FF',
  },
  stepText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeStepText: {
    color: '#4F46E5',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  section: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
  },
  sectionContent: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  amountInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#374151',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  datePickerContainer: {
    marginTop: 16,
    backgroundColor: '#002432',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  datePicker: {
    height: 200,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  navButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  primaryButton: {
    flex: 1,
    marginLeft: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default RevenueForm;