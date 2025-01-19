import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { Picker } from '@react-native-picker/picker';

// Mock data and functions (replace with actual API calls in production)
const mockBeds = [
  { id: 1, status: 'available', priority: 'low' },
  { id: 2, status: 'occupied', priority: 'high' },
  { id: 3, status: 'cleaning', priority: 'medium' },
  { id: 4, status: 'maintenance', priority: 'low' },
  { id: 5, status: 'available', priority: 'medium' },
];

const mockPatients = [
  { id: 1, name: 'Shadrah Flower', condition: 'stable' },
  { id: 2, name: 'Kabuye Fahad', condition: 'critical' },
];

const mockWaitingList = [
  { id: 1, name: 'Alice Nakiryo', priority: 'high' },
  { id: 2, name: 'Kabanda Williams', priority: 'medium' },
];

const BedManagement = () => {
  const [beds, setBeds] = useState(mockBeds);
  const [patients, setPatients] = useState(mockPatients);
  const [waitingList, setWaitingList] = useState(mockWaitingList);
  const [notifications, setNotifications] = useState([]);
  const [selectedBedId, setSelectedBedId] = useState(null);

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      updateBedStatus();
      checkWaitingList();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateBedStatus = () => {
    setBeds(prevBeds => 
      prevBeds.map(bed => ({
        ...bed,
        status: ['available', 'occupied', 'cleaning', 'maintenance'][Math.floor(Math.random() * 4)]
      }))
    );
  };

  const checkWaitingList = () => {
    if (waitingList.length > 0) {
      const availableBed = beds.find(b => b.status === 'available');
      if (availableBed) {
        assignBed(waitingList[0].id, availableBed.id);
      }
    }
  };

  const assignBed = (patientId, bedId) => {
    setBeds(prevBeds => 
      prevBeds.map(bed => 
        bed.id === bedId ? { ...bed, status: 'occupied' } : bed
      )
    );
    setPatients(prevPatients => 
      prevPatients.filter(patient => patient.id !== patientId)
    );
    addNotification(`Patient assigned to bed ${bedId}`);
  };

  const dischargeBed = (bedId) => {
    setBeds(prevBeds => 
      prevBeds.map(bed => 
        bed.id === bedId ? { ...bed, status: 'cleaning' } : bed
      )
    );
    addNotification(`Patient discharged from bed ${bedId}`);
  };

  const addNotification = (message) => {
    setNotifications(prev => [...prev, { id: Date.now(), message }]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#4CAF50';
      case 'occupied': return '#D32F2F';
      case 'cleaning': return '#FFEB3B';
      case 'maintenance': return '#9E9E9E';
      default: return '#2196F3';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bed Management</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Bed Status</Text>
          <FlatList
            data={beds}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={[styles.status, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <Text>Bed {item.id}</Text>
                <Text style={styles.priority}>{item.priority}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Patient Assignment</Text>
          <FlatList
            data={patients}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <MaterialIcons name="person" size={16} style={styles.icon} />
                <Text>{item.name}</Text>
                <View style={[styles.status, { backgroundColor: item.condition === 'critical' ? '#D32F2F' : '#4CAF50' }]}>
                  <Text style={styles.statusText}>{item.condition}</Text>
                </View>
                <Picker
                  selectedValue={selectedBedId}
                  style={styles.picker}
                  onValueChange={(value) => setSelectedBedId(value)}
                >
                  <Picker.Item label="Select Bed" value={null} />
                  {beds.filter(b => b.status === 'available').map(bed => (
                    <Picker.Item key={bed.id} label={`Bed ${bed.id}`} value={bed.id} />
                  ))}
                </Picker>
                <TouchableOpacity
                  style={styles.assignButton}
                  onPress={() => assignBed(item.id, selectedBedId)}
                >
                  <Text style={styles.buttonText}>Assign Bed</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Waiting List</Text>
          <FlatList
            data={waitingList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <MaterialIcons name="schedule" size={16} style={styles.icon} />
                <Text>{item.name}</Text>
                <Text style={[styles.priority, { color: getStatusColor(item.priority) }]}>
                  {item.priority}
                </Text>
              </View>
            )}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Notifications</Text>
          <FlatList
            data={notifications}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.alert}>
                <MaterialIcons name="notifications" size={16} style={styles.icon} />
                <Text>{item.message}</Text>
              </View>
            )}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={updateBedStatus}
        >
          <MaterialIcons name="refresh" size={16} style={styles.icon} />
          <Text style={styles.buttonText}>Refresh Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dischargeButton}
          onPress={() => {
            const occupiedBed = beds.find(b => b.status === 'occupied');
            if (occupiedBed) dischargeBed(occupiedBed.id);
          }}
        >
          <MaterialIcons name="delete" size={16} style={styles.icon} />
          <Text style={styles.buttonText}>Discharge Patient</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  picker: {
    height: 50,
    width: 150,
  },
  assignButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
  },
  dischargeButton: {
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
  },
  status: {
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  priority: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#757575',
  },
  alert: {
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#FFEB3B',
    borderRadius: 5,
  },
});

export default BedManagement;
