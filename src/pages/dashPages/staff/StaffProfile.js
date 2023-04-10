import React, { useState } from "react";
import { useStaffContext } from "../../../Hook/contextHooks/useStaffContext";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { BASE_URL } from "../../../globalClasses/Config";

const StaffProfile = (props) => {
  const staff = props.staff;
  const [canBeEdited, setCanBeEdited] = useState(true);

  const { user } = useAuthContext();
  const { dispatch } = useStaffContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

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

  const getDateFrom = (dd) => {
    var curr = new Date(dd);
    var date = curr.toISOString().substring(0, 10);
    return date;
  };

  const handleDelete = () => {
    const deleteData = async () => {
      setIsPending(true);
      const response = await fetch(`${BASE_URL}/api/staff/${staff._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_STAFF", payload: json });
        setIsPending(false);
        setError(null);
        setCanBeEdited();
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
    const res = await fetch(`${BASE_URL}/api/staff/${staff._id}`, {
      method: "PATCH",
      body: JSON.stringify(staff),
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
                defaultValue={staff.staffName}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.staffName = e.target.value;
                }}
              />
              <label>Email</label>
              <input
                type="email"
                defaultValue={staff.email}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.email = e.target.value;
                }}
              />
              <label>Password</label>
              <input
                type="password"
                defaultValue={staff.password}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.password = e.target.value;
                }}
              />
              <label>Registration Number</label>
              <input
                type="number"
                defaultValue={staff.registrationNumber}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.registrationNumber = e.target.value;
                }}
              />
              <label>Gender</label>
              {canBeEdited ? (
                <input
                  type="text"
                  defaultValue={staff.gender}
                  disabled={canBeEdited}
                />
              ) : (
                <Select
                  className="selectInput"
                  options={genderList}
                  onChange={(selected) => {
                    staff.gender = selected.value;
                  }}
                  defaultInputValue={staff.gender}
                />
              )}
            </div>
            <div>
              <label>Duty</label>
              {canBeEdited ? (
                <input
                  type="text"
                  defaultValue={staff.duty}
                  disabled={canBeEdited}
                />
              ) : (
                <Creatable
                  className="selectInput"
                  options={staffList}
                  onChange={(selected) => {
                    staff.duty = selected.value;
                  }}
                  defaultInputValue={staff.duty}
                />
              )}
              <label>Mobile Number</label>
              <input
                type="number"
                defaultValue={staff.mobileNumber}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.mobileNumber = e.target.value;
                }}
              />
              <label>Date of Birth</label>
              <input
                type="date"
                defaultValue={getDateFrom(staff.dob)}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.dob = e.target.value;
                }}
              />
              <label>Joining Date</label>
              <input
                type="date"
                defaultValue={getDateFrom(staff.joiningDate)}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.joiningDate = e.target.value;
                }}
              />
              <label>Salary</label>
              <input
                type="text"
                defaultValue={staff.salary}
                disabled={canBeEdited}
                onChange={(e) => {
                  staff.salary = e.target.value;
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
            {!isPending ? "Delete Staff" : "Loading"}
          </button>
          <button
            className="fullColoredButton"
            onClick={(e) => {
              e.preventDefault();
              if (!canBeEdited) {
                setCanBeEdited(true);
                handleUpdate();
              } else {
                setCanBeEdited(false);
              }
            }}
          >
            {!isPending
              ? canBeEdited
                ? "Enable Editing"
                : "Update Details"
              : "Loading"}
          </button>
          {error && "Something went wrong"}
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
