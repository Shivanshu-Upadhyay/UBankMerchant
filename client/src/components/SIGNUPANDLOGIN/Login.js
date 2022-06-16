import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import baseUrl from "../config/baseUrl.js";
import "./signup.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider.jsx";
const LogIn = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [Token, setToken] = useState();
  let [message, setMessage] = useState("");
  const {auth,setAuth} = useStateContext();

  const natigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(`${baseUrl}/login`, formData, config)
      .then((response) => {
        setMessage((message = response.data.message));
        console.log(response.data.data);
        setToken((Token = response.data.data.token));

        if (response.data.is_complete === 1) {
          localStorage.setItem("user", Token);
          setAuth(localStorage.getItem("user"))
          natigate("/");
          console.log("success");
          console.log(auth);

          
        } else if (response.data.is_complete === 2) {
          toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          natigate(`/inCompleteProfile/${Token}`);
        } else {
          toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <form
        action=""
        className="logindash"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        onSubmit={handleSubmit}
      >
        <h6 className="logintext">Login to Dashboard</h6>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 "> Email ID</label>
          <input
            type="email"
            className="form-control inputField2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 ">Password</label>
          <input
            type="password"
            className="form-control inputField2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-end">
          <Link to="/forgot-password">Forget Password</Link>
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

function Login() {
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
              src="https://www.bankconnect.online/assets/ubankconnect/images/undraw_profile_data_re_v81r.svg"
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
            <LogIn />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
