import React from 'react';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { PhoneFilled, MailFilled } from '@ant-design/icons';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { setUser } = useAuth();

  const submitRequest = (val) => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'login', val, { withCredentials: true })
      .then((res) => {
        res.data?.id && setUser(res.data);
        console.log(res);
      })
      .catch((err) => {
        setUser(null);
        console.log(err);
      });
  };

  const onFinish = (values) => {
    submitRequest(values);
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
    <div className="mx-auto">
      <div className="container flex justify-center sm:mt-20 mt-36">
        <Card
          style={{
            width: 300
          }}
        >
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
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

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default Login;
