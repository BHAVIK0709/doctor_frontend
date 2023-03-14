import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4010/admin/getAllUsers", {
        headers: {
          Authorization: ` Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
        title: "Doctors",
        dataIndex: "isDoctor",
        render: (text, record) => (
          <span>{record.isDoctor ? " yes" : "NO"}</span>
        ),
      },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Users</h1>
      <Table columns={columns} dataSource={users}></Table>
    </Layout>
  );
}

export default Users;
