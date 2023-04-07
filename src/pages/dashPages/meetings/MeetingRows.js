import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useMeetingContext } from "../../../Hook/contextHooks/useMeetingContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import MeetingShow from "./MeetingShow";

const MeetingRows = ({ meeting }) => {
  const { user } = useAuthContext();
  const { dispatch } = useMeetingContext();

  const [showMeeting, setShowMeeting] = useState(false);

  const showMeetingOnClick = () => {
    setShowMeeting(!showMeeting);
  };

  const handleUpdate = async () => {
    const isOver = true;

    if (!user) {
      return;
    }

    const meetingHere = {
      isOver,
    };

    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/meetings/" + meeting._id,
      {
        method: "PATCH",
        body: JSON.stringify(meetingHere),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_MEETING", payload: json });
      console.log("Data updated" + json);
    }

    if (!response.ok) {
      console.log(response.error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/meetings/" + meeting._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_MEETING", payload: json });
    }

    if (!response.ok) {
      console.log(response.error);
    }
  };

  return (
    <>
      {showMeeting && (
        <MeetingShow
          showMeetingOnClick={showMeetingOnClick}
          meeting={meeting}
        />
      )}
      <div className="meetingRows" onClick={() => showMeetingOnClick()}>
        <div>
          <p>{meeting.meeting_name}</p>
        </div>
        <div>
          <p>{meeting.organized_by}</p>
        </div>
        <div>
          <p>{meeting.location}</p>
        </div>
        <div>
          <p>
            {formatDistanceToNow(new Date(meeting.timestamps), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div>
          <p>{meeting.isOver ? "Completed" : "Coming"}</p>
        </div>
        <div className="meetingComplete">
          {meeting.isOver ? (
            <button className="borderColoredButton" onClick={handleDelete}>
              <span className="material-symbols-outlined">Delete</span>
              <p>Delete</p>
            </button>
          ) : (
            <button className="borderColoredButton" onClick={handleUpdate}>
              <span className="material-symbols-outlined">Check</span>
              <p>Mark As Done</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MeetingRows;
