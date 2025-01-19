import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Search, Download, Award, Clock } from 'lucide-react-native'; // Assuming a React Native compatible library for icons
import { categories } from './Categories';
import { cmeCourses } from './Courses';

const ITEMS_PER_PAGE = 5;

const CME = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...cmeCourses];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Apply difficulty filter
    if (difficulty !== 'All') {
      filtered = filtered.filter(course => course.difficulty === difficulty);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'credits':
          return b.credits - a.credits;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, difficulty, sortBy]);

  // Pagination logic
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Search and Filters */}
      <View style={{ marginBottom: 20 }}>
        <View style={styles.searchContainer}>
          <Search style={styles.searchIcon} />
          <TextInput
            placeholder="Search CME courses..."
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        <View style={styles.filterContainer}>
          <TextInput
            style={styles.filterInput}
            value={selectedCategory}
            onChangeText={setSelectedCategory}
            placeholder="Category"
          />
          <TextInput
            style={styles.filterInput}
            value={difficulty}
            onChangeText={setDifficulty}
            placeholder="Difficulty"
          />
          <TextInput
            style={styles.filterInput}
            value={sortBy}
            onChangeText={setSortBy}
            placeholder="Sort by"
          />
        </View>
      </View>

      {/* Course List */}
      <FlatList
        data={paginatedCourses}
        renderItem={({ item: course }) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>{course.category}</Text>
                  <Text style={styles.tag}>{course.difficulty}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Download style={styles.downloadIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.courseDetails}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>
                  <Award style={styles.icon} />
                  {course.credits} Credits
                </Text>
                <Text style={styles.detailsText}>
                  <Clock style={styles.icon} />
                  {course.duration}
                </Text>
              </View>

              <Text style={styles.keyTopicsTitle}>Key Topics:</Text>
              <View style={styles.keyTopics}>
                {course.highlights.map((highlight, index) => (
                  <Text key={index} style={styles.keyTopic}>
                    {highlight}
                  </Text>
                ))}
              </View>

              <TouchableOpacity
                style={styles.startCourseButton}
                onPress={() => navigation.navigate(course.component)} // Navigate to the course screen
              >
                <Text style={styles.startCourseButtonText}>
                  Start Course
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>
          {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    height: 20,
    width: 20,
    color: '#777',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 35,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterInput: {
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    flex: 1,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002432',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  tag: {
    backgroundColor: '#27c7b8',
    color: '#fff',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  downloadButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f78837',
  },
  downloadIcon: {
    height: 20,
    width: 20,
    color: '#fff',
  },
  courseDetails: {
    marginTop: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailsText: {
    color: '#555',
    fontSize: 14,
  },
  icon: {
    height: 16,
    width: 16,
    color: '#27c7b8',
  },
  keyTopicsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002432',
  },
  keyTopics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  keyTopic: {
    backgroundColor: '#27c7b8',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    fontSize: 12,
  },
  startCourseButton: {
    marginTop: 12,
    backgroundColor: '#27c7b8',
    paddingVertical: 12,
    borderRadius: 8,
  },
  startCourseButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    backgroundColor: '#f78837',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  paginationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paginationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002432',
  },
});

export default CME;

