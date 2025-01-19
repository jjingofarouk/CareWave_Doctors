import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use other icon libraries as needed
import Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PatientEducation = () => {
  const [educationMaterials, setEducationMaterials] = useState([
    { 
      id: 1,
      title: 'Managing Diabetes', 
      type: 'Video',
      category: 'Chronic Diseases',
      views: 2000,
      likes: 150,
      completions: 500,
      duration: '45 minutes',
      content: 'A comprehensive guide on managing diabetes effectively.',
      videoUrl: 'https://www.example.com/diabetes-video',
      instructor: 'Dr. Jane Smith',
      quiz: [
        { question: 'What is the normal blood sugar range?', options: ['70-130 mg/dL', '140-200 mg/dL', '200-300 mg/dL'], correctAnswer: 0 },
        { question: 'How often should a diabetic check their blood sugar?', options: ['Once a week', 'Once a day', 'As recommended by their doctor'], correctAnswer: 2 },
      ]
    },
    { 
      id: 2,
      title: 'Heart Health Basics', 
      type: 'Article',
      category: 'Cardiovascular Health',
      views: 1500,
      likes: 120,
      completions: 400,
      duration: '20 minutes read',
      content: 'Essential information about heart health and prevention.',
      articleContent: `
        <h2>Understanding Heart Health</h2>
        <p>Your heart is a vital organ that pumps blood throughout your body. Keeping it healthy is crucial for overall well-being.</p>
        <h3>Key Factors for Heart Health:</h3>
        <ul>
          <li>Regular exercise</li>
          <li>Balanced diet</li>
          <li>Stress management</li>
          <li>Adequate sleep</li>
        </ul>
        <p>By maintaining these habits, you can significantly reduce your risk of heart disease.</p>
      `,
      instructor: 'Dr. Michael Johnson',
      quiz: [
        { question: 'What is a normal resting heart rate for adults?', options: ['40-60 bpm', '60-100 bpm', '100-120 bpm'], correctAnswer: 1 },
        { question: 'Which of these is NOT a risk factor for heart disease?', options: ['Smoking', 'High blood pressure', 'Regular exercise'], correctAnswer: 2 },
      ]
    },
    { 
      id: 3,
      title: 'Nutrition and Wellness', 
      type: 'Infographic',
      category: 'General Health',
      views: 1000,
      likes: 90,
      completions: 300,
      duration: '10 minutes',
      content: 'Visual guide to nutrition and wellness.',
      imageUrl: '/api/placeholder/800/600',
      instructor: 'Nutritionist Sarah Lee',
      quiz: [
        { question: 'How many food groups are there in a balanced diet?', options: ['3', '5', '7'], correctAnswer: 1 },
        { question: 'Which nutrient is the bodys main source of energy?', options: ['Protein', 'Fat', 'Carbohydrates'], correctAnswer: 2 },
      ]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [quizResults, setQuizResults] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    const simulatedProgress = educationMaterials.reduce((acc, material) => {
      acc[material.id] = Math.floor(Math.random() * 101);
      return acc;
    }, {});
    setUserProgress(simulatedProgress);
  }, []);

  const filteredMaterials = educationMaterials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResourceClick = (material) => {
    setSelectedResource(material);
  };

  const closeModal = () => {
    setSelectedResource(null);
  };

  const handleQuizSubmit = (resourceId, answers) => {
    const resource = educationMaterials.find(m => m.id === resourceId);
    const correctAnswers = answers.filter((answer, index) => answer === resource.quiz[index].correctAnswer).length;
    const score = (correctAnswers / resource.quiz.length) * 100;
    setQuizResults({ ...quizResults, [resourceId]: score });
  };

  const TypeIcon = ({ type }) => {
    switch(type.toLowerCase()) {
      case 'video': return <Icon name="video-camera" size={24} />;
      case 'article': return <Icon name="file-text" size={24} />;
      case 'infographic': return <Icon name="image" size={24} />;
      default: return <Text>Book</Text>;
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Patient Education Portal</Text>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>Enhance your health knowledge with our comprehensive educational resources.</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 8, borderRadius: 4, borderColor: '#ddd' }}
          placeholder="Search Resources..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.navigate('All')} style={{ marginRight: 16 }}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Video')} style={{ marginRight: 16 }}>
            <Text>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Article')} style={{ marginRight: 16 }}>
            <Text>Articles</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Infographic')}>
            <Text>Infographics</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {filteredMaterials.map((material) => (
        <View key={material.id} style={{ marginBottom: 24, padding: 16, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TypeIcon type={material.type} />
              <Text style={{ marginLeft: 8 }}>{material.type}</Text>
            </View>
            <Text>{material.category}</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{material.title}</Text>
          <Text style={{ marginTop: 8, color: '#888' }}>{material.instructor}</Text>
          <Text style={{ marginTop: 8, fontSize: 14, color: '#555' }}>{material.content}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text>{material.views} views</Text>
            <Text>{material.likes} likes</Text>
            <Text>{material.completions} completions</Text>
          </View>

          <Progress.Bar progress={userProgress[material.id] / 100} width={null} height={8} style={{ marginTop: 8 }} />
          <Text style={{ textAlign: 'right', fontSize: 12, color: '#888', marginTop: 4 }}>{userProgress[material.id]}% complete</Text>

          <Button title="Start Learning" onPress={() => handleResourceClick(material)} />
        </View>
      ))}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
        <Button title="View All Resources" onPress={() => alert('View all resources')} />
        <Button title="Add New Material" onPress={() => alert('Add New Material')} />
      </View>

      {selectedResource && (
        <Modal
          visible={true}
          onRequestClose={closeModal}
          transparent={true}
          animationType="fade"
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, width: '90%' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{selectedResource.title}</Text>
              <Text style={{ marginTop: 8 }}>{selectedResource.content}</Text>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default PatientEducation;
