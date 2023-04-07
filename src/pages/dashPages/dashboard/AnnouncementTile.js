import React, { useState } from "react";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { useAnnouncementContext } from "../../../Hook/contextHooks/useAnnouncementContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const AnnouncementTile = ({ annouce }) => {
  const [isShowing, setIsShowing] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = useAnnouncementContext();

  const handleDelete = async () => {
    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/announcement/" + annouce._id,
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
      console.log("Deleted");
    }

    if (!response.ok) {
      console.log(response.error);
    }
  };

  return (
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
                onClick={handleDelete}
              >
                delete
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
  );
};

export default AnnouncementTile;
