import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useEventContext } from "../../../Hook/contextHooks/useEventContext";
import { BASE_URL } from "../../../globalClasses/Config";

const DashEventForm = (props) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventRemarks, setEventRemarks] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useEventContext();

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in...");
      return;
    }

    if (
      eventName !== "" &&
      eventDate !== "" &&
      eventTime !== "" &&
      eventOrganizer !== ""
    ) {
      var eventDateAndTime = eventDate + " " + eventTime;

      const event = {
        eventName,
        eventDateAndTime,
        eventOrganizer,
        eventRemarks,
      };

      const response = await fetch(`${BASE_URL}/api/event`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        props.showDashCreateFormOnClick();
        setEventName("");
        setEventDate("");
        setEventTime("");
        setEventOrganizer("");
        setEventRemarks("");
        dispatch({ type: "CREATE_EVENT", payload: json });
      }
    } else {
      setError("Please Fill the Form");
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="dashCForm">
        <div className="dashCHeader">
          <h2>New Event</h2>
          <span
            className="material-symbols-outlined"
            onClick={props.showDashCreateFormOnClick}
          >
            Close
          </span>
        </div>
        <form>
          <label>Event Name</label>
          <input
            type="text"
            placeholder="Enter The Event Name"
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />
          <label>Date</label>
          <input
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
            value={eventDate}
          />
          <label>Time</label>
          <input
            type="time"
            onChange={(e) => setEventTime(e.target.value)}
            value={eventTime}
          />
          <label>Organized By</label>
          <input
            type="text"
            placeholder="Organizers Name Here"
            onChange={(e) => setEventOrganizer(e.target.value)}
            value={eventOrganizer}
          />
          <label>
            Remarks <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="If any notes regarding the events"
            onChange={(e) => setEventRemarks(e.target.value)}
            value={eventRemarks}
          />
          {error && <div className="workoutError">{error}</div>}
          <button className="fullColoredButton" onClick={handleSubmit}>
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashEventForm;
