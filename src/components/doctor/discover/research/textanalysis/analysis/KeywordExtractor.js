// KeywordExtractor.js
import { MEDICAL_TERMS_REGEX } from "../Terms";

export const extractWORDS = async (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const frequencies = {};
  words.forEach(word => {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });

  return Object.entries(frequencies)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .map(([word, frequency]) => ({
      word,
      frequency,
      isMedical: MEDICAL_TERMS_REGEX.test(word),
      relativeFrequency: (frequency / words.length) * 100
    }));
};
