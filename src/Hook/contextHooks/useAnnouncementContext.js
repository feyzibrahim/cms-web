import { AnnouncementContext } from "../../context/AnnouncementContext";
import { useContext } from "react";

export const useAnnouncementContext = () => {
  const context = useContext(AnnouncementContext);

  if (!context) {
    throw Error(
      "useAnnouncementContext must be used inside an AnnouncementContextProvider"
    );
  }

  return context;
};
