import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useMeetingContext } from "../../../Hook/contextHooks/useMeetingContext";

const MeetingForm = (props) => {
  const { user } = useAuthContext();
  const [meeting_name, setMeetingName] = useState("");
  const [organized_by, setOrganizedBy] = useState("");
  const [location, setLocation] = useState("");
  const [timestamps, setTimeStamps] = useState("");
  const [error, setError] = useState("");
  const isOver = false;

  const { dispatch } = useMeetingContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in...");
      return;
    }

    const meeting = {
      meeting_name,
      organized_by,
      location,
      timestamps,
      isOver,
    };

    const response = await fetch("/api/meetings", {
      method: "POST",
      body: JSON.stringify(meeting),
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
      setMeetingName("");
      setOrganizedBy("");
      setLocation("");
      setTimeStamps("");
      setError(null);
      dispatch({ type: "CREATE_MEETING", payload: json });
      props.showForm();
    }
  };

  return (
    <form className="collegeNewForm">
      <div className="collegeNewFormTitle">
        <h3>Enter Meeting Details</h3>
      </div>
      <label>Meeting Name</label>
      <input
        type="text"
        onChange={(e) => setMeetingName(e.target.value)}
        value={meeting_name}
      />
      <label>Organized by</label>
      <input
        type="text"
        onChange={(e) => setOrganizedBy(e.target.value)}
        value={organized_by}
      />
      <label>Location</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />
      <label>Time & Date</label>
      <input
        type="date"
        onChange={(e) => setTimeStamps(e.target.value)}
        value={timestamps}
      />
      <div className="collegeFormButton">
        <button className="fullColoredButton" onClick={handleSubmit}>
          Create Meeting
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default MeetingForm;
