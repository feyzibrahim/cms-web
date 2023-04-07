import React from "react";
import { createContext, useReducer } from "react";

export const DepartmentContext = createContext();

export const departmentReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEPARTMENT":
      return {
        department: action.payload,
      };
    case "CREATE_DEPARTMENT":
      return {
        department: [action.payload, ...state.department],
      };
    case "DELETE_DEPARTMENT":
      return {
        department: state.department.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const DepartmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(departmentReducer, {
    departments: null,
  });

  return (
    <DepartmentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DepartmentContext.Provider>
  );
};
