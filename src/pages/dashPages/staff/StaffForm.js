import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useStaffContext } from "../../../Hook/contextHooks/useStaffContext";
import Select from "react-select";
import Creatable from "react-select/creatable";

const StaffForm = (props) => {
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [staffName, setStaffName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();
  const [gender, setGender] = useState();
  const [duty, setDuty] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [dob, setDob] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [salary, setSalary] = useState();

  const { dispatch } = useStaffContext();

  const userTypeG = "staff";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in...");
      return;
    }

    setIsLoading(true);

    const staff = {
      staffName,
      email,
      password,
      registrationNumber,
      gender,
      duty,
      mobileNumber,
      dob,
      joiningDate,
      salary,
    };

    const response = await fetch("/api/staff", {
      method: "POST",
      body: JSON.stringify(staff),
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
      console.log("New Staff Added", json);
      signup(email, password, userTypeG, json.user_id, json._id);
      setStaffName("");
      setEmail("");
      setPassword("");
      setRegistrationNumber("");
      setGender("");
      setDuty("");
      setMobileNumber("");
      setDob("");
      setJoiningDate("");
      setSalary("");

      setError("");
      dispatch({ type: "CREATE_STAFF", payload: json });
    }
  };

  const signup = async (email, password, userType, collegeId, dataAccessId) => {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        userType,
        collegeId,
        dataAccessId,
      }),
    });

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

  const staffList = [
    { value: "Office Attendant", label: "Office Attendant" },
    { value: "Accounts", label: "Accounts" },
    { value: "IT", label: "IT" },
    { value: "Office Staff", label: "Office Staff" },
    { value: "Cleaning", label: "Cleaning" },
  ];

  return (
    <form className="collegeNewForm">
      <div className="collegeNewFormTitle">
        <h3>Enter Details</h3>
      </div>
      <div className="collegeNewFormContainer">
        <div>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setStaffName(e.target.value)}
            value={staffName}
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
        </div>
        <div>
          <label>
            Duty{" "}
            <span className="optional">
              (If your duty is not in the list Please Type)
            </span>
          </label>
          <Creatable
            className="selectInput"
            options={staffList}
            onChange={(selected) => {
              setDuty(selected.value);
            }}
          />
          <label>Mobile Number</label>
          <input
            type="number"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
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
          {isLoading ? "Loading..." : "Add Staff"}
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default StaffForm;
