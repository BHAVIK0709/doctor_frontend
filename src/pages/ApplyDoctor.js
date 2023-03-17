import { Button, Col, Form, Input, message, Row, TimePicker } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";
import moment from 'moment';


function ApplyDoctor() {

    const {user} =useSelector(state => state.userReducers)
const dispatch =useDispatch();
const navigate =useNavigate();

  const submitData = async(values) => {
    console.log(values);
    try {
        dispatch(showLoading())
        const res = await axios.post('http://localhost:4010/apply-doctor',{...values,userId:user._id, timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm"),
        ],},
        {headers:
            {
                Authorization:`Bearer ${localStorage.getItem('jwt')}`
            }
        })
        console.log('jjj',res)
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.success)
            navigate('/')
        }else{
            message.error('something went wrong')
        }
    } catch (error) {
        console.log(error)
        dispatch(hideLoading())
        message.error('something went wrong and error')
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply doctors</h1>
      <Form layout="vertical" onFinish={submitData} className="m-3">
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
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
