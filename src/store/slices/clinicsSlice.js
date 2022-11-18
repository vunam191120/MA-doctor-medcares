import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import clinicAPI from '../../ api/clinic';

export const fetchClinics = createAsyncThunk(
  'clinicsSlice/fetchClinics',
  async () => {
    try {
      const result = await clinicAPI.getAll();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchDoctorsClinic = createAsyncThunk(
  'clinicsSlice/fetchDoctorsClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.getDoctors(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchCategoriesByClinic = createAsyncThunk(
  'clinicsSlice/fetchCategoriesByClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.getCategories(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchPatients = createAsyncThunk(
  'clinicsSlice/fetchPatients',
  async () => {
    try {
      const result = await clinicAPI.getPatients();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchClinicByDoctor = createAsyncThunk(
  'clinicsSlice/fetchClinicByDoctor',
  async (doctor_id) => {
    try {
      const result = await clinicAPI.getClinicByDoctor(doctor_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const clinicsSlice = createSlice({
  name: 'clinicsSlice',
  initialState: {
    clinics: [],
    patients: [],
    clinicByDoctor: {},
    doctorsByClinic: [],
    categoriesByClinic: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Clinics
    [fetchClinics.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchClinics.fulfilled]: (state, action) => {
      state.clinics = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchClinics.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Categories By Clinic
    [fetchCategoriesByClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchCategoriesByClinic.fulfilled]: (state, action) => {
      state.categoriesByClinic = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchCategoriesByClinic.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch doctors by clinic
    [fetchDoctorsClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchDoctorsClinic.fulfilled]: (state, action) => {
      state.doctorsByClinic = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchDoctorsClinic.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch clinic by doctor
    [fetchClinicByDoctor.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchClinicByDoctor.fulfilled]: (state, action) => {
      state.clinicByDoctor = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchClinicByDoctor.rejected]: (state, action) => {
      message.error(action.payload.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch patients
    [fetchPatients.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.patients = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPatients.rejected]: (state, action) => {
      message.error(action.payload.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectClinics = (state) => state.clinics.clinics;

export const selectClinicByDoctor = (state) => state.clinics.clinicByDoctor;

export const selectPatients = (state) => state.clinics.patients;

export const selectDoctorByClinic = (state) => state.clinics.doctorsByClinic;

export const selectCategoriesByClinic = (state) =>
  state.clinics.categoriesByClinic;

export const selectClinicIsLoading = (state) => state.clinics.isLoading;

export default clinicsSlice.reducer;
