import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import logo from '../img/logo.png';
const { Header, Content, Footer, Sider } = Layout;
const AdminLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="50"
        onBreakpoint={(broken) => {
          console.log(broken);
          setCollapse(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <div
          className="p-3"
          // style={{
          //   height: 32,
          //   margin: 16
          //   // background: '#873829'
          // }}
        >
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-9 mr-3" alt="IANT Logo" />
            {!collapse && (
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                IANT
              </span>
            )}
          </Link>
        </div>
        <Menu
          // theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`
            })
          )}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapse ? 0 : 200
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 50
          }}
        >
          {/* {collapse && <Button type="primary">U</Button>} */}
        </Header>
        <Content
          style={{
            margin: 12
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: '100vh',
              background: colorBgContainer
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
