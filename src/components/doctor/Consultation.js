import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ConsultationOption = React.memo(({ onPress, iconName, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
    <Icon name={iconName} style={styles.icon} />
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
));

const MoreOption = React.memo(({ onPress, iconName, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.moreOptionContainer}>
    <Icon name={iconName} style={styles.icon} />
    <Text style={styles.moreOptionText}>{text}</Text>
  </TouchableOpacity>
));

const Notification = ({ showNotification, closeNotification }) => (
  <Animated.View style={[styles.notification, { opacity: showNotification ? 1 : 0 }]}>
    <Icon name="bell" style={styles.icon} />
    <Text style={styles.notificationText}>You'll receive notifications for new consultations</Text>
    <TouchableOpacity onPress={closeNotification} style={styles.closeButton}>
      <Icon name="x" style={styles.icon} />
    </TouchableOpacity>
  </Animated.View>
);

const Consultation = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleNotification = useCallback(() => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  const toggleOptions = useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  const consultationOptions = [
    { onPress: () => Alert.alert('Start Video Call'), iconName: 'video', text: 'Start Video Call' },
    { onPress: () => Alert.alert('Start Chat'), iconName: 'message-square', text: 'Start Chat' },
    { onPress: () => Alert.alert('Manage Appointments'), iconName: 'calendar', text: 'Manage Appointments' },
    { onPress: () => Alert.alert('Patient Records'), iconName: 'file-text', text: 'Patient Records' },
  ];

  const moreOptions = [
    { onPress: () => Alert.alert('Use Symptom Checker'), iconName: 'activity', text: 'Use Symptom Checker' },
    { onPress: () => Alert.alert('View Care Plans'), iconName: 'file-text', text: 'View Care Plans' },
    { onPress: () => Alert.alert('Consultation History'), iconName: 'file-text', text: 'Consultation History' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a Consultation</Text>
      <Text style={styles.subtitle}>Select the type of consultation or explore more options below:</Text>

      <View style={styles.gridContainer}>
        {consultationOptions.map((option, index) => (
          <ConsultationOption key={index} {...option} />
        ))}
      </View>

      <TouchableOpacity onPress={toggleOptions} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Toggle More Options</Text>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.moreOptionsCard}>
          <Text style={styles.cardTitle}>More Options</Text>
          <FlatList
            data={moreOptions}
            renderItem={({ item }) => <MoreOption {...item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}

      <View style={styles.helpCard}>
        <Text style={styles.cardTitle}>Need Help?</Text>
        <Text style={styles.helpText}>If you need assistance with starting a consultation, please contact our support team.</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => Alert.alert('Contact Support')} style={styles.primaryButton}>
            <Icon name="help-circle" style={styles.icon} />
            <Text style={styles.buttonText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotification} style={styles.secondaryButton}>
            <Icon name="bell" style={styles.icon} />
            <Text style={styles.buttonText}>Get Notifications</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Notification showNotification={showNotification} closeNotification={() => setShowNotification(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionContainer: {
    width: '48%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  moreOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  moreOptionText: {
    fontSize: 14,
    marginLeft: 10,
  },
  moreOptionsCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  helpCard: {
    backgroundColor: '#f0f4f7',
    padding: 20,
    borderRadius: 10,
  },
  helpText: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#009688',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  notification: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationText: {
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    paddingLeft: 10,
  },
  toggleButton: {
    backgroundColor: '#FF7043',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Consultation;
