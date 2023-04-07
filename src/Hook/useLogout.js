import { useAuthContext } from "./contextHooks/useAuthContext";
import { useWorkoutsContext } from "./contextHooks/useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  const logout = () => {
    //remove user form localstorage
    localStorage.removeItem("user");

    //dispatch
    dispatch({ type: "LOGOUT" });
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
