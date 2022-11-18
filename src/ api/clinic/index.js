import axiosClient from '../axios.config';

const clinicAPI = {
  getAll() {
    const url = `/clinic`;
    return axiosClient.get(url);
  },
  getCategories(clinic_id) {
    const url = `/clinic/category/${clinic_id}`;
    return axiosClient.get(url);
  },
  getDoctors(clinic_id) {
    const url = `/clinic/doctor/${clinic_id}`;
    return axiosClient.get(url);
  },
  getPatients() {
    const url = `/patient/crm/patient`;
    return axiosClient.get(url);
  },
  getClinicByDoctor(doctor_id) {
    const url = `/doctor/account/clinic/${doctor_id}`;
    return axiosClient.get(url);
  },
};

export default clinicAPI;
