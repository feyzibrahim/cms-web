import React, { useState } from "react";
import DashEventShow from "./DashEventShow";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const EventTile = ({ e }) => {
  const [showEventDetails, setShowEventDetails] = useState(false);

  const toggleEventDetails = () => {
    setShowEventDetails(!showEventDetails);
  };

  return (
    <div>
      {showEventDetails && (
        <DashEventShow e={e} toggleEventDetails={toggleEventDetails} />
      )}
      <div className="eventTile alignCenter" onClick={toggleEventDetails}>
        <p className="eventNameMax">{e.eventName}</p>
        <p className="alignCenter">
          {formatDistanceToNow(new Date(e.eventDateAndTime), {
            addSuffix: true,
          })}
          <span className="material-symbols-outlined">history </span>
        </p>
      </div>
    </div>
  );
};

export default EventTile;
