import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useAnnouncementContext } from "../../../Hook/contextHooks/useAnnouncementContext";
import { BASE_URL } from "../../../globalClasses/Config";

const DashAnnounceForm = (props) => {
  const { user } = useAuthContext();
  const { dispatch } = useAnnouncementContext();

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDiscription, setAnnouncementDiscription] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in...");
      return;
    }

    if (announcementTitle !== "") {
      setIsLoading(true);
      const annoucement = {
        announcementTitle,
        announcementDiscription,
      };

      const response = await fetch(`${BASE_URL}/api/announcement`, {
        method: "POST",
        body: JSON.stringify(annoucement),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setAnnouncementDiscription("");
        setAnnouncementTitle("");
        setError(null);
        dispatch({ type: "CREATE_ANNOUNCEMENT", payload: json });
        props.showAnnouFormOnClick();
      }
    } else {
      setError("Please Fill the Form");
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="dashCForm">
        <div className="dashCHeader">
          <h2>New Announcement</h2>
          <span
            className="material-symbols-outlined"
            onClick={props.showAnnouFormOnClick}
          >
            Close
          </span>
        </div>
        <form>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter The Event Name"
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            value={announcementTitle}
          />
          <label>Discription</label>
          <textarea
            type="text"
            onChange={(e) => setAnnouncementDiscription(e.target.value)}
            value={announcementDiscription}
          />
          {error && <div className="workoutError">{error}</div>}
          <button
            disabled={isLoading}
            className="fullColoredButton"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading..." : "Create Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashAnnounceForm;
