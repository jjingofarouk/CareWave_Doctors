import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

const allAllergies = [
  { id: '1', name: 'Peanuts' },
  { id: '2', name: 'Tree Nuts' },
  { id: '3', name: 'Shellfish' },
  { id: '4', name: 'Milk' },
  { id: '5', name: 'Eggs' },
  { id: '6', name: 'Wheat' },
  { id: '7', name: 'Soy' },
  { id: '8', name: 'Fish' },
  { id: '9', name: 'Latex' },
  { id: '10', name: 'Pollen' },
  { id: '11', name: 'Dust Mites' },
  { id: '12', name: 'Insect Stings' },
  { id: '13', name: 'Medications (e.g. Penicillin)' },
  { id: '14', name: 'Fragrances' },
  { id: '15', name: 'Cosmetics' },
  // Add more allergies as needed
];

const allergyEducation = {
  'Peanuts': {
    title: 'Peanut Allergy',
    info: 'Peanut allergy is one of the most common food allergies. Symptoms may include hives, swelling, stomach pain, and difficulty breathing. Always carry an epinephrine injector if prescribed. Avoid all peanut products, including peanuts in baked goods or hidden in sauces. Be aware of cross-contamination in kitchens.',
    prevention: 'Avoid peanuts and peanut-containing products at all costs. Read food labels carefully, and inform others about your allergy when dining out. Cross-contamination can happen in shared kitchen spaces.',
    emergency: 'If you accidentally ingest peanuts, use your epinephrine injection immediately and call emergency services. Seek medical attention even if you feel better after the epinephrine injection.'
  },
  'Tree Nuts': {
    title: 'Tree Nut Allergy',
    info: 'Tree nut allergies can cause severe allergic reactions. Symptoms can include skin reactions, respiratory issues, and anaphylaxis. Avoid all types of tree nuts like almonds, walnuts, cashews, hazelnuts, and pistachios.',
    prevention: 'Carefully avoid any products containing tree nuts. This includes cookies, granola bars, candies, or oils made from nuts. Always check labels for possible contamination.',
    emergency: 'In case of an allergic reaction, immediately use an epinephrine injector and contact emergency services. Monitor your breathing and seek medical attention if symptoms persist.'
  },
  'Shellfish': {
    title: 'Shellfish Allergy',
    info: 'Shellfish allergy can trigger severe reactions, including anaphylaxis. Symptoms may include skin rash, swelling, and difficulty breathing. Always avoid shellfish like shrimp, lobster, and crab.',
    prevention: 'Avoid shellfish and any foods or broths that may contain shellfish. Restaurants should be notified about your allergy to prevent cross-contact in kitchens.',
    emergency: 'If you experience difficulty breathing or swelling after ingesting shellfish, use epinephrine and seek immediate medical care. Anaphylaxis can be life-threatening without swift action.'
  },
  'Milk': {
    title: 'Milk Allergy',
    info: 'Milk allergy can cause rashes, stomach discomfort, and even anaphylaxis. Symptoms can vary from mild hives to severe gastrointestinal distress.',
    prevention: 'Eliminate all dairy products from your diet. This includes milk, cheese, butter, and other dairy-based ingredients. Be cautious of hidden dairy in processed foods.',
    emergency: 'If you accidentally consume milk, use an antihistamine to alleviate mild symptoms. In severe cases, administer epinephrine and call for medical help immediately.'
  },
  'Eggs': {
    title: 'Egg Allergy',
    info: 'Egg allergies are common among children. Reactions can range from mild skin irritation to severe anaphylactic reactions.',
    prevention: 'Avoid eggs and egg-derived products, such as mayonnaise, baked goods, or foods containing egg whites or yolks. Always check food labels.',
    emergency: 'For any signs of anaphylaxis, immediately use an epinephrine injection. Seek emergency medical attention to ensure proper care.'
  },
  'Wheat': {
    title: 'Wheat Allergy',
    info: 'Wheat allergy can lead to gastrointestinal distress, skin reactions, and respiratory issues. In severe cases, it can lead to anaphylaxis.',
    prevention: 'Avoid wheat-based products like bread, pasta, and cereals. Be careful with foods that may contain wheat flour as a hidden ingredient.',
    emergency: 'If exposed to wheat, use antihistamines for mild reactions. In case of severe symptoms, administer epinephrine and seek medical attention immediately.'
  },
  'Soy': {
    title: 'Soy Allergy',
    info: 'Soy allergies can cause skin reactions, digestive distress, and anaphylaxis. Soy is found in many processed foods, including tofu, soy sauce, and some protein bars.',
    prevention: 'Avoid soy and soy-derived products. Always check food labels for soy ingredients, including soy lecithin and other soy derivatives.',
    emergency: 'If you experience a severe reaction, administer epinephrine and seek immediate medical care.'
  },
  'Fish': {
    title: 'Fish Allergy',
    info: 'Fish allergies can trigger hives, swelling, or anaphylaxis. Fish like salmon, tuna, and cod are common allergens.',
    prevention: 'Avoid fish in all forms. Fish can be present in broths, sauces, or pre-prepared foods, so read labels carefully.',
    emergency: 'For anaphylaxis, use epinephrine and call for emergency medical assistance.'
  },
  'Latex': {
    title: 'Latex Allergy',
    info: 'Latex allergy can cause skin irritation, hives, and even anaphylaxis. It is often triggered by direct contact with latex gloves or medical equipment.',
    prevention: 'Avoid all latex-containing products, such as gloves, balloons, and rubber bands. Ensure healthcare providers use non-latex gloves during exams or treatments.',
    emergency: 'For severe reactions, use epinephrine and seek medical attention immediately.'
  },
  'Pollen': {
    title: 'Pollen Allergy',
    info: 'Pollen allergy, also known as hay fever, causes sneezing, runny nose, and itchy eyes. It is triggered by tree, grass, or weed pollen.',
    prevention: 'Limit outdoor activities during high pollen seasons. Keep windows closed and use air purifiers at home. Take antihistamines as recommended.',
    emergency: 'Use antihistamines or prescribed allergy medications. In case of severe respiratory symptoms, seek medical care immediately.'
  },
  'Dust Mites': {
    title: 'Dust Mite Allergy',
    info: 'Dust mites are a common allergen that can cause sneezing, coughing, and asthma-like symptoms.',
    prevention: 'Use dust-mite-proof covers on pillows and mattresses. Regularly wash bedding in hot water and clean your home to reduce dust buildup.',
    emergency: 'Use antihistamines or inhalers for respiratory symptoms. Seek medical help if symptoms worsen.'
  },
  'Insect Stings': {
    title: 'Insect Sting Allergy',
    info: 'Insect stings, especially from bees, wasps, and hornets, can cause severe allergic reactions, including anaphylaxis.',
    prevention: 'Avoid areas where insects are prevalent. Carry insect repellent and be cautious while outdoors.',
    emergency: 'Use epinephrine immediately after a sting and call for medical help if the reaction is severe.'
  },
  'Medications (e.g. Penicillin)': {
    title: 'Medication Allergy',
    info: 'Some medications, such as penicillin, can cause allergic reactions ranging from skin rashes to severe anaphylaxis.',
    prevention: 'Always inform your doctor about known drug allergies. Avoid self-prescribing any medications without consulting a healthcare provider.',
    emergency: 'For severe reactions, use epinephrine and seek emergency medical care.'
  },
  'Fragrances': {
    title: 'Fragrance Allergy',
    info: 'Fragrance allergies can cause skin irritation, rashes, and respiratory distress.',
    prevention: 'Avoid using products containing synthetic fragrances, such as perfumes, lotions, or cleaning products.',
    emergency: 'Use antihistamines for mild reactions. If symptoms worsen, consult a doctor.'
  },
  'Cosmetics': {
    title: 'Cosmetic Allergy',
    info: 'Cosmetics can trigger allergic reactions like rashes, swelling, and respiratory problems.',
    prevention: 'Avoid using products that contain allergens. Always perform a patch test before using new products.',
    emergency: 'In case of severe reactions, administer antihistamines or epinephrine if prescribed, and seek immediate medical attention.'
  }
};

function Allergies() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedAllergyInfo, setSelectedAllergyInfo] = useState(null);

  const handleSelectAllergy = (allergy) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter(item => item !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const handleSelectAllergyInfo = (allergy) => {
    setSelectedAllergyInfo(allergyEducation[allergy]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Allergies</Text>
      <Text style={styles.content}>
        Here, you can review your allergies and any reactions you've had in the past. You can also select allergies from the list below to learn more about them.
      </Text>

      <Text style={styles.subHeader}>Select your allergies:</Text>
      <FlatList
        data={allAllergies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.allergyButton, selectedAllergies.includes(item.name) && styles.selectedAllergy]}
            onPress={() => handleSelectAllergy(item.name)}
          >
            <Text style={styles.allergyText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedAllergies.length > 0 && (
        <View style={styles.selectedAllergiesContainer}>
          <Text style={styles.subHeader}>Your Selected Allergies:</Text>
          {selectedAllergies.map((allergy, index) => (
            <TouchableOpacity
              key={index}
              style={styles.selectedAllergyItem}
              onPress={() => handleSelectAllergyInfo(allergy)}
            >
              <Text style={styles.selectedAllergyText}>{allergy}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedAllergyInfo && (
        <View style={styles.educationCard}>
          <Text style={styles.educationTitle}>{selectedAllergyInfo.title}</Text>
          <Text style={styles.educationContent}>{selectedAllergyInfo.info}</Text>
          <Text style={styles.educationContent}>{selectedAllergyInfo.prevention}</Text>
          <Text style={styles.educationContent}>{selectedAllergyInfo.emergency}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#004C54',
  },
  allergyButton: {
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
  selectedAllergy: {
    backgroundColor: '#009688',
  },
  allergyText: {
    fontSize: 16,
    color: '#333',
  },
  selectedAllergiesContainer: {
    marginTop: 20,
  },
  selectedAllergyItem: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 10,
  },
  selectedAllergyText: {
    fontSize: 16,
    color: '#333',
  },
  educationCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  educationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54',
  },
  educationContent: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});

export default Allergies;
