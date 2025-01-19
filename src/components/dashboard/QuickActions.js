// components/DoctorHome/QuickActions.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { 
  Video, 
  MessageSquare, 
  FileText, 
  Activity 
} from 'lucide-react-native';
import { useTheme } from '../utils/useTheme';

const QuickActions = ({ 
  onVideoCall, 
  onChat, 
  onPrescribe, 
  onReports 
}) => {
  const { theme } = useTheme();
  
  const actions = [
    {
      icon: Video,
      label: 'Video Call',
      onPress: onVideoCall,
      color: '#4CAF50'
    },
    {
      icon: MessageSquare,
      label: 'Chat',
      onPress: onChat,
      color: '#2196F3'
    },
    {
      icon: FileText,
      label: 'Prescribe',
      onPress: onPrescribe,
      color: '#9C27B0'
    },
    {
      icon: Activity,
      label: 'Reports',
      onPress: onReports,
      color: '#F44336'
    }
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
              <Icon color={action.color} size={24} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // ... additional styles
};

export default QuickActions;