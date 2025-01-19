// MedicalLiteratureSearchEngine.js
import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SearchHeader } from './SearchHeader';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { ResultCard } from './ResultCard';
import { SortingDropdown } from './Sorting';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';
import { SavedSearches } from './SavedSearches';
import { ExportOptions } from './ExportOptions';

// Moved API call outside component
const searchMedicalLiterature = async (query, filters, sortOption) => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: '1',
            title: 'Recent Advances in COVID-19 Treatment',
            authors: ['Smith, J.', 'Johnson, M.'],
            journal: 'Journal of Medical Research',
            year: '2024',
            tags: ['COVID-19', 'Treatment', 'Clinical Trial']
          },
        ]
      });
    }, 1500);
  });
};

const ReSearch = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(['All']);
  const [sortOption, setSortOption] = useState('Relevance');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchMedicalLiterature(searchQuery, activeFilters, sortOption);
      setResults(response.data);
      
      const newSearch = {
        id: Date.now().toString(),
        query: searchQuery,
        date: new Date().toLocaleDateString(),
      };
      setSavedSearches(prev => [newSearch, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeFilters, sortOption]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilters(prev => {
      if (filter === 'All') return ['All'];
      const newFilters = prev.filter(f => f !== 'All');
      return newFilters.includes(filter)
        ? newFilters.filter(f => f !== filter)
        : [...newFilters, filter];
    });
  }, []);

  const handleArticlePress = useCallback((article) => {
    navigation.navigate('Detail', { article });
  }, [navigation]);

  const handleSearchSelect = useCallback((savedSearch) => {
    setSearchQuery(savedSearch.query);
    handleSearch();
  }, [handleSearch]);

  const handleSearchDelete = useCallback((searchId) => {
    setSavedSearches(prev => prev.filter(search => search.id !== searchId));
  }, []);

  const handleExport = useCallback((format) => {
    switch (format) {
      case 'pdf':
        console.log('Exporting to PDF:', results);
        break;
      case 'bibtex':
        console.log('Exporting to BibTeX:', results);
        break;
      case 'citation':
        console.log('Exporting citations:', results);
        break;
    }
  }, [results]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader />
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />
      
      <SavedSearches 
        searches={savedSearches}
        onSearchSelect={handleSearchSelect}
        onSearchDelete={handleSearchDelete}
      />
      
      <FilterPanel 
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />
      
      <SortingDropdown 
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <NoResults message={error} />
      ) : results.length === 0 ? (
        <NoResults />
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {results.map((article) => (
            <ResultCard
              key={article.id}
              article={article}
              onPress={() => handleArticlePress(article)}
            />
          ))}
        </ScrollView>
      )}

      <ExportOptions onExport={handleExport} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  resultsContainer: {
    flex: 1,
  },
});

export default ReSearch;