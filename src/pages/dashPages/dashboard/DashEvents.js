import EventTile from "./EventTile";
import DashEventForm from "./DashEventForm";
import Loader from "../../../globalClasses/Loader";
import React, { useState, useEffect } from "react";
import { useEventContext } from "../../../Hook/contextHooks/useEventContext";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { BASE_URL } from "../../../globalClasses/Config";

const DashEvents = () => {
  const [showDashCreateForm, setShowDashCreateForm] = useState(false);

  const showDashCreateFormOnClick = () => {
    setShowDashCreateForm(!showDashCreateForm);
  };

  const { user } = useAuthContext();
  const { events, dispatch } = useEventContext();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/api/event`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EVENT", payload: json });
        setIsPending(false);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashTodos">
      <div className="dashEventsDiv specialScroll">
        {showDashCreateForm && (
          <DashEventForm
            showDashCreateFormOnClick={showDashCreateFormOnClick}
          />
        )}
        <div className="dashTodosNav">
          <h3>Events</h3>
          <button
            className="fullColoredButton"
            onClick={() => {
              showDashCreateFormOnClick();
            }}
          >
            Create New Event
          </button>
        </div>
        {isPending ? (
          <Loader />
        ) : events != null && events.length > 0 ? (
          events.map((e) => <EventTile e={e} key={e._id} />)
        ) : (
          <p> Events are empty</p>
        )}
      </div>
    </div>
  );
};

export default DashEvents;
