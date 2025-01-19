// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { referralReducer } from './src/components/doctor/clinical/referrals/ReferralSlice';// Adjust path if necessary

const store = configureStore({
  reducer: {
    referrals: referralReducer, // Match the slice name
  },
});

export default store;
