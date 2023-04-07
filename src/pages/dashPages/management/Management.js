import React, { useState, useEffect } from "react";
import img from "../../../img/noCollegeData.png";
import Loader from "../../../globalClasses/Loader";
import ManagementForm from "./ManagementForm";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useManagementContext } from "../../../Hook/contextHooks/useManagementContext";
import ManagementRows from "./ManagementRows";

const Management = () => {
  var today = new Date(),
    date = today.toTimeString();

  const { user } = useAuthContext();
  const { management, dispatch } = useManagementContext();
  const [isPending, setIsPending] = useState(true);
  const [isNotForm, setIsNotForm] = useState(true);

  const showForm = () => {
    setIsNotForm(!isNotForm);
  };

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/api/management", {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MANAGEMENT", payload: json });
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
            <h1>Management</h1>
            <p>{date}</p>
          </div>
          <div className="depHomeNavRight">
            <button
              className="fullColoredButton"
              onClick={() => {
                showForm();
              }}
            >
              {isNotForm ? "Add New Member to Management" : "Go back"}
            </button>
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        <div className="teacherContainer">
          {isPending ? (
            <Loader />
          ) : isNotForm ? (
            management != null && management.length > 0 ? (
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
                      <p>Roll</p>
                    </div>
                    <div>
                      <p>Mobile Number</p>
                    </div>
                  </div>
                  {management.map((m) => (
                    <ManagementRows management={m} key={m._id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="collegeDataNotFound">
                <div className="collegeDataNotFoundContainer">
                  <img src={img} alt="No data found" />
                  <h2>Management Members are not Added</h2>
                  <h5>
                    Please Click below button and fill up the form in order to
                    add a Member to Management.
                  </h5>
                  <button
                    className="fullColeredButton"
                    onClick={() => showForm()}
                  >
                    Click Here
                  </button>
                </div>
              </div>
            )
          ) : (
            <ManagementForm showForm={showForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Management;
