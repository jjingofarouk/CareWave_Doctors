import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { Search, X, Heart, Phone, ArrowUp } from 'react-native-vector-icons/Feather';
import { doctors } from './Doctors';  // Importing the doctors data

const DoctorsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Ensure doctors is an array before using filter
  const filteredDoctors = Array.isArray(doctors) ? doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const scrollViewRef = React.createRef();

  const handleBackToTop = () => scrollViewRef.current.scrollTo({ y: 0, animated: true });

  const toggleFavorite = (doctorId) => {
    setFavorites(prev =>
      prev.includes(doctorId) ? prev.filter(id => id !== doctorId) : [...prev, doctorId]
    );
  };

  const handleContact = (doctor) => {
    setSelectedDoctor(doctor);
    setShowContactModal(true);
  };

  const ContactModal = ({ doctor, onClose }) => (
    <Modal
      visible={showContactModal}
      onRequestClose={onClose}
      transparent={true}
      animationType="slide"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text>Contact {doctor.name}</Text>
          <TextInput placeholder="Your Name" style={{ borderBottomWidth: 1, marginBottom: 10 }} />
          <TextInput placeholder="Your Email" style={{ borderBottomWidth: 1, marginBottom: 10 }} />
          <TextInput placeholder="Your Message" multiline={true} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView ref={scrollViewRef} onScroll={(e) => {
      const contentOffsetY = e.nativeEvent.contentOffset.y;
      setShowBackToTop(contentOffsetY > 300);
    }} scrollEventThrottle={16}>
      <Text style={{ fontSize: 26, fontWeight: '700', color: '#004C54', marginBottom: 20 }}>Doctors</Text>

      {/* Search Bar */}
      <View style={{ marginBottom: 20 }}>
        <Search name="search" size={24} color="#009688" />
        <TextInput
          placeholder="Search by name, phone, or email..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 16, padding: 10 }}
        />
        {searchTerm && (
          <TouchableOpacity onPress={() => setSearchTerm('')}>
            <X name="x" size={24} color="#009688" />
          </TouchableOpacity>
        )}
      </View>

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        renderItem={({ item }) => (
          <View key={item.name} style={{ marginBottom: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#004C54' }}>{item.name}</Text>
            <Text style={{ color: '#555', marginVertical: 5 }}>Specialty: {item.specialties}</Text>
            <Text style={{ color: '#555', marginVertical: 5 }}>Location: {item.location}</Text>
            <Text style={{ color: '#555', marginVertical: 5 }}>{item.phone}</Text>
            <Text style={{ color: '#555', marginVertical: 5 }}>{item.email}</Text>

            {/* Rating */}
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {[...Array(5)].map((_, i) => (
                <Heart key={i} fill={i < 4 ? '#f78837' : 'none'} size={18} color="#f78837" />
              ))}
            </View>

            {/* Actions */}
            <TouchableOpacity onPress={() => toggleFavorite(item.name)} style={{ marginTop: 10 }}>
              <Heart fill={favorites.includes(item.name) ? '#f78837' : 'none'} size={24} color="#f78837" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleContact(item)} style={{ marginTop: 10 }}>
              <Phone size={24} color="#009688" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.name}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <TouchableOpacity onPress={handleBackToTop} style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <ArrowUp size={24} color="#009688" />
        </TouchableOpacity>
      )}

      {/* Contact Modal */}
      {selectedDoctor && <ContactModal doctor={selectedDoctor} onClose={() => setShowContactModal(false)} />}
    </ScrollView>
  );
};

export default DoctorsSection;
