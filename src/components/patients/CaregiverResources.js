import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const CaregiverResources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchResources = async () => {
      const dummyData = [
        { id: 1, title: 'Caregiver Support Guide', category: 'General', link: '/resources/caregiver-support' },
        { id: 2, title: 'Self-Care for Caregivers', category: 'Self-Care', link: '/resources/self-care' },
        { id: 3, title: 'Local Support Groups for Caregivers', category: 'Support Groups', link: '/resources/support-groups' },
        { id: 4, title: 'Mental Health Resources for Caregivers', category: 'Mental Health', link: '/resources/mental-health' },
        { id: 5, title: 'Respite Care Options', category: 'Respite Care', link: '/resources/respite-care' },
      ];
      setResources(dummyData);
      setFilteredResources(dummyData);
    };
    fetchResources();
  }, []);

  useEffect(() => {
    const filtered = resources.filter((resource) => {
      const isCategoryMatch =
        selectedCategory === 'All' || resource.category === selectedCategory;
      const isSearchMatch = resource.title.toLowerCase().includes(search.toLowerCase());
      return isCategoryMatch && isSearchMatch;
    });
    setFilteredResources(filtered);
  }, [search, selectedCategory, resources]);

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Caregiver Resources</Text>
      
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          value={search}
          onChangeText={handleSearchChange}
        />
      </View>

      <View style={styles.categoryFilters}>
        {['General', 'Self-Care', 'Support Groups', 'Mental Health', 'Respite Care', 'All'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, selectedCategory === category && styles.selectedFilterButton]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text style={[styles.filterText, selectedCategory === category && styles.selectedFilterText]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.resourcesList}>
        {filteredResources.length > 0 ? (
          <FlatList
            data={filteredResources}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.resourceCard}>
                <Text style={styles.resourceTitle}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => alert('Navigating to: ' + item.link)}
                >
                  <Text style={styles.linkText}>View Resource</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noResourcesText}>No resources found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#009688',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#004C54',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedFilterText: {
    color: '#FF7043',
  },
  resourcesList: {
    paddingBottom: 20,
  },
  resourceCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  linkButton: {
    marginTop: 10,
    backgroundColor: '#FF7043',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  noResourcesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default CaregiverResources;
