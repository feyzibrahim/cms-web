import React, { useState } from "react";
import StaffProfile from "./StaffProfile";

const StaffRows = (props) => {
  const staff = props.staff;
  const [showProfile, setShowProfile] = useState(false);

  const showProfileOnClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      {showProfile && (
        <StaffProfile showProfileOnClick={showProfileOnClick} staff={staff} />
      )}
      <div className="teacherRows" onClick={showProfileOnClick}>
        <div>
          <p>{staff.staffName}</p>
        </div>
        <div>
          <p>{staff.email}</p>
        </div>
        <div>
          <p>{staff.gender}</p>
        </div>
        <div>
          <p>{staff.duty}</p>
        </div>
        <div>
          <p>{staff.mobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default StaffRows;
