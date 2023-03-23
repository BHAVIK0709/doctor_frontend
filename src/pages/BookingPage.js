import { DatePicker, message, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";

function BookingPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState();
  // eslint-disable-next-line
  const [date, setDate] = useState();
  // eslint-disable-next-line
  const [time, setTime] = useState();
  // eslint-disable-next-line
  const [isAvailable, setIsAvailable] = useState();

  const { user } = useSelector((state) => state.userReducers);

  const DoctorById = async () => {
    try {
      await axios
        .post(
          "http://localhost:4010/getDocById",
          { doctorId: params.doctorId },
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
    DoctorById();
    // eslint-disable-next-line
  }, []);

  const handleAvailibility = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:4010/booking-availibility",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: ` Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async (value) => {
    console.log(date, time);
    try {
      setIsAvailable(true);
      if(!date && !time){
        return alert("Date and Time is required")
      }
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:4010/book-apponitment",
        {
          doctorId: params.doctorId,
          userId: doctor.userId,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: ` Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  return (
    <Layout>
      <h3>BookingPage</h3>
      <div className="container">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstname} {doctor.lastname}
            </h4>
            <h4> Fees:{doctor.feesPerCunsultation}</h4>
            <h4> Timings:{doctor.timings[0] + " to " + doctor.timings[1]}</h4>
            <div className="d-flex flex-column w-5  0">
              <DatePicker
                name="date"
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                name="time"
                className="m-2"
                format="HH:mm"
                onChange={(values) => {
                  setIsAvailable(false);
                  setTime(moment(values.$d).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailibility}
              >
                Check Availibility
              </button>
              {!isAvailable && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BookingPage;
