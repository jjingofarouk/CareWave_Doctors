// components/Header/Header.js
import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export const Header = ({ fadeAnim, slideAnim }) => (
  <Animated.View
    style={[
      styles.headerContainer,
      {
        opacity: fadeAnim,
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      },
    ]}
  >
    <Text style={styles.header}>Clinical Text Analysis</Text>
    <Text style={styles.subHeader}>Advanced Medical Documentation Analysis Tool</Text>
  </Animated.View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#002432', // Ocean Obsidian for a modern, sleek background
    borderBottomWidth: 2,
    borderBottomColor: '#27C7B8', // Teal Tide for a soft, vibrant border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Adds a subtle shadow effect for modern aesthetics
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DFE4E5', // Coral Cloud for a light, contrasting header color
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Helvetica Neue', // Modern font style
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '300',
    color: '#F78837', // Tangerine Tango for a vibrant subheader
    textAlign: 'center',
    fontFamily: 'Helvetica Neue', // Modern font style
    marginTop: 4,
  },
});

