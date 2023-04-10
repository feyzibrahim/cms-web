import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useManagementContext } from "../../../Hook/contextHooks/useManagementContext";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { BASE_URL } from "../../../globalClasses/Config";

const ManagementForm = (props) => {
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [managerName, setManagerName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();
  const [gender, setGender] = useState();
  const [roll, setRoll] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [dob, setDob] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [salary, setSalary] = useState();

  const { dispatch } = useManagementContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in...");
      return;
    }

    setIsLoading(true);

    const management = {
      managerName,
      email,
      password,
      registrationNumber,
      gender,
      roll,
      mobileNumber,
      dob,
      joiningDate,
      salary,
    };

    const response = await fetch(`${BASE_URL}/api/management`, {
      method: "POST",
      body: JSON.stringify(management),
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
      setManagerName("");
      setEmail("");
      setPassword("");
      setRegistrationNumber("");
      setGender("");
      setRoll("");
      setMobileNumber("");
      setDob("");
      setJoiningDate("");
      setSalary("");

      setError("");
      dispatch({ type: "CREATE_MANAGEMENT", payload: json });
      props.showForm();
    }
  };

  const genderList = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const rollList = [
    { value: "Provincial Superior", label: "Provincial Superior" },
    { value: "Education Counsellor", label: "Education Counsellor" },
    { value: "Former Director", label: "Former Director" },
    { value: "Director", label: "Director" },
    { value: "Manager", label: "Manager" },
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
            onChange={(e) => setManagerName(e.target.value)}
            value={managerName}
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
            Roll{" "}
            <span className="optional">
              (If your roll is not in the list please type)
            </span>
          </label>
          <Creatable
            className="selectInput"
            options={rollList}
            onChange={(selected) => {
              setRoll(selected.value);
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
          {isLoading ? "Loading..." : "Add Member"}
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default ManagementForm;
