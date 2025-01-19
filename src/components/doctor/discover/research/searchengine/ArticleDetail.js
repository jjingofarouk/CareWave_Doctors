// ArticleDetail.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Linking,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ArticleDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { article } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `${article.title}\nBy ${article.authors.join(', ')}\nPublished in ${article.journal}, ${article.year}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [article]);

  const handleSave = useCallback(() => {
    setIsSaved(!isSaved);
    // Add logic to save to local storage or backend
  }, [isSaved]);

  const handleDownloadPDF = useCallback(() => {
    // Implement PDF download functionality
    console.log('Downloading PDF...');
  }, []);

  const handleCiteArticle = useCallback(() => {
    // Implement citation copying functionality
    console.log('Copying citation...');
  }, []);

  const handleDOILink = useCallback(async () => {
    if (article.doi) {
      const url = `https://doi.org/${article.doi}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  }, [article.doi]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with navigation and actions */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Icon name="share-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Icon 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color="#2C3E50" 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Article Title */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Authors */}
        <Text style={styles.authors}>
          {article.authors.join(', ')}
        </Text>

        {/* Journal Info */}
        <View style={styles.journalInfo}>
          <Text style={styles.journal}>{article.journal}</Text>
          <Text style={styles.year}>{article.year}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {article.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Abstract */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abstract</Text>
          <Text style={styles.abstractText}>
            {article.abstract || 'Abstract not available'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={handleDownloadPDF}
          >
            <Icon name="download-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Download PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={handleCiteArticle}
          >
            <Icon name="copy-outline" size={20} color="#3498DB" />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Cite Article
            </Text>
          </TouchableOpacity>
        </View>

        {/* DOI Link */}
        {article.doi && (
          <TouchableOpacity 
            style={styles.doiLink}
            onPress={handleDOILink}
          >
            <Text style={styles.doiText}>DOI: {article.doi}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  authors: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 12,
  },
  journalInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  journal: {
    fontSize: 16,
    color: '#3498DB',
    marginRight: 8,
  },
  year: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#E8F6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#3498DB',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  abstractText: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  primaryButton: {
    backgroundColor: '#3498DB',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3498DB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#3498DB',
  },
  doiLink: {
    padding: 16,
    alignItems: 'center',
  },
  doiText: {
    color: '#3498DB',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ArticleDetail;