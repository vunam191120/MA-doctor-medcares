import axiosClient from '../axios.config';

const userAPI = {
  signIn(email, password) {
    const url = `/doctor/login`;
    return axiosClient.post(url, {
      email,
      password,
    });
  },
  getOne() {
    const url = `/doctor/account/doctor`;
    return axiosClient.get(url);
  },
  update(newInformation) {
    const url = `/doctor/account/doctor`;
    return axiosClient.put(url, newInformation, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  changePassword(password) {
    const url = `/doctor/account/doctor/password`;
    return axiosClient.put(url, password);
  },
};

export default userAPI;
