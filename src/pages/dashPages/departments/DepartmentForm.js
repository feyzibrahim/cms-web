import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useDepartmentContext } from "../../../Hook/contextHooks/useDepartmentContext";

const DepartmentForm = (props) => {
  const { user } = useAuthContext();
  const [department_name, setDepartment_name] = useState("");
  const [year_count, setYearCount] = useState("");
  const [hod, setHod] = useState("");
  const [teacher_count, setTeachersCount] = useState("");
  const [students_count, setStudents_count] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useDepartmentContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in...");
      return;
    }

    const department = {
      department_name,
      year_count,
      hod,
      teacher_count,
      students_count,
    };

    const response = await fetch("/api/department", {
      method: "POST",
      body: JSON.stringify(department),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setDepartment_name("");
      setYearCount("");
      setHod("");
      setTeachersCount("");
      setStudents_count("");
      dispatch({ type: "CREATE_DEPARTMENT", payload: json });
      setError(null);

      console.log("New Workout Added", json);
      props.showForm();
    }
  };

  return (
    <form className="collegeNewForm">
      <div className="collegeNewFormTitle">
        <h3>Enter Department Details</h3>
      </div>
      <label>Department Name</label>
      <input
        type="text"
        onChange={(e) => setDepartment_name(e.target.value)}
        value={department_name}
      />
      <label>Year Count</label>
      <input
        type="number"
        onChange={(e) => setYearCount(e.target.value)}
        value={year_count}
      />
      <label>Head of Department</label>
      <input type="text" onChange={(e) => setHod(e.target.value)} value={hod} />
      <label>Teachers Count</label>
      <input
        type="number"
        onChange={(e) => setTeachersCount(e.target.value)}
        value={teacher_count}
      />
      <label>Students Count</label>
      <input
        type="number"
        onChange={(e) => setStudents_count(e.target.value)}
        value={students_count}
      />
      <div className="collegeFormButton">
        <button className="fullColoredButton" onClick={handleSubmit}>
          Add Department
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default DepartmentForm;
