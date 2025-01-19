// components/referral/Communication.js
import React from 'react';
import { View } from 'react-native';
import Chat from '../../../patients/consultations/Chat';
import Video from '../../../patients/consultations/Video';

const Communication = ({ route }) => {
  const { referralId } = route.params;

  return (
    <View>
      <Chat referralId={referralId} />
      <VideoCall referralId={referralId} />
    </View>
  );
};
