import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export const EDSS = () => {
  const [scores, setScores] = useState({
    pyramidal: 0,
    cerebellar: 0,
    brainstem: 0,
    sensory: 0,
    bowelBladder: 0,
    visual: 0,
    cerebral: 0,
    other: 0,
    ambulation: 0
  });

  const [showGuidelines, setShowGuidelines] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);

  const functionalSystems = {
    pyramidal: {
      title: "Pyramidal Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Abnormal signs without disability" },
        { score: 2, description: "Minimal disability" },
        { score: 3, description: "Mild or moderate paraparesis or hemiparesis; severe monoparesis" },
        { score: 4, description: "Marked paraparesis or hemiparesis; moderate quadriparesis; or monoplegia" },
        { score: 5, description: "Paraplegia, hemiplegia, or marked quadriparesis" },
        { score: 6, description: "Quadriplegia" }
      ]
    },
    cerebellar: {
      title: "Cerebellar Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Abnormal signs without disability" },
        { score: 2, description: "Mild ataxia" },
        { score: 3, description: "Moderate truncal or limb ataxia" },
        { score: 4, description: "Severe ataxia, all limbs" },
        { score: 5, description: "Unable to perform coordinated movements due to ataxia" }
      ]
    },
    brainstem: {
      title: "Brainstem Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Signs only" },
        { score: 2, description: "Moderate nystagmus or other mild disability" },
        { score: 3, description: "Severe nystagmus, marked extraocular weakness, or moderate disability of other cranial nerves" },
        { score: 4, description: "Marked dysarthria or other marked disability" },
        { score: 5, description: "Inability to swallow or speak" }
      ]
    },
    sensory: {
      title: "Sensory Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Vibration or figure-writing decrease only, in 1-2 limbs" },
        { score: 2, description: "Mild decrease in touch, pain or position sense, and/or moderate decrease in vibration in 1-2 limbs; or vibratory decrease alone in 3-4 limbs" },
        { score: 3, description: "Moderate decrease in touch, pain or position sense, and/or lost vibration in 1-2 limbs; or mild decrease in touch, pain and/or moderate decrease in all proprioceptive tests in 3-4 limbs" },
        { score: 4, description: "Marked decrease in touch or pain or loss of proprioception, alone or combined, in 1-2 limbs; or moderate decrease in touch, pain and/or severe proprioceptive decrease in >2 limbs" },
        { score: 5, description: "Loss of sensation in 1-2 limbs; or moderate decrease in touch, pain and/or loss of proprioception for most of the body below the head" },
        { score: 6, description: "Sensation essentially lost below the head" }
      ]
    },
    bowelBladder: {
      title: "Bowel and Bladder Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Mild urinary hesitancy, urgency, or retention" },
        { score: 2, description: "Moderate hesitancy, urgency, retention of bowel or bladder, or rare urinary incontinence" },
        { score: 3, description: "Frequent urinary incontinence" },
        { score: 4, description: "In need of almost constant catheterization" },
        { score: 5, description: "Loss of bladder function" },
        { score: 6, description: "Loss of bowel and bladder function" }
      ]
    },
    visual: {
      title: "Visual (Optic) Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Scotoma with visual acuity (corrected) better than 20/30" },
        { score: 2, description: "Worse eye with scotoma with maximal visual acuity (corrected) of 20/30 to 20/59" },
        { score: 3, description: "Worse eye with large scotoma, or moderate decrease in fields, but with maximal visual acuity (corrected) of 20/60 to 20/99" },
        { score: 4, description: "Worse eye with marked decrease of fields and maximal visual acuity (corrected) of 20/100-20/200; grade 3 plus maximal acuity of better eye of ≤20/60" },
        { score: 5, description: "Worse eye with maximal visual acuity (corrected) less than 20/200; grade 4 plus maximal acuity of better eye of 20/60 or less" },
        { score: 6, description: "Grade 5 plus maximal visual acuity of better eye of 20/60 or less" }
      ]
    },
    cerebral: {
      title: "Cerebral (Mental) Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Mood alteration only (Does not affect DSS score)" },
        { score: 2, description: "Mild decrease in mentation" },
        { score: 3, description: "Moderate decrease in mentation" },
        { score: 4, description: "Marked decrease in mentation (chronic brain syndrome - moderate)" },
        { score: 5, description: "Dementia or chronic brain syndrome - severe or incompetent" }
      ]
    },
    other: {
      title: "Other Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Any other neurologic findings attributed to MS" }
      ]
    },
    ambulation: {
      title: "Ambulation",
      options: [
        { score: 0, description: "Fully ambulatory" },
        { score: 4, description: "Fully ambulatory, self-sufficient, up 12 hours a day despite relatively severe disability. Able to walk ≥500 meters without aid/rest." },
        { score: 4.5, description: "Fully ambulatory, able to work a full day, may require minimal assistance. Able to walk ≥300 meters without aid/rest." },
        { score: 5, description: "Ambulatory for 200 meters without aid/rest; disability that impairs full daily activities." },
        { score: 5.5, description: "Ambulatory for 100 meters without aid/rest; disability precludes full daily activities." },
        { score: 6, description: "Intermittent or unilateral constant assistance required to walk 100 meters, with/without resting." },
        { score: 6.5, description: "Constant bilateral assistance required to walk 20 meters without resting." },
        { score: 7, description: "Unable to walk >5 meters even with aid; restricted to wheelchair; wheels self in standard wheelchair and transfers alone." },
        { score: 7.5, description: "Unable to take more than steps; restricted to wheelchair; may need aid in transfer." },
        { score: 8, description: "Restricted to bed/chair or perambulated in wheelchair, but may be out of bed itself much of the day." },
        { score: 8.5, description: "Restricted to bed much of the day; has some effective use of arms; retains some self-care functions." },
        { score: 9, description: "Helpless bed patient; can communicate and eat." },
        { score: 9.5, description: "Totally helpless bed patient; unable to communicate effectively or eat/swallow." },
        { score: 10, description: "Death due to MS." }
      ]
    }
  };

  const calculateEDSS = () => {
    const fsScores = {
      pyramidal: scores.pyramidal,
      cerebellar: scores.cerebellar,
      brainstem: scores.brainstem,
      sensory: scores.sensory,
      bowelBladder: scores.bowelBladder,
      visual: scores.visual,
      cerebral: scores.cerebral,
      other: scores.other
    };

    const maxFS = Math.max(...Object.values(fsScores));
    const numFS2Plus = Object.values(fsScores).filter(score => score >= 2).length;

    // EDSS calculation logic based on functional systems and ambulation
    if (scores.ambulation >= 7) {
      return scores.ambulation;
    }

    if (maxFS <= 1) {
      return 1.0;
    }

    if (scores.ambulation === 0) {
      if (maxFS === 2) {
        return 2.0;
      }
      if (maxFS === 3) {
        return numFS2Plus >= 2 ? 3.0 : 2.5;
      }
      if (maxFS === 4) {
        return numFS2Plus >= 2 ? 3.5 : 3.0;
      }
    }

    // Complex walking assessment integration
    if (scores.ambulation >= 4) {
      return Math.max(scores.ambulation, maxFS);
    }

    // Default calculation based on functional system scores
    return Math.min(4, maxFS + 1);
  };

  const GuidelinesModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showGuidelines}
      onRequestClose={() => setShowGuidelines(false)}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <Text style={styles.modalTitle}>Clinical Guidelines</Text>
          <Text style={styles.guidelineText}>
            The Expanded Disability Status Scale (EDSS) is used to quantify disability in multiple sclerosis:
            {'\n\n'}
            • Scores 1.0 to 4.5: Fully ambulatory patients
            {'\n'}
            • Scores 5.0 to 9.5: Impairment to ambulation
            {'\n\n'}
            Assessment Guidelines:
            {'\n\n'}
            1. Evaluate each functional system independently
            {'\n'}
            2. Consider impact on daily activities
            {'\n'}
            3. Document objective findings
            {'\n'}
            4. Regular reassessment recommended
            {'\n\n'}
            Note: The final EDSS score is heavily weighted toward ambulatory ability in the middle and high range of the scale.
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowGuidelines(false)}
          >
            <Text style={styles.buttonText}>Close Guidelines</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  const ScoreSection = ({ system, scores, setScores }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{functionalSystems[system].title}</Text>
      {functionalSystems[system].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.scoreOption,
            scores[system] === option.score && styles.selectedOption
          ]}
          onPress={() => setScores({...scores, [system]: option.score})}
        >
          <Text style={styles.scoreText}>Score {option.score}: {option.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>EDSS Assessment Tool</Text>
        
        <TouchableOpacity
          style={styles.guidelinesButton}
          onPress={() => setShowGuidelines(true)}
        >
          <Text style={styles.buttonText}>View Clinical Guidelines</Text>
        </TouchableOpacity>

        {Object.keys(functionalSystems).map((system) => (
          <ScoreSection
            key={system}
            system={system}
            scores={scores}
            setScores={setScores}
          />
        ))}

        <View style={styles.resultsSection}>
          <Text style={styles.resultTitle}>EDSS Score: {calculateEDSS().toFixed(1)}</Text>
          <Text style={styles.resultDescription}>
            Based on:
            {'\n'}- Functional Systems Scores
            {'\n'}- Ambulation Assessment
          </Text>
        </View>

        <GuidelinesModal />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  scoreOption: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
    borderWidth: 1,
  },
  scoreText: {
    fontSize: 16,
    color: '#333',
  },
  guidelinesButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  guidelineText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
});
