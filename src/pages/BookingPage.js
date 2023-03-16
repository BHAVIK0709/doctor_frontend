import { DatePicker, TimePicker } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout'

function BookingPage() {
    // const dispatch = useDispatch();
    const params = useParams()

    const [doctor, setDoctor] = useState();
    const DoctorById = async () => {
      try {
        await axios
          .post("http://localhost:4010/getDocById", {doctorId:params.doctorId},{
            headers: {
              Authorization: ` Bearer ${localStorage.getItem("jwt")}`,
            },
          })
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
    }, []);
  


  return (
    <Layout>
        <h3>BookingPage</h3>
        <div className='container'>
           {doctor && (
            <div>            
            <h4>Dr. {doctor.firstname} {doctor.lastname}</h4>
            <h4> Fees:{doctor.feesPerCunsultation}</h4>
            <h4> Timings:{doctor.timings}</h4>
<div className='d-flex flex-column'  >
<DatePicker format='DD-MM-YYYY'>
    <TimePicker.RangePicker format="HH:MM" />

    <button className='btn btn-primary mt-2'>Check Availibility</button>
</DatePicker>
</div>
            

            </div>
            )} 
        </div>
    </Layout>
  )
}

export default BookingPage