import axiosClient from '../axios.config';

const ProductAPI = {
  getAll() {
    const url = `/patient/product`;
    return axiosClient.get(url);
  },
  getOne(product_id) {
    const url = `/patient/product/${product_id}`;
    return axiosClient.get(url);
  },
  getSupplier() {
    const url = `/patient/supplier`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
