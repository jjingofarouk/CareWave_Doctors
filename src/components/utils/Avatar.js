// components/common/Avatar.js
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Avatar = ({
  source,
  size = 'medium',
  onlineStatus,
  name,
  style,
  onError,
  backgroundColor,
  textColor = '#FFFFFF',
}) => {
  const [imageError, setImageError] = useState(false);

  // Size mappings
  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96
  };

  const avatarSize = typeof size === 'number' ? size : sizes[size];
  const fontSize = avatarSize * 0.4;

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent background color from name
  const generateBackgroundColor = (name) => {
    if (backgroundColor) return backgroundColor;
    
    const colors = [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', 
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
      '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
      '#FFC107', '#FF9800', '#FF5722', '#795548'
    ];
    
    if (!name) return colors[0];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Status indicator styles
  const getStatusStyle = () => {
    const statusColors = {
      online: '#4CAF50',
      away: '#FFC107',
      busy: '#F44336',
      offline: '#9E9E9E'
    };

    return {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: avatarSize * 0.3,
      height: avatarSize * 0.3,
      borderRadius: avatarSize * 0.15,
      backgroundColor: statusColors[onlineStatus] || statusColors.offline,
      borderWidth: 2,
      borderColor: '#FFFFFF'
    };
  };

  return (
    <View style={[styles.container, style]}>
      {(source && !imageError) ? (
        <Image
          source={typeof source === 'string' ? { uri: source } : source}
          style={[
            styles.image,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2
            }
          ]}
          onError={(error) => {
            setImageError(true);
            onError?.(error);
          }}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              backgroundColor: generateBackgroundColor(name)
            }
          ]}
        >
          <Text
            style={[
              styles.initials,
              {
                fontSize,
                color: textColor
              }
            ]}
          >
            {getInitials(name)}
          </Text>
        </View>
      )}
      
      {onlineStatus && (
        <View style={getStatusStyle()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  image: {
    backgroundColor: '#E1E1E1'
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  initials: {
    fontWeight: '600'
  }
});

Avatar.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
    PropTypes.string,
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    PropTypes.number
  ]),
  onlineStatus: PropTypes.oneOf(['online', 'away', 'busy', 'offline']),
  name: PropTypes.string,
  style: PropTypes.object,
  onError: PropTypes.func,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string
};

export default Avatar;

// Usage Example:
/*
import Avatar from '../common/Avatar';

// Image Avatar
<Avatar 
  source="https://example.com/avatar.jpg"
  size="large"
  onlineStatus="online"
/>

// Letter Avatar
<Avatar 
  name="John Doe"
  size="medium"
  onlineStatus="away"
/>

// Custom Size Avatar
<Avatar 
  source={require('../../assets/avatar.png')}
  size={72}
  backgroundColor="#FF5722"
/>
*/