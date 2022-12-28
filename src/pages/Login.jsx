import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Segmented } from 'antd';
import { PhoneFilled, MailFilled } from '@ant-design/icons';

const Login = () => {
  const [segVal, setSegVal] = useState('email');
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const options = [
    {
      label: 'Email',
      value: 'email',
      icon: <MailFilled />
    },
    {
      label: 'Phone',
      value: 'phone',
      icon: <PhoneFilled />
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="my-8 flex justify-center">
        <Segmented className="mx-auto" options={options} value={segVal} onChange={setSegVal} />
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {segVal === 'email' && (
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Email cannot be empty'
              }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        )}

        {segVal === 'phone' && (
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Phone cannot be empty'
              }
            ]}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>
        )}

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

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 4,
            span: 16
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
