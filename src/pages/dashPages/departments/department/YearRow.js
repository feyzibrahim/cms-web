import React from "react";
import { NavLink } from "react-router-dom";

const YearRow = (props) => {
  const i = props.i;
  const department = props.department;

  return (
    <NavLink to={"year" + i} className="someP" state={{ i, department }}>
      <div className="depTeacherRow">
        <p>Year {props.i}</p>
      </div>
    </NavLink>
  );
};

export default YearRow;
