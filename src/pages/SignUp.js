import React, { useState } from "react";
import firstimg from "../img/400.png";
import Footer from "../globalClasses/Footer";
import { useSignup } from "../Hook/useSignup";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const { signup, isLoading, error } = useSignup();
  const [passNotMatch, setPassNotMatch] = useState("");
  const admin = "admin";

  const handleClick = async (e) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      setPassNotMatch("Password are not same");
      return;
    }

    await signup(email, password, admin, name);
  };

  return (
    <div className="content">
      <div className="signupPage">
        <div className="one">
          <div className="some">
            <img src={firstimg} alt="something" />
          </div>
          <form className="signupForm" onSubmit={handleClick}>
            <h1>Create an account</h1>
            <p>Please enter your details below to signup to e-campus</p>
            <p>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
            </p>
            <p>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </p>
            <p>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </p>
            <p>
              <input
                type="password"
                placeholder="Password Again"
                onChange={(e) => setPasswordAgain(e.target.value)}
                value={passwordAgain}
              ></input>
            </p>
            <p>
              <button className="fullColoredButton" disabled={isLoading}>
                Signup
              </button>
            </p>
            {error && <div className="error">{error}</div>}
            {passNotMatch && <div className="error">{passNotMatch}</div>}
            <p className="five">
              Already have an account? <Link to="/login">Log in Now</Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
