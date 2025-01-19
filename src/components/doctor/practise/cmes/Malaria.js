
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

const CMEMalaria = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Advanced Insights into Malaria</Text>

      {/* Pathophysiology Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Pathophysiology of Malaria</Text>
        <Text style={styles.text}>
          Malaria is caused by protozoan parasites of the genus *Plasmodium*. Among the five species that infect humans, 
          *P. falciparum* is the most virulent and responsible for the majority of deaths. Pathogenesis begins with the bite 
          of an infected *Anopheles* mosquito, introducing sporozoites into the bloodstream. These rapidly migrate to the liver, 
          where they invade hepatocytes and undergo schizogony, producing thousands of merozoites.
        </Text>
        <Text style={styles.text}>
          Erythrocytic cycles lead to hemolysis and subsequent release of pro-inflammatory cytokines, including TNF-α and IL-6, 
          which are pivotal in the development of fever and systemic inflammation. In *P. falciparum* infections, cytoadherence of 
          parasitized erythrocytes to vascular endothelium is mediated by *PfEMP1*, contributing to microvascular obstruction and 
          cerebral malaria.
        </Text>
        <Image
          source={{ uri: 'https://example.com/pathophysiology_image.jpg' }}
          style={styles.image}
        />
        <Text style={styles.caption}>Cytoadherence of parasitized erythrocytes in cerebral malaria.</Text>
      </View>

      {/* Diagnostic Innovations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Diagnostic Innovations</Text>
        <Text style={styles.text}>
          While traditional thick and thin blood smear microscopy remains the gold standard, advancements in molecular diagnostics 
          have enhanced sensitivity. Real-time polymerase chain reaction (RT-PCR) can detect submicroscopic parasitemia, which is 
          critical in identifying asymptomatic carriers who contribute to disease reservoirs.
        </Text>
        <Text style={styles.text}>
          A novel approach using loop-mediated isothermal amplification (LAMP) has emerged as a rapid and field-deployable alternative. 
          In resource-limited settings, antigen-detecting rapid diagnostic tests (RDTs) targeting histidine-rich protein 2 (HRP-2) and 
          lactate dehydrogenase (pLDH) are widely utilized, although HRP-2 deletions in some *P. falciparum* strains pose diagnostic challenges.
        </Text>
        <Image
          source={{ uri: 'https://example.com/diagnostic_image.jpg' }}
          style={styles.image}
        />
        <Text style={styles.caption}>Molecular diagnostic methods for detecting submicroscopic parasitemia.</Text>
      </View>

      {/* Advances in Antimalarial Therapy Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Advances in Antimalarial Therapy</Text>
        <Text style={styles.text}>
          Artemisinin-based combination therapies (ACTs) remain the cornerstone of *P. falciparum* treatment. However, emerging resistance 
          to artemisinin and its partner drugs, particularly in the Greater Mekong Subregion, has necessitated the development of novel agents. 
          Tafenoquine, a single-dose treatment for *P. vivax* hypnozoites, represents a significant advance in addressing relapsing malaria.
        </Text>
        <Text style={styles.text}>
          Recent clinical trials are investigating triple combination therapies (TACTs) incorporating artemisinin, lumefantrine, and amodiaquine 
          to counter resistance. In severe malaria, intravenous artesunate has demonstrated superior efficacy compared to quinine and should be 
          promptly administered in hospitalized patients.
        </Text>
        <Image
          source={{ uri: 'https://example.com/therapies_image.jpg' }}
          style={styles.image}
        />
        <Text style={styles.caption}>The role of ACTs in managing severe malaria and emerging therapies.</Text>
      </View>

      {/* Vaccine Development Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Vaccine Development</Text>
        <Text style={styles.text}>
          The RTS,S/AS01 (*Mosquirix*) vaccine, targeting the *P. falciparum* circumsporozoite protein, has shown modest efficacy in reducing 
          clinical malaria episodes in children. However, its limited duration of protection underscores the need for next-generation vaccines.
        </Text>
        <Text style={styles.text}>
          R21/Matrix-M, currently undergoing phase 3 trials, has demonstrated improved efficacy and a higher antibody response. Advances in 
          transmission-blocking vaccines (TBVs) are also promising, with the potential to reduce mosquito infectivity and interrupt transmission 
          cycles.
        </Text>
        <Image
          source={{ uri: 'https://example.com/vaccine_image.jpg' }}
          style={styles.image}
        />
        <Text style={styles.caption}>Next-generation malaria vaccines and transmission-blocking strategies.</Text>
      </View>

      {/* Emerging Trends in Malaria Elimination Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Emerging Trends in Malaria Elimination</Text>
        <Text style={styles.text}>
          The WHO’s High Burden to High Impact (HBHI) strategy emphasizes tailored approaches, leveraging data to target interventions in 
          high-burden regions. Genomic surveillance is emerging as a powerful tool to monitor parasite resistance and guide policy decisions.
        </Text>
        <Text style={styles.text}>
          Additionally, novel vector control strategies, such as gene-drive technology to suppress *Anopheles* mosquito populations and 
          spatial repellents, are under active investigation. Integration of digital health technologies, including mobile health (mHealth) 
          platforms, enhances case reporting and real-time monitoring of intervention efficacy.
        </Text>
        <Image
          source={{ uri: 'https://example.com/elimination_image.jpg' }}
          style={styles.image}
        />
        <Text style={styles.caption}>Emerging trends in malaria elimination and digital health interventions.</Text>
      </View>

      {/* Key Takeaways Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Takeaways for Clinicians</Text>
        <Text style={styles.text}>
          - Recognize the significance of molecular diagnostics in identifying asymptomatic carriers.{"\n"}
          - Stay updated on emerging drug resistance patterns and novel therapies such as TACTs.{"\n"}
          - Advocate for vaccination in endemic areas while supporting ongoing research into second-generation vaccines.{"\n"}
          - Embrace digital and genomic tools to optimize malaria elimination strategies.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  caption: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default CMEMalaria;

