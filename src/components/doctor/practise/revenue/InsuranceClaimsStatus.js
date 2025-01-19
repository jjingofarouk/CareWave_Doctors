// components/revenue/InsuranceClaimsStatus.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const InsuranceClaimsStatus = ({ claims }) => {
  const renderClaimItem = ({ item }) => (
    <View style={styles.claimItem}>
      <View style={styles.claimHeader}>
        <Text style={styles.claimId}>Claim #{item.claimId}</Text>
        <Text style={[styles.claimStatus, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.claimDetails}>
        <Text>Patient: {item.patientName}</Text>
        <Text>Amount: ${item.amount.toFixed(2)}</Text>
        <Text>Submitted: {item.submissionDate}</Text>
        {item.status === 'Rejected' && (
          <Text style={styles.rejectionReason}>Reason: {item.rejectionReason}</Text>
        )}
      </View>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '#43a047';
      case 'pending':
        return '#fb8c00';
      case 'rejected':
        return '#e53935';
      default:
        return '#000';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insurance Claims</Text>
      <FlatList
        data={claims}
        renderItem={renderClaimItem}
        keyExtractor={(item) => item.claimId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  claimItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  claimId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  claimStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  claimDetails: {
    gap: 4,
  },
  rejectionReason: {
    color: '#e53935',
    marginTop: 4,
  },
});

export default InsuranceClaimsStatus;