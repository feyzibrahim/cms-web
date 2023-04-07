import React from "react";
import { createContext, useReducer } from "react";

export const StudentContext = createContext();

export const studentReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENT":
      return {
        student: action.payload,
      };
    case "UPDATE_STUDENT":
      return {
        student: state.student.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_STUDENT":
      return {
        student: [action.payload, ...state.student],
      };
    case "DELETE_STUDENT":
      return {
        student: state.student.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const StudentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, {
    student: null,
  });

  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};
