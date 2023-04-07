import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useMeetingContext } from "../../../Hook/contextHooks/useMeetingContext";

const MeetingShow = (props) => {
  const { user } = useAuthContext();
  const { dispatch } = useMeetingContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isInputDisabled, setIsInputDisabled] = useState(true);

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
    const response = await fetch("/api/meetings/" + props.meeting._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MEETING", payload: json });
      setIsPending(false);
      setError(null);
      props.showMeetingOnClick();
    }

    if (!response.ok) {
      setIsPending(false);
      setError(response.error);
    }
  };

  const handleUpdate = async () => {
    setIsPending(true);
    const res = await fetch("/api/meetings/" + props.meeting._id, {
      method: "PATCH",
      body: JSON.stringify(props.meeting),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_MEETING", payload: json });
      setIsPending(false);
      setError(null);
    }

    if (!res.ok) {
      setIsPending(false);
      setError(res.error);
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="dashCForm">
        <div className="dashCHeader">
          <h2>Meeting Details</h2>
          <span
            className="material-symbols-outlined"
            onClick={props.showMeetingOnClick}
          >
            Close
          </span>
        </div>
        <form>
          <label>Meeting Name</label>
          <input
            type="text"
            placeholder="Enter The Event Name"
            defaultValue={props.meeting.meeting_name}
            disabled={isInputDisabled}
            onChange={(e) => {
              props.meeting.meeting_name = e.target.value;
            }}
          />
          <label>Date</label>
          <input
            type="date"
            defaultValue={getDateFrom(props.meeting.timestamps)}
            disabled={isInputDisabled}
            onChange={(e) => {
              props.meeting.timestamps = e.target.value;
            }}
          />
          {/* <label>Time</label>
          <input type="text" defaultValue={getTimefrom(props.meeting.eventTime)} /> */}
          <label>Organized By</label>
          <input
            type="text"
            placeholder="Organizers Name Here"
            defaultValue={props.meeting.organized_by}
            disabled={isInputDisabled}
            onChange={(e) => {
              props.meeting.organized_by = e.target.value;
            }}
          />
          <label>Location</label>
          <input
            type="text"
            placeholder="If any notes regarding the events"
            defaultValue={props.meeting.location}
            disabled={isInputDisabled}
            onChange={(e) => {
              props.meeting.location = e.target.value;
            }}
          />
          {error && <div className="workoutError">{error}</div>}
          <div className="meetingShowButtons">
            <button
              className="fullColoredButton someSpecialMargin"
              onClick={handleDelete}
            >
              {isPending ? "Loading..." : "Delete"}
            </button>
            <button
              className="fullColoredButton"
              onClick={(e) => {
                e.preventDefault();
                if (isInputDisabled) {
                  setIsInputDisabled(false);
                } else {
                  setIsInputDisabled(true);
                  handleUpdate();
                }
              }}
            >
              {isPending
                ? "Loading..."
                : !isInputDisabled
                ? "Update"
                : "Enable Editing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingShow;
