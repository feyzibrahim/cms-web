import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useAnnouncementContext } from "../../../Hook/contextHooks/useAnnouncementContext";
import { BASE_URL } from "../../../globalClasses/Config";

const DashAnnounceShow = (props) => {
  const announce = props.announce;
  const { user } = useAuthContext();
  const { dispatch } = useAnnouncementContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${BASE_URL}/api/announcement/${announce._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ANNOUNCEMENT", payload: json });
      setIsLoading(false);
      setError(null);
    }

    if (!response.ok) {
      setError(response.error);
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/api/announcement/${announce._id}`, {
      method: "PATCH",
      body: JSON.stringify(announce),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json });
      setIsLoading(false);
      setError(null);
    }

    if (!res.ok) {
      setError(res.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="dashCForm">
        <div className="dashCHeader">
          <h2>New Announcement</h2>
          <span
            className="material-symbols-outlined"
            onClick={props.displayFunction}
          >
            Close
          </span>
        </div>
        <form>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter The Event Name"
            defaultValue={announce.announcementTitle}
            onChange={(e) => (announce.announcementTitle = e.target.value)}
          />
          <label>Description</label>
          <textarea
            type="text"
            defaultValue={announce.announcementDiscription}
            onChange={(e) =>
              (announce.announcementDiscription = e.target.value)
            }
          />
          {error && <div className="workoutError">{error}</div>}
          <div className="dashEventButton">
            <button
              disabled={isLoading}
              className="fullColoredButton"
              onClick={handleDelete}
            >
              {isLoading ? "Loading..." : "Delete Announcement"}
            </button>
            <button
              disabled={isLoading}
              className="fullColoredButton"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashAnnounceShow;
