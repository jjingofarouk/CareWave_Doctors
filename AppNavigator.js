import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the icons
import { NavigationContainer } from '@react-navigation/native';

// Import all Screens
import WelcomeScreen from './WelcomeScreen';
import SignUp from './src/components/auth/SignUp';
import Login from './src/components/auth/Login';
import ProfileSettings from './src/components/auth/ProfileSettings';
import DrawerNavigator from './src/components/navigation/DrawerNavigator'; // Drawer Navigator for main app flow
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
import Labs from './src/components/patients/records/Labs';
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
import ClinicalTrials from './src/components/doctor/discover/research/trials/ClinicalTrials2';
import ResearchTools from './src/components/doctor/discover/research/ResearchTools';
import UgRads from './src/components/doctor/discover/ClinicalCases';
import ReferralsContent from './src/components/doctor/clinical/ReferralsContent';
import DrugInteractionChecker from './src/components/patients/consultations/DrugInteractionChecker';
import Revenue from './src/components/doctor/practise/revenue/Revenue';
import Billing from './src/components/doctor/collaboration/Billing';
import Network from './src/components/doctor/collaboration/Network';
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

import PersonalInfo from './src/components/doctor/records/PersonalInfo';
import ChiefComplaint from './src/components/doctor/records/ChiefComplaint';
import HistoryOfPresentIllness from './src/components/doctor/records/HistoryOfPresentIllness';
import PastMedicalHistory from './src/components/doctor/records/PastMedicalHistory';
import FamilyHistory from './src/components/doctor/records/FamilyHistory';
import SocialHistory from './src/components/doctor/records/SocialHistory';
import ReviewOfSystems from './src/components/doctor/records/ReviewOfSystems';
import ExaminationFindings from './src/components/doctor/records/ExaminationFindings';

import CardiovascularCalculators from './src/components/doctor/clinical/calculators/cardiovascular/CardiovascularCalculators';
import NeurologyCalculators from './src/components/doctor/clinical/calculators/neurology/NeurologyCalculators';
import OrthopedicsCalculators from './src/components/doctor/clinical/calculators/ortho/OrthopedicsCalculators';
import ObstetricsCalculators from './src/components/doctor/clinical/calculators/obstetrics/ObstetricsCalculators';
import GastroenterologyCalculators from './src/components/doctor/clinical/calculators/git/GastroenterologyCalculators';
import PulmonaryCalculators from './src/components/doctor/clinical/calculators/pulmonary/PulmonaryCalculators';
import ICUCalculators from './src/components/doctor/clinical/calculators/icu/ICUCalculators';
import GeneralCalculators from './src/components/doctor/clinical/calculators/general/GeneralCalculators';
import NephrologyCalculators from './src/components/doctor/clinical/calculators/nephrology/NephrologyCalculators';

const Stack = createStackNavigator();

const screenOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: '#004C54' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff',
  headerBackTitleVisible: false,
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={30} color="#fff" style={{ marginLeft: 15 }} />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
      <Ionicons name="person-circle" size={30} color="#fff" style={{ marginRight: 15 }} />
    </TouchableOpacity>
  ),
});

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Authentication Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

      {/* Add other screens as per the original navigation */}
      <Stack.Screen name="Referrals" component={ReferralsContent} />
      <Stack.Screen name="Revenue" component={Revenue} />
      <Stack.Screen name="Billing" component={Billing} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="Scheduler" component={SmartScheduler} />
      <Stack.Screen name="Insurance" component={InsuranceManager} />
      <Stack.Screen name="Expenses" component={ExpenseTracker} />
      <Stack.Screen name="PHistory" component={History} />
      
      {/* Personal Information Screens */}
      <Stack.Screen name="Personal Information" component={PersonalInformation} />
      <Stack.Screen name="View Medical History" component={MedicalHistory} />
      <Stack.Screen name="Your Vital Signs" component={VitalSigns} />
      <Stack.Screen name="ClinicalCalculators" component={ClinicalCalculators} />
      <Stack.Screen name="Visit History" component={VisitHistory} />
      <Stack.Screen name="Lab Tests & Results" component={Labs} />
      <Stack.Screen name="Lifestyle & Wellness" component={Wellness} />
      <Stack.Screen name="View Medications" component={MedicationsContent} />
      <Stack.Screen name="CaseStudies" component={CaseStudies} />
      <Stack.Screen name="ClinicalTrials" component={ClinicalTrials} />
      <Stack.Screen name="ResearchTools" component={ResearchTools} />
      <Stack.Screen name="Radiology" component={UgRads} />
      <Stack.Screen name="DrugInteractions" component={DrugInteractionChecker} />
      <Stack.Screen name="Malaria" component={CMEMalaria} />
      <Stack.Screen name="TB" component={CMETB} />
      <Stack.Screen name="Postpartum Hemorrhage" component={CMEPph} />

      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="ChiefComplaint" component={ChiefComplaint} />
      <Stack.Screen name="HistoryOfPresentIllness" component={HistoryOfPresentIllness} />
      <Stack.Screen name="PastMedicalHistory" component={PastMedicalHistory} />
      <Stack.Screen name="FamilyHistory" component={FamilyHistory} />
      <Stack.Screen name="SocialHistory" component={SocialHistory} />
      <Stack.Screen name="ReviewOfSystems" component={ReviewOfSystems} />
      <Stack.Screen name="ExaminationFindings" component={ExaminationFindings} />

      {/* Telemedicine and Appointments Screens */}
      <Stack.Screen name="Telemedicine Sessions" component={TelemedicineSessions} />
      <Stack.Screen name="Medical Documents" component={MedicalDocuments} />
      <Stack.Screen name="Consent and Legal Documents" component={ConsentAndLegalDocs} />
      <Stack.Screen name="Prescription History" component={PrescriptionHistory} />
      <Stack.Screen name="Psychological Assessments" component={PsychologicalAssessments} />
      <Stack.Screen name="Chat with Doctor" component={Chat} options={{ headerShown: false }} />
      <Stack.Screen name="Doctor Profile" component={DoctorProfile} />

      <Stack.Screen name="Start Video Call" component={Video} options={{ headerShown: false }} />
      <Stack.Screen name="Guidelines" component={UCG} />
      <Stack.Screen name="Network" component={Network} />
      <Stack.Screen name="CME" component={CME} />

      <Stack.Screen name="Your Consultation Notes" component={DoctorPatientNotes} />
      <Stack.Screen name="Consultation History" component={ConsultationHistory} />

      {/* Health and Vaccination Screens */}
      <Stack.Screen name="Vaccination Records" component={Vaccination} />
      <Stack.Screen name="AIDiagnosis" component={Checker} />
      
      {/* Appointment Management Screens */}
      <Stack.Screen name="Book Appointment" component={BookAppointment} />
      <Stack.Screen name="Rebook Appointment" component={ReBookAppointment} />
      <Stack.Screen name="Cancel Appointment" component={CancelAppointment} />
      <Stack.Screen name="Manage Appointments" component={Appointments} />
      <Stack.Screen name="Appointment History" component={AppointmentHistory} />
      
      <Stack.Screen name="Cardiovascular" component={CardiovascularCalculators} />
      <Stack.Screen name="Neurology" component={NeurologyCalculators} />
      <Stack.Screen name="Orthopedics" component={OrthopedicsCalculators} />
      <Stack.Screen name="Obstetrics" component={ObstetricsCalculators} />
      <Stack.Screen name="Gastroenterology" component={GastroenterologyCalculators} />
      <Stack.Screen name="Pulmonary" component={PulmonaryCalculators} />
      <Stack.Screen name="ICU" component={ICUCalculators} />
      <Stack.Screen name="General" component={GeneralCalculators} />
      <Stack.Screen name="Nephrology" component={NephrologyCalculators} />

      {/* Main App Flow - DrawerNavigator for the main app */}
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={({ navigation }) => {
          const routeName = navigation.getState()?.routes?.[navigation.getState().index]?.name || 'Default Name';
          return {
            headerTitle: routeName, // Dynamically set the header title
            headerShown: true, // Show header for Stack.Screen
          };
        }}
      />

      {/* ProfileSettings screen, ensure it's accessible in the stack */}
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
