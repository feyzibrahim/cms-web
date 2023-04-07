import React, { useState } from "react";
import StudentProfile from "./StudentProfile";
const StudentRows = (props) => {
  const student = props.student;
  const [showProfile, setShowProfile] = useState(false);

  const showProfileOnClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      {showProfile && (
        <StudentProfile
          showProfileOnClick={showProfileOnClick}
          student={student}
        />
      )}
      <div className="teacherRows" onClick={showProfileOnClick}>
        <div>
          <p>{student.student_name}</p>
        </div>
        <div>
          <p>{student.email}</p>
        </div>
        <div>
          <p>{student.gender}</p>
        </div>
        <div>
          <p>{student.department}</p>
        </div>
        <div>
          <p>{student.year}</p>
        </div>
        <div>
          <p>{student.mobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentRows;
