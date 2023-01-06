import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
  Col,
  Row,
  Space,
  Select
} from 'antd';
import useAuth from '../hooks/useAuth';
import { useParams, useSearchParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const TeamRegistration = () => {
  const { tournamentID } = useParams();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('rudra@gmail.com');
  const [teamType, setTeamType] = useState(null);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const teamRegisterRequest = (val) => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'teamRegistration', val, {
        withCredentials: true
      })
      .then((res) => {
        if (!res.data.success) {
          console.log('success', res.data);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    // setTimeout(() => {
    //   setOpen(true);
    // }, 3000);
  };

  const onFinish = (values) => {
    const teamRegDoc = {
      ...values,
      tournament: tournamentID
    };
    // console.log(teamRegDoc);
    teamRegisterRequest(teamRegDoc);
  };

  const onPopRegReq = (values) => {
    console.log(values);
  };

  // console.log(email);

  return (
    <div>
      <h2 className="text-2xl text-center">Register Your Team</h2>
      <div className="mx-auto">
        <div className="flex justify-center mt-3">
          <Card
            style={{
              minWidth: 300,
              padding: '0 10px'
            }}
          >
            <Form name="teamRegistration" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Team Name"
                name="teamName"
                rules={[
                  {
                    required: true,
                    message: 'team name is required'
                  }
                ]}
              >
                <Input placeholder="Team Name" />
              </Form.Item>

              {/* Time limit */}
              {/* <Form.Item
                label="Time limit"
                name="limit"
                rules={[
                  {
                    required: true,
                    message: 'time limit is required'
                  }
                ]}
              >
                <DatePicker.RangePicker format="DD MMM, YYYY" />
              </Form.Item> */}

              {/* team type */}
              <Form.Item
                label="Team type"
                name="teamType"
                rules={[
                  {
                    required: true,
                    message: 'Please select a team type'
                  }
                ]}
              >
                <Radio.Group
                  // defaultValue="a"
                  value={teamType}
                  onChange={(e) => setTeamType(e.target.value)}
                  // style={{
                  //   marginTop: 16
                  // }}
                >
                  <Radio.Button value="Single">Single</Radio.Button>
                  <Radio.Button value="Double">Double</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {/* Tournament year */}
              {teamType === 'Double' && (
                <Form.Item
                  label="Second Player"
                  name="secondPlayer"
                  rules={[
                    {
                      required: true,
                      message: 'second player email is required'
                    }
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Second player email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              )}

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

      {/* drawer */}
      {/* <div>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button>
        <Drawer
          width={300}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80
          }}
        >
          <Form name="register" onFinish={onPopRegReq} layout="vertical">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'First name required'
                }
              ]}
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
            >
              <Input placeholder="Last Name" />
            </Form.Item>

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
              <Input
                type="email"
                placeholder="Input email"
                // value={email}
                defaultValue={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div> */}
    </div>
  );
};

export default TeamRegistration;
