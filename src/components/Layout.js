import { Badge, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../Data/Data";
// import { setAllUsers, setUser } from "../Redux/features/userSlice";
import "../styles/Layout.css";

function Layout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers } = useSelector((state) => state.userReducers);
  const { user } = useSelector((state) => state.userReducers);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(user(""));
    message.success("Logout successfully");
    navigate("/login");
  };

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-sharp fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-sharp fa-solid fa-bars",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-sharp fa-solid fa-user",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  console.log(allUsers);
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOC APP</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              );
            })}
            <div className={`menu-item`} onClick={handleLogout}>
              <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content" style={{ cursor: "pointer" }}>
              <Badge
                count={user && user?.notification?.length}
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <i className="fa-sharp fa-solid fa-bell"></i>
              </Badge>
              <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
