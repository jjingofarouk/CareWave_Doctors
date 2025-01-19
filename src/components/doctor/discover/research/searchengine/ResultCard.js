// ResultCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ResultCard = ({ article, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.authors}>{article.authors.join(', ')}</Text>
      <Text style={styles.journal}>{article.journal} • {article.year}</Text>
      <View style={styles.tagsContainer}>
        {article.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  authors: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  journal: {
    fontSize: 14,
    color: '#3498DB',
    marginTop: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#E8F6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 8,
    marginTop: 5,
  },
  tagText: {
    color: '#3498DB',
    fontSize: 12,
  },
});