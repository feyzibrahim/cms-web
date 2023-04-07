import { TeacherContext } from "../../context/TeacherContext";
import { useContext } from "react";

export const useTeacherContext = () => {
  const context = useContext(TeacherContext);

  if (!context) {
    throw Error(
      "useTeacherContext must be used inside an TeacherContextProvider"
    );
  }

  return context;
};
