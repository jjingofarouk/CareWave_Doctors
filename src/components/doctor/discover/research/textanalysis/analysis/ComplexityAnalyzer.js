// ComplexityAnalyzer.js
import nlp from 'compromise';

export const countSyllables = (word) => {
  if (!word || typeof word !== 'string') return 0;
  
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
};

export const calculateComplexityMetrics = (text) => {
  // Implement actual complexity analysis logic here
  return 0;
};

export const analyzeTextComplexity = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      lexicalDensity: 0,
      readabilityScore: 0,
      readabilityScores: { flesch: 0, fogIndex: 0 },
      complexity: 0
    };
  }

  try {
    const doc = nlp(text);
    const tokens = doc.terms().out('array');
    const uniqueTokens = [...new Set(tokens)];
    const lexicalDensity = uniqueTokens.length / tokens.length || 0;

    const words = tokens.length;
    const sentences = doc.sentences().length || 1;
    const syllables = tokens.reduce((count, word) => count + countSyllables(word), 0);

    const flesch = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    const fogIndex = 0.4 * ((words / sentences) + (100 * (syllables / words)));

    return {
      lexicalDensity,
      readabilityScore: Math.max(0, Math.min(100, flesch)),
      readabilityScores: {
        flesch: Math.round(flesch),
        fogIndex: Math.round(fogIndex),
      },
      complexity: calculateComplexityMetrics(text),
    };
  } catch (error) {
    console.error('Error in analyzeTextComplexity:', error);
    return {
      lexicalDensity: 0,
      readabilityScore: 0,
      readabilityScores: { flesch: 0, fogIndex: 0 },
      complexity: 0
    };
  }
};

export const calculateComplexityScore = (sentences, words, syllables) => {
  if (sentences <= 0 || words <= 0) return 0;
  return (0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59;
};