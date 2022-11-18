import axiosClient from '../axios.config';

const medicalRecordAPI = {
  getAll(doctor_id) {
    const url = `/patient/record/doctor/${doctor_id}`;
    return axiosClient.get(url);
  },
  getOne(record_id) {
    const url = `/patient/record/medical/${record_id}`;
    return axiosClient.get(url);
  },
  add(newMedicalRecord) {
    const url = `/patient/record/patient`;
    return axiosClient.post(url, newMedicalRecord, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default medicalRecordAPI;
