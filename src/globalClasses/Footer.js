import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerClass">
      <div className="footerEcamp">
        <h1>e_campus</h1>
      </div>
      <div>
        <ul>
          <li>
            <h4>Company</h4>
          </li>
          <li>
            <Link to="">About</Link>
          </li>
          <li>
            <Link to="">Careers</Link>
          </li>
          <li>
            <Link to="">Mobile</Link>
          </li>
          <li>
            <Link to="">Blog</Link>
          </li>
          <li>
            <Link to="">How we work?</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <h4>Contact</h4>
          </li>
          <li>
            <Link to="">Help/FAQ</Link>
          </li>
          <li>
            <Link to="">Press</Link>
          </li>
          <li>
            <Link to="">Affiliates</Link>
          </li>
          <li>
            <Link to="">Partners</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <h4>More</h4>
          </li>
          <li>
            <Link to="">Subscription Details</Link>
          </li>
          <li>
            <Link to="">Suggestions</Link>
          </li>
          <li>
            <Link to="">Social Media</Link>
          </li>
          <li>
            <Link to="">New Updates</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
