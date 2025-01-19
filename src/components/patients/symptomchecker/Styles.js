import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',  // Light Gray background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004C54',  // Deep Teal
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#27c7b8',  // Accent color
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  selectedSymptomsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center', // Center the title
  },
  selectedSymptom: {
    fontSize: 18,
    color: '#004C54', // Deep teal for emphasis
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    backgroundColor: '#f5f5f5', // Light gray background for items
    borderRadius: 8, // Rounded corners for each item
    shadowColor: '#000', // Drop shadow for subtle depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Elevation for Android shadow effect
  },
  emptyText: {
    fontSize: 16,
    color: '#888888', // Lighter gray for the "no items" text
    textAlign: 'center',
    marginTop: 20,
  },

  results: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004C54',  // Deep Teal
  },
  resultItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27c7b8',  // Accent border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  diagnosis: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',  // Dark Gray
    marginVertical: 6,
    lineHeight: 22,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7043',  // Coral Orange
    marginTop: 15,
    marginBottom: 5,
  },
  guidanceText: {
    fontSize: 16,
    color: '#333333',  // Dark Gray
    marginTop: 5,
    lineHeight: 22,
  },
  guidanceContentContainer: {
    marginTop: 15,
    paddingLeft: 10,
  },
  guidanceContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#27c7b8',  // Accent color
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 5,
    zIndex: 10,
    position: 'relative',
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#333333',  // Dark Gray
    paddingHorizontal: 10,
  },
  dropdownItem: {
    fontSize: 16,
    color: '#333333',  // Dark Gray
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 12,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27c7b8',  // Accent color
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  inputSecondary: {
    height: 40,
    borderColor: '#009688',  // Secondary teal color
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: 16,
    color: '#333333',  // Dark gray text
  },
  suggestionsList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  suggestionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',  // Dark gray text
  },
  diagnosisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleArrow: {
    fontSize: 16,
    marginLeft: 5,
  },
  boldTextAccent: {
    fontWeight: 'bold',
    color: '#27c7b8',  // Accent color
  },
  guidanceCard: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  collapsibleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  collapsibleContent: {
    marginBottom: 20,
  },
});
