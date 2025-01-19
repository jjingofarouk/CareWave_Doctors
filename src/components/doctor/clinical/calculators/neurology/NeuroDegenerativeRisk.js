import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CustomSelect from "../../../../utils/CustomSelect";  // Make sure to import CustomSelect

export const NeuroDegenerativeRisk = () => {
  const [age, setAge] = useState("40");
  const [familyHistory, setFamilyHistory] = useState("no");
  const [lifestyle, setLifestyle] = useState("healthy");
  const [risk, setRisk] = useState("");

  const calculateRisk = () => {
    let riskScore = 0;
    if (parseInt(age) > 60) riskScore += 1;
    if (familyHistory === "yes") riskScore += 2;
    if (lifestyle === "unhealthy") riskScore += 2;

    if (riskScore === 0) setRisk("Low Risk");
    else if (riskScore === 1) setRisk("Moderate Risk");
    else setRisk("High Risk");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neurodegenerative Disease Risk Calculator</Text>

      <CustomSelect
        label="Age"
        selectedValue={age}
        onValueChange={setAge}
        options={[
          { label: "Under 40", value: "40" },
          { label: "40-60", value: "60" },
          { label: "Over 60", value: "70" }
        ]}
      />

      <CustomSelect
        label="Family History of Neurodegenerative Diseases"
        selectedValue={familyHistory}
        onValueChange={setFamilyHistory}
        options={[
          { label: "No", value: "no" },
          { label: "Yes", value: "yes" }
        ]}
      />

      <CustomSelect
        label="Lifestyle"
        selectedValue={lifestyle}
        onValueChange={setLifestyle}
        options={[
          { label: "Healthy", value: "healthy" },
          { label: "Unhealthy", value: "unhealthy" }
        ]}
      />

      <Button title="Calculate Risk" onPress={calculateRisk} />
      <Text>Risk Level: {risk}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
