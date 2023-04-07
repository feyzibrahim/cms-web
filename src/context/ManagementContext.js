import React from "react";
import { createContext, useReducer } from "react";

export const ManagementContext = createContext();

export const managementReducer = (state, action) => {
  switch (action.type) {
    case "SET_MANAGEMENT":
      return {
        management: action.payload,
      };
    case "UPDATE_MANAGEMENT":
      return {
        management: state.management.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_MANAGEMENT":
      return {
        management: [action.payload, ...state.management],
      };
    case "DELETE_MANAGEMENT":
      return {
        management: state.management.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ManagementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(managementReducer, {
    management: null,
  });

  return (
    <ManagementContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ManagementContext.Provider>
  );
};
