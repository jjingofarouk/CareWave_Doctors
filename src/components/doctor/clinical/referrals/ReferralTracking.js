// components/referral/ReferralCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ReferralCard = ({ referral }) => {
  const {
    patientName,
    doctorName,
    reason,
    status,
    date,
    priority,
  } = referral;

  const getStatusStyle = () => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'accepted':
        return styles.statusAccepted;
      case 'declined':
        return styles.statusDeclined;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.patientName}>{patientName}</Text>
        <Text style={[styles.status, getStatusStyle()]}>{status}</Text>
      </View>

      <Text style={styles.detail}><Text style={styles.label}>Referred to:</Text> Dr. {doctorName}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Reason:</Text> {reason}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Date:</Text> {date}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Priority:</Text> {priority}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonFollowUp}>
          <Text style={styles.buttonText}>Follow Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonViewDetails}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusPending: {
    color: '#f0ad4e',
  },
  statusAccepted: {
    color: '#5cb85c',
  },
  statusDeclined: {
    color: '#d9534f',
  },
  statusDefault: {
    color: '#999',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  buttonFollowUp: {
    backgroundColor: '#0275d8',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonViewDetails: {
    backgroundColor: '#5bc0de',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
