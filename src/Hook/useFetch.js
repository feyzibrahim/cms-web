import { useState, useEffect } from "react";
import { useWorkoutsContext } from "./contextHooks/useWorkoutsContext";
import { useAuthContext } from "./contextHooks/useAuthContext";

const useFetch = (url) => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const abortConst = new AbortController();

    const fetchWorkouts = async () => {
      const response = await fetch(url, {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
        setIsPending(false);
        setError(null);
      } else {
        setIsPending(false);
      }
    };

    if (user) {
      fetchWorkouts();
    }

    return () => abortConst.abort();
  }, [url, dispatch, user]);

  return { workouts, isPending, error };
};

export default useFetch;
