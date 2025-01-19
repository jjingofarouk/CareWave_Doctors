import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs for invoices
import * as FileSystem from 'expo-file-system';  // For saving PDF (export invoices)
import * as Print from 'expo-print';  // For printing invoices as PDFs
import * as Sharing from 'expo-sharing';  // To share the PDF
import CustomSelect from '../../utils/CustomSelect'; // Import your CustomSelect component

const Billing = () => {
  const [bill, setBill] = useState({ patient: '', service: '', amount: '', paymentStatus: 'unpaid', insurance: '', discount: '', paymentMethod: '', currency: 'USD' });
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');

  const services = [
    { label: "Consultation", value: "consultation" },
    { label: "Treatment", value: "treatment" },
    { label: "Surgery", value: "surgery" },
    { label: "Checkup", value: "checkup" },
    { label: "Diagnosis", value: "diagnosis" },
    { label: "Therapy", value: "therapy" },
  ];

  const currencies = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
    { label: "INR", value: "INR" },
  ];

  const handleBilling = (e) => {
    e.preventDefault();
    if (bill.patient && bill.service && bill.amount) {
      const newInvoice = { id: uuidv4(), ...bill };
      setInvoices([...invoices, newInvoice]);
      setBill({ patient: '', service: '', amount: '', paymentStatus: 'unpaid', insurance: '', discount: '', paymentMethod: '', currency: 'USD' });
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  const handleExportInvoice = async (invoice) => {
    const invoiceHTML = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; color: #333; padding: 20px;">
          <h1 style="color: #27c7b8;">Invoice for ${invoice.patient}</h1>
          <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 8px; background-color: #27c7b8; color: white;">Service</th>
                <th style="text-align: left; padding: 8px; background-color: #27c7b8; color: white;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 8px;">${invoice.service}</td>
                <td style="padding: 8px;">${invoice.currency} ${invoice.amount}</td>
              </tr>
            </tbody>
          </table>
          <p><strong>Insurance Coverage:</strong> ${invoice.insurance || 'N/A'}</p>
          <p><strong>Discount:</strong> ${invoice.discount || '0%'}</p>
          <p><strong>Payment Method:</strong> ${invoice.paymentMethod || 'N/A'}</p>
          <p><strong>Payment Status:</strong> ${invoice.paymentStatus}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: invoiceHTML });
    const fileUri = FileSystem.documentDirectory + `${invoice.id}.pdf`;
    await FileSystem.moveAsync({ from: uri, to: fileUri });
    
    // Sharing the generated PDF
    await Sharing.shareAsync(fileUri);
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.patient.toLowerCase().includes(search.toLowerCase()) ||
    invoice.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Billing</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          placeholderTextColor="#9e9e9e"
          value={bill.patient}
          onChangeText={(text) => setBill({ ...bill, patient: text })}
        />
        
        <View style={styles.selectWrapper}>
          <Text style={styles.label}>Service Provided</Text>
          <CustomSelect
            options={services}
            selectedValue={bill.service}
            onSelect={(item) => setBill({ ...bill, service: item.label })}
            placeholder="Select Service"
            label="Service"
          />
        </View>

        <View style={styles.amountWrapper}>
          <TextInput
            style={[styles.input, { width: '70%' }]}
            placeholder="Amount"
            placeholderTextColor="#9e9e9e"
            keyboardType="numeric"
            value={bill.amount}
            onChangeText={(text) => setBill({ ...bill, amount: text })}
          />
          <View style={styles.selectWrapper}>
            <CustomSelect
              options={currencies}
              selectedValue={bill.currency}
              onSelect={(item) => setBill({ ...bill, currency: item.label })}
              placeholder="Select Currency"
              label="Currency"
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Insurance Coverage"
          placeholderTextColor="#9e9e9e"
          value={bill.insurance}
          onChangeText={(text) => setBill({ ...bill, insurance: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Discount (%)"
          placeholderTextColor="#9e9e9e"
          keyboardType="numeric"
          value={bill.discount}
          onChangeText={(text) => setBill({ ...bill, discount: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Payment Method (e.g., Credit Card)"
          placeholderTextColor="#9e9e9e"
          value={bill.paymentMethod}
          onChangeText={(text) => setBill({ ...bill, paymentMethod: text })}
        />
        <TouchableOpacity style={styles.createInvoiceButton} onPress={handleBilling}>
          <Text style={styles.createInvoiceText}>Create Invoice</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search Invoices"
        placeholderTextColor="#9e9e9e"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.invoiceItem}>
            <Text style={styles.invoiceText}>{item.patient} - {item.service} - {item.currency} {item.amount}</Text>
            <Text style={styles.invoiceText}>Status: {item.paymentStatus}</Text>
            <TouchableOpacity onPress={() => handleExportInvoice(item)} style={styles.exportButton}>
              <Text style={styles.exportText}>Export as PDF</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f7fb',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  createInvoiceButton: {
    backgroundColor: '#27c7b8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createInvoiceText: {
    color: '#fff',
    fontSize: 18,
  },
  search: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  invoiceItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  invoiceText: {
    fontSize: 16,
    color: '#333',
  },
  exportButton: {
    marginTop: 10,
    backgroundColor: '#f78837',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  exportText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Billing;

