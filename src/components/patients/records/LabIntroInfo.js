import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const LabIntroInfo = ({ onProceed }) => {
  const data = [
    {
      title: 'Understanding Lab Results',
      content: `Lab tests help doctors assess your health and detect potential issues. 
                Results are shown with a reference range indicating what is normal.`,
    },
    {
      title: 'How to Upload Your Lab Results',
      content: `Ensure to include: Test name, units of measurement, reference range, and date of test.`,
    },
    {
      title: 'What to Do After Uploading',
      content: `After submitting, your doctor will review your results and advise on the next steps.`,
    },
    {
      title: 'Common Lab Tests',
      content: `Common tests include: Blood count, glucose levels, cholesterol, kidney function, etc.`,
    },
    {
      title: 'Need Help?',
      content: `If you have questions, please contact your doctor or our support team.`,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={onProceed}>
        <Text style={styles.buttonText}>Upload Your Lab Results Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  slide: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF7043',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LabIntroInfo;
