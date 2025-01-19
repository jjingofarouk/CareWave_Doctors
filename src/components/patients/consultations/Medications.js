import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import DrugInteractionChecker from "./DrugInteractionChecker";
import RefillReminders from "./RefillReminders";
import MedicationAdherence from "./MedicationAdherence";
import EducationalContent from "./EducationalContent";
import MedicinePrices from "./MedicinePrices";
import PillIdentifier from "./PillIdentifier";
import PrescriptionRefills from "./PrescriptionRefills";

const Medications = () => {
  const [medications, setMedications] = useState([]); // Local state for medications
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // Active tab index

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      try {
        // Simulate fetching data
        const fetchedMedications = await new Promise((resolve) =>
          setTimeout(() => resolve([{ id: 1, name: "Aspirin" }, { id: 2, name: "Ibuprofen" }]), 1000)
        );
        setMedications(fetchedMedications);
      } catch (error) {
        console.error("Failed to fetch medications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const handleMedicationSelect = (medication) => {
    setSelectedMedication(medication);
    setActiveTab(0); // Reset to the first tab
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Medications</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#009688" style={styles.spinner} />
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.medicationButton}
              onPress={() => handleMedicationSelect(item)}
            >
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={styles.medicationHint}>Tap for details</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.medicationList}
        />
      )}

      {selectedMedication && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedMedication.name}</Text>
          <Text style={styles.cardDescription}>Detailed information and management options</Text>

          {/* Tab navigation - Scrollable horizontally */}
          <ScrollView horizontal style={styles.tabs}>
            {["Drug Interaction", "Refill Reminders", "Adherence", "Education", "Medicine Prices", "Pill Identifier", "Prescription Refills"].map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tabButton, activeTab === index && styles.activeTab]}
                onPress={() => setActiveTab(index)}
              >
                <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Tab content */}
          <View style={styles.tabContent}>
            {activeTab === 0 && <DrugInteractionChecker selectedMedication={selectedMedication} />}
            {activeTab === 1 && <RefillReminders medication={selectedMedication} />}
            {activeTab === 2 && <MedicationAdherence medication={selectedMedication} />}
            {activeTab === 3 && <EducationalContent medication={selectedMedication} />}
            {activeTab === 4 && <MedicinePrices medication={selectedMedication} />}
            {activeTab === 5 && <PillIdentifier medication={selectedMedication} />}
            {activeTab === 6 && <PrescriptionRefills medication={selectedMedication} />}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54',
  },
  medicationButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  medicationHint: {
    color: '#009688',
  },
  medicationList: {
    paddingBottom: 10,
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54',
  },
  cardDescription: {
    color: '#555',
    marginVertical: 10,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#009688',
  },
  activeTabText: {
    color: '#fff',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  tabContent: {
    paddingTop: 20,
  },
  spinner: {
    marginTop: 20,
  },
});

export default Medications;
