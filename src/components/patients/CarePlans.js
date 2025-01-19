import React, { useState } from 'react';
import { 
  View, Text, ScrollView, StyleSheet, TouchableOpacity, 
  TextInput, Modal, Alert 
} from 'react-native';
import { Dimensions } from 'react-native';

const mockCarePlan = {
  patientName: "Akiki Nyombi",
  dateOfBirth: "1985-03-15",
  contact: {
    phone: "123-456-7890",
    email: "akiki@example.com",
    emergencyContact: "Jane Doe, 987-654-3210"
  },
  primaryCarePhysician: "Dr. John Doe",
  diagnoses: ["Type 2 Diabetes", "Hypertension"],
  medications: [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2023-09-01" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2023-09-01" }
  ],
  dietPlan: {
    dailyCalories: 1800,
    macronutrients: { carbs: "45%", protein: "25%", fats: "30%" },
    recommendations: [
      "Incorporate more leafy greens and vegetables",
      "Choose whole grains over refined carbohydrates"
    ]
  },
  exercisePlan: {
    weeklyGoal: "150 minutes of moderate-intensity aerobic activity",
    recommendations: [
      "30 minutes of brisk walking 5 days a week",
      "Strength training exercises 2-3 times a week"
    ]
  },
  patientGoals: [
    "Blood pressure reduction to <130/80",
    "HbA1c reduction to <7%",
    "Weight loss of 5-10% over the next 6 months"
  ],
  reminders: [
    "Take Metformin at 8 AM",
    "Blood pressure check in 1 week"
  ],
  healthInsights: [
    "Eating more fiber can help regulate blood sugar.",
    "Reducing salt intake can lower blood pressure."
  ],
  progressTracking: {
    lastVisit: "2023-10-01",
    weightChange: "-2kg",
    bloodSugarChange: "-5 mg/dL"
  }
};

const CarePlans = () => {
  const [carePlan, setCarePlan] = useState(mockCarePlan);
  const [editMode, setEditMode] = useState(false);
  const [editedCarePlan, setEditedCarePlan] = useState(mockCarePlan);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setCarePlan(editedCarePlan);
    setEditMode(false);
  };

  const renderHealthInsights = () => {
    if (!carePlan.healthInsights || carePlan.healthInsights.length === 0) {
      return null;
    }
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Health Insights</Text>
        {carePlan.healthInsights.map((insight, index) => (
          <Text key={index}>• {insight}</Text>
        ))}
      </View>
    );
  };

  const renderProgressTracking = () => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <Text>Last Visit: {carePlan.progressTracking.lastVisit}</Text>
        <Text>Weight Change: {carePlan.progressTracking.weightChange}</Text>
        <Text>Blood Sugar Change: {carePlan.progressTracking.bloodSugarChange}</Text>
        <TouchableOpacity 
          style={styles.trackProgressButton} 
          onPress={() => Alert.alert('Track your progress here!')}
        >
          <Text style={styles.trackProgressButtonText}>Track My Progress</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMedications = () => {
    if (!carePlan.medications || carePlan.medications.length === 0) {
      return null;
    }
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Medications</Text>
        {carePlan.medications.map((med, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{med.name} - {med.dosage}</Text>
            <Text>{med.frequency}</Text>
            <Text>Start Date: {med.startDate}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderDietExercise = () => {
    return (
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.sectionTitle}>Your Diet Plan</Text>
          <Text>Daily Calories: {carePlan.dietPlan.dailyCalories}</Text>
          <Text>Macronutrients:</Text>
          <Text>Carbs: {carePlan.dietPlan.macronutrients.carbs}</Text>
          <Text>Protein: {carePlan.dietPlan.macronutrients.protein}</Text>
          <Text>Fats: {carePlan.dietPlan.macronutrients.fats}</Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Your Exercise Plan</Text>
          <Text>Weekly Goal: {carePlan.exercisePlan.weeklyGoal}</Text>
          <Text>Recommendations:</Text>
          {carePlan.exercisePlan.recommendations.map((rec, index) => (
            <Text key={index}>• {rec}</Text>
          ))}
        </View>
      </View>
    );
  };



  const renderPatientGoals = () => {
    if (!carePlan.patientGoals || carePlan.patientGoals.length === 0) {
      return null;
    }
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Goals</Text>
        {carePlan.patientGoals.map((goal, index) => (
          <Text key={index}>• {goal}</Text>
        ))}
      </View>
    );
  };

  const renderReminders = () => {
    if (!carePlan.reminders || carePlan.reminders.length === 0) {
      return null;
    }
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Reminders</Text>
        {carePlan.reminders.map((reminder, index) => (
          <Text key={index}>• {reminder}</Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Care Plan for {carePlan.patientName}</Text>
      {renderMedications()}  
      {renderDietExercise()}
      {renderPatientGoals()}
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={editMode ? handleSave : handleEdit}
      >
        <Text style={styles.editButtonText}>
          {editMode ? 'Save Changes' : 'Edit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 16
  },
  sectionContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 8
  },
  listItem: {
    marginBottom: 8
  },
  editButton: {
    backgroundColor: '#009688',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  trackProgressButton: {
    backgroundColor: '#FF7043',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  trackProgressButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CarePlans;
