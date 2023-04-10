import React, { useState } from "react";
import { useTeacherContext } from "../../../Hook/contextHooks/useTeacherContext";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import Select from "react-select";
import { BASE_URL } from "../../../globalClasses/Config";

const TeacherProfile = (props) => {
  const teacher = props.teacher;
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const { user } = useAuthContext();
  const { dispatch } = useTeacherContext();
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
    const res = await fetch(`${BASE_URL}/api/department`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

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

  const handleDelete = () => {
    const deleteData = async () => {
      setIsPending(true);
      const response = await fetch(`${BASE_URL}/api/teacher/${teacher._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_TEACHER", payload: json });
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
    const res = await fetch(`${BASE_URL}/api/teacher/${teacher._id}`, {
      method: "PATCH",
      body: JSON.stringify(teacher),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_STAFF", payload: json });
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
                defaultValue={teacher.teacherName}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.teacherName = e.target.value;
                }}
              />
              <label>Email</label>
              <input
                type="email"
                defaultValue={teacher.email}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.email = e.target.value;
                }}
              />
              <label>Password</label>
              <input
                type="password"
                defaultValue={teacher.password}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.password = e.target.value;
                }}
              />
              <label>Registration Number</label>
              <input
                type="number"
                defaultValue={teacher.registrationNumber}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.registrationNumber = e.target.value;
                }}
              />
              <label>Gender</label>
              <input
                type="text"
                defaultValue={teacher.gender}
                disabled={isInputDisabled}
              />
              <label>Designation</label>
              <input
                type="text"
                defaultValue={teacher.designation}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.designation = e.target.value;
                }}
              />
            </div>
            <div>
              <label>Department</label>
              {isInputDisabled ? (
                <input
                  type="text"
                  defaultValue={teacher.department}
                  disabled={isInputDisabled}
                />
              ) : (
                <Select
                  options={departmentList}
                  className="selectInput"
                  onChange={(selectedOptions) => {
                    teacher.department = selectedOptions.value;
                  }}
                  isLoading={isDepListLoading}
                  defaultInputValue={teacher.department}
                />
              )}
              <label>Mobile Number</label>
              <input
                type="number"
                defaultValue={teacher.facultyMobileNumber}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.facultyMobileNumber = e.target.value;
                }}
              />
              <label>Date of Birth</label>
              <input
                type="date"
                defaultValue={getDateFrom(teacher.dob)}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.dob = e.target.value;
                }}
              />
              <label>Joining Date</label>
              <input
                type="date"
                defaultValue={getDateFrom(teacher.joiningDate)}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.joiningDate = e.target.value;
                }}
              />
              <label>Subjects Can Teach</label>
              <input
                type="text"
                defaultValue={teacher.subjectsCanTeach}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.subjectsCanTeach = e.target.value;
                }}
              />
              <label>Salary</label>
              <input
                type="text"
                defaultValue={teacher.salary}
                disabled={isInputDisabled}
                onChange={(e) => {
                  teacher.salary = e.target.value;
                }}
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
            {!isPending ? "Delete Teacher" : "Loading"}
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

export default TeacherProfile;
