import React, { useState } from "react";
import Loader from "../../globalClasses/Loader";
import img from "../../img/noCollegeData.png";

const Dues = () => {
  var today = new Date(),
    date = today.toTimeString();
  const [isPending] = useState(false);

  return (
    <div className="Dueshome addSomeMargin">
      <div className="dHome">
        <div className="dHomeNav">
          <div className="dHomeNavLeft">
            <h1>Dues</h1>
            <p>{date}</p>
          </div>
          <div className="dHomeNavRight">
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        <div className="duesHome">
          {isPending && <Loader />}
          <div className="collegeDataNotFound">
            <div className="collegeDataNotFoundContainer">
              <img src={img} alt="No data found" />
              <h2>No dues Left</h2>
              <h5>
                I think teachers and students data are not cerated. Please
                update all and come back here
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dues;
