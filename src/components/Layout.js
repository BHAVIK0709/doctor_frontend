import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminMenu, SidebarMenu, userMenu } from "../Data/Data";
import "../styles/Layout.css";



function Layout({ children }) {
  const location = useLocation();
  const  {allUsers} = useSelector((state)=>state.userReducers) 

  const SidebarMenu = allUsers ?.isAdmin ? adminMenu :userMenu

  console.log(allUsers)
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOC APP</h6>
            <hr/>
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
          </div>
        </div>
        <div className="content">
          <div className="header">
          <i className="fa-sharp fa-solid fa-bell"></i>
          <Link to="/profile">
            {allUsers[0]?.name}
            </Link>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
