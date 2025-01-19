import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  StatusBar,
  StyleSheet, 
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
  BackHandler
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSelect from '../../utils/CustomSelect';

const { width } = Dimensions.get('window');
const SECTION_WIDTH = width * 0.85;

const PersonalInfo = ({ route }) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState(route?.params?.initialData || {});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Handle hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleGoBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  const handleGoBack = () => {
    Alert.alert(
      'Go Back',
      'Are you sure you want to go back? Any unsaved changes will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes, Go Back',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSelect = (field, item) => {
    handleInputChange(field, item.value);
  };

  const scrollToSection = (index) => {
    scrollViewRef.current?.scrollTo({
      x: index * (SECTION_WIDTH + 20),
      animated: true
    });
    setCurrentSectionIndex(index);
  };

  const validateFields = () => {
    const requiredFields = ['name', 'dateOfBirth', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Information',
        `Please fill in the following required fields: ${missingFields.join(', ')}`,
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleComplete = () => {
    if (validateFields()) {
      // Navigate to next screen with form data
      navigation.navigate('NextScreen', { personalInfo: formData });
    }
  };

  const InputField = ({ icon, label, type, options, field, placeholder, required }) => (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Icon name={icon} size={20} color="#27C7B8" />
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>
      {type === 'select' ? (
        <CustomSelect
          options={options}
          placeholder={`Select ${label}`}
          onSelect={(item) => handleSelect(field, item)}
          label={label}
          containerStyle={styles.selectContainer}
          value={formData[field]}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={formData[field] || ''}
          onChangeText={(text) => handleInputChange(field, text)}
        />
      )}
    </View>
  );

  const fields = [
    {
      label: 'Prefix',
      icon: 'alphabetical',
      type: 'select',
      field: 'prefix',
      options: [
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Mrs.', value: 'Mrs.' },
        { label: 'Miss', value: 'Miss' },
        { label: 'Dr.', value: 'Dr.' },
        { label: 'Prof.', value: 'Prof.' },
      ]
    },
    {
      label: 'Full Name',
      icon: 'account',
      type: 'input',
      field: 'name',
      placeholder: 'e.g., John Kagwa',
      required: true
    },
    {
      label: 'Date of Birth',
      icon: 'calendar',
      type: 'input',
      field: 'dateOfBirth',
      placeholder: 'YYYY-MM-DD',
      required: true
    },
    {
      label: 'Gender',
      icon: 'gender-male-female',
      type: 'select',
      field: 'gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Intersex', value: 'intersex' },
        { label: 'Prefer not to say', value: 'prefer_not_to_say' }
      ]
    },
    {
      label: 'Occupation',
      icon: 'briefcase',
      type: 'select',
      field: 'occupation',
      options: [
        { label: 'Farmer', value: 'farmer' },
        { label: 'Teacher', value: 'teacher' }
      ]
    },
    {
      label: 'Marital Status',
      icon: 'heart',
      type: 'select',
      field: 'maritalStatus',
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Betrothed', value: 'betrothed' }
      ]
    },
    {
      label: 'Next of Kin',
      icon: 'account-multiple',
      type: 'input',
      field: 'nok',
      placeholder: 'e.g., John Kagwa'
    },
    {
      label: 'Nationality',
      icon: 'passport',
      type: 'select',
      field: 'nationality',
      options: [
        { label: 'Ugandan', value: 'Ugandan' },
        { label: 'Kenyan', value: 'Kenyan' },
        { label: 'Other', value: 'Other' }
      ]
    },
    {
      label: 'Tribe',
      icon: 'account-group',
      type: 'select',
      field: 'tribe',
      options: [
        { label: 'Muganda', value: 'muganda' },
        { label: 'Musongora', value: 'musongora' },
        { label: 'Munyarwanda', value: 'munyarwanda' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      label: 'Religion',
      icon: 'church',
      type: 'select',
      field: 'religion',
      options: [
        { label: 'Catholic', value: 'catholic' },
        { label: 'Anglican', value: 'anglican' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      label: 'District',
      icon: 'map-marker',
      type: 'select',
      field: 'address',
      options: [
        { label: 'Abim', value: 'abim' },
        { label: 'Adjumani', value: 'adjumani' },
        { label: 'Agago', value: 'agago' },
        { label: 'Zombo', value: 'zombo' }
      ]
    },
    {
      label: 'Phone Number',
      icon: 'phone',
      type: 'input',
      field: 'phone',
      placeholder: '+256 123 456 789',
      required: true
    },
    {
      label: 'Email Address',
      icon: 'email',
      type: 'input',
      field: 'email',
      placeholder: 'patient@example.com',
      required: true
    }
  ];

  const sections = [
    {
      title: 'Basic Information',
      fields: ['prefix', 'name', 'dateOfBirth', 'gender']
    },
    {
      title: 'Contact Information',
      fields: ['phone', 'email', 'address']
    },
    {
      title: 'Personal Background',
      fields: ['nationality', 'tribe', 'religion']
    },
    {
      title: 'Additional Details',
      fields: ['occupation', 'maritalStatus', 'nok']
    }
  ];

  const fieldMap = fields.reduce((acc, field) => {
    acc[field.field] = field;
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.safeArea}>
            <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navigationHeader}>
          <TouchableOpacity 
            onPress={handleGoBack}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="#002432" />
          </TouchableOpacity>
          <Text style={styles.mainTitle}>Personal Information</Text>
        </View>
        <Text style={styles.mainSubtitle}>Swipe horizontally to navigate sections</Text>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SECTION_WIDTH + 20}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / (SECTION_WIDTH + 20)
          );
          setCurrentSectionIndex(newIndex);
        }}
      >
        {sections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionCount}>
                {sectionIndex + 1} of {sections.length}
              </Text>
            </View>
            <ScrollView 
              style={styles.sectionScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.sectionContent}>
                {section.fields.map(fieldName => {
                  const fieldConfig = fieldMap[fieldName];
                  return fieldConfig ? (
                    <InputField key={fieldName} {...fieldConfig} />
                  ) : null;
                })}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {sections.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                currentSectionIndex === index && styles.paginationDotActive
              ]}
              onPress={() => scrollToSection(index)}
            />
          ))}
        </View>
        
        <View style={styles.navigationButtons}>
          {currentSectionIndex > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.prevButton]}
              onPress={() => scrollToSection(currentSectionIndex - 1)}
            >
              <Icon name="chevron-left" size={24} color="#002432" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentSectionIndex < sections.length - 1 ? (
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={() => scrollToSection(currentSectionIndex + 1)}
            >
              <Text style={styles.navButtonText}>Next</Text>
              <Icon name="chevron-right" size={24} color="#002432" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.navButton, styles.doneButton]}
              onPress={handleComplete}
            >
              <Text style={styles.doneButtonText}>Done</Text>
              <Icon name="check" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE4E5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DFE4E5',
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#002432',
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 44,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  section: {
    width: SECTION_WIDTH,
    height: '100%',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#002432',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DFE4E5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#002432',
  },
  sectionCount: {
    fontSize: 14,
    color: '#666666',
    backgroundColor: '#DFE4E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sectionScroll: {
    flex: 1,
  },
  sectionContent: {
    padding: 20,
    gap: 16,
  },
  inputContainer: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#002432',
    marginLeft: 8,
  },
  required: {
    color: '#F78837',
  },
  input: {
    backgroundColor: '#DFE4E5',
    borderWidth: 1,
    borderColor: '#DFE4E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#002432',
    height: 56,
  },
  selectContainer: {
    backgroundColor: '#DFE4E5',
    borderWidth: 1,
    borderColor: '#DFE4E5',
    borderRadius: 12,
    height: 56,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#DFE4E5',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DFE4E5',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#27C7B8',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFE4E5',
  },
  prevButton: {
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
  },
  doneButton: {
    backgroundColor: '#27C7B8',
    borderColor: '#27C7B8',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002432',
    marginHorizontal: 8,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    backgroundColor: '#DFE4E5',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DFE4E5',
  },
});

export default PersonalInfo;