import { EMOTION_PATTERNS } from "./EmotionPatterns";
import { EMOTION_COMBINATIONS } from "./EmotionCombinations";

export const calculateEmotionIntensity = (matchCount, wordCount) => {
  if (wordCount === 0) return 'none';
  const ratio = matchCount / wordCount;
  if (ratio >= 0.1) return 'high';
  if (ratio >= 0.05) return 'moderate';
  if (ratio > 0) return 'low';
  return 'none';
};

export const getDominantEmotions = (emotionResults) => {
  if (!emotionResults || typeof emotionResults !== 'object') {
    return [];
  }

  return Object.entries(emotionResults)
    .filter(([, data]) => data && data.percentage > 0)
    .sort(([,a], [,b]) => b.percentage - a.percentage)
    .slice(0, 3)
    .map(([emotion, data]) => ({
      emotion,
      percentage: data.percentage,
      intensity: data.intensity
    }));
};

export const calculateEmotionalComplexity = (emotionResults) => {
  if (!emotionResults || typeof emotionResults !== 'object') {
    return {
      score: 0,
      activeEmotions: 0,
      totalEmotions: 0,
      complexity: 'low'
    };
  }

  const activeEmotions = Object.values(emotionResults).filter(e => e && e.count > 0).length;
  const totalEmotions = Object.keys(emotionResults).length;
  
  return {
    score: (activeEmotions / totalEmotions) * 100,
    activeEmotions,
    totalEmotions,
    complexity: activeEmotions >= 5 ? 'high' : activeEmotions >= 3 ? 'moderate' : 'low'
  };
};

export const findMatchingEmotionCombination = (dominantEmotions) => {
  if (!dominantEmotions || dominantEmotions.length === 0) {
    return null;
  }

  const dominantEmotionNames = dominantEmotions.map(e => e.emotion.toLowerCase());
  
  // Find the combination that best matches the dominant emotions
  const matchedCombination = Object.entries(EMOTION_COMBINATIONS)
    .map(([name, data]) => {
      const matchCount = data.emotions.filter(emotion => 
        dominantEmotionNames.includes(emotion.toLowerCase())
      ).length;
      
      return {
        name,
        data,
        matchCount,
        matchPercentage: (matchCount / data.emotions.length) * 100
      };
    })
    .filter(match => match.matchCount >= 2) // Require at least 2 matching emotions
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    [0];

  return matchedCombination;
};

export const generateDetailedEmotionalAnalysis = (dominantEmotions, emotionalComplexity) => {
  const matchedCombination = findMatchingEmotionCombination(dominantEmotions);
  
  if (!matchedCombination) {
    // Generate generic analysis if no combination matches
    return {
      pattern: null,
      analysis: {
        summary: `Primary emotional state shows ${dominantEmotions[0]?.emotion || 'limited emotion'} ${
          dominantEmotions[1] ? `with elements of ${dominantEmotions[1].emotion}` : ''
        }`,
        traits: "Individual emotional traits cannot be determined without a clear pattern match.",
        emotional_state: "Current emotional state shows mixed or unclear patterns.",
        treatment_attitude: "Treatment attitudes cannot be clearly determined from the emotional content.",
        coping_mechanisms: "Coping mechanisms are not clearly indicated in the emotional pattern.",
        social_support: "Social support needs require further assessment.",
        health_beliefs: "Health beliefs cannot be determined from the current emotional pattern.",
        motivation: "Motivation levels and patterns require further assessment.",
        perceived_barriers: "Barriers to treatment are not clearly indicated in the emotional content.",
        general_wellbeing: "Overall wellbeing assessment requires additional context.",
        cultural_soc_econ_influences: "Cultural and socioeconomic influences require further exploration."
      }
    };
  }

  // Return the matched combination's detailed analysis
  return {
    pattern: matchedCombination.name,
    analysis: {
      summary: matchedCombination.data.summary,
      traits: matchedCombination.data.traits,
      emotional_state: matchedCombination.data.emotional_state,
      treatment_attitude: matchedCombination.data.treatment_attitude,
      coping_mechanisms: matchedCombination.data.coping_mechanisms,
      social_support: matchedCombination.data.social_support,
      health_beliefs: matchedCombination.data.health_beliefs,
      motivation: matchedCombination.data.motivation,
      perceived_barriers: matchedCombination.data.perceived_barriers,
      general_wellbeing: matchedCombination.data.general_wellbeing,
      cultural_soc_econ_influences: matchedCombination.data.cultural_soc_econ_influences
    }
  };
};

export const analyzeEmotions = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      emotions: {},
      dominantEmotions: [],
      emotionalComplexity: {
        score: 0,
        activeEmotions: 0,
        totalEmotions: Object.keys(EMOTION_PATTERNS).length,
        complexity: 'low'
      },
      emotionalAnalysis: {
        pattern: null,
        analysis: {
          summary: 'No text provided for analysis'
        }
      }
    };
  }

  const wordCount = text.split(/\s+/).length;
  const results = {};
  
  Object.entries(EMOTION_PATTERNS).forEach(([emotion, pattern]) => {
    try {
      const matches = text.match(pattern) || [];
      results[emotion] = {
        count: matches.length,
        percentage: (matches.length / wordCount) * 100,
        matches: [...new Set(matches)],
        intensity: calculateEmotionIntensity(matches.length, wordCount)
      };
    } catch (error) {
      console.error(`Error analyzing emotion ${emotion}:`, error);
      results[emotion] = {
        count: 0,
        percentage: 0,
        matches: [],
        intensity: 'none'
      };
    }
  });

  const dominantEmotions = getDominantEmotions(results);
  const emotionalComplexity = calculateEmotionalComplexity(results);
  const emotionalAnalysis = generateDetailedEmotionalAnalysis(dominantEmotions, emotionalComplexity);

  return {
    emotions: results,
    dominantEmotions,
    emotionalComplexity,
    emotionalAnalysis
  };
};