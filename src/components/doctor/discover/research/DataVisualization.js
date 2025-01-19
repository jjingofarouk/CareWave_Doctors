import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import DocumentPicker from 'expo-document-picker';

const screenWidth = Dimensions.get('window').width;

const DataVisualization = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [customColors, setCustomColors] = useState(['#FF4560', '#00E396', '#775DD0']);

  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText, DocumentPicker.types.json],
      });
      const content = await file.text();

      if (file.type.includes('json')) {
        const jsonData = JSON.parse(content);
        setChartData(jsonData);
      } else if (file.type.includes('plain')) {
        const lines = content.split('\n').map((line) => {
          const [label, value] = line.split(',');
          return { label, value: parseFloat(value) };
        });
        setChartData(lines);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to load file.');
      }
    }
  };

  const handleTextInputChange = (text) => setTextInput(text);

  const parseTextInput = () => {
    const lines = textInput.split('\n').map((line) => {
      const [label, value] = line.split(',');
      return { label, value: parseFloat(value) };
    });
    setChartData(lines);
  };

  const visualizeData = () => {
    if (chartData.length === 0) {
      Alert.alert('Error', 'No data to visualize.');
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleColorChange = (index, newColor) => {
    const updatedColors = [...customColors];
    updatedColors[index] = newColor;
    setCustomColors(updatedColors);
  };

  const renderChart = () => {
    if (chartData.length === 0) return null;

    const labels = chartData.map((data) => data.label);
    const values = chartData.map((data) => data.value);

    switch (chartType) {
      case 'bar':
        return (
          <BarChart
            data={{
              labels,
              datasets: [{ data: values }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#f5f5f5',
              backgroundGradientFrom: '#f5f5f5',
              backgroundGradientTo: '#e5e5e5',
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={styles.chart}
          />
        );
      case 'line':
        return (
          <LineChart
            data={{
              labels,
              datasets: [{ data: values }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#f5f5f5',
              backgroundGradientFrom: '#f5f5f5',
              backgroundGradientTo: '#e5e5e5',
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case 'pie':
        return (
          <PieChart
            data={chartData.map((data, idx) => ({
              name: data.label,
              value: data.value,
              color: customColors[idx % customColors.length],
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            }))}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Data Visualization</Text>
      <Text style={styles.subHeader}>
        Upload or input data to visualize it in various chart types.
      </Text>

      {/* File Upload */}
      <TouchableOpacity style={styles.button} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>Upload Data File</Text>
      </TouchableOpacity>

      {/* Text Input */}
      <TextInput
        style={styles.textInput}
        value={textInput}
        onChangeText={handleTextInputChange}
        placeholder="Enter data as 'Label,Value' (one per line)"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={parseTextInput}>
        <Text style={styles.buttonText}>Parse Text Input</Text>
      </TouchableOpacity>

      {/* Chart Type Selector */}
      <Text style={styles.label}>Select Chart Type:</Text>
      <FlatList
        horizontal
        data={['bar', 'line', 'pie']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chartTypeButton, chartType === item && styles.chartTypeSelected]}
            onPress={() => setChartType(item)}
          >
            <Text style={styles.chartTypeText}>{item.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Color Customization */}
      <View>
        <Text style={styles.label}>Customize Chart Colors:</Text>
        {customColors.map((color, index) => (
          <View key={index} style={styles.colorPicker}>
            <Text style={styles.colorLabel}>Color {index + 1}:</Text>
            <TextInput
              style={[styles.colorInput, { backgroundColor: color }]}
              value={color}
              onChangeText={(newColor) => handleColorChange(index, newColor)}
            />
          </View>
        ))}
      </View>

      {/* Visualize Button */}
      <TouchableOpacity style={styles.button} onPress={visualizeData}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Visualize Data</Text>}
      </TouchableOpacity>

      {/* Chart Display */}
      {renderChart()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { fontSize: 14, color: '#555', marginBottom: 20 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  textInput: { backgroundColor: '#fff', borderRadius: 5, padding: 10, marginBottom: 10, height: 100, textAlignVertical: 'top' },
  chart: { marginVertical: 15, borderRadius: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  chartTypeButton: { padding: 10, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 5 },
  chartTypeSelected: { backgroundColor: '#007BFF' },
  chartTypeText: { color: '#fff', fontWeight: 'bold' },
  colorPicker: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  colorLabel: { fontSize: 14, marginRight: 10 },
  colorInput: { width: 50, height: 30, borderRadius: 5, borderColor: '#ddd', borderWidth: 1, textAlign: 'center' },
});

export default DataVisualization;
