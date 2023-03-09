import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";
import axios from "axios";
import { setAllUsers} from "../Redux/features/userSlice";

export default function ProtectRoute({ children }) {
  const dispatch = useDispatch();
  const {allUsers}=useSelector(state=>state.userReducers)

  const gettingUser = async () => {
    try {
       dispatch(showLoading());
      const res = await axios.get(
        "http://localhost:4010/getUsers",
        { jwt: localStorage.getItem("jwt")},
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(res);
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setAllUsers(res.data));
      } else {
        <Navigate to="/login" />
        localStorage.clear()
      }
    } catch (error) {
      console.log(error);
      localStorage.clear()
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    if (!allUsers) {
      gettingUser();
    }
  }, [gettingUser]);

  if (localStorage.getItem("jwt")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
