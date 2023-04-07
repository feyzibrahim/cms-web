import { ManagementContext } from "../../context/ManagementContext";
import { useContext } from "react";

export const useManagementContext = () => {
  const context = useContext(ManagementContext);

  if (!context) {
    throw Error(
      "useManagementContext must be used inside an ManagementContextProvider"
    );
  }

  return context;
};
