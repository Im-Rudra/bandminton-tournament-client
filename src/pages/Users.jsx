import React, { useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
const columns = [
  {
    title: 'First Name',
    width: 100,
    dataIndex: 'firstName',
    key: 'firstName',
    fixed: 'left'
  },
  {
    title: 'Last Name',
    width: 100,
    dataIndex: 'lastName',
    key: 'lastName',
    fixed: 'left'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 100
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    width: 100
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: 70
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 70,
    render: (e) => <a>action</a>
  }
];
const data = [];
for (let i = 0; i < 200; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}

const Users = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  const fetchUsers = async () => {
    const url = process.env.REACT_APP_SERVER_ORIGIN + 'getUsers';
    setLoading(true);
    try {
      const res = await axios.post(url, tableParams, { withCredentials: true });
      if (!res.data?.totalUsers) {
        setTotalUsers(0);
        setUsers([]);
        setLoading(false);
        return;
      }
      const { data } = res;
      setTotalUsers(data?.totalUsers || 0);
      setUsers(data?.users.map((user) => ({ key: user.id, ...user })));
      setLoading(false);
    } catch (err) {
      setTotalUsers(0);
      setUsers([]);
      setLoading(false);
      console.log(err);
    }
  };

  useState(() => {
    fetchUsers();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={{ ...tableParams.pagination, total: totalUsers }}
      scroll={{
        x: 1000,
        y: 300
      }}
    />
  );
};
export default Users;
