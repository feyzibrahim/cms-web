import React from "react";
import { useWorkoutsContext } from "../../../Hook/contextHooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Id: </strong>
        {workout.load}
      </p>
      <p>
        <strong>Contact Number: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
