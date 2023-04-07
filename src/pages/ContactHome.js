import React from "react";
import Footer from "../globalClasses/Footer";

const ContactHome = () => {
  return (
    <div className="content">
      <div className="contactHome">
        <div className="Contact">
          <h2>Contact Us </h2>
          <p>Any Question or remark? just write us a message</p>
          <div className="Continfo">
            <h2 className="Hello"> contact information</h2>
            <p>
              Fill up the form and our team will get book to you within 24 Hrs
            </p>
            <p>+91 7356929390</p>
            <p>help@ecampus.com</p>
            <p>7th street,Arstyn Campus</p>
          </div>
          <div className="next">
            <p>
              <input type="text" placeholder="Name"></input>
            </p>
            <p>
              <input type="text" placeholder="Email"></input>
            </p>
            <p>
              <textarea placeholder="Message" rows="20"></textarea>
            </p>
            <p>
              <button className="fullColoredButton">Send message</button>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactHome;
