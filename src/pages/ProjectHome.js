import React from "react";
import firstImg from "../img/64_.png";
import secondImg from "../img/103.png";
import thirdImg from "../img/152.png";
import dp1 from "../img/dp1.png";
import Footer from "../globalClasses/Footer";

const ProjectHome = () => {
  return (
    <div className="content">
      <div className="proHome">
        <div className="firstSession">
          <div className="session">
            <div className="item">
              <h1>College Management System</h1>
              <p>
                Manage your institute just using e_campus, Subscribe to a plan
                to get the full access to our website.
              </p>
              <button className="fullColoredButton">Get Started</button>
            </div>
            <div className="item">
              <img src={firstImg} alt="Some Guy looking over computer" />
            </div>
          </div>
        </div>

        <div className="secondSession">
          <h2>How it Works</h2>
          <div className="session">
            <div className="work">
              <div className="workCircle">
                <h2>1</h2>
              </div>
              <h3>Register Your Institute</h3>
              <p>
                Just signup the website as a normal website. Use preferred gmail
                id and password to signup
              </p>
              <a href="/">Learn More</a>
            </div>
            <div className="work">
              <div className="workCircle">
                <h2>2</h2>
              </div>
              <h3>Add your staff & Students</h3>
              <p>
                Attendance, Salary, Internals, Time table,... Can be assigned
                and managed easily
              </p>
              <a href="/">Learn More</a>
            </div>
            <div className="work">
              <div className="workCircle">
                <h2>3</h2>
              </div>
              <h3>Download Now</h3>
              <p>
                Just signup the website as a normal website. Use preferred gmail
                id and password to signup
              </p>
              <a href="/">Learn More</a>
            </div>
          </div>
        </div>

        <div className="thirdSession">
          <h1>Simplify the Manual Book Keeping</h1>
          <p>
            Available on App Store & PlayStore. Click here to see the link for
            respective stores{" "}
          </p>
          <p>
            <img src={secondImg} alt="Something" />
          </p>
          <button className="fullColoredButton">Sign Up Now</button>
        </div>

        <div className="forthSession">
          <h2>Choose a plan</h2>
          <div className="planHead">
            <div className="plan">
              <p>FREE</p>
              <h3>Basic</h3>
              <p>All the basic for college management that just get started </p>
              <p>10 Teacher</p>
              <p>100 Students</p>
              <p>Analytical Page</p>
              <button className="fullColoredButton">Get Started</button>
            </div>
            <div className="plan">
              <p>₹10/User</p>
              <h3>Standard</h3>
              <p>All the basic for college management that just get started </p>
              <p>50 Teacher</p>
              <p>500 Students</p>
              <p>Analytical Page</p>
              <button className="fullColoredButton">Get Started</button>
            </div>
            <div className="plan">
              <p>₹1200/Month</p>
              <h3>Premium</h3>
              <p>All the basic for college management that just get started </p>
              <p>Unlimited Teacher</p>
              <p>Unlimited Students</p>
              <p>Analytical Page</p>
              <button className="fullColoredButton">Get Started</button>
            </div>
          </div>
        </div>

        <div className="firstSession">
          <div className="session rightAligned">
            <div className="item">
              <img src={thirdImg} alt="Some Guy looking over computer" />
            </div>
            <div className="item">
              <h1>View The Statistics Graphically</h1>
              <p>
                Most of the data is represented graphically in order to help you
                visibly see the data and make decisions accordingly
              </p>
              <button className="fullColoredButton">Get Started</button>
            </div>
          </div>
        </div>

        <div className="sixthSession">
          <h2>Testimonies</h2>
          <div className="testHead">
            <div className="test">
              <div className="testimon">
                <div className="testiImg">
                  <img src={dp1} alt="DP" />
                </div>
                <div className="testiWord">
                  <p>
                    "It is very good app. it has made the communication easy as
                    a teachers all the features are good and easy to manage the
                    system "
                  </p>
                </div>
              </div>
              <div className="testiRating">
                <div className="testiDetails">
                  <p id="textUsername">Robert Fox</p>
                  <p>Principal AWS College</p>
                </div>
                <div className="testStar"></div>
              </div>
            </div>
            <div className="test">
              <div className="testimon">
                <div className="testiImg">
                  <img src={dp1} alt="DP" />
                </div>
                <div className="testiWord">
                  <p>
                    "It is very good app. it has made the communication easyas a
                    teachers all the features are good and easy to manage the
                    system "
                  </p>
                </div>
              </div>
              <div className="testiRating">
                <div className="testiDetails">
                  <p id="textUsername">Robert Fox</p>
                  <p>Principal AWS College</p>
                </div>
                <div className="testStar"></div>
              </div>
            </div>
            <div className="test">
              <div className="testimon">
                <div className="testiImg">
                  <img src={dp1} alt="DP" />
                </div>
                <div className="testiWord">
                  <p>
                    "It is very good app. it has made the communication easy as
                    a teachers all the features are good and easy to manage the
                    system "
                  </p>
                </div>
              </div>
              <div className="testiRating">
                <div className="testiDetails">
                  <p id="textUsername">Robert Fox</p>
                  <p>Principal AWS College</p>
                </div>
                <div className="testStar"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="question">
          <div className="questionSub">
            <h1>Do you Have any Question</h1>
            <p>Enter your email address and get started</p>
            <div className="questionEmail">
              <input type="text" placeholder="Enter your Email Address" />
              <button className="fullColoredButton"> Send</button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ProjectHome;
