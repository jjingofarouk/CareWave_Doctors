import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Using react-native-chart-kit for charts

const ResearchDataManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', status: '', milestones: [] });
  const [researchData, setResearchData] = useState([]);
  const [report, setReport] = useState([]);

  // Sample initial project data
  useEffect(() => {
    const sampleProjects = [
      { id: 1, title: 'Diabetes Study', status: 'Ongoing', milestones: ['Initial Approval', 'Data Collection'] },
      { id: 2, title: 'Heart Disease Research', status: 'Completed', milestones: ['Literature Review', 'Final Report'] },
    ];
    setProjects(sampleProjects);
  }, []);

  // Handle new project submission
  const handleProjectSubmit = () => {
    const updatedProjects = [...projects, { ...newProject, id: projects.length + 1 }];
    setProjects(updatedProjects);
    setNewProject({ title: '', status: '', milestones: [] });
  };

  // Handle data entry for research data
  const handleDataEntry = (data) => {
    setResearchData((prevData) => [...prevData, data]);
  };

  // Generate report from research data
  const generateReport = () => {
    const newReport = researchData.map((data, index) => ({ ...data, reportIndex: index + 1 }));
    setReport(newReport);
    console.log('Research Report Generated:', newReport);
    Alert.alert('Research Report', 'Report generated! Check console for details.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Research Data Management</Text>

      {/* Project Management Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Manage Research Projects</Text>
        <TextInput
          style={styles.input}
          placeholder="Project Title"
          value={newProject.title}
          onChangeText={(text) => setNewProject({ ...newProject, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={newProject.status}
          onChangeText={(text) => setNewProject({ ...newProject, status: text })}
        />
        <Button title="Add Project" onPress={handleProjectSubmit} />

        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.projectItem}>
              <Text>{item.title} - {item.status}</Text>
              <FlatList
                data={item.milestones}
                keyExtractor={(milestone, index) => index.toString()}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            </View>
          )}
        />
      </View>

      {/* Data Entry Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Research Data Entry</Text>
        <Button title="Add Sample Data" onPress={() => handleDataEntry({ data: Math.random() * 100 })} />
      </View>

      {/* Data Visualization Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Data Visualization</Text>
        <LineChart
          data={{
            labels: researchData.slice(-5).map((entry, index) => `Data ${index + 1}`),
            datasets: [
              {
                data: researchData.slice(-5).map((entry) => entry.data),
                strokeWidth: 2,
                color: () => '#27c7b8',
              },
            ],
          }}
          width={350} // Set chart width
          height={220} // Set chart height
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2, // For better readability
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Reporting Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Reporting</Text>
        <Button title="Generate Research Report" onPress={generateReport} />
        {report.length > 0 && (
          <FlatList
            data={report}
            keyExtractor={(item) => item.reportIndex.toString()}
            renderItem={({ item }) => (
              <Text>Report Item {item.reportIndex}: {JSON.stringify(item)}</Text>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004C54',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  section: {
    marginBottom: 20,
  },
  projectItem: {
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  chart: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default ResearchDataManagement;
