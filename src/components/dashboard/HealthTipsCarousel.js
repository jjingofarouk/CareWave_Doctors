
// components/DoctorHome/HealthTipsCarousel.js
import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Heart, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../utils/useTheme';

const HealthTipsCarousel = ({ tips, onTipPress }) => {
  const { theme } = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth * 0.75;

  const TipCard = ({ tip }) => (
    <TouchableOpacity
      style={[styles.tipCard, { width: cardWidth }]}
      onPress={() => onTipPress(tip)}
    >
      <View style={styles.categoryBadge}>
        <Heart size={16} color={theme.colors.primary} />
        <Text style={styles.category}>{tip.category}</Text>
      </View>
      
      <Text style={styles.tipTitle}>{tip.title}</Text>
      <Text style={styles.tipDescription} numberOfLines={3}>
        {tip.description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.readMore}>Read More</Text>
        <ArrowRight size={16} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Tips</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {tips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    marginVertical: 16,
  },
  // ... additional styles
};

export default HealthTipsCarousel;