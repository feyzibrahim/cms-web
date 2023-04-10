import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Hook/contextHooks/useAuthContext";
import Loader from "../../globalClasses/Loader";
import { BASE_URL } from "../../globalClasses/Config";

const Profile = () => {
  var today = new Date(),
    date = today.toTimeString();

  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useAuthContext();
  const [college, setCollege] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [error, setError] = useState("");

  const handleUpdate = async () => {
    console.log(college);
    const res = await fetch(`${BASE_URL}/api/college/${college._id}`, {
      method: "PATCH",
      body: JSON.stringify(college),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (res.ok) {
      setError(null);
      setCollege(json);
      console.log(json);
    }

    if (!res.ok) {
      setError(res.error);
    }
  };

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/api/college`, {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCollege(json[0]);
        console.log(json);
        setIsPending(false);
      }
      if (!response.ok) {
        setError(json.error);
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
            <h1>Profile</h1>
            <p>{date}</p>
          </div>
          <div className="dHomeNavRight">
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        {isPending ? (
          <Loader />
        ) : college != null ? (
          <div className="collegeProfile">
            <form className="collegeNewForm">
              <label>College Name</label>
              <input
                type="text"
                onChange={(e) => (college.college_name = e.target.value)}
                defaultValue={college.college_name}
                disabled={isDisabled}
              />
              <label>Place</label>
              <input
                type="text"
                onChange={(e) => (college.place = e.target.value)}
                defaultValue={college.place}
                disabled={isDisabled}
              />
              <label>Teachers Count</label>
              <input
                type="number"
                onChange={(e) => (college.teachers_count = e.target.value)}
                defaultValue={college.teachers_count}
                disabled={isDisabled}
              />
              <label>Staff Count</label>
              <input
                type="number"
                onChange={(e) => (college.staff_count = e.target.value)}
                defaultValue={college.staff_count}
                disabled={isDisabled}
              />
              <label>Students Count</label>
              <input
                type="number"
                onChange={(e) => (college.students_count = e.target.value)}
                defaultValue={college.students_count}
                disabled={isDisabled}
              />
              <div className="collegeFormButton">
                <button
                  className="fullColoredButton"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isDisabled) {
                      setIsDisabled(false);
                    } else {
                      setIsDisabled(true);
                      handleUpdate();
                    }
                  }}
                >
                  {isDisabled ? "Edit" : "Update"}
                </button>
              </div>

              {error && <div className="workoutError">{error}</div>}
            </form>
          </div>
        ) : (
          "College Details Not Found"
        )}
      </div>
    </div>
  );
};

export default Profile;
