import React, { useState } from "react";
import { useAuthContext } from "../../../../Hook/contextHooks/useAuthContext";
import { useSubjectContext } from "../../../../Hook/contextHooks/useSubjectContext";

const SubjectForm = (props) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [sem, setSem] = useState("");

  const [error, setError] = useState(null);
  const { dispatch } = useSubjectContext();

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in...");
      return;
    }

    if (name !== "" && code !== "" && sem !== "") {
      const year = props.year;
      const subject = {
        name,
        code,
        sem,
        year,
      };

      const response = await fetch(
        "/api/department/" + props.deptId + "/subjects",
        {
          method: "POST",
          body: JSON.stringify(subject),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        dispatch({ type: "SET_SUBJECT", payload: json });
        setName("");
        setCode("");
        setSem("");
        props.showSubForm();
      }
    } else {
      setError("Please Fill the Form");
    }
  };

  return (
    <div className="fullScreenDiv">
      <div className="dashCForm">
        <div className="dashCHeader">
          <h2>New Subject</h2>
          <span
            className="material-symbols-outlined"
            onClick={props.showSubForm}
          >
            Close
          </span>
        </div>
        <form>
          <label>Subject Name</label>
          <input
            type="text"
            placeholder="Enter The Event Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>Subject Code</label>
          <input
            type="text"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <label>Semester</label>
          <input
            type="Number"
            onChange={(e) => setSem(e.target.value)}
            value={sem}
          />
          {error && <div className="workoutError">{error}</div>}
          <button className="fullColoredButton" onClick={handleSubmit}>
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
