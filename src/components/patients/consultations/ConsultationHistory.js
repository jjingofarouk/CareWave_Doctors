import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ConsultationHistory = ({ consultations = [] }) => {
  if (!consultations || consultations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No consultation history available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {consultations.map((consultation, index) => (
        <View key={index} style={styles.card}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Image
              source={{ uri: consultation.patientProfilePicture }}
              style={styles.profilePicture}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.patientName}>{consultation.patientName}</Text>
              <Text style={styles.consultationDate}>
                {consultation.date} at {consultation.time}
              </Text>
              <Text style={styles.consultationType}>{consultation.type}</Text>
            </View>
            <View style={styles.statusBadgeContainer}>
              <Text
                style={[
                  styles.statusBadge,
                  styles[consultation.status?.toLowerCase()],
                ]}
              >
                {consultation.status}
              </Text>
            </View>
          </View>

          {/* Medical Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medical Information</Text>
            <Text style={styles.label}>Reason for Consultation:</Text>
            <Text style={styles.value}>{consultation.reason || 'N/A'}</Text>
            <Text style={styles.label}>Diagnosis:</Text>
            <Text style={styles.value}>{consultation.diagnosis || 'N/A'}</Text>
            <Text style={styles.label}>Treatment Provided:</Text>
            <Text style={styles.value}>{consultation.treatment || 'N/A'}</Text>
            <Text style={styles.label}>Follow-Up Notes:</Text>
            <Text style={styles.value}>
              {consultation.followUpNotes || 'N/A'}
            </Text>
            <Text style={styles.label}>Prescriptions:</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>View Prescription</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Test Recommendations:</Text>
            <Text style={styles.value}>
              {consultation.tests?.join(', ') || 'None'}
            </Text>
          </View>

          {/* Patient Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{consultation.patientAge || 'N/A'}</Text>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{consultation.patientGender || 'N/A'}</Text>
            <Text style={styles.label}>Contact Information:</Text>
            <Text style={styles.value}>
              Email: {consultation.patientEmail || 'N/A'}
            </Text>
            <Text style={styles.value}>
              Phone: {consultation.patientPhone || 'N/A'}
            </Text>
            <Text style={styles.label}>Medical History Summary:</Text>
            <Text style={styles.value}>
              {consultation.medicalHistory || 'N/A'}
            </Text>
            <Text style={styles.label}>Vitals History:</Text>
            <Text style={styles.value}>{consultation.vitals || 'N/A'}</Text>
            <Text style={styles.label}>Current Medications:</Text>
            <Text style={styles.value}>{consultation.medications || 'N/A'}</Text>
          </View>

          {/* Consultation Media and Notes Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Consultation Media and Notes</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Play Call Recording</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Doctor's Notes:</Text>
            <Text style={styles.value}>{consultation.doctorsNotes || 'N/A'}</Text>
            <Text style={styles.label}>Attachments:</Text>
            {consultation.attachments?.length > 0 ? (
              consultation.attachments.map((attachment, i) => (
                <TouchableOpacity key={i} style={styles.linkButton}>
                  <Text style={styles.linkText}>{attachment}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.value}>None</Text>
            )}
            <Text style={styles.label}>Shared Resources:</Text>
            {consultation.resources?.length > 0 ? (
              consultation.resources.map((resource, i) => (
                <TouchableOpacity key={i} style={styles.linkButton}>
                  <Text style={styles.linkText}>{resource}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.value}>None</Text>
            )}
          </View>

          {/* Financial Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financial Details</Text>
            <Text style={styles.label}>Consultation Fee:</Text>
            <Text style={styles.value}>${consultation.fee || 'N/A'}</Text>
            <Text style={styles.label}>Payment Status:</Text>
            <Text style={styles.value}>
              {consultation.paymentStatus || 'N/A'}
            </Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>View Invoice</Text>
            </TouchableOpacity>
          </View>

          {/* Post-Consultation Features Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Post-Consultation Features</Text>
            <Text style={styles.label}>Follow-Up Status:</Text>
            <Text style={styles.value}>
              {consultation.followUpStatus || 'N/A'}
            </Text>
            <Text style={styles.label}>Patient Feedback:</Text>
            <Text style={styles.value}>{consultation.feedback || 'N/A'}</Text>
            <Text style={styles.label}>Tasks/Reminders:</Text>
            <Text style={styles.value}>{consultation.reminders || 'N/A'}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE4E5',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFE4E5',
  },
  emptyText: {
    fontSize: 16,
    color: '#4A5568',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E9F2',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#002432',
  },
  consultationDate: {
    fontSize: 14,
    color: '#4A5568',
    marginVertical: 4,
  },
  consultationType: {
    fontSize: 14,
    color: '#27C7B8',
  },
  statusBadgeContainer: {
    alignSelf: 'flex-start',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completed: {
    backgroundColor: '#10B981',
  },
  pending: {
    backgroundColor: '#F78837',
  },
  canceled: {
    backgroundColor: '#EF4444',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#002432',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
  },
  linkButton: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#27C7B8',
    textDecorationLine: 'underline',
  },
});

export default ConsultationHistory;
