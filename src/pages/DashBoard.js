import React from "react";
import VerticalNavbar from "../globalClasses/VerticalNavbar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="DashBoardhome">
      <VerticalNavbar />
      <>
        <Outlet />
      </>
    </div>
  );
};

export default DashBoard;
