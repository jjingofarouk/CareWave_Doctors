import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import ExpenseCategories from './ExpenseCategories';
import IncomeTracking from './IncomeTracking';
import ExpenseTracking from './ExpenseTracking';
import AdvancedFinancialReporting from './AdvancedFinancialReporting';
import BudgetAlerts from './BudgetAlerts';

const ExpenseTracker = () => {
  const [categories, setCategories] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const handleCategoryAdd = (category) => setCategories([...categories, category]);
  const handleIncomeAdd = (newIncome) => setIncome([...income, newIncome]);
  const handleExpenseAdd = (newExpense) => setExpenses([...expenses, newExpense]);
  const handleAlertSet = (alert) => setAlerts([...alerts, alert]);

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Expense Tracker</Text>
        <ExpenseCategories onCategoryAdd={handleCategoryAdd} />
        <IncomeTracking onIncomeAdd={handleIncomeAdd} />
        <ExpenseTracking onExpenseAdd={handleExpenseAdd} />
        <AdvancedFinancialReporting revenue={income} expenses={expenses} />
        <BudgetAlerts onAlertSet={handleAlertSet} />
      </View>
    </ScrollView>
  );
};

export default ExpenseTracker;
