import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useTeacherContext } from "../../../Hook/contextHooks/useTeacherContext";
import Select from "react-select";

const TeacherForm = (props) => {
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [teacherName, setTeacherName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();
  const [gender, setGender] = useState();
  const [designation, setDesignation] = useState("Teacher");
  const [department, setDepartment] = useState();
  const [facultyMobileNumber, setFacultyMobileNumber] = useState();
  const [dob, setDob] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [subjectsCanTeach, setSubjectsCanTeach] = useState();
  const [salary, setSalary] = useState();

  const { dispatch } = useTeacherContext();

  const userTypeG = "Teacher";

  const [departmentList, setDepartmentList] = useState();
  const [isDepListLoading, setIsDepListLoading] = useState(true);
  const handleDepartment = (selectedOptions) => {
    setDepartment(selectedOptions.value);
  };

  const loadDepartment = async () => {
    const res = await fetch(
      "https://cms-server-80fv.onrender.com/api/department",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      var dummy = [];
      json.map((data) => {
        dummy.push({
          value: data.department_name,
          label: data.department_name,
        });
        return null;
      });
      setDepartmentList(dummy);
      setIsDepListLoading(false);
    }
  };

  useEffect(() => {
    loadDepartment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in...");
      return;
    }

    setIsLoading(true);

    const teacher = {
      teacherName,
      email,
      password,
      registrationNumber,
      gender,
      designation,
      department,
      facultyMobileNumber,
      dob,
      joiningDate,
      subjectsCanTeach,
      salary,
    };

    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/teacher",
      {
        method: "POST",
        body: JSON.stringify(teacher),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      console.log("New Teacher Added", json);
      signup(email, password, userTypeG, json.user_id, json._id);
      setTeacherName("");
      setEmail("");
      setPassword("");
      setRegistrationNumber("");
      setGender("");
      setDepartment("");
      setFacultyMobileNumber("");
      setDob("");
      setJoiningDate("");
      setSubjectsCanTeach("");
      setSalary("");

      setError("");
      dispatch({ type: "CREATE_TEACHER", payload: json });
    }
  };

  const signup = async (email, password, userType, collegeId, dataAccessId) => {
    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          userType,
          collegeId,
          dataAccessId,
        }),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      props.showForm();
      console.log("New User Created", json);
    }
  };

  const genderList = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  return (
    <form className="collegeNewForm">
      <div className="collegeNewFormTitle">
        <h3>Enter Teacher Details</h3>
      </div>
      <div className="collegeNewFormContainer">
        <div>
          <label>Teacher Name</label>
          <input
            type="text"
            onChange={(e) => setTeacherName(e.target.value)}
            value={teacherName}
          />
          <label>Email Address</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label>Registration ID</label>
          <input
            type="text"
            onChange={(e) => setRegistrationNumber(e.target.value)}
            value={registrationNumber}
          />
          <label>Gender</label>
          <Select
            className="selectInput"
            options={genderList}
            onChange={(selected) => {
              setGender(selected.value);
            }}
          />
          <label>Designation</label>
          <input
            type="text"
            onChange={(e) => setDesignation(e.target.value)}
            value={designation}
            defaultValue="Teacher"
          />
        </div>
        <div>
          <label>Department</label>
          <Select
            options={departmentList}
            className="selectInput"
            onChange={handleDepartment}
            isLoading={isDepListLoading}
          />
          <label>Mobile Number</label>
          <input
            type="number"
            onChange={(e) => setFacultyMobileNumber(e.target.value)}
            value={facultyMobileNumber}
          />
          <label>Date of Birth</label>
          <input
            type="date"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
          />
          <label>Joining Date</label>
          <input
            type="date"
            onChange={(e) => setJoiningDate(e.target.value)}
            value={joiningDate}
          />
          <label>Subjects can Teach</label>
          <input
            type="text"
            onChange={(e) => setSubjectsCanTeach(e.target.value)}
            value={subjectsCanTeach}
          />
          <label>Salary</label>
          <input
            type="number"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
          />
        </div>
      </div>
      <div className="collegeFormButton">
        <button className="fullColoredButton" onClick={handleSubmit}>
          {isLoading ? "Loading..." : "Add Teacher"}
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default TeacherForm;
