import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CMEPph = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Postpartum Hemorrhage (PPH): Advances in Management</Text>
      
      <Text style={styles.subHeader}>Overview</Text>
      <Text style={styles.text}>
        Postpartum hemorrhage (PPH) remains a leading cause of maternal mortality in Uganda, 
        accounting for approximately 42% of maternal deaths. Recent studies have focused on enhancing 
        the prevention and management of PPH in resource-limited settings.
      </Text>

      <Text style={styles.subHeader}>Heat-Stable Carbetocin and Tranexamic Acid Implementation</Text>
      <Text style={styles.text}>
        A 2024 study conducted in Uganda evaluated the implementation of heat-stable carbetocin (HSC) and 
        tranexamic acid (TXA) for PPH management in humanitarian settings. The study found that integrating 
        these medications into clinical practice was feasible and improved PPH outcomes. HSC, unlike oxytocin, 
        does not require refrigeration, making it particularly suitable for low-resource settings. TXA, an 
        antifibrinolytic agent, has been shown to reduce mortality due to bleeding when administered promptly.
      </Text>

      <Text style={styles.subHeader}>Resuscitative Endovascular Balloon Occlusion of the Aorta (REBOA)</Text>
      <Text style={styles.text}>
        In cases of life-threatening PPH unresponsive to conventional interventions, REBOA has emerged as a 
        potential life-saving procedure. A recent report from Uganda highlighted the successful use of REBOA 
        in managing severe PPH, suggesting its utility in critical care scenarios where surgical options may be limited.
      </Text>

      <Text style={styles.subHeader}>Barriers and Facilitators to Guideline Implementation</Text>
      <Text style={styles.text}>
        Implementing PPH management guidelines in Uganda faces challenges, including resource constraints and 
        training gaps. A mixed-methods study identified that while healthcare providers are aware of PPH guidelines, 
        factors such as limited access to medications, inadequate staffing, and lack of continuous professional 
        development hinder effective implementation. Addressing these barriers through targeted interventions is 
        crucial for improving maternal outcomes.
      </Text>

      <Text style={styles.subHeader}>Recommendations for Clinical Practice</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Adopt Heat-Stable Uterotonics:</Text> Incorporate HSC into standard practice for PPH prevention, 
        especially in settings lacking cold chain facilities.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Utilize Tranexamic Acid Promptly:</Text> Administer TXA within three hours of PPH onset to reduce 
        mortality associated with bleeding.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Consider REBOA in Severe Cases:</Text> For refractory PPH, REBOA may be a viable option; however, 
        it requires specialized training and equipment.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Strengthen Health Systems:</Text> Address systemic barriers by improving supply chains, enhancing 
        training programs, and ensuring adherence to clinical guidelines.
      </Text>

      <Text style={styles.conclusion}>
        By integrating these evidence-based interventions and addressing implementation challenges, healthcare providers 
        in Uganda can improve the management of PPH and reduce maternal mortality associated with this condition.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002432',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27c7b8',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  conclusion: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#f78837',
  },
});

export default CMEPph;
