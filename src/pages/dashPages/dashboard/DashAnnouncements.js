import React, { useState, useEffect } from "react";
import DashAnnounceForm from "./DashAnnounceForm";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import Loader from "../../../globalClasses/Loader";
import { useAnnouncementContext } from "../../../Hook/contextHooks/useAnnouncementContext";
import AnnouncementTile from "./AnnouncementTile";

const DashAnnouncements = () => {
  const [showAnnouForm, setShowAnnouForm] = useState(false);

  const showAnnouFormOnClick = () => {
    setShowAnnouForm(!showAnnouForm);
  };

  const { user } = useAuthContext();
  const { announcements, dispatch } = useAnnouncementContext();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/announcement", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ANNOUNCEMENT", payload: json });
        setIsPending(false);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashCollegeDetailRight">
      <div className="dashScollable specialScroll">
        {showAnnouForm && (
          <DashAnnounceForm showAnnouFormOnClick={showAnnouFormOnClick} />
        )}

        <div className="dashAnnounNav">
          <h3>Announcements</h3>
          <button
            className="fullColoredButton"
            onClick={() => {
              showAnnouFormOnClick();
            }}
          >
            New Announcement
          </button>
        </div>
        {isPending ? (
          <Loader />
        ) : announcements != null && announcements.length > 0 ? (
          announcements.map((e) => <AnnouncementTile key={e._id} annouce={e} />)
        ) : (
          <p>{">"} No New Announcements</p>
        )}
      </div>
    </div>
  );
};

export default DashAnnouncements;
