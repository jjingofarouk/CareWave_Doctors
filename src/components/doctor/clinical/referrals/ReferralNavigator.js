// components/referral/ReferralNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import DoctorDirectory from './DoctorDirectory';
import ReferralForm from './ReferralForm';
import ReferralTracking from './ReferralTracking';
import Communication from './Communication';
import Analytics from './Analytics';

const Stack = createStackNavigator();

export const ReferralNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="DoctorDirectory" component={DoctorDirectory} />
    <Stack.Screen name="ReferralForm" component={ReferralForm} />
    <Stack.Screen name="ReferralTracking" component={ReferralTracking} />
    <Stack.Screen name="Communication" component={Communication} />
    <Stack.Screen name="Analytics" component={Analytics} />
  </Stack.Navigator>
);
