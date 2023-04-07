import React from "react";
import { createContext, useReducer } from "react";

export const SubjectContext = createContext();

export const subjectReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUBJECT":
      return {
        subject: action.payload,
      };
    case "UPDATE_SUBJECT":
      return {
        subject: state.subject.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_SUBJECT":
      return {
        subject: [action.payload, ...state.subject],
      };
    case "DELETE_SUBJECT":
      return {
        subject: state.subject.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SubjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subjectReducer, {
    subject: null,
  });

  return (
    <SubjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SubjectContext.Provider>
  );
};
