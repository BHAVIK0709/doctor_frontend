import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Col, Form, Input, message, Row, TimePicker } from "antd";
import { hideLoading, showLoading } from "../../Redux/features/alertSlice";
import moment from "moment";
function Profile() {
  const { user } = useSelector((state) => state.userReducers);

  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //update profile
  const updateData = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:4010/updateDoctorProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0].format('HH:mm')),
            moment(values.timings[1].format('HH:mm')),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("jjj", res);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error("something went wrong and error");
    }
  };
  //get doc details
  const getDocInfo = async () => {
    try {
      await axios
        .post(
          "http://localhost:4010/getDoctorInfo",
          { userId: params.id },
          {
            headers: {
              Authorization: ` Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((resp) => {
          console.log(resp.data.data);
          setDoctor(resp.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDocInfo();
  }, []);

  return (
    <Layout>
      <h1>MAnage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={updateData}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
        >
          <h4 className="text-dark"> Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your name " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Mobile"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your mobile " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your email " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="website"
                name="website"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your website " />
              </Form.Item>
            </Col>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your address " />
            </Form.Item>
          </Row>

          <h4 className="text-dark"> Professional Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Cunsultation"
                name="feesPerCunsultation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your feesPerCunsultation " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <br></br>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
}

export default Profile;
