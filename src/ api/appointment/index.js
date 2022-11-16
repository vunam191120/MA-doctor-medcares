import axiosClient from '../axios.config';

const appointmentAPI = {
  book(appointment) {
    const url = `/patient/appointment`;
    return axiosClient.post(url, appointment);
  },
  getAll() {
    const url = `/patient/account/appointment`;
    return axiosClient.get(url);
  },
};

export default appointmentAPI;
