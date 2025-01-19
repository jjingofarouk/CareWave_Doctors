import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const COLORS = {
  coralCloud: '#DFE4E5',
  oceanObsidian: '#002432',
  tealTide: '#27C7B8',
  tangerineTango: '#F78837',
  white: '#FFFFFF',
  transparent: 'transparent'
};

const RESEARCH_TOOLS = [
  {
    id: "clinicalTrials",
    name: "Clinical Trials",
    description: "Manage and view clinical trial data with advanced analytics",
    icon: "science",
    category: "Clinical Research",
    features: ["Real-time monitoring", "Data visualization", "Protocol tracking"],
    screenName: "ClinicalTrials"
  },



  {
    id: "TextAnalysis",
    name: "Clinical Text Analysis",
    description: "Advanced analytics with AI-powered insights",
    icon: "analytics",
    category: "Analytics",
    features: ["Pattern recognition", "Automated coding", "Report generation"],
    screenName: "Clinical Text Analysis"
  }
];

const FeatureBadge = React.memo(({ feature }) => (
  <View style={styles.featureBadge}>
    <Text style={styles.featureText}>{feature}</Text>
  </View>
));

const ToolCard = React.memo(({ 
  tool, 
  onSelect,
  scaleAnimation 
}) => {
  const navigation = useNavigation();

  const handleLaunch = useCallback(() => {
    navigation.navigate(tool.screenName, { toolData: tool });
  }, [navigation, tool]);

  return (
    <Animated.View
      style={[
        styles.card,
        { transform: [{ scale: scaleAnimation }] }
      ]}
    >
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => onSelect(tool)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Icon name={tool.icon} size={28} color={COLORS.tealTide} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{tool.category}</Text>
          </View>
        </View>

        <Text style={styles.toolName}>{tool.name}</Text>
        <Text style={styles.toolDescription}>{tool.description}</Text>

        <View style={styles.featureContainer}>
          {tool.features.map(feature => (
            <FeatureBadge key={feature} feature={feature} />
          ))}
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.launchButton}
            onPress={handleLaunch}
            activeOpacity={0.7}
          >
            <Text style={styles.launchButtonText}>Launch Tool</Text>
            <Icon name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ResearchTools = () => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const animateSelection = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnimation]);

  const handleToolSelect = useCallback((tool) => {
    animateSelection();
  }, [animateSelection]);

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.header}>Research Tools</Text>
      <Text style={styles.subheader}>Select from our suite of clinical research tools</Text>
      
      <View style={styles.cardsContainer}>
        {RESEARCH_TOOLS.map(tool => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onSelect={handleToolSelect}
            scaleAnimation={scaleAnimation}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.coralCloud,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.oceanObsidian,
    marginTop: 24,
    marginHorizontal: 16,
  },
  subheader: {
    fontSize: 16,
    color: COLORS.oceanObsidian,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    opacity: 0.8,
  },
  cardsContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.coralCloud,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.oceanObsidian,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: COLORS.coralCloud,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: COLORS.oceanObsidian,
    fontSize: 12,
    fontWeight: '600',
  },
  toolName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.oceanObsidian,
    marginBottom: 8,
  },
  toolDescription: {
    fontSize: 14,
    color: COLORS.oceanObsidian,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  featureBadge: {
    backgroundColor: COLORS.coralCloud,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.oceanObsidian,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  launchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tangerineTango,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  launchButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  }
});

export default ResearchTools;