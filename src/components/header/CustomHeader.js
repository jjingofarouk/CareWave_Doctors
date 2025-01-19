// src/components/header/CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Menu Icon on the left */}
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Title in the middle */}
      <Text style={styles.headerTitle}>Your Component Name</Text>

      {/* Profile Icon on the right */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Icon name="account-circle" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: '#004C54', // Match your header background color
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});

export default CustomHeader;
