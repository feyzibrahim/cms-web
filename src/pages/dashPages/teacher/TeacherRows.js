import React, { useState } from "react";
import TeacherProfile from "./TeacherProfile";

const TeacherRows = (props) => {
  const teacher = props.teacher;
  const [showProfile, setShowProfile] = useState(false);

  const showProfileOnClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      {showProfile && (
        <TeacherProfile
          showProfileOnClick={showProfileOnClick}
          teacher={teacher}
        />
      )}
      <div className="teacherRows" onClick={showProfileOnClick}>
        <div>
          <p>{teacher.teacherName}</p>
        </div>
        <div>
          <p>{teacher.email}</p>
        </div>
        <div>
          <p>{teacher.gender}</p>
        </div>
        <div>
          <p>{teacher.department}</p>
        </div>
        <div>
          <p>{teacher.designation}</p>
        </div>
        <div>
          <p>{teacher.facultyMobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherRows;
