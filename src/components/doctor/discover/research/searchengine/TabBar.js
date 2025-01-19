import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTheme } from './theme';

const TabBar = ({ activeTab, onTabChange, tabs }) => {
  const theme = useTheme();
  const [indicatorPosition] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    Animated.spring(indicatorPosition, {
      toValue: activeIndex,
      useNativeDriver: false,
      tension: 100,
      friction: 10
    }).start();
  }, [activeTab, tabs]);

  const indicatorStyle = {
    transform: [{
      translateX: indicatorPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100] // Adjust based on your tab width
      })
    }]
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => onTabChange(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.colors.text },
                activeTab === tab.id && styles.activeTabText
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[
          styles.indicator,
          { backgroundColor: theme.colors.primary },
          indicatorStyle
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabsContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '50%', // Adjust based on number of tabs
  },
});

export { TabBar };