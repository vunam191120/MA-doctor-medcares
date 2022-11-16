import React, { useState } from 'react';
import { Form, Input, Radio, Row, Col, Upload, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { IoClose } from 'react-icons/io5';
import moment from 'moment';

import {
  changeUserNeedUpdateAvatar,
  deleteUserNeedUpdateAvatar,
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

export default function UserForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
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
    if (Object.keys(userNeedUpdate).length > 0) {
      form.setFieldsValue({
        email: userNeedUpdate.email,
        first_name: userNeedUpdate.first_name,
        last_name: userNeedUpdate.last_name,
        phone: userNeedUpdate.phone,
        date_of_birth: moment(userNeedUpdate.date_of_birth),
        gender: userNeedUpdate.gender,
        address: userNeedUpdate.address,
        description: userNeedUpdate.description,
        other_document: userNeedUpdate.other_document,
        work_progress: userNeedUpdate.work_progress,
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
    formData.append('other_document', values.other_document);
    formData.append('work_progress', values.work_progress);
    formData.append(
      'date_of_birth',
      values.date_of_birth.toDate().toISOString()
    );
    formData.append('description', values.description);
    if (oldImage) {
      formData.append('old_image', oldImage);
      formData.append('avatar', avatar[0]);
    }
    formData.append('doctor_id', userNeedUpdate.doctor_id);

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
          </Col>
          <Col className="right" sm={24} md={12} lg={12} xl={12} xll={12}>
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
        </Row>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter your description!',
            },
          ]}
        >
          <Input.TextArea autosize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

        {/* Other document */}
        <Form.Item label="Other document" name="other_document">
          <Input.TextArea
            autosize={{ minRows: 3, maxRows: 6 }}
            style={{
              minHeight: 100,
            }}
          />
        </Form.Item>

        {/* Work progress */}
        <Form.Item
          label="Work progress"
          name="work_progress"
          rules={[
            {
              required: true,
              message: 'Please enter your work progress!',
            },
          ]}
        >
          <Input.TextArea
            autosize={{ minRows: 3, maxRows: 6 }}
            style={{
              minHeight: 100,
            }}
          />
        </Form.Item>

        {/* Buttons */}
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
