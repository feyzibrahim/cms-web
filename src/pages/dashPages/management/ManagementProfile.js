import React, { useState } from "react";
import { useManagementContext } from "../../../Hook/contextHooks/useManagementContext";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import Select from "react-select";
import Creatable from "react-select/creatable";

const ManagementProfile = (props) => {
  const management = props.management;
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const { user } = useAuthContext();
  const { dispatch } = useManagementContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const getDatefrom = (dd) => {
    var curr = new Date(dd);
    var date = curr.toISOString().substring(0, 10);
    return date;
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

  const handleDelete = () => {
    const deleteData = async () => {
      setIsPending(true);
      const response = await fetch(
        "https://cms-server-80fv.onrender.com/api/management/" + management._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_MANAGEMENT", payload: json });
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

  const handleUpdation = async () => {
    const res = await fetch(
      "https://cms-server-80fv.onrender.com/api/management/" + management._id,
      {
        method: "PATCH",
        body: JSON.stringify(management),
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_MANAGEMENT", payload: json });
    }

    if (!res.ok) {
      console.log(res.error);
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
                defaultValue={management.managerName}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.managerName = e.target.value;
                }}
              />
              <label>Email</label>
              <input
                type="email"
                defaultValue={management.email}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.email = e.target.value;
                }}
              />
              <label>Password</label>
              <input
                type="password"
                defaultValue={management.password}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.password = e.target.value;
                }}
              />
              <label>Registration Number</label>
              <input
                type="number"
                defaultValue={management.registrationNumber}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.registrationNumber = e.target.value;
                }}
              />
              <label>Gender</label>
              {isInputDisabled ? (
                <input
                  type="text"
                  defaultValue={management.gender}
                  disabled={isInputDisabled}
                />
              ) : (
                <Select
                  className="selectInput"
                  options={genderList}
                  onChange={(selected) => {
                    management.gender = selected.value;
                  }}
                  defaultInputValue={management.gender}
                />
              )}
            </div>
            <div>
              <label>Roll</label>
              {isInputDisabled ? (
                <input
                  type="text"
                  defaultValue={management.roll}
                  disabled={isInputDisabled}
                />
              ) : (
                <Creatable
                  className="selectInput"
                  options={rollList}
                  onChange={(selected) => {
                    management.roll = selected.value;
                  }}
                  defaultInputValue={management.roll}
                />
              )}
              <label>Mobile Number</label>
              <input
                type="number"
                defaultValue={management.mobileNumber}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.mobileNumber = e.target.value;
                }}
              />
              <label>Date of Birth</label>
              <input
                type="date"
                defaultValue={getDatefrom(management.dob)}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.dob = e.target.value;
                }}
              />
              <label>Joining Date</label>
              <input
                type="date"
                defaultValue={getDatefrom(management.joiningDate)}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.joiningDate = e.target.value;
                }}
              />
              <label>Salary</label>
              <input
                type="text"
                defaultValue={management.salary}
                disabled={isInputDisabled}
                onChange={(e) => {
                  management.salary = e.target.value;
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
            {!isPending ? "Delete Member" : "Loading"}
          </button>
          <button
            className="fullColoredButton"
            onClick={(e) => {
              e.preventDefault();
              if (isInputDisabled) {
                setIsInputDisabled(false);
              } else {
                handleUpdation();
                setIsInputDisabled(true);
              }
            }}
          >
            {isInputDisabled ? "Enable Editing" : "Update Details"}
          </button>
          {error && "Something went wrong"}
        </div>
      </div>
    </div>
  );
};

export default ManagementProfile;
