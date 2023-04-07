import React from "react";

const Loader = () => {
  return (
    <div className="lds">
      <div className="lds-container">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
