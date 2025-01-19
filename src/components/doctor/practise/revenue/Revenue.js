import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import RevenueHeader from './RevenueHeader';
import RevenueForm from './RevenueForm';
import RevenueCharts from './RevenueCharts';
import PaymentStatus from './PaymentStatus';
import InsuranceClaimsStatus from './InsuranceClaimsStatus';
import CurrencySelector from './CurrencySelector';
import uuid from 'react-native-uuid';
import moment from 'moment';
import { CURRENCIES, convertCurrency } from './CurrencyConverter';

const Revenue = () => {
  // Basic state management
  const [revenue, setRevenue] = useState({ service: '', amount: '', date: '' });
  const [revenueData, setRevenueData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  // States for converted values
  const [convertedMetrics, setConvertedMetrics] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    monthlyRevenue: {},
    serviceRevenue: {},
  });
  
  // Original data in USD
  const [payments, setPayments] = useState([]);
  const [claims, setClaims] = useState([]);

  // Initial load
  useEffect(() => {
    updateRevenueMetrics(revenueData);
  }, []);

  // Handle currency conversion for all metrics when currency changes
  useEffect(() => {
    convertAllMetrics(revenueData);
  }, [selectedCurrency, revenueData]);

  const convertAllMetrics = (data) => {
    // Calculate base metrics in USD
    const paidItems = data.filter(item => item.status === 'paid');
    const pendingItems = data.filter(item => item.status === 'pending');
    
    const totalRevenueUSD = paidItems.reduce((acc, curr) => acc + curr.amount, 0);
    const pendingPaymentsUSD = pendingItems.reduce((acc, curr) => acc + curr.amount, 0);

    // Monthly revenue calculation
    const monthlyUSD = data.reduce((acc, curr) => {
      const month = moment(curr.date).format('MMM YYYY');
      acc[month] = (acc[month] || 0) + curr.amount;
      return acc;
    }, {});

    // Service revenue calculation
    const serviceUSD = data.reduce((acc, curr) => {
      acc[curr.service] = (acc[curr.service] || 0) + curr.amount;
      return acc;
    }, {});

    // Convert all values to selected currency
    const convertedTotal = convertCurrency(totalRevenueUSD, 'USD', selectedCurrency);
    const convertedPending = convertCurrency(pendingPaymentsUSD, 'USD', selectedCurrency);
    
    // Convert monthly data
    const convertedMonthly = Object.entries(monthlyUSD).reduce((acc, [month, amount]) => {
      acc[month] = convertCurrency(amount, 'USD', selectedCurrency);
      return acc;
    }, {});

    // Convert service data
    const convertedService = Object.entries(serviceUSD).reduce((acc, [service, amount]) => {
      acc[service] = convertCurrency(amount, 'USD', selectedCurrency);
      return acc;
    }, {});

    // Update all converted metrics at once
    setConvertedMetrics({
      totalRevenue: convertedTotal,
      pendingPayments: convertedPending,
      monthlyRevenue: convertedMonthly,
      serviceRevenue: convertedService,
    });
  };

  const updateRevenueMetrics = (data) => {
    convertAllMetrics(data);
  };

  const handleAddRevenue = () => {
    if (revenue.service && revenue.amount && revenue.date) {
      // Store the original input amount and currency
      const originalAmount = parseFloat(revenue.amount);
      
      // Convert to USD for storage
      const amountInUSD = convertCurrency(
        originalAmount,
        selectedCurrency,
        'USD'
      );

      const newRevenue = {
        id: uuid.v4(),
        ...revenue,
        amount: amountInUSD,
        status: 'pending',
        originalCurrency: selectedCurrency,
        originalAmount: originalAmount
      };
      
      const updatedRevenueData = [...revenueData, newRevenue];
      setRevenueData(updatedRevenueData);
      
      // Add to payments with original currency info
      setPayments([...payments, {
        id: newRevenue.id,
        service: newRevenue.service,
        amount: amountInUSD,
        date: newRevenue.date,
        status: newRevenue.status,
        originalCurrency: selectedCurrency,
        originalAmount: originalAmount
      }]);
      
      setRevenue({ service: '', amount: '', date: '' });
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: selectedCurrency === 'UGX' ? 0 : 2,
    }).format(amount);
  };

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
  };

  return (
    <ScrollView style={styles.container}>
      <CurrencySelector 
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
        currencies={CURRENCIES}
      />
      
      <RevenueHeader 
        totalRevenue={convertedMetrics.totalRevenue}
        pendingPayments={convertedMetrics.pendingPayments}
        currencySymbol={CURRENCIES[selectedCurrency].symbol}
        formatAmount={formatAmount}
      />
      
      <RevenueForm
        revenue={revenue}
        setRevenue={setRevenue}
        handleAddRevenue={handleAddRevenue}
        selectedCurrency={selectedCurrency}
        currencySymbol={CURRENCIES[selectedCurrency].symbol}
      />
      
      <RevenueCharts
        monthlyRevenue={convertedMetrics.monthlyRevenue}
        serviceRevenue={convertedMetrics.serviceRevenue}
        selectedCurrency={selectedCurrency}
        currencySymbol={CURRENCIES[selectedCurrency].symbol}
      />
      
      <PaymentStatus 
        payments={payments.map(payment => ({
          ...payment,
          amount: convertCurrency(payment.amount, 'USD', selectedCurrency)
        }))}
        selectedCurrency={selectedCurrency}
        formatAmount={formatAmount}
      />
      
      <InsuranceClaimsStatus 
        claims={claims.map(claim => ({
          ...claim,
          amount: convertCurrency(claim.amount, 'USD', selectedCurrency)
        }))}
        selectedCurrency={selectedCurrency}
        formatAmount={formatAmount}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  }
});

export default Revenue;