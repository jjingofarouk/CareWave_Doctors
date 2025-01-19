// TopicAnalyzer.js
import { topicPatterns } from "../TopicPatterns";

/**
 * Analyzes clinical text for specific topics using exact phrase matching
 * @param {string} text - The clinical text to analyze
 * @returns {Object} Analysis results with counts, percentages, and context
 */
export const analyzeTopics = (text) => {
  // Input validation
  if (!text || typeof text !== 'string') {
    return {};
  }

  // Normalize text for consistent matching
  const normalizedText = text.toLowerCase().trim();
  
  // Get word count for percentage calculations
  const words = normalizedText.split(/\s+/).filter(word => word.length > 0).length || 1;
  
  const results = {};
  
  // Process each topic pattern
  Object.entries(topicPatterns).forEach(([topic, pattern]) => {
    try {
      const topicResults = {
        count: 0,
        percentage: 0,
        matches: new Set(),
        contexts: [] // Store surrounding context for each match
      };

      // Handle both regex pattern and string pattern cases
      const regex = pattern instanceof RegExp ? 
        pattern : 
        new RegExp(`\\b${pattern.toString().toLowerCase()}\\b`, 'gi');

      const matches = normalizedText.match(regex) || [];
      
      if (matches.length > 0) {
        matches.forEach(match => {
          // Add unique matches to the set
          topicResults.matches.add(match.toLowerCase());
          
          // Get context (up to 50 characters before and after the match)
          const matchIndex = normalizedText.indexOf(match.toLowerCase());
          const contextStart = Math.max(0, matchIndex - 50);
          const contextEnd = Math.min(normalizedText.length, matchIndex + match.length + 50);
          const context = text.slice(contextStart, contextEnd);
          
          topicResults.contexts.push({
            match: match,
            context: context.trim(),
            position: matchIndex
          });
        });
        
        topicResults.count = matches.length;
        topicResults.percentage = (topicResults.count / words) * 100;
        topicResults.matches = Array.from(topicResults.matches); // Convert Set to Array
        results[topic] = topicResults;
      }
    } catch (error) {
      console.error(`Error analyzing topic ${topic}:`, error);
    }
  });

  // Sort results by percentage in descending order
  return Object.entries(results)
    .sort(([, a], [, b]) => b.percentage - a.percentage)
    .reduce((acc, [topic, data]) => {
      acc[topic] = data;
      return acc;
    }, {});
};

/**
 * Validates and preprocesses clinical text before analysis
 * @param {string} text - Raw clinical text input
 * @returns {string} Preprocessed text
 */
export const preprocessText = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[^\w\s-]/g, ' ') // Remove special characters except hyphens
    .trim();
};

/**
 * Gets highlighted text snippets showing matches in context
 * @param {Object} results - Analysis results
 * @param {string} originalText - Original input text
 * @returns {Object} Results with highlighted snippets
 */
export const getHighlightedResults = (results, originalText) => {
  return Object.entries(results).reduce((acc, [topic, data]) => {
    const highlightedSnippets = data.contexts.map(({ match, context }) => {
      const highlightedContext = context.replace(
        new RegExp(`\\b${match}\\b`, 'gi'),
        `<mark>${match}</mark>`
      );
      return highlightedContext;
    });

    acc[topic] = {
      ...data,
      highlightedSnippets
    };
    return acc;
  }, {});
};