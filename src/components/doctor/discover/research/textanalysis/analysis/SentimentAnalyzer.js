// SentimentAnalyzer.js
import { SENTIMENT_WORDS } from "../Sentiment";

export const analyzeSentiment = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      score: 0,
      distribution: { positive: 0, negative: 0, neutral: 0 },
      details: { positiveCount: 0, negativeCount: 0, neutralCount: 0 }
    };
  }

  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  const words = text.toLowerCase().split(/\s+/);
  
  words.forEach(word => {
    if (SENTIMENT_WORDS.positive.includes(word)) positiveCount++;
    if (SENTIMENT_WORDS.negative.includes(word)) negativeCount++;
    if (SENTIMENT_WORDS.neutral.includes(word)) neutralCount++;
  });

  const total = positiveCount + negativeCount + neutralCount;
  return {
    score: ((positiveCount - negativeCount) / (total || 1)) * 100,
    distribution: {
      positive: (positiveCount / (total || 1)) * 100,
      negative: (negativeCount / (total || 1)) * 100,
      neutral: (neutralCount / (total || 1)) * 100,
    },
    details: {
      positiveCount,
      negativeCount,
      neutralCount,
      totalWords: words.length
    }
  };
};