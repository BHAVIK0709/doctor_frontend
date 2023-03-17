import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorList({ doctor }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr.{doctor.firstname} {doctor.lastname}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization :</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience :</b>
            {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsultation :</b>
            {doctor.feesPerCunsultation}
          </p>
          <p>
            <b>timings :</b> {doctor.timings[0] + " to " + doctor.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
}

export default DoctorList;