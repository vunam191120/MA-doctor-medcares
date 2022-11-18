import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appointmentsSlice from './slices/appointmentsSlice';
import clinicsSlice from './slices/clinicsSlice';
import medicalRecordsSlice from './slices/medicalRecordsSlice';
import productsSlice from './slices/productsSlice';
import usersSlice from './slices/usersSlice';

export default configureStore({
  reducer: {
    users: usersSlice,
    clinics: clinicsSlice,
    appointments: appointmentsSlice,
    products: productsSlice,
    medicalRecords: medicalRecordsSlice,
  },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
