import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  selectUserIsLoading,
} from '../../../store/slices/usersSlice';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

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

export default function ChangePasswordForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

  const handleSubmit = (values) => {
    dispatch(
      changePassword({
        password: values.new_password,
      })
    );
  };

  return (
    <div className="changePassword-form-container">
      <Row>
        <Col className="left" sm="12" md={12} lg={12} xl={12} xxl={12}>
          <Form
            form={form}
            scrollToFirstError
            name="changePassword"
            onFinish={handleSubmit}
            className="changePasswordForm"
            {...formItemLayout}
          >
            {/* Current Password */}
            <Form.Item
              name="current_password"
              label="Current password"
              rules={[
                {
                  required: true,
                  message: 'Please input your current password!',
                },
              ]}
              className="form-input-group"
            >
              <Input.Password
                className="input"
                placeholder="Enter your current password!"
              />
            </Form.Item>

            {/* New Password */}
            <Form.Item
              name="new_password"
              label="New password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
              hasFeedback
              className="form-input-group"
            >
              <Input.Password
                className="input"
                placeholder="Enter your new password!"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
              className="form-input-group"
            >
              <Input.Password
                className="input"
                placeholder="Confirm your password!"
              />
            </Form.Item>

            <Form.Item>
              <Button type="submit" className="button button--blue--dark">
                <span>{isLoading ? <Spinner /> : 'Save Changes'}</span>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
