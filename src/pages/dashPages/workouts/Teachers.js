import React from "react";
import useFetch from "../../../Hook/useFetch";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";
import Loader from "../../../globalClasses/Loader";
import img from "../../../img/noCollegeData.png";

const Teachers = () => {
  var today = new Date(),
    date = today.toTimeString();

  const { workouts, isPending, error } = useFetch(
    "https://cms-server-80fv.onrender.com/api/workouts"
  );

  return (
    <div className="Teachershome addSomeMargin">
      <div className="dHomeNav">
        <div className="dHomeNavLeft">
          <h1>Teachers</h1>
          <p>{date}</p>
        </div>
        <div className="dHomeNavRight">
          <span className="material-symbols-outlined">notifications</span>
        </div>
      </div>
      <div className="Dashhome">
        <div className="dashsubLeft">
          {error && <div>{error}</div>}
          {isPending && <Loader />}
          {workouts != null && workouts.length > 0 ? (
            workouts.map((workouts) => (
              <WorkoutDetails key={workouts._id} workout={workouts} />
            ))
          ) : (
            <div className="collegeDataNotFound">
              <div className="collegeDataNotFoundContainer">
                <img src={img} alt="No data found" />
                <h2>Teachers are not created</h2>
                <h5>
                  Use the form here to update teachers details. More details
                  will be given in the new updates. stay tuned for that
                </h5>
              </div>
            </div>
          )}
        </div>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Teachers;
