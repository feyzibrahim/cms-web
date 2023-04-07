import { DepartmentContext } from "../../context/DepartmentContext";
import { useContext } from "react";

export const useDepartmentContext = () => {
  const context = useContext(DepartmentContext);

  if (!context) {
    throw Error(
      "useDepartmentContext must be used inside an DepartmentContextProvider"
    );
  }

  return context;
};
