import React from "react";
import firstimg from "../img/400.png";
import Footer from "../globalClasses/Footer";
import { useState } from "react";
import { useLogin } from "../Hook/useLogin";
import { Link } from "react-router-dom";
import Loader from "../globalClasses/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="content">
      <div className="LoginHome">
        <div className="text">
          <div className="pic">
            <img src={firstimg} alt="something" />
          </div>
          <div>
            {!isLoading ? (
              <form className="bbb" onSubmit={handleClick}>
                <h1>Welcome Back! Sir/Madam</h1>
                <p className="enterYourDetails">Please Enter your details...</p>
                <p>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  ></input>
                </p>
                <p>
                  <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  ></input>
                </p>
                <p>
                  <button disabled={isLoading} className="fullColoredButton">
                    {isLoading ? "Loading" : "Login"}
                  </button>
                </p>
                {error && <div className="error">{error}</div>}
                <p className="havean">
                  Don't have an account? <Link to="/signup"> sign up Now </Link>
                </p>
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
