import React, { useState } from 'react';
import { Form, Select, Input, Radio, Row, Col, Upload, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import moment from 'moment';

import {
  changeUserNeedUpdateAvatar,
  deleteUserNeedUpdateAvatar,
  getIdentity,
  selectUserIsLoading,
  selectUserNeedUpdate,
  updateInformation,
} from '../../../store/slices/usersSlice';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import { useEffect } from 'react';

const formItemLayout = {
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

const { Option } = Select;

export default function UserForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [avatar, setAvatar] = useState([]);
  const [oldImage, setOldImage] = useState(false);
  const isLoading = useSelector(selectUserIsLoading);
  const userNeedUpdate = useSelector(selectUserNeedUpdate);
  const [preview, setPreview] = useState({
    isOpen: false,
    name: '',
    src: '',
  });

  useEffect(() => {
    dispatch(getIdentity());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(userNeedUpdate).length > 0) {
      form.setFieldsValue({
        email: userNeedUpdate.email,
        blood: 'AB+',
        first_name: userNeedUpdate.first_name,
        last_name: userNeedUpdate.last_name,
        phone: userNeedUpdate.phone,
        date_of_birth: moment(userNeedUpdate.date_of_birth),
        gender:
          userNeedUpdate.gender.charAt(0).toUpperCase() +
          userNeedUpdate.gender.slice(1),
        state: userNeedUpdate.state,
        city: userNeedUpdate.city,
        address: userNeedUpdate.address,
      });
    }
  }, [form, userNeedUpdate]);

  const handlePreview = (file) => {
    setPreview({
      ...preview,
      src: userNeedUpdate.avatar[0].url,
      name: userNeedUpdate.avatar[0].name,
      isOpen: true,
    });
  };

  const handleClose = () => {
    setPreview({ ...preview, isOpen: false });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('full_name', `${values.first_name} ${values.last_name}`);
    formData.append('email', values.email);
    formData.append('phone', `${values.phone}`);
    formData.append('gender', values.gender);
    formData.append('state', values.state);
    formData.append('city', values.city);
    formData.append('address', values.address);
    formData.append('date_of_birth', values.date_of_birth.format('YYYY-MM-DD'));
    if (oldImage) {
      formData.append('old_image', oldImage);
      formData.append('avatar', avatar[0]);
    }
    formData.append('patient_id', userNeedUpdate.patient_id);

    dispatch(updateInformation(formData));
  };

  return (
    <div className="userform-container">
      <Form
        form={form}
        scrollToFirstError
        {...formItemLayout}
        onFinish={handleSubmit}
        name="userForm"
        className="userForm"
      >
        {/* Upload */}
        <Form.Item label="Avatar" valuePropName="fileList">
          <Upload
            onRemove={(file) => {
              dispatch(deleteUserNeedUpdateAvatar());
            }}
            beforeUpload={(file) => {
              // Fake sending document to action props succesfully
              setOldImage(true);
              file.status = 'done';
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (event) => {
                setAvatar([file]);
                file.url = event.target.result;
                dispatch(changeUserNeedUpdateAvatar(file));
              };
              return false;
            }}
            listType="picture-card"
            fileList={userNeedUpdate.avatar}
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

        <Row>
          <Col className="left" sm={24} md={12} lg={12} xl={12} xll={12}>
            {/* Email */}
            <Form.Item
              className="form-input-group"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
              label="Email"
              name="email"
            >
              <Input disabled className="input" placeholder="abc@gmail.com" />
            </Form.Item>

            {/* First Name */}
            <Form.Item
              className="form-input-group"
              rules={[
                {
                  required: true,
                  message: 'Please enter your first name!',
                },
              ]}
              label="First Name"
              name="first_name"
            >
              <Input className="input" placeholder="First Name" />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              className="form-input-group"
              rules={[
                {
                  required: true,
                  message: 'Please enter your last name!',
                },
              ]}
              label="Last Name"
              name="last_name"
            >
              <Input className="input" placeholder="Last Name" />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              className="form-input-group"
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone!',
                },
              ]}
              label="Phone"
              name="phone"
            >
              <Input className="input" placeholder="19908198" />
            </Form.Item>
          </Col>
          <Col className="right" sm={24} md={12} lg={12} xl={12} xll={12}>
            {/* Blood group */}
            <Form.Item
              name="blood"
              label="Blood group"
              className="form-input-group"
            >
              <Select placeholder="Select blood group">
                <Option value="A-">A-</Option>
                <Option value="A+">A+</Option>
                <Option value="B-">B-</Option>
                <Option value="B+">B+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="O">O</Option>
              </Select>
            </Form.Item>

            {/* Date of birth */}
            <Form.Item
              className="form-input-group"
              label="Date of birth"
              name="date_of_birth"
              rules={[
                { required: true, message: 'Please enter your date of brith' },
              ]}
            >
              <DatePicker
                className="input"
                style={{ padding: '12px 20px' }}
                allowClear={false}
                format="DD-MM-YYYY"
              />
            </Form.Item>

            {/* Gender */}
            <Form.Item
              label="Gender"
              name="gender"
              className="form-input-group gender"
              rules={[
                {
                  required: true,
                  message: 'Please select your gender!',
                },
              ]}
            >
              <Radio.Group className="input input-radio">
                <Radio value="Female">Female</Radio>
                <Radio value="Male">Male</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            {/* State */}
            <Form.Item
              className="form-input-group"
              rules={[
                {
                  required: true,
                  message: 'Please enter your state!',
                },
              ]}
              label="State"
              name="state"
            >
              <Input className="input" placeholder="Entery your state" />
            </Form.Item>
          </Col>
        </Row>

        {/* City */}
        <Form.Item
          className="form-input-group"
          rules={[
            {
              required: true,
              message: 'Please enter your city!',
            },
          ]}
          label="City"
          name="city"
        >
          <Input className="input" placeholder="Enter your city" />
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
          name="address"
        >
          <Input className="input" placeholder="Enter address" />
        </Form.Item>

        <Form.Item>
          <Button type="submit" className="button button--blue--dark">
            <span>{isLoading ? <Spinner /> : 'Save Changes'}</span>
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className={`content ${preview.isOpen ? 'active' : ''}`}
        isOpen={preview.isOpen}
        renderBody={() => (
          <div className="content content-preview">
            <div className="close-btn" onClick={handleClose}>
              <IoClose className="close-icon" />
            </div>
            <h3 className="title">{preview.name}</h3>
            <img className="modal-image" src={preview.src} alt="Preivew img" />
          </div>
        )}
        onClose={handleClose}
      />
    </div>
  );
}
