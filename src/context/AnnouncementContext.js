import React from "react";
import { createContext, useReducer } from "react";

export const AnnouncementContext = createContext();

export const announcementReducer = (state, action) => {
  switch (action.type) {
    case "SET_ANNOUNCEMENT":
      return {
        announcements: action.payload,
      };
    case "UPDATE_ANNOUNCEMENT":
      return {
        announcements: state.announcements.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_ANNOUNCEMENT":
      return {
        announcements: [action.payload, ...state.announcements],
      };
    case "DELETE_ANNOUNCEMENT":
      return {
        announcements: state.announcements.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const AnnouncementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(announcementReducer, {
    announcements: null,
  });

  return (
    <AnnouncementContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnnouncementContext.Provider>
  );
};
