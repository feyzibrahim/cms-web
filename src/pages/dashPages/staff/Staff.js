import React, { useState, useEffect } from "react";
import img from "../../../img/noCollegeData.png";
import Loader from "../../../globalClasses/Loader";
import StaffForm from "./StaffForm";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useStaffContext } from "../../../Hook/contextHooks/useStaffContext";
import StaffRows from "./StaffRows";

const Staff = () => {
  var today = new Date(),
    date = today.toTimeString();

  const { user } = useAuthContext();
  const { staff, dispatch } = useStaffContext();
  const [isPending, setIsPending] = useState(true);
  const [isNotForm, setIsNotForm] = useState(true);

  const showForm = () => {
    setIsNotForm(!isNotForm);
  };

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/api/staff", {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_STAFF", payload: json });
        setIsPending(false);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };

    fetchData();
    return () => abortConst.abort();
  }, []);

  return (
    <div className="addSomeMargin">
      <div className="dHome">
        <div className="dHomeNav">
          <div className="dHomeNavLeft">
            <h1>Staff</h1>
            <p>{date}</p>
          </div>
          <div className="depHomeNavRight">
            <button
              className="fullColoredButton"
              onClick={() => {
                showForm();
              }}
            >
              {isNotForm ? "Add New Staff" : "Go back"}
            </button>
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        <div className="teacherContainer">
          {isPending ? (
            <Loader />
          ) : isNotForm ? (
            staff != null && staff.length > 0 ? (
              <div>
                <div>
                  <div className="teacherRowsHeader">
                    <div>
                      <p>Name</p>
                    </div>
                    <div>
                      <p>Email Id</p>
                    </div>
                    <div>
                      <p>Gender</p>
                    </div>
                    <div>
                      <p>Duty</p>
                    </div>
                    <div>
                      <p>Mobile Number</p>
                    </div>
                  </div>
                  {staff.map((m) => (
                    <StaffRows staff={m} key={m._id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="collegeDataNotFound">
                <div className="collegeDataNotFoundContainer">
                  <img src={img} alt="No data found" />
                  <h2>Staffs are not Added</h2>
                  <h5>
                    Please Click below button and fill up the form in order to
                    New Staff.
                  </h5>
                  <button
                    className="fullColoredButton"
                    onClick={() => showForm()}
                  >
                    Click Here
                  </button>
                </div>
              </div>
            )
          ) : (
            <StaffForm showForm={showForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;
