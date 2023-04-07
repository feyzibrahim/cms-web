import React, { useState } from "react";
import ManagementProfile from "./ManagementProfile";

const ManagementRows = (props) => {
  const management = props.management;
  const [showProfile, setShowProfile] = useState(false);

  const showProfileOnClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      {showProfile && (
        <ManagementProfile
          showProfileOnClick={showProfileOnClick}
          management={management}
        />
      )}
      <div className="teacherRows" onClick={showProfileOnClick}>
        <div>
          <p>{management.managerName}</p>
        </div>
        <div>
          <p>{management.email}</p>
        </div>
        <div>
          <p>{management.gender}</p>
        </div>
        <div>
          <p>{management.roll}</p>
        </div>
        <div>
          <p>{management.mobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ManagementRows;
