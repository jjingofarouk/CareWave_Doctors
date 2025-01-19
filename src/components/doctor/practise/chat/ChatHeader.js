// src/components/ChatHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from './theme';
import { StyleSheet } from 'react-native';

export const ChatHeader = ({ doctor, navigation, onVideoCall, onAudioCall, onMorePress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={COLORS.background} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.profileSection}
        onPress={() => navigation.navigate('DoctorProfile', { doctorId: doctor.id })}
      >
        <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: doctor.status === 'online' ? COLORS.secondary : COLORS.textSecondary }]} />
            <Text style={styles.statusText}>{`${doctor.specialty} • ${doctor.hospital}`}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onAudioCall}>
          <Feather name="phone" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onVideoCall}>
          <MaterialIcons name="video-call" size={24} color={COLORS.background} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMorePress}>
          <Feather name="more-vertical" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    paddingVertical: 4,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  doctorName: {
    ...FONTS.h4,
    color: COLORS.white,
    marginBottom: 2,
    fontWeight: '600',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    ...FONTS.body5,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});

