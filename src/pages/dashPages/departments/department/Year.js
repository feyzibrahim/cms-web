import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../Hook/contextHooks/useAuthContext";
import Subject from "./Subject";

const Year = () => {
  const { state } = useLocation();
  const { i, department } = state;
  const [students, setStudents] = useState();
  const { user } = useAuthContext();

  const loadStudents = async () => {
    const response = await fetch(
      "https://cms-server-80fv.onrender.com/api/student?departmentId=" +
        department._id +
        "&year=" +
        i,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      setStudents(json);
    }
    if (!response.ok) {
      console.log(json.error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="addSomeMargin">
      <h3>{department.department_name}</h3>
      <div className="depBottom">
        <div className="depTeachers">
          <h2>Year #{i} - Students</h2>
          {students &&
            students.map((item) => {
              return (
                <div key={item._id} className="depTeacherRow">
                  <p>{item.student_name}</p>
                </div>
              );
            })}
        </div>
        <div className="depSubjects">
          <Subject department={department} year={i} />
        </div>
      </div>
    </div>
  );
};

export default Year;
