import React, { useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import healthCareLogo from '../../assets/img/health-care-logo.png';
import bannerLoginBg from '../../assets/img/banner-login-bg.png';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { selectUserIsLoading, signIn } from '../../store/slices/usersSlice';
import { isLogin } from '../../helpers/isLogin';

export default function SigninForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    if (isLogin()) {
      return navigate(-1);
    }
  }, [navigate]);

  const handleSubmit = (values) => {
    const account = { email: values.email, password: values.password };
    dispatch(signIn(account));
  };

  return (
    <Row className="sigin-container">
      <Col className="left" sm={24} md={24} lg={12} xl={12} xxl={12}>
        <div className="container-fluid">
          <Link to="/" className="logo-container">
            <img
              src={healthCareLogo}
              alt="logo navigation"
              className="logo-img"
            />
            <span className="logo-text">MedCares</span>
          </Link>
          <div className="banner-container">
            <div className="banner-bg">
              <div className="left"></div>
              <div className="right"></div>
              <img
                src={bannerLoginBg}
                className="banner-img"
                alt="banner login bg"
              />
            </div>
          </div>
        </div>
      </Col>
      <Col className="right" sm={24} md={24} lg={12} xl={12} xxl={12}>
        <div className="container-fluid">
          <div className="form-container">
            <h2 className="title">Sign in</h2>
            <p className="sub-title">
              Let's protect yourself and those around you by vaccinating
            </p>
            <Form
              form={form}
              className="formLogin"
              name="formLogin"
              scrollToFirstError
              onFinish={handleSubmit}
            >
              {/* Email */}
              <Form.Item
                className="form-input-group"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email!',
                  },
                ]}
                name="email"
              >
                <Input className="input" placeholder="email@gmail.com" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                style={{ marginTop: 10 }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                className="form-input-group"
              >
                <Input.Password
                  className="input"
                  placeholder="Enter your password!"
                />
              </Form.Item>

              {/* Forgot Password */}
              <Form.Item
                style={{ textAlign: 'right' }}
                valuePropName="checked"
                name="forgot_password"
                className="form-input-group"
              >
                <span
                  className="forgot-pw"
                  defaultChecked={false}
                  // onClick={() => setForgotPw(true)}
                >
                  Forgot password?
                </span>
              </Form.Item>

              {/* Button */}
              <Form.Item className="form-input-group">
                <Button type="submit" className="button button--blue--dark">
                  <span>{isLoading ? <Spinner /> : 'Sign In'}</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
}
