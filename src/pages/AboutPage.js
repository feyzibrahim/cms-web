import React from "react";
import firstimg from "../img/girl1.jpeg";
import secondimg from "../img/boy1.jpeg";
import thirdimg from "../img/girl2.jpeg";
import Footer from "../globalClasses/Footer";

const AboutPage = () => {
  return (
    <div className="content">
      <div className="aboutPage">
        <div className="sub">
          <h1>Meet our team of creators</h1>
          <p>Alone we can do so little:together we can do much</p>
        </div>

        <div className="aboutPageImage">
          <div className="aboutItem">
            <img src={firstimg} alt="some"></img>
            <p>Sam Jhon</p>
          </div>

          <div className="aboutItem">
            <img src={secondimg} alt="thing"></img>
            <p>Luther kson</p>
          </div>

          <div className="aboutItem">
            <img src={thirdimg} alt="damn"></img>
            <p>Kernal mson</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
