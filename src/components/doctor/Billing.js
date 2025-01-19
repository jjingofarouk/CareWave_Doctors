import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs for invoices
import * as FileSystem from 'expo-file-system';  // For saving PDF (export invoices)
import * as Print from 'expo-print';  // For printing invoices as PDFs
import * as Sharing from 'expo-sharing';  // To share the PDF

const Billing = () => {
  const [bill, setBill] = useState({ patient: '', service: '', amount: '', paymentStatus: 'unpaid', insurance: '', discount: '', paymentMethod: '' });
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');

  const handleBilling = (e) => {
    e.preventDefault();
    if (bill.patient && bill.service && bill.amount) {
      const newInvoice = { id: uuidv4(), ...bill };
      setInvoices([...invoices, newInvoice]);
      setBill({ patient: '', service: '', amount: '', paymentStatus: 'unpaid', insurance: '', discount: '', paymentMethod: '' });
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  const handleExportInvoice = async (invoice) => {
    const invoiceHTML = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; color: #333; padding: 20px;">
          <h1 style="color: #27c7b8;">Invoice for ${invoice.patient}</h1>
          <p><strong>Service:</strong> ${invoice.service}</p>
          <p><strong>Amount:</strong> $${invoice.amount}</p>
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
          value={bill.patient}
          onChangeText={(text) => setBill({ ...bill, patient: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Service Provided"
          value={bill.service}
          onChangeText={(text) => setBill({ ...bill, service: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={bill.amount}
          onChangeText={(text) => setBill({ ...bill, amount: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Insurance Coverage"
          value={bill.insurance}
          onChangeText={(text) => setBill({ ...bill, insurance: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Discount (%)"
          keyboardType="numeric"
          value={bill.discount}
          onChangeText={(text) => setBill({ ...bill, discount: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Payment Method (e.g., Credit Card)"
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
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.invoiceItem}>
            <Text style={styles.invoiceText}>{item.patient} - {item.service} - ${item.amount}</Text>
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#002432',
    marginBottom: 20,
  },
  form: {
    marginBottom: 30,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  search: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  createInvoiceButton: {
    backgroundColor: '#27c7b8',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  createInvoiceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  invoiceItem: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  invoiceText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  exportButton: {
    backgroundColor: '#f78837',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  exportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Billing;
