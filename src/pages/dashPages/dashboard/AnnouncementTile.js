import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import DashAnnounceShow from "./DashAnnounceShow";

const AnnouncementTile = ({ annouce }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);

  const displayFunction = () => {
    setShowDisplay(!showDisplay);
  };

  return (
    <div>
      {showDisplay && (
        <DashAnnounceShow
          announce={annouce}
          displayFunction={displayFunction}
        />
      )}
      <div
        className="ann"
        onMouseOver={() => setIsShowing(true)}
        onMouseOut={() => setIsShowing(false)}
      >
        <p className="annP">
          {">"} {annouce.announcementTitle}
        </p>
        {isShowing && (
          <div className="annDisc">
            <div className="annDScroll specialScroll">
              <div className="annDiscHead">
                <h3>Discription</h3>
                <span
                  className="material-symbols-outlined annP"
                  onClick={(e) => {
                    e.preventDefault();
                    displayFunction();
                  }}
                >
                  Edit
                </span>
              </div>
              <p>{annouce.announcementDiscription}</p>
              <p className="alignCenter">
                <span
                  className="material-symbols-outlined
                "
                >
                  history
                </span>
                {formatDistanceToNow(new Date(annouce.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementTile;
