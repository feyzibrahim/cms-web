import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useEventContext } from "../../../Hook/contextHooks/useEventContext";

const DashEventShow = (props) => {
  const { user } = useAuthContext();
  const { dispatch } = useEventContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const getDateFrom = (dd) => {
    var curr = new Date(dd);
    var date = curr.toISOString().substring(0, 10);
    return date;
  };
  // const getTimefrom = (dd) => {
  //   var curr = new Date(parseInt(dd));
  //   var date = curr.toISOString().substring(12, 19);
  //   return date;
  // };

  const handleDelete = async (e) => {
    e.preventDefault();

    setIsPending(true);
    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/event/" + props.e._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_EVENT", payload: json });
      setIsPending(false);
      setError(null);
      props.toggleEventDetails();
    }

    if (!response.ok) {
      setIsPending(false);
      setError(response.error);
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="dashCForm">
        <div className="dashCHeader">
          <h2>New Event</h2>
          <span
            className="material-symbols-outlined"
            onClick={props.toggleEventDetails}
          >
            Close
          </span>
        </div>
        <form>
          <label>Event Name</label>
          <input
            type="text"
            placeholder="Enter The Event Name"
            defaultValue={props.e.eventName}
            disabled
          />
          <label>Date</label>
          <input
            type="date"
            defaultValue={getDateFrom(props.e.eventDateAndTime)}
          />
          {/* <label>Time</label>
          <input type="text" defaultValue={getTimefrom(props.e.eventTime)} /> */}
          <label>Organized By</label>
          <input
            type="text"
            placeholder="Organizers Name Here"
            defaultValue={props.e.eventOrganizer}
            disabled
          />
          <label>
            Remarks <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="If any notes regarding the events"
            defaultValue={props.e.eventRemarks}
            disabled
          />
          {error && <div className="workoutError">{error}</div>}
          <button className="fullColoredButton" onClick={handleDelete}>
            {isPending ? "Loading..." : "DELETE THE EVENT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashEventShow;
