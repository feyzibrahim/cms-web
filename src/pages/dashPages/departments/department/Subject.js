import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../Hook/contextHooks/useAuthContext";
import SubjectForm from "./SubjectForm";

const Subject = (props) => {
  const deptId = props.department._id;
  const [subjects, setSubjects] = useState();
  const { user } = useAuthContext();
  const [showSubCreateForm, setShowSubCreateForm] = useState(false);

  const showSubForm = () => {
    setShowSubCreateForm(!showSubCreateForm);
  };

  const loadSubjects = async () => {
    const response = await fetch(
      "/api/department/" + deptId + "/subjects?year=" + props.year,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      setSubjects(json);
    }
    if (!response.ok) {
      console.log(json.error);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  return (
    <div>
      <div className="dashTodosNav">
        <h2>Subjects</h2>
        <button
          className="fullColoredButton"
          onClick={() => {
            showSubForm();
          }}
        >
          Create New Subject
        </button>
      </div>
      {showSubCreateForm && (
        <SubjectForm
          showSubForm={showSubForm}
          deptId={deptId}
          year={props.year}
        />
      )}

      {subjects &&
        subjects.map((subject) => (
          <div key={subject._id} className="depTeacherRow">
            <p>
              {subject.name} ({subject.code})
            </p>
          </div>
        ))}
    </div>
  );
};

export default Subject;
