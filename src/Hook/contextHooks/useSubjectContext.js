import { SubjectContext } from "../../context/SubjectContext";
import { useContext } from "react";

export const useSubjectContext = () => {
  const context = useContext(SubjectContext);

  if (!context) {
    throw Error(
      "useSubjectContext must be used inside an SubjectContextProvider"
    );
  }

  return context;
};
