import React, { useState, useEffect } from "react";
import img from "../../../img/noCollegeData.png";
import Loader from "../../../globalClasses/Loader";
import TeacherForm from "./TeacherForm";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useTeacherContext } from "../../../Hook/contextHooks/useTeacherContext";
import TeacherRows from "./TeacherRows";

const Teacher = () => {
  var today = new Date(),
    date = today.toTimeString();

  const { user } = useAuthContext();
  const { teacher, dispatch } = useTeacherContext();
  const [isPending, setIsPending] = useState(true);
  const [isNotForm, setIsNotForm] = useState(true);

  const showForm = () => {
    setIsNotForm(!isNotForm);
  };

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/api/teacher", {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TEACHER", payload: json });
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
            <h1>Teachers</h1>
            <p>{date}</p>
          </div>
          <div className="depHomeNavRight">
            <button
              className="fullColoredButton"
              onClick={() => {
                showForm();
              }}
            >
              {isNotForm ? "Add New Teacher" : "Go back"}
            </button>
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        <div className="teacherContainer">
          {isPending ? (
            <Loader />
          ) : isNotForm ? (
            teacher != null && teacher.length > 0 ? (
              <div>
                <div>
                  <div className="teacherRowsHeader">
                    <div>
                      <p>Teacher Name</p>
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
                      <p>Designation</p>
                    </div>
                    <div>
                      <p>Mobile Number</p>
                    </div>
                  </div>
                  {teacher.map((t) => (
                    <TeacherRows teacher={t} key={t._id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="collegeDataNotFound">
                <div className="collegeDataNotFoundContainer">
                  <img src={img} alt="No data found" />
                  <h2>Teachers are not Added</h2>
                  <h5>
                    Please Click below button and fill up the form in order to
                    add a teacher.
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
            <TeacherForm showForm={showForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Teacher;
