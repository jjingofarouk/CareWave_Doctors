// src/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Existing styles
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Light Gray for background
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: '#004C54', // Deep Teal for hero section
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#009688', // Medium Teal for button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  features: {
    padding: 20,
  },
  featuresHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004C54', // Deep Teal for header
    marginBottom: 10,
  },
  featuresSubtext: {
    fontSize: 16,
    color: '#333333', // Dark Gray for subtext
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '45%',
    marginBottom: 20,
    alignItems: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54', // Deep Teal for feature title
  },
  featureText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333333', // Dark Gray for feature description
  },
  roleSelectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  roleSelectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 30,
  },
  roleButton: {
    backgroundColor: '#009688',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginVertical: 10,
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

   // Sidebar styles (Updated)
   sidebarContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 30,
    width: '80%', // Adjusting width to be a percentage of the screen size
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden', // Prevent overflow of content
    transition: 'width 0.3s ease-in-out', // Smooth transition for width change
  },
  
  sidebarContainerReduced: {
    width: '60%', // Reduced width for compact mode, dynamic percentage
  },
  
  menuSection: {
    marginBottom: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F5F7FA', // Subtle background for each header
    borderRadius: 5,
    paddingVertical: 5,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54', // Deep Teal for section title
    marginLeft: 10,
    textTransform: 'capitalize', // Make the titles slightly cleaner
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5, // Adding spacing between menu items
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333', // Dark Gray for menu items
  },

  // Home Button Style
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#004C54', // Deep Teal background for home button
    borderRadius: 5,
    marginBottom: 20, // Space between the button and other items
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for home button
    marginLeft: 10,
  },
});