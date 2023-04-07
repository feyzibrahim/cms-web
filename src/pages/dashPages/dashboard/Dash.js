import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import img from "../../../img/noCollegeData.png";
import CollegeForm from "./CollegeForm";
import Loader from "../../../globalClasses/Loader";
import DashEvents from "./DashEvents";
import DashAnnouncements from "./DashAnnouncements";

const Dash = () => {
  var today = new Date(),
    date = today.toTimeString();

  const [isNotForm, setIsNotForm] = useState(true);

  const { user } = useAuthContext();
  const [college, setCollege] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch(
        "https://cms-server-80fv.onrender.com/api/college",
        {
          signal: abortConst.signal,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setCollege(json);
        console.log(json);
        setIsPending(false);
      }
    };

    fetchData();
    return () => abortConst.abort();
  }, []);

  return (
    <div className="addSomeMargin">
      <div className="dHomeNav">
        <div className="dHomeNavLeft">
          <h1>Dashboard</h1>
          <p>{date}</p>
        </div>
        <div className="dHomeNavRight">
          <h3>
            {college != null && college.length > 0
              ? college[0].college_name + ", " + college[0].place
              : "College Details Not Found"}
          </h3>
          <span className="material-symbols-outlined">notifications</span>
        </div>
      </div>

      {isPending ? (
        <Loader />
      ) : college != null && college.length > 0 ? (
        <div className="dashCollegeDetail">
          <div className="dashCollegeDetailLeft">
            <div className="countList">
              <div className="teacherCount countListCounter">
                <h1>{college[0].teachers_count}</h1>
                <h6>Teacher</h6>
              </div>
              <div className="studentCount countListCounter">
                <h1>{college[0].students_count}</h1>
                <h6>Students</h6>
              </div>
              <div className="staffCount countListCounter">
                <h1>{college[0].staff_count}</h1>
                <h6>Non-Teaching Staff</h6>
              </div>
            </div>
            <DashEvents />
          </div>
          <DashAnnouncements />
        </div>
      ) : isNotForm ? (
        <div className="collegeDataNotFound">
          <div className="collegeDataNotFoundContainer">
            <img src={img} alt="No data found" />
            <h2>College Details Are Not Added</h2>
            <h5>Please update college details by Clicking below button</h5>
            <button
              className="fullColoredButton"
              onClick={() => setIsNotForm(false)}
            >
              Click Here
            </button>
          </div>
        </div>
      ) : (
        <CollegeForm />
      )}
    </div>
  );
};

export default Dash;
