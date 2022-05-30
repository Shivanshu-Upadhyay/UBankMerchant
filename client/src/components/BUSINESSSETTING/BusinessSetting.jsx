import React, { useState, useEffect } from "react";
import "./businessSetting.css";
import { Grid } from "@mui/material";
import { Accordion } from "react-bootstrap";
import { checkboxData } from "../Data/signupData.js";
function BusinessSetting() {
  const [comp, setComp] = useState(0);
  return (
    <>
      <h4 className="heading">Business Setting</h4>
      <br />
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={3} className="firstBlock mx-4">
          <ul>
            <li
              onClick={() => setComp(0)}
              className={comp === 0 ? "activetab" : ""}
            >
              Company Profile
            </li>
            <li
              onClick={() => setComp(1)}
              className={comp === 1 ? "activetab" : ""}
            >
              Solutions Applying For
            </li>
            <li
              onClick={() => setComp(2)}
              className={comp === 2 ? "activetab" : ""}
            >
              Director's Info
            </li>
            <li
              onClick={() => setComp(3)}
              className={comp === 3 ? "activetab" : ""}
            >
              Shareholder Info
            </li>
            <li
              onClick={() => setComp(4)}
              className={comp === 4 ? "activetab" : ""}
            >
              Business Info
            </li>
            <li
              onClick={() => setComp(5)}
              className={comp === 5 ? "activetab" : ""}
            >
              Settlement Info
            </li>
            <li
              onClick={() => setComp(6)}
              className={comp === 6 ? "activetab" : ""}
            >
              Keys
            </li>
            <li
              onClick={() => setComp(7)}
              className={comp === 7 ? "activetab" : ""}
            >
              Download{" "}
            </li>
          </ul>
        </Grid>

        <Grid item xs={8} className="secondBlock" style={{ height: "37rem" }}>
          {comp === 0 ? (
            <CompanyProfile />
          ) : comp === 1 ? (
            <SolutionsApplying />
          ) : comp === 2 ? (
            <DirectorInfo />
          ) : comp === 3 ? (
            <ShareholderInfo />
          ) : comp === 4 ? (
            <BusinessProfile />
          ) : comp === 5 ? (
            <SettlementInfo />
          ) : comp === 6 ? (
            <Keys />
          ) : (
            <Download />
          )}
        </Grid>
      </Grid>
    </>
  );
}

// COMMON COMPONENTE ********^^^^^^_______+++++

const InputComp = ({ label, type, value, onChange }) => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label loginlable ">{label}</label>
        <input
          type={type}
          className="form-control "
          placeholder={label}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
};

// COMPANY PROFILE ******_____+++++++##@@@@@

const CompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [tradingDoing, setTradingDoing] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [countryofIncorporation, setCountryofIncorporation] = useState("");
  const [mainContactPerson, setMainContactPerson] = useState("");
  const [mainContactEmailAddress, setMainContactEmailAddress] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      companyName,
      tradingDoing,
      registeredAddress,
      companyNumber,
      countryofIncorporation,
      mainContactPerson,
      mainContactEmailAddress
    );
  };
  return (
    <>
      <form action="" onSubmit={onSubmit} className="formBlock mx-3 ">
        <h6 className="profileHeading">Company Profile</h6>

        <InputComp
          label="Company Name"
          type="text"
          name="CompanyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <InputComp
          label="Trading As / Doing Business As (DBA) 	"
          type="text"
          name="TradingDoingBusiness"
          value={tradingDoing}
          onChange={(e) => setTradingDoing(e.target.value)}
        />
        <InputComp
          label="Registered Address"
          type="text"
          name="RegisteredAddress"
          value={registeredAddress}
          onChange={(e) => setRegisteredAddress(e.target.value)}
        />
        <InputComp
          label="Company Number / Registration Number 	"
          type="text"
          name="CompanyNumberRegistrationNumber"
          value={companyNumber}
          onChange={(e) => setCompanyNumber(e.target.value)}
        />

        <label className="form-label loginlable mb-3">
          Country of Incorporation
        </label>

        <select
          className="form-select form-select-sm mb-3 boldOption"
          value={countryofIncorporation}
          onChange={(e) => setCountryofIncorporation(e.target.value)}
          required
        >
          <option className="" value="Country of Incorporation">
            Country of Incorporation
          </option>
          <option value="Netbanking">Netbanking</option>
          <option value="UPI">UPI</option>
          <option value="EWallet">EWallet</option>
          <option value="Cards">Cards</option>
        </select>

        <InputComp
          label="Main Contact Person 	"
          type="text"
          name="MainContactPerson"
          value={mainContactPerson}
          onChange={(e) => setMainContactPerson(e.target.value)}
        />
        <InputComp
          label="Main Contact Email Address 	"
          type="text"
          name="MainContactEmailAddress"
          value={mainContactEmailAddress}
          onChange={(e) => setMainContactEmailAddress(e.target.value)}
        />

        <div className="d-flex justify-content-start mt-3 mb-3">
          <button className="saveButton " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

// Solution Apply For ******______######

const SolutionsApplying = () => {
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  const [show4, setshow4] = useState(false);
  const [show5, setshow5] = useState(false);
  const [show6, setshow6] = useState(false);

  const hideshow = () => {
    setshow(!show);
  };
  const hideshow2 = () => {
    setshow2(!show2);
  };
  const hideshow3 = () => {
    setshow3(!show3);
  };
  const hideshow4 = () => {
    setshow4(!show4);
  };
  const hideshow5 = () => {
    setshow5(!show5);
  };
  const hideshow6 = () => {
    setshow6(!show6);
  };

  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [users3, setUsers3] = useState([]);
  const [users4, setUsers4] = useState([]);
  const [users5, setUsers5] = useState([]);
  const [users6, setUsers6] = useState([]);

  useEffect(() => {
    setUsers(checkboxData.china);
    setUsers2(checkboxData.india);
    setUsers3(checkboxData.indonesia);
    setUsers4(checkboxData.malaysia);
    setUsers5(checkboxData.thailand);
    setUsers6(checkboxData.vietnam);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const handleChange2 = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users2.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers2(tempUser);
    } else {
      let tempUser = users2.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers2(tempUser);
    }
  };
  const handleChange3 = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users3.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers3(tempUser);
    } else {
      let tempUser = users3.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers3(tempUser);
    }
  };
  const handleChange4 = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users4.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers4(tempUser);
    } else {
      let tempUser = users4.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers4(tempUser);
    }
  };
  const handleChange5 = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users5.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers5(tempUser);
    } else {
      let tempUser = users5.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers5(tempUser);
    }
  };
  const handleChange6 = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users6.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers6(tempUser);
    } else {
      let tempUser = users6.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers6(tempUser);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(users, users2, users3, users4, users5, users6);
  };

  return (
    <>
      <form action="" className="formBlock" onSubmit={onSubmit}>
        <h6 className="profileHeading">Solutions Applying For</h6>
        <label className="form-label loginlable mb-3 ">Country</label>

        <Accordion style={{ width: "300px" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div>Select one or more Country</div>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-2 w-100">
                    <input
                      type="checkbox"
                      className="mx-1"
                      name="allSelect"
                      checked={!users.some((user) => user?.isChecked !== true)}
                      onChange={handleChange}
                    />
                    China(CNY)
                  </div>
                  <span
                    className="p-2 flex-shrink-1"
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                    onClick={hideshow}
                  >
                    {show ? "-" : "+"}
                  </span>
                </div>

                {show ? (
                  <div className="borderlist d-flex flex-column mb-3 p-3">
                    {users.map((user, index) => {
                      return (
                        <>
                          <div
                            className="d-flex align-items-center mb-3"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              className="mx-1"
                              name={user.name}
                              checked={user?.isChecked || false}
                              onChange={handleChange}
                            />
                            <div>{user.name}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* india */}
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-2 w-100">
                    <input
                      type="checkbox"
                      className="mx-1"
                      name="allSelect"
                      checked={!users2.some((user) => user?.isChecked !== true)}
                      onChange={handleChange2}
                    />
                    India(INR)
                  </div>
                  <span
                    className="p-2 flex-shrink-1"
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                    onClick={hideshow2}
                  >
                    {show2 ? "-" : "+"}
                  </span>
                </div>

                {show2 ? (
                  <div className="borderlist d-flex flex-column mb-3 p-3">
                    {users2.map((user, index) => {
                      return (
                        <>
                          <div
                            className="d-flex align-items-center mb-3"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              className="mx-1"
                              name={user.name}
                              checked={user?.isChecked || false}
                              onChange={handleChange2}
                            />
                            <div>{user.name}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* Indonesia */}
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-2 w-100">
                    <input
                      type="checkbox"
                      className="mx-1"
                      name="allSelect"
                      checked={!users3.some((user) => user?.isChecked !== true)}
                      onChange={handleChange3}
                    />
                    Indonesia (IDR)
                  </div>
                  <span
                    className="p-2 flex-shrink-1"
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                    onClick={hideshow3}
                  >
                    {show3 ? "-" : "+"}
                  </span>
                </div>

                {show3 ? (
                  <div className="borderlist d-flex flex-column mb-3 p-3">
                    {users3.map((user, index) => {
                      return (
                        <>
                          <div
                            className="d-flex align-items-center mb-3"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              className="mx-1"
                              name={user.name}
                              checked={user?.isChecked || false}
                              onChange={handleChange}
                            />
                            <div>{user.name}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* malaysia */}
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-2 w-100">
                    <input
                      type="checkbox"
                      className="mx-1"
                      name="allSelect"
                      checked={!users4.some((user) => user?.isChecked !== true)}
                      onChange={handleChange4}
                    />
                    Malaysia (MYR)
                  </div>
                  <span
                    className="p-2 flex-shrink-1"
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                    onClick={hideshow4}
                  >
                    {show4 ? "-" : "+"}
                  </span>
                </div>

                {show4 ? (
                  <div className="borderlist d-flex flex-column mb-3 p-3">
                    {users4.map((user, index) => {
                      return (
                        <>
                          <div
                            className="d-flex align-items-center mb-3"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              className="mx-1"
                              name={user.name}
                              checked={user?.isChecked || false}
                              onChange={handleChange4}
                            />
                            <div>{user.name}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/*  Thailand (THB) */}
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-2 w-100">
                    <input
                      type="checkbox"
                      className="mx-1"
                      name="allSelect"
                      checked={!users5.some((user) => user?.isChecked !== true)}
                      onChange={handleChange5}
                    />
                    Thailand (THB)
                  </div>
                  <span
                    className="p-2 flex-shrink-1"
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                    onClick={hideshow5}
                  >
                    {show5 ? "-" : "+"}
                  </span>
                </div>

                {show5 ? (
                  <div className="borderlist d-flex flex-column mb-3 p-3">
                    {users5.map((user, index) => {
                      return (
                        <>
                          <div
                            className="d-flex align-items-center mb-3"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              className="mx-1"
                              name={user.name}
                              checked={user?.isChecked || false}
                              onChange={handleChange5}
                            />
                            <div>{user.name}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/*   Vietnam (VND)*/}
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-2 w-100">
                    <input
                      type="checkbox"
                      className="mx-1"
                      name="allSelect"
                      checked={!users6.some((user) => user?.isChecked !== true)}
                      onChange={handleChange6}
                    />
                    Vietnam (VND)
                  </div>
                  <span
                    className="p-2 flex-shrink-1"
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                    onClick={hideshow6}
                  >
                    {show6 ? "-" : "+"}
                  </span>
                </div>

                {show6 ? (
                  <div className="borderlist d-flex flex-column mb-3 p-3">
                    {users6.map((user, index) => {
                      return (
                        <>
                          <div
                            className="d-flex align-items-center mb-3"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              className="mx-1"
                              name={user.name}
                              checked={user?.isChecked || false}
                              onChange={handleChange6}
                            />
                            <div>{user.name}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="d-flex justify-content-start mt-3 mb-3">
          <button className="saveButton " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

//<>><><><>><><<><><><><<><> Director’s Info >>><<<<<<<>>>>><<<>>><<<>>><

const DirectorInfo = () => {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [fullName2, setFullName2] = useState("");
  const [dateOfBirth2, setDateOfBirth2] = useState("");
  const [nationality2, setNationality2] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form action="" className="formBlock mx-3" onSubmit={onSubmit}>
        <h6 className="profileHeading">Director’s Info</h6>

        <h6 className="form-subtitle">Director 1*</h6>

        <InputComp
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <InputComp
          label="Date of Birth 	"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <InputComp
          label="Nationality  	"
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        <hr className="hrstyle" />

        <h6 className="form-subtitle">Director 2 (Optional)</h6>
        <InputComp
          label="Full Name"
          type="text"
          value={fullName2}
          onChange={(e) => setFullName2(e.target.value)}
        />
        <InputComp
          label="Date of Birth 	"
          type="date"
          value={dateOfBirth2}
          onChange={(e) => setDateOfBirth2(e.target.value)}
        />
        <InputComp
          label="Nationality  	"
          type="text"
          value={nationality2}
          onChange={(e) => setNationality2(e.target.value)}
        />
        <div className="d-flex justify-content-start mt-3 mb-3">
          <button className="saveButton " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

//<>><><><>><><<><><><><<><> Shareholder Info >>><<<<<<<>>>>><<<>>><<<>>><

const ShareholderInfo = () => {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [fullName2, setFullName2] = useState("");
  const [dateOfBirth2, setDateOfBirth2] = useState("");
  const [nationality2, setNationality2] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form action="" className="formBlock mx-3" onSubmit={onSubmit}>
        <h6 className="profileHeading">Shareholder Info</h6>

        <div className="d-flex  align-items-center ">
          <p className="form-subtitle me-auto">Shareholder 1</p>
          <input type="checkbox" onChange={() => setIsChecked(!isChecked)} />
          <p className="samedirector mx-1 my-2">Same as Director</p>
        </div>

        <InputComp
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <InputComp
          label="Date of Birth 	"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <InputComp
          label="Nationality  	"
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        <hr className="hrstyle" />

        <h6 className="form-subtitle">Shareholder 2 (Optional)</h6>
        <InputComp
          label="Full Name"
          type="text"
          value={fullName2}
          onChange={(e) => setFullName2(e.target.value)}
        />
        <InputComp
          label="Date of Birth 	"
          type="date"
          value={dateOfBirth2}
          onChange={(e) => setDateOfBirth2(e.target.value)}
        />
        <InputComp
          label="Nationality  	"
          type="text"
          value={nationality2}
          onChange={(e) => setNationality2(e.target.value)}
        />
        <div className="d-flex justify-content-start mt-3 mb-3">
          <button className="saveButton " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

// <>><<><<><><><><><><><><><Business Info>><><><<><>><><>><>><>><><<>

const BusinessProfile = () => {
  const [website, setWebsite] = useState("");
  const [natureofbusiness, setNatureofbusiness] = useState("");
  const [estimatedMonthly, setEstimatedMonthly] = useState("");
  const [averageTicket, setAverageTicket] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form action="" className="formBlock mx-3" onSubmit={onSubmit}>
        <h6 className="profileHeading">Business Info</h6>
        <br />
        <InputComp
          label="Website / Processing URL"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <br />
        <InputComp
          label="Nature of Business 	"
          type="text"
          value={natureofbusiness}
          onChange={(e) => setNatureofbusiness(e.target.value)}
        />
        <br />
        <div className="mb-2">
          <label className="form-label loginlable ">
            Estimated Monthly Volume per Market (in USD)
          </label>
          <select
            className="form-select form-select-sm boldOption"
            value={estimatedMonthly}
            onChange={(e) => setEstimatedMonthly(e.target.value)}
          >
            <option value="Below 50000">Below 50000</option>
            <option value="50000 - 100000">50000 - 100000</option>
            <option value="100001 - 300000">100001 - 300000 </option>
            <option value="300001 - 500000">300001 - 500000 </option>
            <option value="500001 - 800000 ">500001 - 800000 </option>
            <option value="800001 and above">800001 and above </option>
          </select>
        </div>
        <br />
        <InputComp
          label="Average Ticket Size (in USD) 	"
          type="text"
          value={averageTicket}
          onChange={(e) => setAverageTicket(e.target.value)}
        />
        <br />
        <div className="d-flex justify-content-start mt-3 mb-3">
          <button className="saveButton " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const SettlementInfo = () => {
  const [settelmentInfo, setSettelmentInfo] = useState("");
  const [cryptoWallet, setCryptoWallet] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form action="" className="formBlock mx-3" onSubmit={onSubmit}>
        <h6 className="profileHeading">Settlement Info </h6>
        <br />
        <div className="mb-2">
          <label className="form-label loginlable ">Settelment Info</label>
          <select
            className="form-select form-select-sm boldOption"
            value={settelmentInfo}
            onChange={(e) => setSettelmentInfo(e.target.value)}
          >
            <option value="INR">INR</option>
            <option value="CNY">CNY</option>
            <option value="IDR">IDR</option>
            <option value="MYR">MYR</option>
            <option value="THB">THB</option>
            <option value="VND">VND </option>
          </select>
        </div>
        <br />
        <InputComp
          label="Crypto Wallet Address (Optional) 	"
          type="text"
          value={cryptoWallet}
          onChange={(e) => setCryptoWallet(e.target.value)}
        />
        <br />
        <div className="d-flex justify-content-start mt-3 mb-3">
          <button className="saveButton " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

//<><><><><><><><><><><><><><><> Keys><><><><><><><><><>

const Keys = () => {
  return (
    <>
      <div className="formBlock mx-3">
        <h6 className="profileHeading">Settlement Info </h6>
        <br />
        <br />
        <div className="d-flex ">
          <strong className="keyBlock mx-4">Merchant No: 62</strong>
          <strong className="keyBlock">Secret Key: fPFBKsaC</strong>
        </div>
      </div>
    </>
  );
};
//<><><><><><><><><><><><><><><> Download><><><><><><><><><>

const Download = () => {
  return (
    <>
      <div className="formBlock mx-3">
        <h6 className="profileHeading">Download Profile </h6>
        <br />
        <br />
        <div className="d-flex mx-4">
          <a href="hhh">Download</a>
        </div>
      </div>
    </>
  );
};

export default BusinessSetting;
