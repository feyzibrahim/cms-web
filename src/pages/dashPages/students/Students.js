import React, { useState, useEffect } from "react";
import img from "../../../img/noCollegeData.png";
import Loader from "../../../globalClasses/Loader";
import StudentForm from "./StudentForm";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useStudentContext } from "../../../Hook/contextHooks/useStudentContext";
import StudentRows from "./StudentRows";

const Students = () => {
  var today = new Date(),
    date = today.toTimeString();

  const { user } = useAuthContext();
  const { student, dispatch } = useStudentContext();
  const [isPending, setIsPending] = useState(true);
  const [isNotForm, setIsNotForm] = useState(true);

  const showForm = () => {
    setIsNotForm(!isNotForm);
  };

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/api/student", {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_STUDENT", payload: json });
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
            <h1>Students</h1>
            <p>{date}</p>
          </div>
          <div className="depHomeNavRight">
            <button
              className="fullColoredButton"
              onClick={() => {
                showForm();
              }}
            >
              {isNotForm ? "Add New Student" : "Go back"}
            </button>
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        <div className="teacherContainer">
          {isPending ? (
            <Loader />
          ) : isNotForm ? (
            student != null && student.length > 0 ? (
              <div>
                <div>
                  <div className="teacherRowsHeader">
                    <div>
                      <p>Student Name</p>
                    </div>
                    <div>
                      <p>Email Id</p>
                    </div>
                    <div>
                      <p>Gender</p>
                    </div>
                    <div>
                      <p>Department</p>
                    </div>
                    <div>
                      <p>Year</p>
                    </div>
                    <div>
                      <p>Mobile Number</p>
                    </div>
                  </div>
                  {student.map((t) => (
                    <StudentRows student={t} key={t._id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="collegeDataNotFound">
                <div className="collegeDataNotFoundContainer">
                  <img src={img} alt="No data found" />
                  <h2>Students are not Added</h2>
                  <h5>
                    Please Click below button and fill up the form in order to
                    add a student.
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
            <StudentForm showForm={showForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
