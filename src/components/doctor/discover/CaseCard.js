import React from 'react';
import { View, TouchableOpacity, Image, Text, Animated } from 'react-native';
import { styles } from './CaseStyles';

export const CaseCard = ({ 
  item, 
  index,
  viewMode,
  handleCaseSelect, // Changed from onPress to match parent
  slideAnimation,
  style 
}) => {
  const imageUrl = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;
  
  return (
    <Animated.View
      style={[
        styles.caseCard,
        style,
        viewMode === 'grid' ? styles.gridCard : styles.listCard,
        {
          transform: [{
            scale: slideAnimation?.interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 1]
            }) || 1
          }]
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => handleCaseSelect(item)} // Changed to handleCaseSelect
        activeOpacity={0.8}
        style={styles.cardTouchable}
      >
        <Image
          source={{ uri: imageUrl || '/api/placeholder/400/320' }}
          style={[
            styles.cardImage,
            viewMode === 'grid' ? styles.gridImage : styles.listImage
          ]}
          resizeMode="cover"
        />

        <View style={[
          styles.cardContent,
          viewMode === 'grid' ? styles.gridContent : styles.listContent
        ]}>
          <Text 
            style={styles.cardTitle}
            numberOfLines={viewMode === 'grid' ? 2 : 1}
          >
            {item.title}
          </Text>

          {item.categories?.length > 0 && (
            <View style={styles.categoriesContainer}>
              {item.categories.slice(0, viewMode === 'grid' ? 1 : 2).map(category => (
                <Text key={category} style={styles.categoryTag}>
                  {category}
                </Text>
              ))}
            </View>
          )}

          <Text 
            style={styles.cardDescription}
            numberOfLines={viewMode === 'grid' ? 3 : 2}
          >
            {item.description}
          </Text>

          <View style={styles.cardFooter}>
            <Text style={styles.cardDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            {Array.isArray(item.imageUrl) && (
              <Text style={styles.imageCount}>
                {item.imageUrl.length} images
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};