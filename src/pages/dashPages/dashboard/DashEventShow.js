import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useEventContext } from "../../../Hook/contextHooks/useEventContext";
import { BASE_URL } from "../../../globalClasses/Config";

const DashEventShow = (props) => {
  const { user } = useAuthContext();
  const { dispatch } = useEventContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const getDateFrom = (dd) => {
    var curr = new Date(dd);
    var date = curr.toISOString().substring(0, 10);
    return date;
  };
  // const getTimeFrom = (dd) => {
  //   var curr = new Date(parseInt(dd));
  //   var date = curr.toISOString().substring(12, 19);
  //   return date;
  // };

  const handleDelete = async (e) => {
    e.preventDefault();

    setIsPending(true);
    const response = await fetch(`${BASE_URL}/api/event/${props.e._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
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

  const handleUpdate = async () => {
    const res = await fetch(`${BASE_URL}/api/event/${props.e._id}`, {
      method: "PATCH",
      body: JSON.stringify(props.e),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_EVENT", payload: json });
    }

    if (!res.ok) {
      console.log(res.error);
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="dashCForm">
        <div className="dashCHeader">
          <h2>Event Details</h2>
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
            disabled={isDisabled}
            onChange={(e) => (props.e.eventName = e.target.value)}
          />
          <label>Date</label>
          <input
            type="date"
            defaultValue={getDateFrom(props.e.eventDateAndTime)}
            disabled={isDisabled}
            onChange={(e) => (props.e.eventDateAndTime = e.target.value)}
          />
          {/* <label>Time</label>
          <input type="text" defaultValue={getTimeFrom(props.e.eventTime)} /> */}
          <label>Organized By</label>
          <input
            type="text"
            placeholder="Organizers Name Here"
            defaultValue={props.e.eventOrganizer}
            disabled={isDisabled}
            onChange={(e) => (props.e.eventOrganizer = e.target.value)}
          />
          <label>
            Remarks <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="If any notes regarding the events"
            defaultValue={props.e.eventRemarks}
            disabled={isDisabled}
            onChange={(e) => (props.e.eventRemarks = e.target.value)}
          />
          {error && <div className="workoutError">{error}</div>}
          <div className="dashEventButton">
            <button className="fullColoredButton" onClick={handleDelete}>
              {isPending ? "Loading..." : "DELETE THE EVENT"}
            </button>
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
              {isDisabled ? "Edit" : "UPDATE THE EVENT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashEventShow;
