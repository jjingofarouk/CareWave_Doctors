
// components/DoctorHome/PatientActivity.js
import React from 'react';
import { View, FlatList, TouchableOpacity, Image , Text} from 'react-native';
import { useTheme } from '../utils/useTheme';
import { timeAgo } from '../utils/dateUtils';

const PatientActivity = ({ activities, onActivityPress }) => {
  const { theme } = useTheme();

  const ActivityItem = ({ activity }) => (
    <TouchableOpacity
      style={styles.activityItem}
      onPress={() => onActivityPress(activity)}
    >
      <Image
        source={{ uri: activity.patientAvatar }}
        style={styles.avatar}
        defaultSource={require('./assets/avatar.png')}
      />
      
      <View style={styles.activityContent}>
        <Text style={styles.patientName}>{activity.patientName}</Text>
        <Text style={styles.activityText}>{activity.description}</Text>
        <Text style={styles.timeText}>{timeAgo(activity.timestamp)}</Text>
      </View>
      
      {activity.type === 'test_result' && (
        <View style={styles.resultBadge}>
          <Text style={styles.resultText}>New Result</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Patient Activity</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activities}
        renderItem={({ item }) => <ActivityItem activity={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = {
  container: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  // ... additional styles
};

export default PatientActivity;