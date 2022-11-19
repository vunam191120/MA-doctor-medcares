import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Table, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { GiHealthPotion } from 'react-icons/gi';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

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
  deleteDocument,
  deletePrescription,
  fetchMedicalRecord,
  selectMedicalRecordNeedUpdate,
  updateMedicalRecord,
} from '../../../../store/slices/medicalRecordsSlice';
import { STATUS_MEDICAL_RECORD } from '../../../../constants';
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

export default function MedicalRecordForm({ mode }) {
  const { record_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [productForm] = Form.useForm();
  const [modeHaveAccount, setModeHaveAccount] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cloneUpdateProducts, setCloneUpdateProducts] = useState([]);
  const [cloneUpdateDocuments, setCloneUpdateDocuments] = useState([]);
  const [isShowProductForm, setIsShowProductForm] = useState(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [isDeleteDocument, setIsDeleteDocument] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState({});
  const [productToDelete, setProductToDelete] = useState({});
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

  // Fetch medical record need update
  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchMedicalRecord(record_id));
    }
  }, [dispatch, mode, record_id]);

  // Clone product, document when fetching medical record from update
  useEffect(() => {
    if (mode === 'update' && medicalRecordNeedUpdate.length > 0) {
      setCloneUpdateProducts(medicalRecordNeedUpdate.prescriptions);
      setCloneUpdateDocuments(medicalRecordNeedUpdate.images);
    }
  }, [
    medicalRecordNeedUpdate.images,
    medicalRecordNeedUpdate.length,
    medicalRecordNeedUpdate.prescriptions,
    mode,
  ]);

  // Reset fields whenever change mode account back to no when creating
  useEffect(() => {
    if (!modeHaveAccount && mode === 'create') {
      form.resetFields();
    }
  }, [form, mode, modeHaveAccount]);

  // Fill form when mode update
  useEffect(() => {
    if (mode === 'update' && Object.keys(medicalRecordNeedUpdate).length > 0) {
      form.setFieldsValue({
        patient_id: medicalRecordNeedUpdate.medical_record.patient_id,
        patient_name: medicalRecordNeedUpdate.medical_record.patient_name,
        patient_address: medicalRecordNeedUpdate.medical_record.patient_address,
        phone: medicalRecordNeedUpdate.medical_record.phone,
        age: medicalRecordNeedUpdate.medical_record.age,
        email: medicalRecordNeedUpdate.medical_record.email,
        diagnose: medicalRecordNeedUpdate.medical_record.diagnose,
        disease_progression:
          medicalRecordNeedUpdate.medical_record.disease_progression,
        status: medicalRecordNeedUpdate.medical_record.status,
      });
      setFileList(medicalRecordNeedUpdate.images);
      setSelectedProducts(medicalRecordNeedUpdate.prescriptions);
    }
  }, [form, medicalRecordNeedUpdate, mode, modeHaveAccount]);

  const productColumns = [
    {
      title: 'ID',
      key: 'prescription_id',
      dataIndex: 'prescription_id',
    },
    {
      title: 'Product Name',
      key: 'product_name',
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
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <div className="button-container">
          <Button
            type="button"
            className="button button--text--delete"
            onClick={() => {
              setIsDeleteProduct(true);
              setProductToDelete(record);
            }}
          >
            <FiTrash2 className="icon" />
            <span>Delete</span>
          </Button>
        </div>
      ),
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

  // Popup product
  const renderModalProduct = () => (
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
        <div className="btn-container button--container--product">
          <Button
            className="button button--light "
            onClick={() => setIsShowProductForm(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="button button--blue--dark">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );

  // Popup confirm delete product
  const renderModalDeleteProduct = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsDeleteProduct(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this prescription?</h3>
      <h3 className="object">{productToDelete.product_name}</h3>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsDeleteProduct(false)}
        >
          Cancel
        </Button>
        <Button
          className="button button--blue--dark"
          onClick={() => {
            dispatch(deletePrescription(productToDelete.prescription_id));
            setIsDeleteProduct(false);
            const index = selectedProducts.indexOf(productToDelete);
            const newSelectedProducts = selectedProducts.slice();
            newSelectedProducts.splice(index, 1);
            setSelectedProducts(newSelectedProducts);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  // Popup confirm delete document
  const renderModalDeleteDocument = (index) => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsDeleteDocument(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this image?</h3>
      <div className="object">
        <img
          className="img"
          src={documentToDelete.url}
          width="100%"
          alt="img confirm delete"
        />
      </div>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsDeleteDocument(false)}
        >
          Cancel
        </Button>
        <Button
          className="button button--blue--dark"
          onClick={() => {
            dispatch(deleteDocument(documentToDelete.document_id));
            setIsDeleteDocument(false);
            const index = fileList.indexOf(documentToDelete);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          }}
        >
          Delete
        </Button>
      </div>
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
    if (mode === 'create') {
      formData.append('prescriptions', JSON.stringify(selectedProducts));
      fileList.forEach((file) => formData.append('documents', file));
      dispatch(addMedicalRecord(formData));
    } else {
      // Compare length between clone and selected arr to identity where it should update or not.
      if (cloneUpdateDocuments.length !== fileList.length) {
        fileList
          .slice(cloneUpdateDocuments.length)
          .forEach((file) => formData.append('documents', file));
      }
      if (cloneUpdateProducts.length !== selectedProducts.length) {
        formData.append(
          'prescriptions',
          JSON.stringify(selectedProducts.slice(cloneUpdateProducts.length))
        );
      }
      formData.append('record_id', record_id);
      dispatch(updateMedicalRecord(formData));
    }
  };

  return (
    <>
      <h3 className="title medical-heading">
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

          {/* Patient Item */}
          {((mode === 'create' && modeHaveAccount) ||
            (mode === 'update' &&
              modeHaveAccount &&
              Object.keys(medicalRecordNeedUpdate).length > 0 &&
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
            </>
          )}

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
              placeholder={`${modeHaveAccount ? '' : 'Enter patient name!'}`}
            />
          </Form.Item>

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
                } else {
                  setIsDeleteDocument(true);
                  setDocumentToDelete(file);
                }
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
            <h3 className="title-separate title-prescriptions">
              Prescriptions
            </h3>
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
            rowKey={(record) => record.prescription_id}
          />
        </div>

        {/* Button */}
        <Button
          className="button button--blue--dark button--submit"
          type="submit"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            `${
              mode === 'create' ? 'Add Medical Record' : 'Update Medical Record'
            }`
          )}
        </Button>
      </Form>

      {/* Form Product */}
      <Modal
        className={`${isShowProductForm ? 'active' : ''}`}
        onClickClose={() => setIsShowProductForm(false)}
        isOpen={isShowProductForm}
        renderBody={renderModalProduct}
      />

      {/* Modal for confirm delete product */}
      <Modal
        className={`${isDeleteProduct ? 'active' : ''}`}
        onClickClose={() => setIsDeleteProduct(false)}
        isOpen={isDeleteProduct}
        renderBody={renderModalDeleteProduct}
      />

      {/* Modal for confirm delete document */}
      <Modal
        className={`${isDeleteDocument ? 'active' : ''}`}
        onClickClose={() => setIsDeleteDocument(false)}
        isOpen={isDeleteDocument}
        renderBody={renderModalDeleteDocument}
      />
    </>
  );
}
