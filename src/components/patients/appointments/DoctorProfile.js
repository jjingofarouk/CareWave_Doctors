import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,

  StyleSheet,
  Switch,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

const DoctorProfile = ({ initialData = {} }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [profileData, setProfileData] = useState(() => {
    return {
      personalInfo: {
        fullName: '',
        profilePicture: null,
        title: '',
        specialty: '',
        languages: [],
        ...initialData.personalInfo,
      },
      credentials: {
        education: {
          degree: '',
          university: '',
          graduationYear: '',
          ...initialData.credentials?.education,
        },
        yearsExperience: '',
        certifications: [],
        awards: [],
        publications: [],
        ...initialData.credentials,
      },
      professionalDetails: {
        specialties: [],
        subSpecialties: [],
        workplace: '',
        consultationType: {
          inPerson: true,
          virtual: false,
        },
        conditions: [],
        procedures: [],
        ...initialData.professionalDetails,
      },
      availability: {
        schedule: [],
        nextAvailable: '',
        bookingOptions: [],
        days: [],
        hours: '',
        ...initialData.availability,
      },
      reviews: {
        averageRating: 0,
        totalReviews: 0,
        testimonials: [],
        recommendationRate: '',
        ...initialData.reviews,
      },
      clinicDetails: {
        location: {
          address: '',
          coordinates: null,
        },
        contact: {
          phone: '',
          email: '',
        },
        telemedicineInstructions: '',
        ...initialData.clinicDetails,
      },
      additionalInfo: {
        insurancePlans: [],
        treatmentApproach: '',
        ...initialData.additionalInfo,
      },
      addressInfo: {
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        ...initialData.addressInfo,
      },
    };
  });

  const renderInputField = (label, value, onChangeText, multiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor="#a0a0a0" // Add your desired color here

      />
    </View>
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          profilePicture: result.assets[0].uri,
        },
      }));
    }
  };

  const renderArrayInput = (label, array, setArray) => (
    <View style={styles.arrayInputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.chipContainer}>
        {array.map((item, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
            <TouchableOpacity
              onPress={() => {
                const newArray = [...array];
                newArray.splice(index, 1);
                setArray(newArray);
              }}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.addItemInput}
          placeholder={`Add ${label.toLowerCase()}`}
          placeholderTextColor="#a0a0a0" // Add your desired color here

          onSubmitEditing={(event) => {
            const text = event.nativeEvent.text;
            if (text.trim()) {
              setArray([...array, text.trim()]);
              event.target.clear();
            }
          }}
          returnKeyType="done"
        />
      </View>
    </View>
  );

  const renderPreviewSection = (title, children) => (
    <View style={styles.previewSection}>
      <Text style={styles.previewSectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderPreview = () => (
    <ScrollView style={styles.previewContainer}>
      {/* Header Section */}
      <View style={styles.previewHeader}>
        {profileData.personalInfo.profilePicture ? (
          <Image
            source={{ uri: profileData.personalInfo.profilePicture }}
            style={styles.previewProfileImage}
          />
        ) : (
          <View style={[styles.previewProfileImage, styles.imagePlaceholder]}>
            <MaterialIcons name="person" size={40} color="#666" />
          </View>
        )}
        <View style={styles.previewHeaderInfo}>
          <Text style={styles.previewName}>{profileData.personalInfo.fullName}</Text>
          <Text style={styles.previewTitle}>{profileData.personalInfo.title}</Text>
          <Text style={styles.previewSpecialty}>{profileData.personalInfo.specialty}</Text>
          <View style={styles.previewRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome
                key={star}
                name={star <= profileData.reviews.averageRating ? 'star' : 'star-o'}
                size={20}
                color="#FFD700"
              />
            ))}
            <Text style={styles.ratingText}>
              {profileData.reviews.averageRating.toFixed(1)} ({profileData.reviews.totalReviews})
            </Text>
          </View>
        </View>
      </View>

      {/* Languages */}
      {renderPreviewSection('Languages',
        <View>
          {profileData.personalInfo.languages.map((language, index) => (
            <Text key={index} style={styles.previewText}>• {language}</Text>
          ))}
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {profileData.professionalDetails.consultationType.virtual && (
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="video-call" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Book Video</Text>
          </TouchableOpacity>
        )}
        {profileData.professionalDetails.consultationType.inPerson && (
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="person" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>In-Person</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="chat" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
      </View>

      {/* Credentials Section */}
      {renderPreviewSection('Credentials & Experience',
        <View>
          <Text style={styles.previewText}>
            {profileData.credentials.education.degree} - {profileData.credentials.education.university} ({profileData.credentials.education.graduationYear})
          </Text>
          <Text style={styles.previewText}>
            {profileData.credentials.yearsExperience} years of experience
          </Text>
          <Text style={styles.previewText}>Current Workplace: {profileData.professionalDetails.workplace}</Text>
          
          <Text style={styles.sectionSubtitle}>Certifications</Text>
          {profileData.credentials.certifications.map((cert, index) => (
            <Text key={index} style={styles.previewText}>• {cert}</Text>
          ))}
          
          <Text style={styles.sectionSubtitle}>Awards</Text>
          {profileData.credentials.awards.map((award, index) => (
            <Text key={index} style={styles.previewText}>• {award}</Text>
          ))}
          
          <Text style={styles.sectionSubtitle}>Publications</Text>
          {profileData.credentials.publications.map((pub, index) => (
            <Text key={index} style={styles.previewText}>• {pub}</Text>
          ))}
        </View>
      )}

      {/* Professional Details */}
      {renderPreviewSection('Specialties & Expertise',
        <View>
          <Text style={styles.sectionSubtitle}>Primary Specialties</Text>
          <View style={styles.specialtiesContainer}>
            {profileData.professionalDetails.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyChip}>
                <Text style={styles.specialtyChipText}>{specialty}</Text>
              </View>
            ))}
          </View>

          <View style={styles.specialtiesContainer}>
            {profileData.professionalDetails.subSpecialties.map((subSpecialty, index) => (
              <View key={index} style={styles.specialtyChip}>
                <Text style={styles.specialtyChipText}>{subSpecialty}</Text>
              </View>
            ))}
          </View>

        </View>
      )}

      {/* Availability Section */}
      {renderPreviewSection('Availability',
        <View style={styles.availabilityContainer}>
          <Text style={styles.nextAvailable}>
            Next Available: {profileData.availability.nextAvailable}
          </Text>
          <Text style={styles.scheduleText}>
            Days: {profileData.availability.days.join(', ')}
          </Text>
          <Text style={styles.scheduleText}>
            Hours: {profileData.availability.hours}
          </Text>
          <Text style={styles.sectionSubtitle}>Booking Options</Text>
          {profileData.availability.bookingOptions.map((option, index) => (
            <Text key={index} style={styles.previewText}>• {option}</Text>
          ))}
        </View>
      )}

      {/* Location & Contact */}
      {renderPreviewSection('Location & Contact',
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            {' '}{profileData.addressInfo.streetAddress}
            {'\n'}
            {profileData.addressInfo.city}, {profileData.addressInfo.state} {profileData.addressInfo.postalCode}
          </Text>
          <Text style={styles.contactText}>
            <MaterialIcons name="phone" size={16} color="#666" />
            {' '}{profileData.clinicDetails.contact.phone}
          </Text>
          <Text style={styles.contactText}>
            <MaterialIcons name="email" size={16} color="#666" />
            {' '}{profileData.clinicDetails.contact.email}
          </Text>
        </View>
      )}



{/* Insurance & Additional Info */}
{renderPreviewSection('Additional Information', 
  <View>
    {/* Accepted Insurance Plans */}
    <Text style={styles.sectionSubtitle}>Accepted Insurance Plans</Text>
    {profileData.additionalInfo.insurancePlans && profileData.additionalInfo.insurancePlans.length > 0 ? (
      profileData.additionalInfo.insurancePlans.map((plan, index) => (
        <Text key={index} style={styles.previewText}>• {plan}</Text>
      ))
    ) : (
      <Text style={styles.previewText}>No insurance plans available.</Text>
    )}

 
  </View>
)}

      
    </ScrollView>
  );

  const renderEditMode = () => (
    <ScrollView style={styles.editContainer}>
      {/* Personal Information */}
      <View style={styles.editSection}>
        <Text style={styles.editSectionTitle}>Personal Information</Text>
        {renderInputField('Full Name', profileData.personalInfo.fullName, 
          (text) => setProfileData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, fullName: text }
          }))
        )}
        <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
          {profileData.personalInfo.profilePicture ? (
            <Image
              source={{ uri: profileData.personalInfo.profilePicture }}
              style={styles.uploadedImage}
            />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <MaterialIcons name="add-a-photo" size={32} color="#666" />
              <Text style={styles.uploadText}>Add Profile Photo</Text>
            </View>
          )}
        </TouchableOpacity>
        {renderInputField('Title', profileData.personalInfo.title,
          (text) => setProfileData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, title: text }
          }))
        )}
        {renderInputField('Specialty', profileData.personalInfo.specialty,
          (text) => setProfileData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, specialty: text }
          }))
        )}
        {renderArrayInput('Languages', profileData.personalInfo.languages,
          (languages) => setProfileData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, languages }
          }))
        )}
      </View>

      {/* Address Information */}
      <View style={styles.editSection}>
        <Text style={styles.editSectionTitle}>Address Information</Text>
        {renderInputField('Street Address', profileData.addressInfo.streetAddress,
          (text) => setProfileData(prev => ({
            ...prev,
            addressInfo: { ...prev.addressInfo, streetAddress: text }
          }))
        )}
        {renderInputField('City', profileData.addressInfo.city,
          (text) => setProfileData(prev => ({
            ...prev,
            addressInfo: { ...prev.addressInfo, city: text }
        }))
      )}
      {renderInputField('State', profileData.addressInfo.state,
        (text) => setProfileData(prev => ({
          ...prev,
          addressInfo: { ...prev.addressInfo, state: text }
        }))
      )}
      {renderInputField('Postal Code', profileData.addressInfo.postalCode,
        (text) => setProfileData(prev => ({
          ...prev,
          addressInfo: { ...prev.addressInfo, postalCode: text }
        }))
      )}
    </View>

    {/* Professional Experience */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Professional Experience</Text>
      {renderInputField('Current Workplace', profileData.professionalDetails.workplace,
        (text) => setProfileData(prev => ({
          ...prev,
          professionalDetails: { ...prev.professionalDetails, workplace: text }
        }))
      )}
      {renderInputField('Years of Experience', profileData.credentials.yearsExperience,
        (text) => setProfileData(prev => ({
          ...prev,
          credentials: { ...prev.credentials, yearsExperience: text }
        }))
      )}
    </View>

    {/* Education */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Education</Text>
      {renderInputField('Degree', profileData.credentials.education.degree,
        (text) => setProfileData(prev => ({
          ...prev,
          credentials: { 
            ...prev.credentials, 
            education: { ...prev.credentials.education, degree: text }
          }
        }))
      )}
      {renderInputField('University', profileData.credentials.education.university,
        (text) => setProfileData(prev => ({
          ...prev,
          credentials: { 
            ...prev.credentials, 
            education: { ...prev.credentials.education, university: text }
          }
        }))
      )}
      {renderInputField('Graduation Year', profileData.credentials.education.graduationYear,
        (text) => setProfileData(prev => ({
          ...prev,
          credentials: { 
            ...prev.credentials, 
            education: { ...prev.credentials.education, graduationYear: text }
          }
        }))
      )}
    </View>

    {/* Availability */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Availability</Text>
      {renderArrayInput('Available Days', profileData.availability.days,
        (days) => setProfileData(prev => ({
          ...prev,
          availability: { ...prev.availability, days }
        }))
      )}
      {renderInputField('Available Hours', profileData.availability.hours,
        (text) => setProfileData(prev => ({
          ...prev,
          availability: { ...prev.availability, hours: text }
        }))
      )}
      {renderInputField('Next Available Slot', profileData.availability.nextAvailable,
        (text) => setProfileData(prev => ({
          ...prev,
          availability: { ...prev.availability, nextAvailable: text }
        }))
      )}
      {renderArrayInput('Booking Options', profileData.availability.bookingOptions,
        (options) => setProfileData(prev => ({
          ...prev,
          availability: { ...prev.availability, bookingOptions: options }
        }))
      )}
    </View>

    {/* Professional Details */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Professional Details</Text>
      {renderArrayInput('Specialties', profileData.professionalDetails.specialties,
        (specialties) => setProfileData(prev => ({
          ...prev,
          professionalDetails: { ...prev.professionalDetails, specialties }
        }))
      )}

    </View>

    {/* Consultation Types */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Consultation Types</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.inputLabel}>In-Person Consultations</Text>
        <Switch
          value={profileData.professionalDetails.consultationType.inPerson}
          onValueChange={(value) => setProfileData(prev => ({
            ...prev,
            professionalDetails: {
              ...prev.professionalDetails,
              consultationType: {
                ...prev.professionalDetails.consultationType,
                inPerson: value
              }
            }
          }))}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.inputLabel}>Virtual Consultations</Text>
        <Switch
          value={profileData.professionalDetails.consultationType.virtual}
          onValueChange={(value) => setProfileData(prev => ({
            ...prev,
            professionalDetails: {
              ...prev.professionalDetails,
              consultationType: {
                ...prev.professionalDetails.consultationType,
                virtual: value
              }
            }
          }))}
        />
      </View>
    </View>

    {/* Credentials */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Additional Credentials</Text>
      {renderArrayInput('Certifications', profileData.credentials.certifications,
        (certifications) => setProfileData(prev => ({
          ...prev,
          credentials: { ...prev.credentials, certifications }
        }))
      )}
      {renderArrayInput('Awards', profileData.credentials.awards,
        (awards) => setProfileData(prev => ({
          ...prev,
          credentials: { ...prev.credentials, awards }
        }))
      )}
      {renderArrayInput('Publications', profileData.credentials.publications,
        (publications) => setProfileData(prev => ({
          ...prev,
          credentials: { ...prev.credentials, publications }
        }))
      )}
    </View>

    {/* Contact Information */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Contact Information</Text>
      {renderInputField('Phone Number', profileData.clinicDetails.contact.phone,
        (text) => setProfileData(prev => ({
          ...prev,
          clinicDetails: {
            ...prev.clinicDetails,
            contact: { ...prev.clinicDetails.contact, phone: text }
          }
        }))
      )}
      {renderInputField('Email', profileData.clinicDetails.contact.email,
        (text) => setProfileData(prev => ({
          ...prev,
          clinicDetails: {
            ...prev.clinicDetails,
            contact: { ...prev.clinicDetails.contact, email: text }
          }
        }))
      )}
    </View>

    {/* Additional Information */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Additional Information</Text>
      {renderArrayInput('Insurance Plans', profileData.additionalInfo.insurancePlans,
        (plans) => setProfileData(prev => ({
          ...prev,
          additionalInfo: { ...prev.additionalInfo, insurancePlans: plans }
        }))
      )}
      {renderInputField('Treatment Approach', profileData.additionalInfo.treatmentApproach,
        (text) => setProfileData(prev => ({
          ...prev,
          additionalInfo: { ...prev.additionalInfo, treatmentApproach: text }
        })),
        true
      )}
    </View>

    {/* Telemedicine Instructions */}
    <View style={styles.editSection}>
      <Text style={styles.editSectionTitle}>Telemedicine Instructions</Text>
      {renderInputField('Virtual Visit Instructions', 
        profileData.clinicDetails.telemedicineInstructions,
        (text) => setProfileData(prev => ({
          ...prev,
          clinicDetails: { ...prev.clinicDetails, telemedicineInstructions: text }
        })),
        true
      )}
    </View>

    {/* Save Button */}
    <TouchableOpacity 
      style={styles.saveButton}
      onPress={() => setIsEditing(false)}
    >
      <Text style={styles.saveButtonText}>Save Profile</Text>
    </TouchableOpacity>
  </ScrollView>
);

return (
  <SafeAreaView style={styles.safeArea}>

  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => setIsEditing(!isEditing)}
      >
        <MaterialIcons 
          name={isEditing ? "visibility" : "edit"} 
          size={24} 
          color="#fff" 
        />
        <Text style={styles.editButtonText}>
          {isEditing ? "Preview" : "Edit"}
        </Text>
      </TouchableOpacity>
    </View>
    {isEditing ? renderEditMode() : renderPreview()}
  </View>
  </SafeAreaView>

);
};


export default DoctorProfile;