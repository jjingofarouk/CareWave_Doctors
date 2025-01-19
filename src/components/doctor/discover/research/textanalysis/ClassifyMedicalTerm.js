import { categories } from './Categories';

  
  export const classifyMedicalTerm = (term) => {
    for (const category in categories) {
      const categoryArray = categories[category];
      if (categoryArray.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(term))) {
        return category;
      }
    }
    return 'FINDING'; // Default classification if no match is found
  };
  