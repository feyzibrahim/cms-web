import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { BASE_URL } from "../../../globalClasses/Config";

const CollegeForm = () => {
  const { user } = useAuthContext();
  const [college_name, setcollege_name] = useState("");
  const [place, setPlace] = useState("");
  const [teachers_count, setteachers_count] = useState("");
  const [staff_count, setstaff_count] = useState("");
  const [students_count, setstudents_count] = useState("");
  const [error, setError] = useState("");
  //   const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (!user) {
      setError("You must be logged in...");
      return;
    }

    const college = {
      college_name,
      place,
      teachers_count,
      students_count,
      staff_count,
    };

    console.log(college);

    const response = await fetch(`${BASE_URL}/api/college`, {
      method: "POST",
      body: JSON.stringify(college),
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
      setcollege_name("");
      setPlace("");
      setteachers_count("");
      setstaff_count("");
      setstudents_count("");

      setError(null);

      console.log("New Workout Added", json);
    }
  };

  return (
    <form className="collegeNewForm">
      <div className="collegeNewFormTitle">
        <h3>Enter College Details</h3>
      </div>
      <label>College Name</label>
      <input
        type="text"
        onChange={(e) => setcollege_name(e.target.value)}
        value={college_name}
      />
      <label>Place</label>
      <input
        type="text"
        onChange={(e) => setPlace(e.target.value)}
        value={place}
      />
      <label>Teachers Count</label>
      <input
        type="number"
        onChange={(e) => setteachers_count(e.target.value)}
        value={teachers_count}
      />
      <label>Staff Count</label>
      <input
        type="number"
        onChange={(e) => setstaff_count(e.target.value)}
        value={staff_count}
      />
      <label>Students Count</label>
      <input
        type="number"
        onChange={(e) => setstudents_count(e.target.value)}
        value={students_count}
      />
      <div className="collegeFormButton">
        <button className="fullColoredButton" onClick={handleSubmit}>
          Update
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default CollegeForm;
