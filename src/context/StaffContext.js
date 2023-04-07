import React from "react";
import { createContext, useReducer } from "react";

export const StaffContext = createContext();

export const staffReducer = (state, action) => {
  switch (action.type) {
    case "SET_STAFF":
      return {
        staff: action.payload,
      };
    case "UPDATE_STAFF":
      return {
        staff: state.staff.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_STAFF":
      return {
        staff: [action.payload, ...state.staff],
      };
    case "DELETE_STAFF":
      return {
        staff: state.staff.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const StaffContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(staffReducer, {
    staff: null,
  });

  return (
    <StaffContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StaffContext.Provider>
  );
};
