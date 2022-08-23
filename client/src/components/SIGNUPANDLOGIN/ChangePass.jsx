import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ChangePassForm = () => {
  return (
    <>
      <form
        action=""
        className="logindash"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
      >
        <h6 className="logintext">Change Password</h6>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 "> New Password</label>
          <input
            type="password"
            className="form-control inputField"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 ">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control inputField"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="mb-5">
          Note: Your password must be 8-20 characters long, contain letters and
          numbers, one of these special characters: "$@#^|!~=+-_." and must not
          conatin spaces.
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button className="next " type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

function ChangePass() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="sighnContainer">
      <div className="row main ">
        <header className="col-12 row">
          <div className="col-6 ">
            <div className="ubank-logo">
              <img
                src="https://www.bankconnect.online/assets/ubankconnect/img/logo.svg"
                alt=""
                className=" me-auto ubank"
              />
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <span className="text1">New to UBank Connect ?</span>
            <Link to="/signup" className="button1">
              Sign Up
            </Link>
          </div>
        </header>

        <div className="col-12 secondblock container">
          <div className="col-md-7 p-4">
            <img
              src="https://www.bankconnect.online/assets/ubankconnect/images/undraw_profile_data_re_v81r.svg
"
              alt=""
              className=""
              width="300px"
            />
            <h6 className="firstline">
              Do more with Alternative Payment Methods!
            </h6>
            <p className="secondline">
              Use Alternative Payment Methods to accept from your Customers
            </p>
            <button className="learnMoreSign mb-4">Learn More</button>
            <div>
              Need help? <a href="bb"> Contact Us</a>
            </div>
          </div>
          <div className="col-md-5">
            <ChangePassForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
