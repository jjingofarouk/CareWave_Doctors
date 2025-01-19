import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // React Native compatible icons

// Components for individual sections
const ForumThreads = ({ posts }) => {
  if (!posts.length) return <Text>No threads available.</Text>;
  return (
    <View style={styles.sectionContainer}>
      {posts.map(post => (
        <View key={post.id} style={styles.card}>
          <Text style={styles.cardTitle}>{post.title}</Text>
          <Text style={styles.cardDescription}>{post.user.username} • {post.created_at}</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{post.replyCount} replies</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="thumb-up" size={16} color="#002432" />
              <Text style={styles.iconText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="share-variant" size={16} color="#002432" />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const PopularPosts = ({ posts }) => {
  if (!posts.length) return <Text>No popular posts available.</Text>;
  return (
    <View style={styles.sectionContainer}>
      {posts.map(post => (
        <View key={post.id} style={styles.card}>
          <Text style={styles.cardTitle}>{post.title}</Text>
          <Text style={styles.cardDescription}>{post.user.username} • {post.created_at}</Text>
          <View style={styles.cardContent}>
            <Icon name="trending-up" size={20} style={styles.trendingIcon} />
            <Text style={styles.cardText}>Trending</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const UserProfiles = ({ profiles }) => {
  if (!profiles.length) return <Text>No profiles available.</Text>;
  return (
    <FlatList
      data={profiles}
      renderItem={({ item }) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardText}>{item.bio}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const EducationalContent = ({ content }) => {
  if (!content.length) return <Text>No educational content available.</Text>;
  return (
    <View style={styles.sectionContainer}>
      {content.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.type} - {item.date}</Text>
          <Text style={styles.cardText}>{item.summary}</Text>
        </View>
      ))}
    </View>
  );
};

const CommunitySupport = ({ supportGroups }) => {
  if (!supportGroups.length) return <Text>No support groups available.</Text>;
  return (
    <View style={styles.sectionContainer}>
      {supportGroups.map(group => (
        <View key={group.id} style={styles.card}>
          <Text style={styles.cardTitle}>{group.name}</Text>
          <Text style={styles.cardDescription}>{group.description}</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const MentalHealthResources = ({ resources }) => {
  if (!resources.length) return <Text>No mental health resources available.</Text>;
  return (
    <View style={styles.sectionContainer}>
      {resources.map(resource => (
        <View key={resource.id} style={styles.card}>
          <Text style={styles.cardTitle}>{resource.title}</Text>
          <Text style={styles.cardDescription}>{resource.type}</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="video" size={20} color="#002432" />
            <Text style={styles.iconText}>Watch</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const SDOH = ({ factors }) => {
  if (!factors.length) return <Text>No SDOH factors available.</Text>;
  return (
    <View style={styles.sectionContainer}>
      {factors.map(factor => (
        <View key={factor.id} style={styles.card}>
          <Text style={styles.cardTitle}>{factor.name}</Text>
          <Text style={styles.cardDescription}>{factor.description}</Text>
        </View>
      ))}
    </View>
  );
};

const Forum = () => {
  const [selectedSection, setSelectedSection] = useState('forumThreads');

  const samplePosts = [
    { id: 1, title: 'Latest Medical Advances', user: { username: 'Dr. Smith' }, created_at: '2024-09-10', replyCount: 5 },
    { id: 2, title: 'COVID-19 Discussion', user: { username: 'Dr. Adams' }, created_at: '2024-09-09', replyCount: 3 },
  ];

  const userProfiles = [
    { id: 1, name: 'Dr. Smith', bio: 'Medical researcher and doctor.' },
    { id: 2, name: 'Dr. Adams', bio: 'Expert in infectious diseases.' },
  ];

  const educationalContent = [
    { id: 1, title: 'Understanding Hypertension', type: 'Article', date: '2024-09-15', summary: 'An in-depth guide to managing hypertension.' },
    { id: 2, title: 'Managing Diabetes', type: 'Webinar', date: '2024-09-16', summary: 'Learn the latest strategies for diabetes management.' },
  ];

  const supportGroups = [
    { id: 1, name: 'Hypertension Support Group', description: 'A safe space for those managing high blood pressure.' },
    { id: 2, name: 'Diabetes Warriors', description: 'A community for patients with diabetes to share experiences and tips.' },
  ];

  const mentalHealthResources = [
    { id: 1, title: 'Stress Management Techniques', type: 'Video', link: 'https://www.example.com/video1' },
    { id: 2, title: 'Coping with Anxiety', type: 'Article', link: 'https://www.example.com/article1' },
  ];

  const socialDeterminants = [
    { id: 1, name: 'Housing Stability', description: 'Access to stable housing is crucial for managing health outcomes.' },
    { id: 2, name: 'Transportation Access', description: 'Reliable transportation ensures timely healthcare visits.' },
  ];

  const renderSectionContent = () => {
    console.log(`Rendering section: ${selectedSection}`);
    switch (selectedSection) {
      case 'forumThreads':
        return <ForumThreads posts={samplePosts} />;
      case 'popularPosts':
        return <PopularPosts posts={samplePosts} />;
      case 'userProfiles':
        return <UserProfiles profiles={userProfiles} />;
      case 'educationalContent':
        return <EducationalContent content={educationalContent} />;
      case 'communitySupport':
        return <CommunitySupport supportGroups={supportGroups} />;
      case 'mentalHealthResources':
        return <MentalHealthResources resources={mentalHealthResources} />;
      case 'sdoh':
        return <SDOH factors={socialDeterminants} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MedHub Community</Text>

      {/* Section navigation */}
      <ScrollView horizontal style={styles.tabs}>
        {['Threads', 'Popular', 'Users', 'Education', 'Support', 'Mental Health', 'Social Factors'].map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, selectedSection === section.toLowerCase() && styles.activeTab]}
            onPress={() => setSelectedSection(section.toLowerCase())}
          >
            <Text style={[styles.tabText, selectedSection === section.toLowerCase() && styles.activeTabText]}>
              {section}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section content */}
      {renderSectionContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', // Light Gray
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#009688', // Medium Teal
  },
  activeTabText: {
    color: '#fff', // White text when active
  },
  tabText: {
    fontSize: 16,
    color: '#333', // Dark Gray
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
  },
  cardDescription: {
    color: '#555',
    marginVertical: 10,
    fontSize: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#333', // Dark Gray
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 14,
    color: '#002432',
    marginLeft: 5,
  },
  trendingIcon: {
    color: '#FF7043', // Coral Orange
  },
  joinButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF7043', // Coral Orange
    borderRadius: 5,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Forum;
