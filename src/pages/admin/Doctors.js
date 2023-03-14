import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:4010/admin/getAllDoctors", {
        headers: {
          Authorization: ` Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:4010/admin/changeStatus",
        { doctorId: record._id,userId:record.userId , status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (res.data.success){
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstname} {record.lastname}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record,"approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>All Doctors</h1>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
}

export default Doctors;
