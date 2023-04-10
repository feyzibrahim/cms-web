import React from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useDepartmentContext } from "../../../Hook/contextHooks/useDepartmentContext";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../../globalClasses/Config";

const DepartmentTile = ({ department }) => {
  const { user } = useAuthContext();
  const { dispatch } = useDepartmentContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `${BASE_URL}/api/department/${department._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_DEPARTMENT", payload: json });
    }
  };

  return (
    <NavLink
      to={department.department_name.replace(/ /g, "")}
      state={{ department }}
    >
      <div className="departmentTile">
        <span className="material-symbols-outlined" onClick={handleClick}>
          Delete
        </span>
        <h2>{department.department_name}</h2>
        <p>Years: {department.year_count}</p>
        <p>HOD: {department.hod}</p>
        <p>Teachers: {department.teacher_count}</p>
        <p>Students: {department.students_count}</p>
      </div>
    </NavLink>
  );
};

export default DepartmentTile;
