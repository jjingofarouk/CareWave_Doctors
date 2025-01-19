import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching referrals
export const fetchReferrals = createAsyncThunk(
  'referrals/fetchReferrals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/referrals');
      if (!response.ok) {
        throw new Error('Failed to fetch referrals');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching doctors
export const fetchDoctors = createAsyncThunk(
  'referrals/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const referralSlice = createSlice({
  name: 'referrals',
  initialState: {
    doctors: [],
    referrals: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addReferral: (state, action) => {
      state.referrals.push(action.payload);
    },
    updateReferral: (state, action) => {
      const index = state.referrals.findIndex(ref => ref.id === action.payload.id);
      if (index !== -1) {
        state.referrals[index] = action.payload;
      }
    },
    deleteReferral: (state, action) => {
      state.referrals = state.referrals.filter(ref => ref.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    // Handle fetchReferrals
    builder
      .addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.referrals = action.payload;
      })
      .addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch referrals';
      })
      // Handle fetchDoctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch doctors';
      });
  }
});

export const { 
  clearError, 
  addReferral, 
  updateReferral, 
  deleteReferral 
} = referralSlice.actions;

export const referralReducer = referralSlice.reducer;

// Selectors
export const selectAllReferrals = (state) => state.referrals.referrals;
export const selectAllDoctors = (state) => state.referrals.doctors;
export const selectLoading = (state) => state.referrals.loading;
export const selectError = (state) => state.referrals.error;