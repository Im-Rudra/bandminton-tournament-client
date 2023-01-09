import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Input, Modal, Radio, Result, Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PopupRegistration from '../../components/PopupRegistration/PopupRegistration';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import TermsAndRules from './TermsAndRules';

const regConfirmMessage = {
  Single: `Congratulation for participating IANT-Badminton Tournament! Please pay your ENTRY FEE to complete your registration.
  The single player’s entry fee is $30.
  Please use Zelle to complete your transaction.
  The person’s name is Md Omar Faruk (214-414-6260).`,
  Double: `Congratulation for participating IANT-Badminton Tournament! Please pay your ENTRY FEE to complete your registration.
  The double player’s entry fee is $60.
  Please use Zelle to complete your transaction.
  The person’s name is Md Omar Faruk (214-414-6260).`
};

const TeamRegistration = () => {
  const { user } = useAuth();
  const { tournamentID } = useParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [teamType, setTeamType] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const showDrawer = () => {
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };

  const [verdictObj, setVerdictObj] = useState(null);
  const [accept, setAccept] = useState(false);

  const checkRegistrablity = () => {
    try {
      if (!user) {
        return;
      }
      const checkDoc = {
        userID: user?.id,
        tournament: tournamentID
      };
      setLoading(true);
      axios
        .post(process.env.REACT_APP_SERVER_ORIGIN + 'checkTeamRegistrablity', checkDoc, {
          withCredentials: true
        })
        .then((res) => {
          const { data } = res;
          if (data?.error) {
            if (res.data?.redirect) {
              toast.error(res.data.message);
              navigate(res.data.redirect);
            }
            // console.log(data);
            // setVerdictObj(null);
            setLoading(false);
            return toast.error(data.error.message);
          }
          // console.log(data);
          setLoading(false);
          setVerdictObj(data);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
          console.log(err.message);
        });
      // console.log(checkDoc);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkRegistrablity();
  }, [JSON.stringify(user)]);

  const teamRegisterRequest = (val) => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'teamRegistration', val, {
        withCredentials: true
      })
      .then((res) => {
        if (res.data.error) {
          // console.log('error', res.data);
          toast.error(res.data.message);
          setLoading(false);
          if (res.data.errorType === 'create-new-user') {
            return setOpen(true);
          }
          if (res.data?.redirect) {
            navigate(res.data.redirect);
          }
        }
        if (res.data._id) {
          setLoading(false);
          toast.success('Team registration successful');
          Modal.success({
            title: `${val.teamType} team registration successful`,
            content: regConfirmMessage[val.teamType],
            onOk: () => {
              navigate('/team-registration');
            }
          });
        }
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  const onFinish = (values) => {
    const teamRegDoc = {
      ...values,
      tournament: tournamentID
    };
    teamRegisterRequest(teamRegDoc);
  };

  // const onPopRegReq = (values) => {
  //   console.log(values);
  // };
  const onCreate = (values) => {
    setOpen(false);
  };

  // console.log(email);

  if (loading) {
    return (
      <div
        style={{ minHeight: 'calc(100vh - 170px)' }}
        className="flex justify-center items-center"
      >
        <Spin size="large" />
      </div>
    );
  }

  if (verdictObj?.Single && verdictObj?.Double) {
    return (
      <Result
        status="error"
        title="You are not eligible for team registration"
        subTitle="You've already registered your teams as single player team and double player team"
        extra={[
          <Link to="/" key="home">
            <Button type="primary">Go Home</Button>
          </Link>
        ]}
      />
    );
  }

  if (!accept) {
    return <TermsAndRules setAccept={setAccept} />;
  }

  // console.log('ver', verdictObj);

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
                    message: 'Team name is required'
                  }
                ]}
              >
                <Input placeholder="Team Name" />
              </Form.Item>

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
                <Radio.Group value={teamType} onChange={(e) => setTeamType(e.target.value)}>
                  <Radio.Button disabled={verdictObj?.Single} value="Single">
                    Single
                  </Radio.Button>
                  <Radio.Button disabled={verdictObj?.Double} value="Double">
                    Double
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              {/* Second player email */}
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

        {/* <Button onClick={() => setOpen(true)} type="primary">
          open modal
        </Button> */}
        <PopupRegistration
          open={open}
          setOpen={setOpen}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
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
