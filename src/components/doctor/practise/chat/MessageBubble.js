// src/components/MessageBubble.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from './theme';

export const MessageBubble = ({ message, isDoctor, onAttachmentPress }) => {
  const renderAttachment = (attachment, index) => {
    switch (attachment.type) {
      case 'image':
        return (
          <TouchableOpacity 
            key={index}
            onPress={() => onAttachmentPress(attachment)}
          >
            <Image
              source={{ uri: attachment.uri }}
              style={styles.attachmentImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      case 'video':
        return (
          <TouchableOpacity 
            key={index}
            style={styles.videoContainer}
            onPress={() => onAttachmentPress(attachment)}
          >
            <Image
              source={{ uri: attachment.thumbnail }}
              style={styles.videoThumbnail}
            />
            <View style={styles.playButton}>
              <Feather name="play" size={24} color={COLORS.background} />
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity 
            key={index}
            style={styles.documentContainer}
            onPress={() => onAttachmentPress(attachment)}
          >
            <Feather name="file" size={24} color={COLORS.primary} />
            <Text style={styles.documentName}>{attachment.name}</Text>
          </TouchableOpacity>
        );
    }
  };

  return (
    <View style={[styles.bubble, isDoctor ? styles.doctorBubble : styles.patientBubble]}>
      {message.text && (
        <Text style={styles.messageText}>{message.text}</Text>
      )}
      {message.attachments?.map((attachment, index) => renderAttachment(attachment, index))}
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
        {isDoctor && (
          <View style={styles.statusContainer}>
            {message.status === 'read' && <Feather name="check-circle" size={12} color={COLORS.secondary} />}
            {message.status === 'delivered' && <Feather name="check" size={12} color={COLORS.textSecondary} />}
            {message.status === 'sent' && <Feather name="clock" size={12} color={COLORS.textSecondary} />}
          </View>
        )}
      </View>
    </View>
  );
};