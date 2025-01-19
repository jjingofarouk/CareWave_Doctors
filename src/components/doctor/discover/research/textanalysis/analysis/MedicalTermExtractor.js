// MedicalTermExtractor.js
import { MEDICAL_TERMS_REGEX } from '../Terms';

export const extractMedicalTerms = (text) => {
  if (!text || typeof text !== 'string') return [];
  const matches = text.match(MEDICAL_TERMS_REGEX) || [];
  return [...new Set(matches)];
};