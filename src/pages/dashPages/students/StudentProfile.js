import React, { useState } from "react";
import { useStudentContext } from "../../../Hook/contextHooks/useStudentContext";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import Select from "react-select";

const StudentProfile = (props) => {
  const student = props.student;
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const { user } = useAuthContext();
  const { dispatch } = useStudentContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [departmentList, setDepartmentList] = useState();
  const [isDepListLoading, setIsDepListLoading] = useState(true);

  const getDateFrom = (dd) => {
    var curr = new Date(dd);
    var date = curr.toISOString().substring(0, 10);
    return date;
  };

  const loadDepartment = async () => {
    const res = await fetch("/api/department", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (res.ok) {
      var dummy = [];
      json.map((data) => {
        dummy.push({
          _id: data._id,
          value: data.department_name,
          label: data.department_name,
          year: data.year_count,
        });
        return null;
      });
      setDepartmentList(dummy);
      setIsDepListLoading(false);
    }
  };

  const [yearList, setYearList] = useState();

  const handleDepartment = (selectedOptions) => {
    student.department = selectedOptions.value;
    const selectedItem = departmentList.find(
      (item) => item.value === selectedOptions.value
    );
    student.departmentId = selectedItem._id;
    handleYearList(selectedItem.year);
  };

  const handleYearList = (year) => {
    var dummy = [];

    for (let i = 1; i <= year; i++) {
      dummy.push({ value: i, label: i });
    }
    setYearList(dummy);
  };

  const handleDelete = () => {
    const deleteData = async () => {
      setIsPending(true);
      const response = await fetch("/api/student/" + student._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_STUDENT", payload: json });
        setIsPending(false);
        setError(null);
      }

      if (!response.ok) {
        setIsPending(false);
        setError(response.error);
      }
    };

    if (user) {
      deleteData();
    }
  };

  const handleUpdate = async () => {
    setIsPending(true);
    const res = await fetch("/api/student/" + student._id, {
      method: "PATCH",
      body: JSON.stringify(student),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_STUDENT", payload: json });
      setIsPending(false);
      setError(null);
    }

    if (!res.ok) {
      setIsPending(false);
      setError(res.error);
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="teacherProfileContainer">
        <div className="tpNav">
          <span
            className="material-symbols-outlined"
            onClick={props.showProfileOnClick}
          >
            Close
          </span>
        </div>
        <div className="tpProfileSession">
          <form>
            <div>
              <label>Name</label>
              <input
                type="text"
                defaultValue={student.student_name}
                disabled={isInputDisabled}
                onChange={(e) => {
                  student.student_name = e.target.value;
                }}
              />
              <label>Email</label>
              <input
                type="email"
                defaultValue={student.email}
                disabled={isInputDisabled}
                onChange={(e) => {
                  student.email = e.target.value;
                }}
              />
              <label>Password</label>
              <input
                type="password"
                defaultValue={student.password}
                disabled={isInputDisabled}
                onChange={(e) => {
                  student.password = e.target.value;
                }}
              />
              <label>Registration Number</label>
              <input
                type="number"
                defaultValue={student.registrationNumber}
                disabled={isInputDisabled}
                onChange={(e) => {
                  student.registrationNumber = e.target.value;
                }}
              />
              <label>Gender</label>
              <input
                type="text"
                defaultValue={student.gender}
                disabled={isInputDisabled}
              />
              <label>Mobile Number</label>
              <input
                type="number"
                onChange={(e) => {
                  student.mobileNumber = e.target.value;
                }}
                defaultValue={student.mobileNumber}
                disabled={isInputDisabled}
              />
              <label>Date of Birth</label>
              <input
                type="date"
                onChange={(e) => {
                  student.dob = e.target.value;
                }}
                defaultValue={getDateFrom(student.dob)}
                disabled={isInputDisabled}
              />
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => {
                  student.address.street = e.target.value;
                }}
                defaultValue={student.address.street}
                disabled={isInputDisabled}
              />
              <input
                type="text"
                onChange={(e) => {
                  student.address.city = e.target.value;
                }}
                defaultValue={student.address.city}
                disabled={isInputDisabled}
              />
              <input
                type="text"
                onChange={(e) => {
                  student.address.state = e.target.value;
                }}
                defaultValue={student.address.state}
                disabled={isInputDisabled}
              />
              <input
                type="number"
                onChange={(e) => {
                  student.address.pin = e.target.value;
                }}
                defaultValue={student.address.pin}
                disabled={isInputDisabled}
              />
              <input
                type="text"
                onChange={(e) => {
                  student.address.country = e.target.value;
                }}
                defaultValue={student.address.country}
                disabled={isInputDisabled}
              />
            </div>
            <div>
              <label>Department</label>
              {isInputDisabled ? (
                <input
                  type="text"
                  defaultValue={student.department}
                  disabled={isInputDisabled}
                />
              ) : (
                <Select
                  options={departmentList}
                  className="selectInput"
                  onChange={handleDepartment}
                  isLoading={isDepListLoading}
                  defaultInputValue={student.department}
                />
              )}
              <label>Year</label>
              {isInputDisabled ? (
                <input
                  type="text"
                  defaultValue={student.year}
                  disabled={isInputDisabled}
                />
              ) : (
                <Select
                  options={yearList}
                  className="selectInput"
                  onChange={(selectedOptions) => {
                    student.year = selectedOptions.value;
                  }}
                  isLoading={isDepListLoading}
                  defaultInputValue={student.year}
                />
              )}
              <label>Joining Date</label>
              <input
                type="date"
                defaultValue={getDateFrom(student.joiningDate)}
                disabled={isInputDisabled}
                onChange={(e) => {
                  student.joiningDate = e.target.value;
                }}
              />
              <label>Qualification</label>
              <input
                type="text"
                onChange={(e) => {
                  student.qualification = e.target.value;
                }}
                defaultValue={student.qualification}
                disabled={isInputDisabled}
              />
              <label>Previous Institute</label>
              <input
                type="text"
                onChange={(e) => {
                  student.previous_institute = e.target.value;
                }}
                defaultValue={student.previous_institute}
                disabled={isInputDisabled}
              />
              <label>Previous Grade</label>
              <input
                type="text"
                onChange={(e) => {
                  student.previous_grade = e.target.value;
                }}
                defaultValue={student.previous_grade}
                disabled={isInputDisabled}
              />
              <label>Marital Status</label>
              <input
                type="text"
                onChange={(e) => {
                  student.maritalStatus = e.target.value;
                }}
                defaultValue={student.maritalStatus}
                disabled={isInputDisabled}
              />
              <label>Father Name</label>
              <input
                type="text"
                onChange={(e) => {
                  student.parents.father_name = e.target.value;
                }}
                defaultValue={student.parents.father_name}
                disabled={isInputDisabled}
              />
              <label>Father Contact Number</label>
              <input
                type="Number"
                onChange={(e) => {
                  student.parents.father_contact = e.target.value;
                }}
                defaultValue={student.parents.father_contact}
                disabled={isInputDisabled}
              />
              <label>Mother Name</label>
              <input
                type="text"
                onChange={(e) => {
                  student.parents.mother_name = e.target.value;
                }}
                defaultValue={student.parents.mother_name}
                disabled={isInputDisabled}
              />
              <label>Mother Contact Number</label>
              <input
                type="Number"
                onChange={(e) => {
                  student.parents.mother_contact = e.target.value;
                }}
                defaultValue={student.parents.mother_contact}
                disabled={isInputDisabled}
              />
            </div>
          </form>
          <button
            className="fullColoredButton"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            {!isPending ? "Delete Student" : "Loading"}
          </button>
          <button
            className="fullColoredButton"
            onClick={(e) => {
              e.preventDefault();
              if (isInputDisabled) {
                setIsInputDisabled(false);
                loadDepartment();
              } else {
                setIsInputDisabled(true);
                handleUpdate();
              }
            }}
          >
            {!isPending
              ? isInputDisabled
                ? "Enable Editing"
                : "Update Changes"
              : "Loading"}
          </button>
          {error && "Something went wrong"}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
