import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../Redux/features/userSlice";

export default function ProtectRoute({ children }) {
  // const dispatch = useDispatch();
  // const { user } = (state) => state.user;

  // const gettingUser = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.post(
  //       "http://localhost:4010/getUserData",
  //       { jwt: localStorage.getItem("jwt")},
  //       {
  //         headers: {
  //           Authorization: `bearer ${localStorage.getItem("jwt")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     console.log(res);
  //     if (res.data.success) {
  //       dispatch(setUser(res.data.data));
  //     } else {
  //       <Navigate to="/login" />
  //     }
  //   } catch (error) {
  //     // console.log(error);
  //     dispatch(hideLoading());
  //   }
  // };
  // useEffect(() => {
  //   if (!user) {
  //     gettingUser();
  //   }
  // }, [user]);

  if (localStorage.getItem("jwt")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
