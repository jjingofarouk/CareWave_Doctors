import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const CommunityPartnerships = () => {
  const navigation = useNavigation();
  const [partners, setPartners] = useState([
    { id: '1', name: 'Local Pharmacy', type: 'Pharmacy', collaboration: 'Vaccine Drive', status: 'Active', impact: 500, lastContact: '2023-10-15' },
    { id: '2', name: 'Wellness Center', type: 'Fitness', collaboration: 'Fitness Programs', status: 'Active', impact: 300, lastContact: '2023-10-20' },
    { id: '3', name: 'Community College', type: 'Education', collaboration: 'Health Education Workshops', status: 'Pending', impact: 0, lastContact: '2023-10-18' },
    { id: '4', name: 'Local Food Bank', type: 'Nutrition', collaboration: 'Healthy Eating Initiative', status: 'Active', impact: 750, lastContact: '2023-10-12' },
  ]);

  const [events, setEvents] = useState([
    { id: '1', title: 'Vaccine Drive', partner: 'Local Pharmacy', date: '2023-11-15', attendees: 200 },
    { id: '2', title: 'Fitness Workshop', partner: 'Wellness Center', date: '2023-11-20', attendees: 50 },
  ]);

  const [messages, setMessages] = useState([
    { id: '1', partner: 'Local Pharmacy', date: '2023-10-15', content: 'Confirming next month\'s vaccine drive details.' },
    { id: '2', partner: 'Wellness Center', date: '2023-10-20', content: 'Proposal for new yoga classes received.' },
  ]);

  const [newPartner, setNewPartner] = useState({ name: '', type: '', collaboration: '', status: 'Pending' });
  const [isAddPartnerModalVisible, setIsAddPartnerModalVisible] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const addPartner = () => {
    setPartners([...partners, { ...newPartner, id: (partners.length + 1).toString(), impact: 0, lastContact: new Date().toISOString().split('T')[0] }]);
    setNewPartner({ name: '', type: '', collaboration: '', status: 'Pending' });
    setIsAddPartnerModalVisible(false);
  };

  const deletePartner = (id) => {
    setPartners(partners.filter(partner => partner.id !== id));
  };

  const updatePartner = (id, updates) => {
    setPartners(partners.map(partner => partner.id === id ? { ...partner, ...updates } : partner));
  };

  const getPartnerStats = () => {
    const total = partners.length;
    const active = partners.filter(p => p.status === 'Active').length;
    const pending = partners.filter(p => p.status === 'Pending').length;
    const totalImpact = partners.reduce((sum, p) => sum + p.impact, 0);
    return { total, active, pending, totalImpact };
  };

  const stats = getPartnerStats();

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Community Partnerships Hub</Text>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>Manage and track collaborations with community partners for health programs.</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ width: '48%', backgroundColor: '#fff', padding: 12, borderRadius: 8 }}>
          <Text>Total Partners</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{stats.total}</Text>
        </View>
        <View style={{ width: '48%', backgroundColor: '#fff', padding: 12, borderRadius: 8 }}>
          <Text>Active Partnerships</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{stats.active}</Text>
        </View>
        <View style={{ width: '48%', backgroundColor: '#fff', padding: 12, borderRadius: 8 }}>
          <Text>Pending Partnerships</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{stats.pending}</Text>
        </View>
        <View style={{ width: '48%', backgroundColor: '#fff', padding: 12, borderRadius: 8 }}>
          <Text>Total Impact</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{stats.totalImpact}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setIsAddPartnerModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <MaterialIcons name="add-circle" size={24} />
        <Text style={{ fontSize: 16, marginLeft: 8 }}>Add Partner</Text>
      </TouchableOpacity>

      <FlatList
        data={partners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>{item.type}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => setSelectedPartner(item)} style={{ marginRight: 8 }}>
                <MaterialIcons name="edit" size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletePartner(item.id)}>
                <MaterialIcons name="delete" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Partner Stats Bar Chart */}
      <BarChart
        data={{
          labels: partners.map((partner) => partner.name),
          datasets: [
            {
              data: partners.map((partner) => partner.impact),
            },
          ],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{ marginTop: 16, borderRadius: 16 }}
      />

      {/* Add Partner Modal */}
      <Modal
        visible={isAddPartnerModalVisible}
        onRequestClose={() => setIsAddPartnerModalVisible(false)}
        animationType="slide"
      >
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Add New Partner</Text>

          <TextInput
            value={newPartner.name}
            onChangeText={(text) => setNewPartner({ ...newPartner, name: text })}
            placeholder="Name"
            style={{ borderBottomWidth: 1, marginBottom: 16 }}
          />
          <TextInput
            value={newPartner.type}
            onChangeText={(text) => setNewPartner({ ...newPartner, type: text })}
            placeholder="Type"
            style={{ borderBottomWidth: 1, marginBottom: 16 }}
          />
          <TextInput
            value={newPartner.collaboration}
            onChangeText={(text) => setNewPartner({ ...newPartner, collaboration: text })}
            placeholder="Collaboration"
            style={{ borderBottomWidth: 1, marginBottom: 16 }}
          />

          <Picker
            selectedValue={newPartner.status}
            onValueChange={(itemValue) => setNewPartner({ ...newPartner, status: itemValue })}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Inactive" value="Inactive" />
          </Picker>

          <TouchableOpacity onPress={addPartner} style={{ backgroundColor: '#4CAF50', padding: 12, marginTop: 16, borderRadius: 8 }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Add Partner</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsAddPartnerModalVisible(false)} style={{ marginTop: 16 }}>
            <Text style={{ color: '#D32F2D', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CommunityPartnerships;
