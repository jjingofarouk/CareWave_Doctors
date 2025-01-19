import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const PregnancyCalculator = () => {
  const [lmp, setLmp] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ultrasoundDate, setUltrasoundDate] = useState(null);
  const [gestationalAge, setGestationalAge] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("lmp");
  const [results, setResults] = useState(null);

  const calculateDates = () => {
    let edd, gestationalAgeWeeks, firstTrimester, secondTrimester, thirdTrimester;

    if (calculationMethod === "lmp") {
      // Naegele's rule with modern adjustments
      edd = new Date(lmp);
      edd.setDate(edd.getDate() + 280);
      
      const today = new Date();
      gestationalAgeWeeks = Math.floor((today - lmp) / (1000 * 60 * 60 * 24 * 7));
    } else {
      // Ultrasound-based calculation
      const ultrasoundWeeks = parseFloat(gestationalAge);
      if (isNaN(ultrasoundWeeks)) return;
      
      const daysToAdd = 280 - (ultrasoundWeeks * 7);
      edd = new Date(ultrasoundDate);
      edd.setDate(edd.getDate() + daysToAdd);
      
      const today = new Date();
      gestationalAgeWeeks = Math.floor((today - ultrasoundDate) / (1000 * 60 * 60 * 24 * 7)) + ultrasoundWeeks;
    }

    // Calculate trimester dates
    firstTrimester = new Date(lmp);
    firstTrimester.setDate(firstTrimester.getDate() + 84); // 12 weeks

    secondTrimester = new Date(lmp);
    secondTrimester.setDate(secondTrimester.getDate() + 182); // 26 weeks

    thirdTrimester = new Date(lmp);
    thirdTrimester.setDate(thirdTrimester.getDate() + 280); // 40 weeks

    setResults({
      edd,
      gestationalAgeWeeks,
      firstTrimester,
      secondTrimester,
      thirdTrimester,
      importantDates: {
        anatomyScan: new Date(lmp.getTime() + (20 * 7 * 24 * 60 * 60 * 1000)),
        glucoseTest: new Date(lmp.getTime() + (24 * 7 * 24 * 60 * 60 * 1000)),
        tdap: new Date(lmp.getTime() + (27 * 7 * 24 * 60 * 60 * 1000)),
        gbs: new Date(lmp.getTime() + (36 * 7 * 24 * 60 * 60 * 1000))
      }
    });
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
        <Text style={styles.title}>Pregnancy Calculator</Text>
        
        {/* Calculation Method Selection */}
        <View style={styles.methodSelection}>
          <TouchableOpacity
            style={[styles.methodButton, calculationMethod === "lmp" && styles.methodButtonActive]}
            onPress={() => setCalculationMethod("lmp")}>
            <Text style={styles.methodButtonText}>LMP Method</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodButton, calculationMethod === "ultrasound" && styles.methodButtonActive]}
            onPress={() => setCalculationMethod("ultrasound")}>
            <Text style={styles.methodButtonText}>Ultrasound Method</Text>
          </TouchableOpacity>
        </View>

        {calculationMethod === "lmp" ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Menstrual Period (LMP)</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}>
              <Text>{formatDate(lmp)}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ultrasound Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}>
                <Text>{formatDate(ultrasoundDate)}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gestational Age at Ultrasound (weeks)</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={gestationalAge}
                onChangeText={setGestationalAge}
                placeholder="Enter weeks (e.g. 8.5)"
              />
            </View>
          </>
        )}

        <TouchableOpacity style={styles.calculateButton} onPress={calculateDates}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        {results && (
          <View style={styles.results}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Estimated Due Date:</Text>
              <Text style={styles.resultValue}>{formatDate(results.edd)}</Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Current Gestational Age:</Text>
              <Text style={styles.resultValue}>{results.gestationalAgeWeeks} weeks</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Important Dates</Text>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Anatomy Scan (20w):</Text>
              <Text style={styles.resultValue}>{formatDate(results.importantDates.anatomyScan)}</Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Glucose Test (24-28w):</Text>
              <Text style={styles.resultValue}>{formatDate(results.importantDates.glucoseTest)}</Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Tdap Vaccine (27-36w):</Text>
              <Text style={styles.resultValue}>{formatDate(results.importantDates.tdap)}</Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>GBS Screen (36w):</Text>
              <Text style={styles.resultValue}>{formatDate(results.importantDates.gbs)}</Text>
            </View>
          </View>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={calculationMethod === "lmp" ? lmp : ultrasoundDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                if (calculationMethod === "lmp") {
                  setLmp(selectedDate);
                } else {
                  setUltrasoundDate(selectedDate);
                }
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
  methodSelection: {
    flexDirection: "row",
    marginBottom: 24
  },
  methodButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f1f2f6",
    marginHorizontal: 4
  },
  methodButtonActive: {
    backgroundColor: "#74b9ff"
  },
  methodButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#2d3436"
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
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
    marginTop: 16,
    marginBottom: 12
  }
});

export default PregnancyCalculator;