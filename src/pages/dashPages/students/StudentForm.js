import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useStudentContext } from "../../../Hook/contextHooks/useStudentContext";
import Select from "react-select";

const StudentForm = (props) => {
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [student_name, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [department_id, setDepartmentId] = useState("");
  const [year, setYear] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [qualification, setQualification] = useState("");
  const [previous_institute, setPreviousInstitute] = useState("");
  const [previous_grade, setPreviousGrade] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [father_name, setFatherName] = useState("");
  const [father_contact, setFatherContact] = useState("");
  const [mother_name, setMotherName] = useState("");
  const [mother_contact, setMotherContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [isActive] = useState(true);

  const { dispatch } = useStudentContext();

  const userTypeG = "student";

  const [yearList, setYearList] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [isDepListLoading, setIsDepListLoading] = useState(true);
  const handleDepartment = (selectedOptions) => {
    setDepartment(selectedOptions.value);
    const selectedItem = departmentList.find(
      (item) => item.value === selectedOptions.value
    );
    setDepartmentId(selectedItem._id);
    handleYearList(selectedItem.year);
  };

  const handleYearList = (year) => {
    var dummy = [];

    for (let i = 1; i <= year; i++) {
      dummy.push({ value: i, label: i });
    }
    setYearList(dummy);
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
          year: data.year_count,
          _id: data._id,
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

    const student = {
      student_name,
      email,
      password,
      registrationNumber,
      gender,
      department,
      department_id,
      year,
      mobileNumber,
      dob,
      joiningDate,
      qualification,
      previous_institute,
      previous_grade,
      maritalStatus,
      parents: {
        father_name,
        father_contact,
        mother_name,
        mother_contact,
      },
      address: {
        street,
        city,
        state,
        pin,
        country,
      },
      isActive,
    };

    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/student",
      {
        method: "POST",
        body: JSON.stringify(student),
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
      signup(student_name, email, password, userTypeG, json.user_id, json._id);
      setStudentName("");
      setEmail("");
      setPassword("");
      setRegistrationNumber("");
      setGender("");
      setDepartment("");
      setDepartmentId("");
      setYear("");
      setMobileNumber("");
      setDob("");
      setJoiningDate("");
      setQualification("");
      setPreviousInstitute("");
      setPreviousGrade("");
      setMaritalStatus("");
      setFatherName("");
      setFatherContact("");
      setMotherName("");
      setMotherContact("");
      setStreet("");
      setCity("");
      setState("");
      setPin("");
      setCountry("");

      setError("");
      dispatch({ type: "CREATE_STUDENT", payload: json });
    }
  };

  const signup = async (
    student_name,
    email,
    password,
    userType,
    collegeId,
    dataAccessId
  ) => {
    const name = student_name;
    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
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
      setIsLoading(false);
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
        <h3>Enter Student Details</h3>
      </div>
      <div className="collegeNewFormContainer">
        <div>
          <label>Student Name</label>
          <input
            type="text"
            onChange={(e) => setStudentName(e.target.value)}
            value={student_name}
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
          <label>Address</label>
          <input
            type="text"
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            placeholder="Enter Street"
          />
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="Enter City"
          />
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="Enter State"
          />
          <input
            type="number"
            onChange={(e) => setPin(e.target.value)}
            value={pin}
            placeholder="Enter Pin"
          />
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="Enter Country"
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
          <label>Year</label>
          <Select
            options={yearList}
            className="selectInput"
            onChange={(d) => setYear(d.value)}
          />
          <label>Joining Date</label>
          <input
            type="date"
            onChange={(e) => setJoiningDate(e.target.value)}
            value={joiningDate}
          />
          <label>Qualification</label>
          <input
            type="text"
            onChange={(e) => setQualification(e.target.value)}
            value={qualification}
          />
          <label>Previous Institute</label>
          <input
            type="text"
            onChange={(e) => setPreviousInstitute(e.target.value)}
            value={previous_institute}
          />
          <label>Previous Grade</label>
          <input
            type="text"
            onChange={(e) => setPreviousGrade(e.target.value)}
            value={previous_grade}
          />
          <label>Marital Status</label>
          <input
            type="text"
            onChange={(e) => setMaritalStatus(e.target.value)}
            value={maritalStatus}
          />
          <label>Father Name</label>
          <input
            type="text"
            onChange={(e) => setFatherName(e.target.value)}
            value={father_name}
          />
          <label>Father Contact Number</label>
          <input
            type="Number"
            onChange={(e) => setFatherContact(e.target.value)}
            value={father_contact}
          />
          <label>Mother Name</label>
          <input
            type="text"
            onChange={(e) => setMotherName(e.target.value)}
            value={mother_name}
          />
          <label>Mother Contact Number</label>
          <input
            type="Number"
            onChange={(e) => setMotherContact(e.target.value)}
            value={mother_contact}
          />
        </div>
      </div>
      <div className="collegeFormButton">
        <button className="fullColoredButton" onClick={handleSubmit}>
          {isLoading ? "Loading..." : "Add Student"}
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default StudentForm;
