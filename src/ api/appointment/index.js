import axiosClient from '../axios.config';

const appointmentAPI = {
  getAll() {
    const url = `/doctor/account/appointment`;
    return axiosClient.get(url);
  },
};

export default appointmentAPI;
