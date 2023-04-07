import React from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../Hook/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="verticalNavbar">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash/management"
          >
            <span className="material-symbols-outlined">
              Supervisor_Account
            </span>
            Management
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash/staff"
          >
            <span className="material-symbols-outlined">
              Admin_Panel_Settings
            </span>
            Staff
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash/departments"
          >
            <span className="material-symbols-outlined">Class</span>Departments
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash/teacher"
          >
            <span className="material-symbols-outlined">Groups</span>Teachers
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash/students"
          >
            <span className="material-symbols-outlined">Person</span>
            Students
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash/meetings"
          >
            <span className="material-symbols-outlined">Hearing</span>Meetings
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dash/profile"
          >
            <span className="material-symbols-outlined">manage_accounts</span>
            Profile
          </NavLink>
        </li>
      </ul>
      <button onClick={handleClick}>
        <span className="material-symbols-outlined">Logout</span>Logout
      </button>
    </nav>
  );
};

export default Navbar;
