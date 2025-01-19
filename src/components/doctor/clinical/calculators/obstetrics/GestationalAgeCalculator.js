import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const GestationalAgeCalculator = () => {
  const [lmp, setLmp] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maternalAge, setMaternalAge] = useState("");
  const [parity, setParity] = useState("");
  const [previousCSection, setPreviousCSection] = useState(false);
  const [hiv, setHiv] = useState("unknown");
  const [results, setResults] = useState(null);

  const calculateDates = () => {
    const today = new Date();
    const gestationalDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(gestationalDays / 7);
    const remainingDays = gestationalDays % 7;

    // Calculate EDD using Naegele's rule
    const edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280);

    // Risk assessment based on Ugandan context
    const risks = [];
    if (maternalAge && (parseInt(maternalAge) < 18 || parseInt(maternalAge) > 35)) {
      risks.push("Age-related risk - Requires additional monitoring");
    }
    if (parity && parseInt(parity) > 4) {
      risks.push("Grand multipara - Higher risk of complications");
    }
    if (previousCSection) {
      risks.push("Previous C-section - Plan for facility-based delivery");
    }

    // Determine recommended facility level based on risks
    let recommendedFacility = "Health Centre III";
    if (risks.length > 0 || hiv === "positive") {
      recommendedFacility = "Health Centre IV or Regional Referral Hospital";
    }

    setResults({
      gestationalAge: { weeks: gestationalWeeks, days: remainingDays },
      edd,
      risks,
      recommendedFacility,
      antenatalCare: calculateANCSchedule(lmp),
      hivCare: getHIVCareGuidelines(),
    });
  };

  const calculateANCSchedule = (lmpDate) => {
    const schedule = [];
    // First ANC visit (as soon as pregnancy is known)
    schedule.push({
      visit: 1,
      timing: "As early as possible (before 12 weeks)",
      services: [
        "Comprehensive history",
        "Blood pressure & weight",
        "HIV testing",
        "Syphilis screening",
        "Blood group & Hb",
        "Urinalysis",
        "TT vaccination",
        "Iron/Folate supplementation",
        "IPTp-SP if after quickening"
      ]
    });

    // Calculate subsequent visits based on WHO/Uganda guidelines
    const visit2Date = new Date(lmpDate);
    visit2Date.setDate(visit2Date.getDate() + (20 * 7)); // 20 weeks
    schedule.push({
      visit: 2,
      timing: "20 weeks",
      date: visit2Date,
      services: [
        "Blood pressure & weight",
        "Fundal height",
        "Fetal heart rate",
        "IPTp-SP dose",
        "Iron/Folate review"
      ]
    });

    const visit3Date = new Date(lmpDate);
    visit3Date.setDate(visit3Date.getDate() + (26 * 7)); // 26 weeks
    schedule.push({
      visit: 3,
      timing: "26 weeks",
      date: visit3Date,
      services: [
        "Blood pressure & weight",
        "Fundal height",
        "Fetal heart rate",
        "IPTp-SP dose",
        "Hemoglobin test"
      ]
    });

    const visit4Date = new Date(lmpDate);
    visit4Date.setDate(visit4Date.getDate() + (32 * 7)); // 32 weeks
    schedule.push({
      visit: 4,
      timing: "32 weeks",
      date: visit4Date,
      services: [
        "Blood pressure & weight",
        "Fundal height",
        "Fetal heart rate",
        "IPTp-SP dose",
        "Birth preparedness plan"
      ]
    });

    const visit5Date = new Date(lmpDate);
    visit5Date.setDate(visit5Date.getDate() + (36 * 7)); // 36 weeks
    schedule.push({
      visit: 5,
      timing: "36 weeks",
      date: visit5Date,
      services: [
        "Blood pressure & weight",
        "Fundal height",
        "Fetal presentation",
        "Birth preparedness review",
        "Facility delivery planning"
      ]
    });

    return schedule;
  };

  const getHIVCareGuidelines = () => {
    if (hiv === "positive") {
      return {
        title: "HIV Care Guidelines",
        recommendations: [
          "Initiate or continue ART immediately",
          "Regular viral load monitoring",
          "Enhanced adherence counseling",
          "Infant prophylaxis planning",
          "Exclusive breastfeeding counseling",
          "Partner testing",
          "Referral to comprehensive care clinic"
        ]
      };
    }
    return null;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Pregnancy Care Calculator</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Menstrual Period (LMP)</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}>
            <Text>{formatDate(lmp)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Maternal Age</Text>
          <TextInput
            style={styles.input}
            value={maternalAge}
            onChangeText={setMaternalAge}
            keyboardType="numeric"
            placeholder="Enter age"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Parity</Text>
          <TextInput
            style={styles.input}
            value={parity}
            onChangeText={setParity}
            keyboardType="numeric"
            placeholder="Number of previous deliveries"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Previous C-Section</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioButton, previousCSection && styles.radioButtonActive]}
              onPress={() => setPreviousCSection(true)}>
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, !previousCSection && styles.radioButtonActive]}
              onPress={() => setPreviousCSection(false)}>
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>HIV Status</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioButton, hiv === "positive" && styles.radioButtonActive]}
              onPress={() => setHiv("positive")}>
              <Text>Positive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, hiv === "negative" && styles.radioButtonActive]}
              onPress={() => setHiv("negative")}>
              <Text>Negative</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, hiv === "unknown" && styles.radioButtonActive]}
              onPress={() => setHiv("unknown")}>
              <Text>Unknown</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateDates}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        {results && (
          <View style={styles.results}>
            <Text style={styles.sectionTitle}>Pregnancy Information</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Gestational Age:</Text>
              <Text style={styles.resultValue}>
                {results.gestationalAge.weeks} weeks {results.gestationalAge.days} days
              </Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Estimated Delivery Date:</Text>
              <Text style={styles.resultValue}>{formatDate(results.edd)}</Text>
            </View>

            <Text style={styles.sectionTitle}>Risk Assessment</Text>
            {results.risks.length > 0 ? (
              results.risks.map((risk, index) => (
                <Text key={index} style={styles.riskText}>{risk}</Text>
              ))
            ) : (
              <Text style={styles.normalText}>No specific risk factors identified</Text>
            )}

            <Text style={styles.sectionTitle}>Recommended Facility Level</Text>
            <Text style={styles.facilityText}>{results.recommendedFacility}</Text>

            <Text style={styles.sectionTitle}>Antenatal Care Schedule</Text>
            {results.antenatalCare.map((visit, index) => (
              <View key={index} style={styles.visitCard}>
                <Text style={styles.visitTitle}>Visit {visit.visit}: {visit.timing}</Text>
                {visit.date && (
                  <Text style={styles.visitDate}>Target date: {formatDate(visit.date)}</Text>
                )}
                <View style={styles.servicesList}>
                  {visit.services.map((service, sIndex) => (
                    <Text key={sIndex} style={styles.serviceItem}>• {service}</Text>
                  ))}
                </View>
              </View>
            ))}

            {results.hivCare && (
              <>
                <Text style={styles.sectionTitle}>{results.hivCare.title}</Text>
                <View style={styles.hivCare}>
                  {results.hivCare.recommendations.map((rec, index) => (
                    <Text key={index} style={styles.hivRecommendation}>• {rec}</Text>
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={lmp}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setLmp(selectedDate);
              }
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa"
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 24,
    textAlign: "center"
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff"
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  radioButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f1f2f6",
    marginHorizontal: 4,
    alignItems: "center"
  },
  radioButtonActive: {
    backgroundColor: "#74b9ff"
  },
  calculateButton: {
    backgroundColor: "#0984e3",
    padding: 16,
    borderRadius: 8,
    marginTop: 16
  },
  calculateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600"
  },
  results: {
    marginTop: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
    marginTop: 16,
    marginBottom: 12
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#dfe6e9"
  },
  resultLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2d3436"
  },
  resultValue: {
    fontSize: 15,
    color: "#0984e3",
    fontWeight: "500"
  },
  riskText: {
    color: "#e17055",
    marginBottom: 8,
    fontSize: 15
  },
  normalText: {
    color: "#00b894",
    marginBottom: 8,
    fontSize: 15
  },
  facilityText: {
    fontSize: 16,
    color: "#0984e3",
    fontWeight: "500",
    marginBottom: 8
  },
  visitCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  visitTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8
  },
  visitDate: {
    color: "#0984e3",
    marginBottom: 8
  },
  servicesList: {
    marginTop: 8
  },
  serviceItem: {
    marginBottom: 4,
    fontSize: 14
  },
  hivCare: {
    backgroundColor: "#ffeaa7",
    padding: 12,
    borderRadius: 8
  },
  hivRecommendation: {
    marginBottom: 4,
    fontSize: 14
  }
});

export default GestationalAgeCalculator;