// Analysis.js (main file)
import { analyzeEmotions } from './EmotionAnalyzer';
import { analyzeSentiment } from './SentimentAnalyzer';
import { extractWORDS } from './KeywordExtractor';
import { analyzeTextComplexity, calculateComplexityScore } from './ComplexityAnalyzer';
import { analyzeTopics } from './TopicAnalyzer';
import { extractMedicalTerms } from './MedicalTermExtractor';
import { countSyllables } from './ComplexityAnalyzer';

export const performCompleteAnalysis = async (text) => {
  if (!text || typeof text !== 'string') {
    return {
      wordCount: 0,
      sentimentData: null,
      WORDS: [],
      emotionAnalysis: null,
      readabilityScore: 0,
      medicalTermsFound: [],
      textComplexity: null,
      topicAnalysis: {},
      timestamp: new Date().toISOString(),
      error: 'Invalid input'
    };
  }

  try {
    const wordCount = text.split(/\s+/).length;
    const sentimentData = analyzeSentiment(text);
    const WORDS = await extractWORDS(text);
    const emotionAnalysis = analyzeEmotions(text);
    const readabilityScore = calculateComplexityScore(
      text.split(/[.!?]+/).length,
      wordCount,
      text.split(/\s+/).reduce((count, word) => count + countSyllables(word), 0)
    );
    const medicalTermsFound = extractMedicalTerms(text);
    const textComplexity = analyzeTextComplexity(text);
    const topicAnalysis = analyzeTopics(text);
    
    return {
      wordCount,
      sentimentData,
      WORDS,
      emotionAnalysis,
      readabilityScore,
      medicalTermsFound,
      textComplexity,
      topicAnalysis,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in performCompleteAnalysis:', error);
    throw new Error('Analysis failed: ' + error.message);
  }
};