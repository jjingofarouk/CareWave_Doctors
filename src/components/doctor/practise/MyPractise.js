import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_DOCTORS } from './chat/mockData';

const { width } = Dimensions.get('window');

const PriorityBadge = ({ priority }) => (
  <View style={[styles.priorityBadge, 
    priority === 'high' ? styles.highPriority : 
    priority === 'medium' ? styles.mediumPriority : 
    styles.lowPriority
  ]}>
    <Text style={styles.priorityText}>{priority}</Text>
  </View>
);

const PracticeCard = ({ icon, title, description, priority, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
    <LinearGradient
      colors={[priority === 'high' ? '#27C7B8' : 
               priority === 'medium' ? '#F78837' : 
               '#DFE4E5', 
               '#002432']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardGradient}
    >
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={24} color="#DFE4E5" />
        <PriorityBadge priority={priority} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.viewMore}>View Details</Text>
        <MaterialCommunityIcons name="arrow-right" size={20} color="#DFE4E5" />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const CategoryButton = ({ title, active, onPress }) => (
  <TouchableOpacity 
    style={[styles.categoryButton, active && styles.categoryButtonActive]} 
    onPress={onPress}
  >
    <Text style={[styles.categoryButtonText, active && styles.categoryButtonTextActive]}>
      {title}
    </Text>
  </TouchableOpacity>
);

function MyPractice({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'High Priority', 'Financial', 'Education'];

  const getDoctor = () => {
    // Since we only have one doctor in the mock data, we'll use that one
    return MOCK_DOCTORS[0];
  };

  const cards = [
    {
      icon: 'currency-usd',
      title: 'Revenue & Expenses',
      description: 'Monitor your income trends and optimize revenue streams.',
      navigateTo: 'Revenue',
      priority: 'high',
      category: 'Financial',
      doctor: getDoctor(),
    },
    {
      icon: 'video',
      title: 'Analytics',
      description: 'Gain insights into your practice performance with detailed reports.',
      navigateTo: 'Analytics',
      priority: 'low',
      category: 'Financial',
      doctor: getDoctor(),
    },
    {
      icon: 'shield-lock',
      title: 'DocConnect',
      description: 'Access, review, and manage consent forms and legal agreements.',
      navigateTo: 'Doctor Network',
      priority: 'low',
      category: 'Education',
      doctor: getDoctor(),
    },
  ];

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
                          (activeCategory === 'High Priority' && card.priority === 'high') ||
                          card.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardPress = (card) => {
    if (card.navigateTo === 'Doctor Network' && card.doctor) {
      console.log('Navigating to Doctor Network with:', {
        doctorId: card.doctor.id,
        doctorName: card.doctor.name,
        title: card.title
      });
      
      navigation.navigate(card.navigateTo, {
        doctorId: card.doctor.id,
        doctorName: card.doctor.name,
        title: card.title,
        description: card.description,
        specialty: card.doctor.specialty,
        hospital: card.doctor.hospital
      });
    } else {
      navigation.navigate(card.navigateTo);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#002432" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search practice tools..."
          placeholderTextColor="#002432"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category}
            title={category}
            active={activeCategory === category}
            onPress={() => setActiveCategory(category)}
          />
        ))}
      </ScrollView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {filteredCards.map((card, index) => (
          <PracticeCard
            key={index}
            {...card}
            onPress={() => handleCardPress(card)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE4E5',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 16,
    color: '#002432',
    opacity: 0.7,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#002432',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#002432',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#002432',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    minHeight: 50,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    marginRight: 10,
    shadowColor: '#002432',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxHeight: 40,
  },
  categoryButtonActive: {
    backgroundColor: '#27C7B8',
    maxHeight: 40,
  },
  categoryButtonText: {
    color: '#002432',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  cardsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#002432',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  highPriority: {
    backgroundColor: '#27C7B8',
  },
  mediumPriority: {
    backgroundColor: '#F78837',
  },
  lowPriority: {
    backgroundColor: '#DFE4E5',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#002432',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DFE4E5',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#DFE4E5',
    opacity: 0.8,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DFE4E5',
    marginRight: 8,
  },
});

export default MyPractice;