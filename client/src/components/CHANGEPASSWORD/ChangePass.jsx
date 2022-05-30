import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./changePass.css";
function ChangePassword() {
  return (
    <>
      <h4 className="heading">Change Password</h4>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="Parent"
      >
        <Grid item xs={11} sm={8} md={6} className="child">
          <Header />
          <ChangePassForm />
        </Grid>
      </Grid>
    </>
  );
}

const Header = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="imgdiv">
        <input type="file" className="file" />
          <img
            src="	https://www.bankconnect.online/assets/merchants/img/profile.jpg"
            alt="Not Found"
            className="UploadImg"
          /> 
        </div>
        <div className="mt-2">
          <h6 className="uploadtext">Upload Profile Image</h6>
        </div>
      </div>
    </>
  );
};


const ChangePassForm = () => {
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [type3, setType3] = useState("password");

  const changeType1 = () => {
    setType1((preType) => (preType === "password" ? "text" : "password"));
  };
  const changeType2 = () => {
    setType2((preType) => (preType === "password" ? "text" : "password"));
  };
  const changeType3 = () => {
    setType3((preType) => (preType === "password" ? "text" : "password"));
  };

  return (
    <>
      <form>
        <div className="mb-4">
          <label for="exampleInputEmail1" className="form-label">
            Current Password
          </label>
          <div className="iconfix">
            <input
              type={type1}
              className="form-control inputField"
              placeholder="Current Password"
            />
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType1}
            />
          </div>
        </div>
        <div className="mb-4">
          <label for="exampleInputEmail1" className="form-label">
            New Password
          </label>
          <div className="iconfix">
            <input
              type={type2}
              className="form-control inputField"
              placeholder="Current Password"
            />
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType2}
            />
          </div>
        </div>
        <div className="mb-2">
          <label for="exampleInputEmail1" className="form-label">
            Confirm Password
          </label>
          <div className="iconfix">
            <input
              type={type3}
              className="form-control inputField"
              placeholder="Current Password"
            />
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/Eye.svg"
              alt=" not found"
              style={{ cursor: "pointer" }}
              className="eye"
              onClick={changeType3}
            />
          </div>
        </div>
        <p className="mb-4">
          Note: Your password must be 8-20 characters long, contain letters and
          numbers, one of these special characters: "$@#^|!~=+-_." and must not
          conatin spaces.
        </p>
        <div className="text-end">
          <button type="submit" className="cancel mx-2">
            Cancel
          </button>
          <button type="submit" className="changepassBtn">
            Change Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
