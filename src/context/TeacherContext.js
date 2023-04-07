import React from "react";
import { createContext, useReducer } from "react";

export const TeacherContext = createContext();

export const teacherReducer = (state, action) => {
  switch (action.type) {
    case "SET_TEACHER":
      return {
        teacher: action.payload,
      };
    case "UPDATE_TEACHER":
      return {
        teacher: state.teacher.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_TEACHER":
      return {
        teacher: [action.payload, ...state.teacher],
      };
    case "DELETE_TEACHER":
      return {
        teacher: state.teacher.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TeacherContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teacherReducer, {
    teacher: null,
  });

  return (
    <TeacherContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TeacherContext.Provider>
  );
};
