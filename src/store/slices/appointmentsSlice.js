import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import appointmentAPI from '../../ api/appointment';

export const bookAppointment = createAsyncThunk(
  'appointmentsSlice/bookAppointment',
  async (data) => {
    try {
      const { newAppointment, nextStep } = data;
      const result = await appointmentAPI.book(newAppointment);
      return {
        result: result.data.data,
        nextStep,
      };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchAppointments = createAsyncThunk(
  'appointmentsSlice/fetchAppointments',
  async () => {
    try {
      const result = await appointmentAPI.getAll();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const appointmentsSlice = createSlice({
  name: 'appointmentsSlice',
  initialState: {
    appointments: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Appointments
    [fetchAppointments.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAppointments.fulfilled]: (state, action) => {
      state.appointments = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAppointments.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectAppointments = (state) => state.appointments.appointments;

export const selectAppointmentIsLoading = (state) =>
  state.appointments.isLoading;

export default appointmentsSlice.reducer;
