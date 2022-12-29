import React, { useState } from 'react';
import { AutoComplete, Button, Card, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
import { PhoneInput, international } from 'react-contact-number-input';
import countries from '../components/countries';
import axios from 'axios';
const { Option } = Select;
const Register = () => {
  const registerRequest = (val) => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'register', val, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    console.log(values);
    registerRequest(values);
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center sm:mt-20 mt-36">
        <Card
          style={{
            minWidth: 300,
            padding: '0 10px'
          }}
        >
          <Form name="register" onFinish={onFinish} layout="vertical">
            {/* Full name: First Name | Last Name */}
            <Form.Item noStyle>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'First name required'
                  }
                ]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)'
                }}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Last name required'
                  }
                ]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  marginLeft: '16px'
                }}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Email is required'
                }
              ]}
            >
              <Input type="email" placeholder="Input email" />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Phone is required'
                }
              ]}
            >
              <Input type="tel" placeholder="Input Phone" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default Register;
