import React from 'react';
import { Row, Col, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { BsTelephoneFill } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import { FaUser } from 'react-icons/fa';

import { Animate } from '../AnimateIn';
import Button from '../Button';

const { Option } = Select;

export default function Appointment() {
  return (
    <section className="appointment-container container-space">
      <div className="container-fluid">
        <Row className="appointment-content">
          <Col className="left" xs={24} sm={24} md={24} lg={24} xl={24}>
            <ul className="info-list">
              <Animate.ScaleInCenter>
                <li className="info-item">
                  <div className="info-num-container">
                    <span className="num">2500</span>
                    <span className="icon">&#43;</span>
                  </div>
                  <p className="text">Care Locations</p>
                </li>
              </Animate.ScaleInCenter>
              <Animate.ScaleInCenter>
                <li className="info-item">
                  <div className="info-num-container">
                    <span className="num">2700</span>
                    <span className="icon">&#43;</span>
                  </div>
                  <p className="text">Virtual Care Solutions</p>
                </li>
              </Animate.ScaleInCenter>
              <Animate.ScaleInCenter>
                <li className="info-item">
                  <div className="info-num-container">
                    <span className="num">99.6</span>
                    <span className="icon">%</span>
                  </div>
                  <p className="text">Connections Success Rate</p>
                </li>
              </Animate.ScaleInCenter>
              <Animate.ScaleInCenter>
                <li className="info-item">
                  <div className="info-num-container">
                    <span className="num">30</span>
                    <span className="icon">&#43;</span>
                  </div>
                  <p className="text">Award Winning</p>
                </li>
              </Animate.ScaleInCenter>
            </ul>
          </Col>
          <Col className="right" xs={0} sm={0} md={0} lg={0} xl={0}>
            <Animate.FadeInRight>
              <Form
                className="appointment-form"
                // form={appointmentForm}
                // onFinish={handleSubmitBook}
                name="appointmentForm"
                scrollToFirstError
              >
                <span className="heading">Call to Action</span>
                <h3 className="title">Make An Appointment</h3>
                <div className="form-group">
                  {/* Name */}
                  <Form.Item className="form-input-group">
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your name!',
                        },
                      ]}
                    >
                      <Input className="input" placeholder="Enter your name!" />
                    </Form.Item>
                    <FaUser className="icon" />
                  </Form.Item>

                  {/* Email */}
                  <Form.Item className="form-input-group">
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please enter your name!',
                        },
                      ]}
                    >
                      <Input
                        className="input"
                        placeholder="Enter your email!"
                      />
                    </Form.Item>
                    <TfiEmail className="icon" />
                  </Form.Item>

                  {/* Phone */}
                  <Form.Item className="form-input-group">
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your phone!',
                        },
                      ]}
                    >
                      <Input
                        className="input"
                        placeholder="Enter your phone!"
                      />
                    </Form.Item>
                    <BsTelephoneFill className="icon" />
                  </Form.Item>

                  {/* Category */}
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your category!',
                      },
                    ]}
                    className="form-input-group"
                  >
                    <Select
                      placeholder="Select your cateogry"
                      optionLabelProp="label"
                    >
                      <Option key="1" values="Medicine">
                        Medicine
                      </Option>
                      <Option key="2" values="Cardiologists">
                        Cardiologists
                      </Option>
                      <Option key="3" values="Medicine">
                        Medicine
                      </Option>
                      <Option key="4" values="Cardiologists">
                        Cardiologists
                      </Option>
                    </Select>
                  </Form.Item>

                  {/* Doctor */}
                  <Form.Item
                    name="doctor"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your doctor!',
                      },
                    ]}
                    className="form-input-group"
                  >
                    <Select
                      placeholder="Select your doctor"
                      optionLabelProp="label"
                    >
                      <Option key="1" values="Dr. James Adult">
                        Dr. James Adult
                      </Option>
                      <Option key="2" values="Dr. James Alison">
                        Dr. James Alison
                      </Option>
                      <Option key="3" values="Dr. James Adult">
                        Dr. James Adult
                      </Option>
                      <Option key="4" values="Dr. James Alison">
                        Dr. James Alison
                      </Option>
                    </Select>
                  </Form.Item>

                  {/* Date */}
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Please select your date!',
                      },
                    ]}
                    className="form-input-group"
                  >
                    <DatePicker
                      disabledDate={(current) => {
                        // Disable all Sunday, today and days before today
                        return (
                          current.day() === 0 ||
                          (current && current < moment().endOf('day'))
                        );
                      }}
                      allowClear={false}
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </div>

                <Form.Item>
                  <Button className="button button--blue--light" type="submit">
                    Confirm Appointment
                  </Button>
                </Form.Item>
              </Form>
            </Animate.FadeInRight>
          </Col>
        </Row>
      </div>
    </section>
  );
}
