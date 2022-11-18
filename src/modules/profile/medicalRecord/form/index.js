import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Table, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { GiHealthPotion } from 'react-icons/gi';

import {
  fetchClinicByDoctor,
  fetchPatients,
  selectClinicByDoctor,
  selectPatients,
} from '../../../../store/slices/clinicsSlice';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';
import Modal from '../../../../components/Modal';
import {
  addMedicalRecord,
  selectMedicalRecordIsLoading,
  selectMedicalRecordNeedUpdate,
} from '../../../../store/slices/medicalRecordsSlice';
import { FILE_TYPES, STATUS_MEDICAL_RECORD } from '../../../../constants';
import {
  fetchProducts,
  selectProducts,
} from '../../../../store/slices/productsSlice';
import moment from 'moment';
import {
  selectUserIsLoading,
  selectUserNeedUpdate,
} from '../../../../store/slices/usersSlice';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xl: {
      span: 5,
    },
    lg: {
      span: 5,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xl: {
      span: 17,
    },
    lg: {
      span: 17,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const formItemLayoutProduct = {
  labelCol: {
    xl: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
  wrapperCol: {
    xl: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xl: {
      span: 24,
      offset: 4,
    },
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function MedicalRecordForm({ mode }) {
  const { record_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [productForm] = Form.useForm();
  const [modeHaveAccount, setModeHaveAccount] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isShowProductForm, setIsShowProductForm] = useState(false);
  const clinic = useSelector(selectClinicByDoctor);
  const patients = useSelector(selectPatients);
  const products = useSelector(selectProducts);
  const currentDoctor = useSelector(selectUserNeedUpdate);
  const medicalRecordNeedUpdate = useSelector(selectMedicalRecordNeedUpdate);
  const isLoading = useSelector(selectUserIsLoading);

  // Fetch clinic by doctor
  useEffect(() => {
    if (Object.keys(clinic).length === 0 && currentDoctor.doctor_id) {
      dispatch(fetchClinicByDoctor(currentDoctor.doctor_id));
    }
  }, [clinic, currentDoctor.doctor_id, dispatch]);

  // Fetch patients
  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatients());
    }
  }, [dispatch, patients]);

  // Fetch products
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Reset fields whenever change mode account back to no when creating
  useEffect(() => {
    if (!modeHaveAccount && mode === 'create') {
      form.resetFields();
    }
  }, [form, mode, modeHaveAccount]);

  const productColumns = [
    {
      title: 'ID',
      key: 'product id',
      dataIndex: 'product_id',
    },
    {
      title: 'Product Name',
      key: 'product name',
      dataIndex: 'product_name',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
  ];

  const handleSubmitProduct = (values) => {
    const newProduct = {
      product_id: values.product_id,
      product_name: values.product_name,
      quantity: values.quantity,
      description: values.description,
    };

    setSelectedProducts([...selectedProducts, newProduct]);
  };

  // Popup form
  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowProductForm(false)}>
        <IoClose className="close-icon" />
      </div>
      <GiHealthPotion className="icon-title icon-title--delete" />
      <h3 className="message">
        {mode === 'create' ? 'Add' : 'Update'} Product Form
      </h3>
      <Form
        {...formItemLayoutProduct}
        className="productForm"
        form={productForm}
        onFinish={handleSubmitProduct}
        name="productForm"
        scrollToFirstError
      >
        {/* Products */}
        <Form.Item label="Product Item" name="product_id">
          <Select
            disabled={mode === 'update'}
            className="input-custom-disabled"
            onChange={(e) => {
              const selectedProduct = products.find(
                (product) => product.product_id === e
              );
              productForm.setFieldValue(
                'product_name',
                selectedProduct.product_name
              );
            }}
            placeholder="Select product"
          >
            {products.map((product, index) => (
              <Option key={index} value={product.product_id}>
                {product.product_id} - {product.product_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Product Name */}
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'Please input your product name!',
            },
          ]}
        >
          <Input placeholder="Enter your product name!" />
        </Form.Item>

        {/* Quantity */}
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter quantity!' }]}
        >
          <InputNumber
            placeholder="Enter quantity"
            style={{ width: '100%' }}
            className="input-custom-disabled"
            min={0}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input description',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter your description"
            showCount
            maxLength={100}
          />
        </Form.Item>

        {/* Buttons */}
        <Form.Item className="btn-container">
          <Button
            className="button button--light"
            onClick={() => setIsShowProductForm(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="button button--blue--dark">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const handlePreview = () => {};

  const handleSubmitMedicalRecord = (values) => {
    const formData = new FormData();
    formData.append('clinic_id', clinic.clinic_id);
    formData.append('doctor_id', currentDoctor.doctor_id);
    formData.append('patient_id', values.patient_id);
    formData.append('patient_name', values.patient_name);
    formData.append('age', values.age);
    formData.append('patient_address', values.patient_address);
    formData.append('diagnose', values.diagnose);
    formData.append('disease_progression', values.disease_progression);
    selectedProducts.forEach((product) => {
      formData.append('prescriptions', product);
    });
    fileList.forEach((file) => {
      formData.append('documents', file);
    });

    dispatch(addMedicalRecord(formData));
    // console.log(formData.getAll('prescriptions'));
  };

  return (
    <>
      <h3 className="title">
        {mode === 'create' ? 'Add' : 'Update'} Medical Record
      </h3>
      <Form
        {...formItemLayout}
        className="medicalRecordForm"
        form={form}
        onFinish={handleSubmitMedicalRecord}
        name="medicalRecordForm"
        scrollToFirstError
      >
        {/* Medical Record Information */}
        <div className="medical-record-container">
          <h3 className="title-separate">Medical Record Information</h3>

          {/* Change mode account */}
          {mode === 'create' && (
            <div className="switch-table">
              <span className="text-mode">
                {modeHaveAccount
                  ? 'Payment has patient accounts'
                  : 'Payment does not have patient accounts'}
                :{' '}
              </span>
              <Switch
                onChange={(values) => {
                  setModeHaveAccount(values);
                }}
                defaultChecked={modeHaveAccount}
                className="switch"
              />
            </div>
          )}

          {/* Patient Name */}
          {((mode === 'create' && !modeHaveAccount) ||
            (mode === 'update' &&
              !medicalRecordNeedUpdate.medical_record.patient_id)) && (
            <>
              {/* Name */}
              <Form.Item
                name="patient_name"
                label="Patient Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input patient name!',
                  },
                ]}
              >
                <Input
                  disabled={mode === 'update'}
                  className="input-custom-disabled"
                  placeholder="Enter patient name!"
                />
              </Form.Item>
            </>
          )}

          {/* Patient Item */}
          {((mode === 'create' && modeHaveAccount) ||
            (mode === 'update' &&
              medicalRecordNeedUpdate.medical_record.patient_id)) && (
            <>
              {/* Patients */}
              <Form.Item
                name="patient_id"
                label="Patient"
                rules={[
                  {
                    required: true,
                    message: 'Please select patient',
                  },
                ]}
              >
                <Select
                  disabled={mode === 'update'}
                  className="input-custom-disabled"
                  onChange={(e) => {
                    const selectedPatient = patients.find(
                      (patient) => patient.patient_id === e
                    );
                    form.setFieldsValue({
                      patient_name: selectedPatient.full_name,
                      phone: selectedPatient.phone,
                      email: selectedPatient.email,
                      age:
                        moment().year() -
                        moment(selectedPatient.date_of_birth).year(),
                      patient_address: selectedPatient.address,
                    });
                  }}
                  placeholder="Select patient"
                >
                  {patients.map((patient, index) => (
                    <Option key={index} value={patient.patient_id}>
                      {patient.patient_id} - {patient.full_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Patient Name */}
              <Form.Item
                name="patient_name"
                label="Patient Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input patient name!',
                  },
                ]}
              >
                <Input
                  disabled={modeHaveAccount}
                  className="input-custom-disabled"
                  placeholder={`${
                    modeHaveAccount ? '' : 'Enter patient name!'
                  }`}
                />
              </Form.Item>
            </>
          )}

          {/* Phone */}
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
              },
            ]}
          >
            <Input
              disabled={modeHaveAccount}
              className="input-custom-disabled"
              placeholder={`${modeHaveAccount ? '' : 'Enter phone!'}`}
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid e-mail!',
              },
              {
                required: true,
                message: 'Please input e-mail!',
              },
            ]}
          >
            <Input
              disabled={modeHaveAccount}
              className="input-custom-disabled"
              placeholder={`${modeHaveAccount ? '' : 'Enter email!'}`}
            />
          </Form.Item>

          {/* Age */}
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter age!' }]}
          >
            <InputNumber
              min={0}
              disabled={modeHaveAccount}
              className="input-custom-disabled"
              placeholder={`${modeHaveAccount ? '' : 'Enter age!'}`}
            />
          </Form.Item>

          {/* Address */}
          <Form.Item
            className="form-input-group"
            rules={[
              {
                required: true,
                message: 'Please enter your address!',
              },
            ]}
            label="Address"
            name="patient_address"
          >
            <Input
              disabled={modeHaveAccount}
              className="input-custom-disabled"
              placeholder={`${modeHaveAccount ? '' : 'Enter address!'}`}
            />
          </Form.Item>

          {/* Diagnose */}
          <Form.Item
            name="diagnose"
            label="Diagnose"
            rules={[
              {
                required: true,
                message: 'Please input diagnose',
              },
            ]}
          >
            <Input.TextArea
              placeholder="Enter diagnose"
              showCount
              rows={4}
              maxLength={1000}
            />
          </Form.Item>

          {/* Disease Progression */}
          <Form.Item
            name="disease_progression"
            label="Disease Progression"
            rules={[
              {
                required: true,
                message: 'Please input disease progression',
              },
            ]}
          >
            <Input.TextArea
              placeholder="Enter disease progression"
              showCount
              rows={12}
              maxLength={1000}
            />
          </Form.Item>

          {/* Status */}
          {mode === 'update' && (
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Please select status!',
                },
              ]}
            >
              <Select placeholder="Select status">
                {STATUS_MEDICAL_RECORD.map((status, index) => (
                  <Option value={status} key={index}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>

        {/* Documents */}
        <div className="medical-record-container">
          <h3 className="title-separate">Documents</h3>
          {/* Images */}
          <Form.Item label="Documents" valuePropName="fileList">
            <Upload
              onRemove={(file) => {
                if (mode === 'create') {
                  const index = fileList.indexOf(file);
                  const newFileList = fileList.slice();
                  newFileList.splice(index, 1);
                  setFileList(newFileList);
                }
                // else {
                //   setIsShowDelete(true);
                //   setImageDelete(file);
                // }
              }}
              beforeUpload={(file) => {
                // Fake sending document to action props succesfully
                file.status = 'done';
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                  // if (mode === 'update') {
                  //   file.url = event.target.result;
                  //   dispatch(addClinicNeedUpdateImage(file));
                  // }

                  // Find extension
                  // const extension = file.name.split('.').pop().toLowerCase();
                  // const valid = FILE_TYPES.includes(extension) === 'pdf';
                  file.url = event.target.result;
                  setFileList((oldFile) => [...oldFile, file]);
                };
                return false;
              }}
              multiple
              listType="picture-card"
              // fileList={mode === 'update' ? clinicNeedUpdate.images : fileList}
              fileList={fileList}
              onPreview={handlePreview}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
        </div>

        {/* Prescriptions */}
        <div className="medical-record-container">
          <div className="header">
            <h3 className="title-separate">Prescriptions</h3>
            <Button
              type="button"
              className="button button--light"
              onClick={() => setIsShowProductForm(true)}
            >
              Add Drug
            </Button>
          </div>
          <Table
            className="medical-record-table"
            x={true}
            loading={isLoading}
            scroll={{ x: 300 }}
            pagination={{
              position: ['bottomCenter'],
            }}
            columns={productColumns}
            dataSource={selectedProducts}
            rowKeys={(record) => record.product_id}
          />
        </div>

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button className="button button--main" type="submit">
            {isLoading ? (
              <Spinner />
            ) : (
              `${
                mode === 'create'
                  ? 'Add Medical Record'
                  : 'Update Medical Record'
              }`
            )}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="button"
            className="button button--dark--light"
            onClick={() => console.log(selectedProducts)}
          >
            Cilck me
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className={`${isShowProductForm ? 'active' : ''}`}
        onClickClose={() => setIsShowProductForm(false)}
        isOpen={isShowProductForm}
        renderBody={renderBody}
      />
    </>
  );
}
