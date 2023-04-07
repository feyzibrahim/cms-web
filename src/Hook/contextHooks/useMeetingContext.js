import { MeetingContext } from "../../context/MeetingContext";
import { useContext } from "react";

export const useMeetingContext = () => {
  const context = useContext(MeetingContext);

  if (!context) {
    throw Error(
      "useMeetingContext must be used inside an MeetingContextProvider"
    );
  }

  return context;
};
