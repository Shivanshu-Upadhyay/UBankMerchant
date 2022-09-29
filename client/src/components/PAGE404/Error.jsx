import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
function Error() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  useEffect(() => {
    const timevar = setTimeout(() => {
      auth ? navigate("/") : navigate("/login");
    }, 11000);
    return () => clearTimeout(timevar);
  }, []);

  return (
    <section className="page_404">
      <div className=" d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>the page you are looking for not avaible!</p>
                <Link to={auth ? "/Dashbord" : "/login"} className="link_404">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error;
