import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CMETB = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Advanced Insights into Tuberculosis (TB)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Pathophysiology of Tuberculosis</Text>
        <Text style={styles.text}>
          Tuberculosis (TB) is caused by *Mycobacterium tuberculosis*, an acid-fast bacillus with a complex pathogenesis 
          driven by host-pathogen interactions. After inhalation of aerosolized droplets, the bacilli are phagocytosed 
          by alveolar macrophages. A hallmark of TB is its ability to evade innate immunity via inhibition of phagolysosome 
          fusion, persisting within macrophages.
        </Text>
        <Text style={styles.text}>
          The formation of granulomas, consisting of macrophages, multinucleated giant cells, and lymphocytes, is a host 
          response aimed at containing the infection. However, granulomas may undergo caseation necrosis, releasing bacilli 
          and leading to active disease. Latent TB represents a dynamic balance between bacterial persistence and host immunity.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Emerging Diagnostic Approaches</Text>
        <Text style={styles.text}>
          While sputum smear microscopy and chest X-rays remain standard in resource-limited settings, advanced diagnostics 
          are redefining TB detection. The Xpert MTB/RIF assay, a cartridge-based nucleic acid amplification test, offers 
          rapid detection of both *M. tuberculosis* and rifampicin resistance in under two hours.
        </Text>
        <Text style={styles.text}>
          Whole genome sequencing (WGS) is increasingly utilized to identify drug-resistant strains and to map transmission 
          dynamics. Interferon-gamma release assays (IGRAs), including QuantiFERON-TB Gold, have replaced the tuberculin skin 
          test in diagnosing latent TB infection, particularly in immunocompromised patients.
        </Text>
        <Text style={styles.text}>
          Digital chest radiography powered by artificial intelligence algorithms is an emerging tool for large-scale TB 
          screening in endemic regions, demonstrating high sensitivity and specificity.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Innovations in Pharmacological Management</Text>
        <Text style={styles.text}>
          Drug-sensitive TB is traditionally treated with a six-month regimen consisting of isoniazid, rifampicin, pyrazinamide, 
          and ethambutol (HRZE). However, multidrug-resistant TB (MDR-TB) has necessitated the use of novel regimens, including 
          bedaquiline, delamanid, and pretomanid. The BPaL regimen (bedaquiline, pretomanid, and linezolid) offers a six-month 
          treatment option for highly drug-resistant cases.
        </Text>
        <Text style={styles.text}>
          Recent trials, such as the Nix-TB and ZeNix studies, have demonstrated promising results for short-course regimens 
          with fewer adverse effects. In pediatric TB, dispersible formulations of fixed-dose combinations are enhancing treatment 
          adherence.
        </Text>
        <Text style={styles.text}>
          The use of therapeutic drug monitoring (TDM) is gaining traction, particularly for second-line drugs, to optimize 
          pharmacokinetics and minimize toxicity.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. TB and Immunocompromised Populations</Text>
        <Text style={styles.text}>
          TB remains a leading cause of death among people living with HIV (PLHIV). Isoniazid preventive therapy (IPT) combined 
          with antiretroviral therapy (ART) significantly reduces TB incidence in PLHIV. Screening for TB in these populations 
          requires a high index of suspicion, as classical symptoms may be absent or atypical.
        </Text>
        <Text style={styles.text}>
          Emerging data suggest an increased TB risk in patients receiving biologic agents, such as tumor necrosis factor (TNF) 
          inhibitors, for autoimmune diseases. In such cases, latent TB screening using IGRAs is mandatory before initiating 
          therapy.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Vaccine Development</Text>
        <Text style={styles.text}>
          The Bacille Calmette-Guérin (BCG) vaccine, while effective in preventing severe TB in children, offers limited 
          protection against adult pulmonary TB. New vaccine candidates, including M72/AS01E, have shown efficacy in 
          preventing progression from latent to active TB in clinical trials.
        </Text>
        <Text style={styles.text}>
          Advances in mucosal immunity research have led to the development of live-attenuated and subunit vaccines aimed 
          at enhancing local immunity in the lungs. These next-generation vaccines hold promise for broader protection and 
          transmission reduction.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Global Efforts Toward TB Elimination</Text>
        <Text style={styles.text}>
          The WHO’s End TB Strategy targets a 90% reduction in TB incidence by 2035. Key strategies include active case 
          finding, contact tracing, and scaling up MDR-TB treatment. Digital health technologies, such as electronic directly 
          observed therapy (eDOT), are improving treatment adherence in both high- and low-burden settings.
        </Text>
        <Text style={styles.text}>
          Integration of TB care with broader health initiatives, including HIV and diabetes programs, is critical for 
          achieving global elimination goals. Research into host-directed therapies (HDTs) that modulate the immune response 
          is a promising avenue for future interventions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Takeaways for Clinicians</Text>
        <Text style={styles.text}>
          - Utilize molecular diagnostics, such as Xpert MTB/RIF, for early detection and drug resistance profiling.{"\n"}
          - Be vigilant in managing TB among immunocompromised populations, including PLHIV and patients on biologics.{"\n"}
          - Stay updated on emerging vaccines and short-course regimens for MDR-TB.{"\n"}
          - Advocate for integration of TB care within broader public health frameworks.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#f4f6f7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#002432' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#f78837', marginBottom: 8 },
  text: { fontSize: 14, lineHeight: 20, color: '#333' },
});

export default CMETB;
