import { Row } from "antd";
import axios from "axios";
import React, { Children, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DoctorList from "../components/DoctorList";
import Layout from "../components/Layout";
import { setAllUsers } from "../Redux/features/userSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const [doctors, setDoctors] = useState();
  const getUserData = async () => {
    try {
      await axios
        .get("http://localhost:4010/showAllDoctors", {
          headers: {
            Authorization: ` Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((resp) => {
          console.log(resp.data.data);
          setDoctors([resp.data.data]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout Children={Children}>
      <h1 className="text-center">HomePage</h1>
      <Row>{doctors?.map(doctor =><DoctorList doctor={doctor} />)}</Row>
    </Layout>
  );
};

export default HomePage;
