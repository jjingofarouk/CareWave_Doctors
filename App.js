import React from 'react';
import { StatusBar, ScrollView, TouchableOpacity, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';

// Import all Screens
import WelcomeScreen from './WelcomeScreen';
import SignUp from './src/components/auth/SignUp';
import Login from './src/components/auth/Login';
import ProfileSettings from './src/components/auth/ProfileSettings';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import VitalSigns from './src/components/doctor/VitalSigns';
import PrescriptionHistory from './src/components/patients/records/PrescriptionHistory';
import VisitHistory from './src/components/patients/records/VisitHistory';
import TelemedicineSessions from './src/components/patients/records/TelemedicineSessions';
import MedicalDocuments from './src/components/patients/records/MedicalDocuments';
import ConsentAndLegalDocs from './src/components/patients/records/ConsentAndLegalDocs';
import PsychologicalAssessments from './src/components/patients/records/PsychologicalAssessments';
import MedicalHistory from './src/components/patients/records/MedicalHistory';
import PersonalInformation from './src/components/patients/records/PersonalInformation';
import Chat from './src/components/patients/consultations/Chat';
import Labs from './src/components/doctor/records/Labs';
import MedicationsContent from './src/components/patients/consultations/Medications';
import Checker from './src/components/patients/symptomchecker/Checker';
import Vaccination from './src/components/patients/records/Vaccination';
import CaseStudies from './src/components/doctor/discover/CaseStudies';
import BookAppointment from './src/components/patients/appointments/BookAppointment';
import ReBookAppointment from './src/components/patients/appointments/ReBookAppointment';
import DoctorProfile from './src/components/patients/appointments/DoctorProfile';
import CancelAppointment from './src/components/patients/appointments/CancelAppointment';
import AppointmentHistory from './src/components/patients/appointments/AppointmentHistory';
import Appointments from './src/components/patients/appointments/Appointments';
import Video from './src/components/patients/consultations/Video';
import Wellness from './src/components/patients/consultations/Wellness';
import DoctorPatientNotes from './src/components/patients/consultations/Notes';
import ClinicalCalculators from './src/components/doctor/clinical/calculators/ClinicalCalculators';
import UCG from './src/components/doctor/clinical/UCG';
import ClinicalTrials from './src/components/doctor/discover/research/trials/ClinicalTrials';
import ResearchTools from './src/components/doctor/discover/research/ResearchTools';
import ClinicalCases from './src/components/doctor/discover/ClinicalCases';
import Referrals from './src/components/doctor/clinical/referrals/Referrals';
import DrugInteractionChecker from './src/components/patients/consultations/DrugInteractionChecker';
import Revenue from './src/components/doctor/practise/revenue/Revenue';
import Billing from './src/components/doctor/collaboration/Billing';
import DrChat from './src/components/doctor/practise/chat/DrChat';
import CME from './src/components/doctor/practise/cmes/CME';
import CMEMalaria from './src/components/doctor/practise/cmes/Malaria';
import CMETB from './src/components/doctor/practise/cmes/TB';
import CMEPph from './src/components/doctor/practise/cmes/PPH';
import Analytics from './src/components/doctor/practise/analytics/Analytics';
import SmartScheduler from './src/components/doctor/collaboration/SmartScheduler';
import InsuranceManager from './src/components/doctor/practise/InsuranceManager';
import ExpenseTracker from './src/components/doctor/practise/expenses/ExpenseTracker';
import History from './src/components/doctor/records/History';
import ConsultationHistory from './src/components/patients/consultations/ConsultationHistory';
import PatientDataCollectionApp from './src/components/doctor/discover/research/PatientDataCollectionApp';
import PersonalInfo from './src/components/doctor/records/PersonalInfo';
import ChiefComplaint from './src/components/doctor/records/ChiefComplaint';
import HistoryOfPresentIllness from './src/components/doctor/records/HistoryOfPresentIllness';
import PastMedicalHistory from './src/components/doctor/records/PastMedicalHistory';
import FamilyHistory from './src/components/doctor/records/FamilyHistory';
import SocialHistory from './src/components/doctor/records/SocialHistory';
import ReviewOfSystems from './src/components/doctor/records/ReviewOfSystems';
import ExaminationFindings from './src/components/doctor/records/ExaminationFindings';
import TextAnalysis from './src/components/doctor/discover/research/textanalysis/TextAnalysis';
import CardiovascularCalculators from './src/components/doctor/clinical/calculators/cardiovascular/CardiovascularCalculators';
import NeurologyCalculators from './src/components/doctor/clinical/calculators/neurology/NeurologyCalculators';
import OrthopedicsCalculators from './src/components/doctor/clinical/calculators/ortho/OrthopedicsCalculators';
import ObstetricsCalculators from './src/components/doctor/clinical/calculators/obstetrics/ObstetricsCalculators';
import GastroenterologyCalculators from './src/components/doctor/clinical/calculators/git/GastroenterologyCalculators';
import PulmonaryCalculators from './src/components/doctor/clinical/calculators/pulmonary/PulmonaryCalculators';
import ICUCalculators from './src/components/doctor/clinical/calculators/icu/ICUCalculators';
import GeneralCalculators from './src/components/doctor/clinical/calculators/general/GeneralCalculators';
import NephrologyCalculators from './src/components/doctor/clinical/calculators/nephrology/NephrologyCalculators';
import FieldResearchKit from './src/components/doctor/discover/research/FieldResearchKit';
import LocationDetail from './src/components/doctor/discover/research/trials/LocationDetails';
import MedicalLiterature from './src/components/doctor/discover/research/searchengine/MedicalLiterature';
import ArticleDetail from './src/components/doctor/discover/research/searchengine/ArticleDetail';
import ChatSettings from './src/components/doctor/practise/chat/ChatSettings';
import AudioCall from './src/components/doctor/practise/chat/AudioCall';
import PrescriptionManagement from './src/components/doctor/records/prescriptions/PrescriptionManagement';
import { CustomHeader } from './src/components/navigation/CustomHeader';

const Stack = createStackNavigator();

// Create a screen wrapper component
const ScreenWrapper = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar barStyle="light-content" backgroundColor="#004C54" />
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

// Higher Order Component to wrap screens with SafeArea
const withSafeArea = (WrappedComponent) => {
  return (props) => (
    <ScreenWrapper>
      <WrappedComponent {...props} />
    </ScreenWrapper>
  );
};

// Modify the screenOptions to use CustomHeader
const screenOptions = ({ navigation, route }) => ({
  header: (props) => <CustomHeader {...props} />,
  headerStyle: { backgroundColor: '#004C54' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff',
  headerBackTitleVisible: false,
});

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            {/* Authentication Screens */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            
            {/* Main App Flow */}
            <Stack.Screen
              name="Main"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />

            {/* Complete all screen definitions from both files */}
            <Stack.Screen name="Referrals" component={Referrals} />
            <Stack.Screen name="Revenue" component={Revenue} />
            <Stack.Screen name="Billing" component={Billing} />
            <Stack.Screen name="Analytics" component={Analytics} />
            <Stack.Screen name="Scheduler" component={SmartScheduler} />
            <Stack.Screen name="Insurance" component={InsuranceManager} />
            <Stack.Screen name="Expenses" component={ExpenseTracker} />
            <Stack.Screen name="PHistory" component={History} />
            <Stack.Screen name="Patient Data Collection" component={PatientDataCollectionApp} />
            <Stack.Screen name="Field Research Kit" component={FieldResearchKit} />
            <Stack.Screen name="Clinical Text Analysis" component={TextAnalysis} />
            <Stack.Screen name="Medical Literature Search Engine" component={MedicalLiterature} />
            <Stack.Screen name="Detail" component={ArticleDetail} />
            
            {/* Personal Information Screens */}
            <Stack.Screen name="Personal Information" component={PersonalInformation} />
            <Stack.Screen name="View Medical History" component={MedicalHistory} />
            <Stack.Screen name="Your Vital Signs" component={VitalSigns} />
            <Stack.Screen name="Clinical Calculators" component={ClinicalCalculators} />
            <Stack.Screen name="Visit History" component={VisitHistory} />
            <Stack.Screen name="Lab Tests & Results" component={Labs} />
            <Stack.Screen name="Lifestyle & Wellness" component={Wellness} />
            <Stack.Screen name="View Medications" component={MedicationsContent} />
            <Stack.Screen name="Case Studies" component={CaseStudies} />
            <Stack.Screen name="Clinical Trials" component={ClinicalTrials} />
            <Stack.Screen name="Research Tools" component={ResearchTools} />
            <Stack.Screen name="Radiology" component={ClinicalCases} />
            <Stack.Screen name="Drug Interactions" component={DrugInteractionChecker} />
            
            {/* CME Screens */}
            <Stack.Screen name="CME" component={CME} />
            <Stack.Screen name="Malaria" component={CMEMalaria} />
            <Stack.Screen name="TB" component={CMETB} />
            <Stack.Screen name="Postpartum Hemorrhage" component={CMEPph} />
            
            {/* Medical Record Screens */}
            <Stack.Screen name="Personal Info" component={PersonalInfo} />
            <Stack.Screen name="Chief Complaint" component={ChiefComplaint} />
            <Stack.Screen name="History Of Present Illness" component={HistoryOfPresentIllness} />
            <Stack.Screen name="Past Medical History" component={PastMedicalHistory} />
            <Stack.Screen name="Family History" component={FamilyHistory} />
            <Stack.Screen name="SocialHistory" component={SocialHistory} />
            <Stack.Screen name="Review Of Systems" component={ReviewOfSystems} />
            <Stack.Screen name="Examination Findings" component={ExaminationFindings} />
            <Stack.Screen name="Prescriptions" component={PrescriptionManagement} />

            {/* Medical Calculators */}
            <Stack.Screen name="Cardiovascular" component={CardiovascularCalculators} />
            <Stack.Screen name="Neurology" component={NeurologyCalculators} />
            <Stack.Screen name="Orthopedics" component={OrthopedicsCalculators} />
            <Stack.Screen name="Obstetrics" component={ObstetricsCalculators} />
            <Stack.Screen name="Gastroenterology" component={GastroenterologyCalculators} />
            <Stack.Screen name="Pulmonary" component={PulmonaryCalculators} />
            <Stack.Screen name="ICU" component={ICUCalculators} />
            <Stack.Screen name="General" component={GeneralCalculators} />
            <Stack.Screen name="Nephrology" component={NephrologyCalculators} />
            
            {/* Location and Communication Screens */}
            <Stack.Screen
              name="LocationDetail"
              component={LocationDetail}
              sharedElements={(route) => [`location.${route.params.location.id}.card`]}
            />
            <Stack.Screen name="Chat with Doctor" component={Chat} />
            <Stack.Screen name="Doctor Profile" component={DoctorProfile} />
            <Stack.Screen name="Start Video Call" component={Video} />
            <Stack.Screen name="Guidelines" component={UCG} />
            <Stack.Screen name="Doctor Network" component={DrChat} />
            <Stack.Screen name="Audio Call" component={AudioCall} />
            <Stack.Screen name="ChatSettings" component={ChatSettings} />
            
            {/* Patient Records and History */}
            <Stack.Screen name="Your Consultation Notes" component={DoctorPatientNotes} />
            <Stack.Screen name="Consultation History" component={ConsultationHistory} />
            <Stack.Screen name="Telemedicine Sessions" component={TelemedicineSessions} />
            <Stack.Screen name="Medical Documents" component={MedicalDocuments} />
            <Stack.Screen name="Consent and Legal Documents" component={ConsentAndLegalDocs} />
            <Stack.Screen name="Prescription History" component={PrescriptionHistory} />
            <Stack.Screen name="Psychological Assessments" component={PsychologicalAssessments} />
            <Stack.Screen name="Vaccination Records" component={Vaccination} />
            <Stack.Screen name="AIDiagnosis" component={Checker} />
            
            {/* Appointment Management */}
            <Stack.Screen name="Book Appointment" component={BookAppointment} />
            <Stack.Screen name="Rebook Appointment" component={ReBookAppointment} />
            <Stack.Screen name="Cancel Appointment" component={CancelAppointment} />
            <Stack.Screen name="Manage Appointments" component={Appointments} />
            <Stack.Screen name="Appointment History" component={AppointmentHistory} />
            
            {/* Settings */}
            <Stack.Screen name="Profile Settings" component={ProfileSettings} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004C54',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: '#FF7043',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#FF7043',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#FF7043',
  },
});