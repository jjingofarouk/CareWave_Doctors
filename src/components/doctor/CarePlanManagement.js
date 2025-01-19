import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Alert, Modal, TouchableOpacity } from "react-native";
import Button from "../ui/button"; // Ensure this is a valid React Native Button component
import { Ionicons } from '@expo/vector-icons'; // For icons (optional)

const CarePlanManagement = () => {
  const [carePlans, setCarePlans] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({ patientName: "", planDetails: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchCarePlans = async () => {
      setLoading(true);
      const dummyData = [
        { id: 1, patientName: "Jjingo Farouk", planDetails: "Diet and exercise regimen." },
        { id: 2, patientName: "Shadrah Flower", planDetails: "Medication schedule." },
      ];
      setCarePlans(dummyData);
      setLoading(false);
    };
    fetchCarePlans();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const openModal = (plan) => {
    setEditingPlan(plan);
    setNewPlan(plan || { patientName: "", planDetails: "" });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingPlan(null);
    setNewPlan({ patientName: "", planDetails: "" });
  };

  const handleSave = () => {
    if (!newPlan.patientName || !newPlan.planDetails) {
      alert("Please fill in both fields.");
      return;
    }

    if (editingPlan) {
      setCarePlans((prev) =>
        prev.map((plan) => (plan.id === editingPlan.id ? { ...plan, ...newPlan } : plan))
      );
      setMessage("Care plan updated successfully.");
    } else {
      setCarePlans((prev) => [...prev, { ...newPlan, id: prev.length + 1 }]);
      setMessage("Care plan added successfully.");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setCarePlans((prev) => prev.filter((plan) => plan.id !== id));
    setMessage("Care plan deleted successfully.");
  };

  const filteredCarePlans = carePlans.filter((plan) =>
    plan.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCarePlans = [...filteredCarePlans].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.patientName.localeCompare(b.patientName);
    } else {
      return b.patientName.localeCompare(a.patientName);
    }
  });

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Care Plan Management</Text>
      {message && <Text style={{ color: 'green', marginBottom: 10 }}>{message}</Text>}

      <TextInput
        style={{
          height: 40,
          borderColor: '#ddd',
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
          borderRadius: 5,
        }}
        placeholder="Search by patient name..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <Button onPress={() => openModal(null)}>Add New Care Plan</Button>
      <Button onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort by Patient Name {sortOrder === "asc" ? "Descending" : "Ascending"}
      </Button>

      <FlatList
        data={sortedCarePlans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.patientName}</Text>: {item.planDetails}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Button onPress={() => openModal(item)}>Edit</Button>
              <Button onPress={() => handleDelete(item.id)}>Delete</Button>
            </View>
          </View>
        )}
      />

      {/* Modal for Adding/Editing Care Plans */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, width: '80%', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {editingPlan ? "Edit Care Plan" : "Add New Care Plan"}
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: '#ddd',
                borderWidth: 1,
                marginBottom: 10,
                paddingLeft: 10,
                borderRadius: 5,
              }}
              placeholder="Patient Name"
              value={newPlan.patientName}
              onChangeText={(text) => setNewPlan({ ...newPlan, patientName: text })}
            />
            <TextInput
              style={{
                height: 100,
                borderColor: '#ddd',
                borderWidth: 1,
                marginBottom: 10,
                paddingLeft: 10,
                borderRadius: 5,
                textAlignVertical: 'top',
              }}
              placeholder="Plan Details"
              value={newPlan.planDetails}
              onChangeText={(text) => setNewPlan({ ...newPlan, planDetails: text })}
            />
            <Button onPress={handleSave}>{editingPlan ? "Update" : "Save"}</Button>
            <Button onPress={closeModal}>Cancel</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CarePlanManagement;
