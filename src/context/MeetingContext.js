import React from "react";
import { createContext, useReducer } from "react";

export const MeetingContext = createContext();

export const meetingReducer = (state, action) => {
  switch (action.type) {
    case "SET_MEETING":
      return {
        meetings: action.payload,
      };
    case "UPDATE_MEETING":
      return {
        meetings: state.meetings.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_MEETING":
      return {
        meetings: [action.payload, ...state.meetings],
      };
    case "DELETE_MEETING":
      return {
        meetings: state.meetings.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const MeetingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(meetingReducer, {
    meetings: null,
  });

  return (
    <MeetingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MeetingContext.Provider>
  );
};
