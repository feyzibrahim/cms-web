import React from "react";
import { createContext, useReducer } from "react";

export const EventContext = createContext();

export const eventReducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENT":
      return {
        events: action.payload,
      };
    case "UPDATE_EVENT":
      return {
        events: state.events.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_EVENT":
      return {
        events: [action.payload, ...state.events],
      };
    case "DELETE_EVENT":
      return {
        events: state.events.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const EventContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, {
    events: null,
  });

  return (
    <EventContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
