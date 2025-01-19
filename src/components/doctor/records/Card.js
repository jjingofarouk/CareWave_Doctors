import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ style, children }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const CardHeader = ({ style, children }) => (
  <View style={[styles.cardHeader, style]}>
    {children}
  </View>
);

const CardTitle = ({ style, children }) => (
  <Text style={[styles.cardTitle, style]}>
    {children}
  </Text>
);

const CardDescription = ({ style, children }) => (
  <Text style={[styles.cardDescription, style]}>
    {children}
  </Text>
);

const CardContent = ({ style, children }) => (
  <View style={[styles.cardContent, style]}>
    {children}
  </View>
);

const CardFooter = ({ style, children }) => (
  <View style={[styles.cardFooter, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  cardContent: {
    padding: 16,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};