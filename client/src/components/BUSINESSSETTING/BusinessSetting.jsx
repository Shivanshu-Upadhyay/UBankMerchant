import React, { useState, useEffect } from "react";
import "./businessSetting.css";
import { Grid } from "@mui/material";
import { Accordion } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import axios from "axios";

import baseUrl from "../config/baseUrl.js";
import Aos from "aos";

function BusinessSetting() {
  const [comp, setComp] = useState(0);
  const [Token, setToken] = useState();
  let [message, setMessage] = useState("");

  const [SfullName, setSFullName] = useState();
  const [SdateOfBirth, setSDateOfBirth] = useState("");
  const [Snationality, setSNationality] = useState("");
  const [SfullName2, setSFullName2] = useState("");
  const [SdateOfBirth2, setSDateOfBirth2] = useState("");
  const [Snationality2, setSNationality2] = useState("");
  useEffect(() => {
    Aos.init();
    const token = localStorage.getItem("user");
    setToken(token);
  }, []);

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
              Download
            </li>
          </ul>
        </Grid>

        <Grid item xs={8} className="secondBlock" style={{ height: "37rem" }}>
          {comp === 0 ? (
            <CompanyProfile
              Token={Token}
              message={message}
              setMessage={setMessage}
            />
          ) : comp === 1 ? (
            <SolutionsApplying
              Token={Token}
              message={message}
              setMessage={setMessage}
            />
          ) : comp === 2 ? (
            <DirectorInfo
              Token={Token}
              message={message}
              setMessage={setMessage}
              SfullName={SfullName}
              setSFullName={setSFullName}
              SdateOfBirth={SdateOfBirth}
              setSDateOfBirth={setSDateOfBirth}
              Snationality={Snationality}
              setSNationality={setSNationality}
              SfullName2={SfullName2}
              setSFullName2={setSFullName2}
              SdateOfBirth2={SdateOfBirth2}
              setSDateOfBirth2={setSDateOfBirth2}
              Snationality2={Snationality2}
              setSNationality2={setSNationality2}
            />
          ) : comp === 3 ? (
            <ShareholderInfo
              Token={Token}
              message={message}
              setMessage={setMessage}
              SfullName={SfullName}
              setSFullName={setSFullName}
              SdateOfBirth={SdateOfBirth}
              setSDateOfBirth={setSDateOfBirth}
              Snationality={Snationality}
              setSNationality={setSNationality}
              SfullName2={SfullName2}
              setSFullName2={setSFullName2}
              SdateOfBirth2={SdateOfBirth2}
              setSDateOfBirth2={setSDateOfBirth2}
              Snationality2={Snationality2}
              setSNationality2={setSNationality2}
            />
          ) : comp === 4 ? (
            <BusinessProfile
              Token={Token}
              message={message}
              setMessage={setMessage}
            />
          ) : comp === 5 ? (
            <SettlementInfo
              Token={Token}
              message={message}
              setMessage={setMessage}
            />
          ) : comp === 6 ? (
            <Keys Token={Token} />
          ) : (
            <Download Token={Token} />
          )}
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}

// COMMON COMPONENTE ********^^^^^^_______+++++

const InputComp = ({ label, type, value, onChange, required = false }) => {
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
          required={required}
        />
      </div>
    </>
  );
};

// COMPANY PROFILE ******_____+++++++##@@@@@

const CompanyProfile = ({ Token }) => {
  const [companyName, setCompanyName] = useState("");
  const [tradingDoing, setTradingDoing] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [countryofIncorporation, setCountryofIncorporation] = useState("");
  const [mainContactPerson, setMainContactPerson] = useState("");
  const [mainContactEmailAddress, setMainContactEmailAddress] = useState("");
  const [country, setCountry] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("trading_dba", tradingDoing);
    formData.append("registered_address", registeredAddress);
    formData.append("company_registration_no", companyNumber);
    formData.append("country_of_incorporation", countryofIncorporation);
    formData.append("main_contact_person", mainContactPerson);
    formData.append("main_contact_email", mainContactEmailAddress);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    axios
      .post(`${baseUrl}/save-company-profile`, formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 1);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultBusinesSettingData`,
          formData,
          config
        );

        setCompanyName(data?.result?.bname);
        setTradingDoing(data?.result?.trading_dba);
        setRegisteredAddress(data?.result?.blocation);
        setCompanyNumber(data?.result?.busines_Code);
        setCountryofIncorporation(data?.result?.busines_Country);
        setMainContactPerson(data?.result?.fname + " " + data?.result?.lname);
        setMainContactEmailAddress(data?.result?.main_contact_email);
        setCountry(data?.country);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);
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
          required={true}
        />
        <InputComp
          label="Trading As / Doing Business As (DBA) 	"
          type="text"
          name="TradingDoingBusiness"
          value={tradingDoing}
          onChange={(e) => setTradingDoing(e.target.value)}
          required={true}
        />
        <InputComp
          label="Registered Address"
          type="text"
          name="RegisteredAddress"
          value={registeredAddress}
          onChange={(e) => setRegisteredAddress(e.target.value)}
          required={true}
        />
        <InputComp
          label="Company Number / Registration Number 	"
          type="text"
          name="CompanyNumberRegistrationNumber"
          value={companyNumber}
          onChange={(e) => setCompanyNumber(e.target.value)}
          required={true}
        />

        <label className="form-label loginlable mb-3">
          Country of Incorporation
        </label>

        <select
          className="form-select form-select-sm mb-3 boldOption"
          value={countryofIncorporation}
          onChange={(e) => setCountryofIncorporation(e.target.value)}
          required={true}
          style={{ border: "1px solid #ced4da" }}
        >
          <option className="" value="Country of Incorporation">
            Country of Incorporation
          </option>
          {country?.map((item, i) => (
            <option value={item.id} key={i}>
              {item.name + "-" + item.sortname}
            </option>
          ))}
        </select>

        <InputComp
          label="Main Contact Person 	"
          type="text"
          name="MainContactPerson"
          value={mainContactPerson}
          onChange={(e) => setMainContactPerson(e.target.value)}
          required={true}
        />
        <InputComp
          label="Main Contact Email Address 	"
          type="text"
          name="MainContactEmailAddress"
          value={mainContactEmailAddress}
          onChange={(e) => setMainContactEmailAddress(e.target.value)}
          required={true}
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


const SolutionsApplying = ({ Token, message, setMessage }) => {
  const [show, setshow] = useState(false);
  const [apiData, setApiData] = useState([]);
  
  const [solution_apply_for_country, setSolution_apply_for_country] = useState(
    []
  );
  const [mode_of_solution, setMode_of_solution] = useState([]);

  const selectAll = (e) => {
    if (e.target.checked) {
      setSolution_apply_for_country([
        ...solution_apply_for_country,
        e.target.value,
      ]);
    } else
      setSolution_apply_for_country(
        solution_apply_for_country.filter((item) => item !== e.target.value)
      );
  };

  const selectAll2 = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setMode_of_solution([...mode_of_solution, e.target.value]);
    } else
      setMode_of_solution(
        mode_of_solution.filter((item) => item !== e.target.value)
      );
  };
  

  useEffect(() => {
    Aos.init();
    const firstFetch = async () => {
      try {
        let formData = new FormData();
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const result = await axios.post(
          `${baseUrl}/solution-apply`,
          formData,
          config
        );

        setApiData(result?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 2);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultBusinesSettingData`,
          formData,
          config
        );

        setSolution_apply_for_country(data?.solution_apply_for_country);
        setMode_of_solution(data?.mode_of_solution);
      } catch (err) {
        console.log(err);
      }
    };
    Promise.all([fetchData(), firstFetch()]);
  }, [Token]);

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("solution_apply_for_country", solution_apply_for_country);
    formData.append("mode_of_solution", mode_of_solution);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    axios
      .post(`${baseUrl}/save-country-solution-apply`, formData, config)
      .then((response) => {
        console.log(response);
        setMessage((message = response.data.message));
        if (response.status === 200) {
          toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        onSubmit={onSubmit}
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <h6 className="logintext">Solutions Applying For</h6>
        <label className="form-label loginlable mb-3 ">Country</label>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Select one or more Country</Accordion.Header>
            <Accordion.Body>
              {apiData.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center p-2 w-100">
                        <input
                          type="checkbox"
                          className="mx-1"
                          name={item.name}
                          value={item.id}
                          onChange={selectAll}
                          checked={solution_apply_for_country.includes(
                            item.id + ""
                          )}
                        />
                        {item.name}
                      </div>
                      <span
                        className="p-2 flex-shrink-1"
                        style={{
                          cursor: "pointer",
                          fontWeight: "bolder",
                          fontSize: "20px",
                        }}
                        onClick={() => setshow(index)}
                      >
                        {show === index ? "-" : "+"}
                      </span>
                    </div>

                    {show === index ? (
                      <div className="borderlist d-flex flex-column mb-3 p-3">
                        {item.support_method.map((user, index) => {
                          return (
                            <div
                              className="d-flex align-items-center mb-3"
                              key={index}
                            >
                              <input
                                type="checkbox"
                                className="mx-1"
                                value={`${item.id}.${user.id}`}
                                onChange={selectAll2}
                                checked={mode_of_solution.includes(
                                  `${item.id}.${user.id}`
                                )}
                              />
                              <div>{user.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="d-flex  mt-3">
          <button className="Nextbtn2 " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

//<>><><><>><><<><><><><<><> Director’s Info <><><><><><><><><><><><><><><><><>

const DirectorInfo = ({
  setSFullName,
  setSDateOfBirth,
  setSNationality,
  setSFullName2,
  setSDateOfBirth2,
  setSNationality2,
  Token,
  message,
  setMessage,
}) => {
  const [director1_name, setFullName] = useState("");
  const [director1_dob, setDateOfBirth] = useState("");
  const [director1_nationality, setNationality] = useState("");
  const [director2_name, setFullName2] = useState("");
  const [director2_dob, setDateOfBirth2] = useState("");
  const [director2_nationality, setNationality2] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    setSFullName(director1_name);
    setSDateOfBirth(director1_dob);
    setSNationality(director1_nationality);
    setSFullName2(director2_name);
    setSDateOfBirth2(director2_dob);
    setSNationality2(director2_nationality);

    let formData = new FormData();
    formData.append("director1_name", director1_name);
    formData.append("director1_dob", director1_dob);
    formData.append("director1_nationality", director1_nationality);
    formData.append("director2_name", director2_name);
    formData.append("director2_dob", director2_dob);
    formData.append("director2_nationality", director2_nationality);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios
      .post(`${baseUrl}/save-director-info`, formData, config)
      .then((response) => {
        console.log(response);
        setMessage((message = response.data.message));
        if (response.status === 200) {
          toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
        toast.error("Fields not Matched", {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 3);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultBusinesSettingData`,
          formData,
          config
        );

        setFullName(data?.result?.director1_name);
        setDateOfBirth(data?.result?.director1_dob);
        setNationality(data?.result?.director1_nationality);
        setFullName2(data?.result?.director2_name);
        setDateOfBirth2(data?.result?.director1_dob);
        setNationality2(data?.result?.director2_nationality);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);
  return (
    <>
      <form
        action=""
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        onSubmit={onSubmit}
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <h6 className="logintext">Director’s Info</h6>
        <hr className="hrstyle" />

        <h6 className="director">Director 1</h6>

        <InputComp
          label="Full Name"
          type="text"
          value={director1_name}
          onChange={(e) => setFullName(e.target.value)}
          required={true}
        />
        <InputComp
          label="Date of Birth 	"
          type="date"
          value={director1_dob}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required={true}
        />
        <InputComp
          label="Nationality  	"
          type="text"
          value={director1_nationality}
          onChange={(e) => setNationality(e.target.value)}
          required={true}
        />
        <hr className="hrstyle" />

        <h6 className="director">Director 2</h6>
        <InputComp
          label="Full Name"
          type="text"
          value={director2_name}
          onChange={(e) => setFullName2(e.target.value)}
        />
        <InputComp
          label="Date of Birth 	"
          type="date"
          value={director2_dob}
          onChange={(e) => setDateOfBirth2(e.target.value)}
        />
        <InputComp
          label="Nationality  	"
          type="text"
          value={director2_nationality}
          onChange={(e) => setNationality2(e.target.value)}
        />

        <div className="d-flex  mt-3">
          <button className="Nextbtn2 ">Save</button>
        </div>
      </form>
    </>
  );
};

//<>><><><>><><<><><><><<><> Shareholder Info <><><><><><><><><><><><><><><>

const ShareholderInfo = ({
  SfullName,
  SdateOfBirth,
  Snationality,
  SfullName2,
  SdateOfBirth2,
  Snationality2,
  Token,
  message,
  setMessage,
}) => {
  let [shareholder1_name, setFullName] = useState("");
  let [shareholder1_dob, setDateOfBirth] = useState("");
  let [shareholder1_nationality, setNationality] = useState("");
  let [shareholder2_name, setFullName2] = useState("");
  let [shareholder2_dob, setDateOfBirth2] = useState("");
  let [shareholder2_nationality, setNationality2] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 4);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultBusinesSettingData`,
          formData,
          config
        );

        setFullName(data?.result?.shareholder1_name);
        setDateOfBirth(data?.result?.shareholder1_dob);
        setNationality(data?.result?.shareholder1_nationality);
        setFullName2(data?.result?.shareholder2_name);
        setDateOfBirth2(data?.result?.shareholder2_dob);
        setNationality2(data?.result?.shareholder2_nationality);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);

  const setinpiutFields = () => {
    if (isChecked === false) {
      setFullName((shareholder1_name = SfullName));
      setDateOfBirth((shareholder1_dob = SdateOfBirth));
      setNationality((shareholder1_nationality = Snationality));
      setFullName2((shareholder2_name = SfullName2));
      setDateOfBirth2((shareholder2_dob = SdateOfBirth2));
      setNationality2((shareholder2_nationality = Snationality2));
    } else {
      setFullName("");
      setDateOfBirth("");
      setNationality("");
      setFullName2("");
      setDateOfBirth2("");
      setNationality2("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("shareholder1_name", shareholder1_name);
    formData.append("shareholder1_dob", shareholder1_dob);
    formData.append("shareholder1_nationality", shareholder1_nationality);
    formData.append("shareholder2_name", shareholder2_name);
    formData.append("shareholder2_dob", shareholder2_dob);
    formData.append("shareholder2_nationality", shareholder2_nationality);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    axios
      .post(`${baseUrl}/save_shareholder_info`, formData, config)
      .then((response) => {
        console.log(response);
        setMessage((message = response.data.message));

        if (response.status === 200) {
          toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log("success");
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
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        onSubmit={onSubmit}
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <h6 className="logintext">Shareholder Info</h6>

        <hr className="hrstyle" />
        <div className="d-flex  align-items-center ">
          <p className="director me-auto">Shareholder 1</p>
          <input
            type="checkbox"
            onChange={() => setIsChecked(!isChecked)}
            onClick={setinpiutFields}
          />
          <p className="samedirector mx-1 my-2">Same as Director</p>
        </div>

        <InputComp
          label="Full Name"
          type="text"
          value={shareholder1_name}
          onChange={(e) => setFullName(e.target.value)}
          required={true}
        />
        <InputComp
          label="Date of Birth 	"
          type="date"
          value={shareholder1_dob}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required={true}
        />
        <InputComp
          label="Nationality  	"
          type="text"
          value={shareholder1_nationality}
          onChange={(e) => setNationality(e.target.value)}
          required={true}
        />
        <hr className="hrstyle" />

        <h6 className="director">Shareholder 2</h6>
        <InputComp
          label="Full Name"
          type="text"
          value={shareholder2_name}
          onChange={(e) => setFullName2(e.target.value)}
        />
        <InputComp
          label="Date of Birth"
          type="date"
          value={shareholder2_dob}
          onChange={(e) => setDateOfBirth2(e.target.value)}
        />
        <InputComp
          label="Nationality"
          type="text"
          value={shareholder2_nationality}
          onChange={(e) => setNationality2(e.target.value)}
        />

        <div className="d-flex  mt-3">
          <button className="Nextbtn2 ">Save</button>
        </div>
      </form>
    </>
  );
};

// <>><<><<><><><><><><><><><Business Info>><><><<><>><><>><>><>><><>

const BusinessProfile = ({ Token, message, setMessage }) => {
  const [company_website_processing_url, setWebsite] = useState("");
  const [company_nature_of_business, setNatureofbusiness] = useState("");
  const [company_estimated_monthly_volume, setEstimatedMonthly] = useState("");
  const [company_avarage_ticket_size, setAverageTicket] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 5);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultBusinesSettingData`,
          formData,
          config
        );

        setWebsite(data?.result?.website);
        setNatureofbusiness(data?.result?.job_title);
        setEstimatedMonthly(data?.result?.company_estimated_monthly_volume);
        setAverageTicket(data?.result?.company_avarage_ticket_size);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append(
      "company_website_processing_url",
      company_website_processing_url
    );
    formData.append("company_nature_of_business", company_nature_of_business);
    formData.append(
      "company_estimated_monthly_volume",
      company_estimated_monthly_volume
    );
    formData.append("company_avarage_ticket_size", company_avarage_ticket_size);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    axios
      .post(`${baseUrl}/save_business_info`, formData, config)
      .then((response) => {
        console.log(response);
        setMessage((message = response.data.message));

        if (response.status === 200) {
          console.log("success");
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
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        onSubmit={onSubmit}
      >
        <h6 className="logintext">Business Info </h6>

        <InputComp
          label="Website / Processing URL"
          type="url"
          value={company_website_processing_url}
          onChange={(e) => setWebsite(e.target.value)}
          required={true}
        />
        <InputComp
          label="Nature of Business 	"
          type="text"
          value={company_nature_of_business}
          onChange={(e) => setNatureofbusiness(e.target.value)}
          required={true}
        />

        <div className="mb-2">
          <label className="form-label loginlable ">
            Estimated Monthly Volume per Market (in USD)
          </label>
          <select
            className="form-select form-select-sm"
            value={company_estimated_monthly_volume}
            required={true}
            onChange={(e) => setEstimatedMonthly(e.target.value)}
          >
            <option value="">Please Select</option>
            <option value="1">Below 50000</option>
            <option value="2">50000 - 100000</option>
            <option value="3">100001 - 300000 </option>
            <option value="4">300001 - 500000 </option>
            <option value="5">500001 - 800000 </option>
            <option value="6">800001 and above </option>
          </select>
        </div>
        <InputComp
          label="Average Ticket Size (in USD) 	"
          type="text"
          value={company_avarage_ticket_size}
          onChange={(e) => setAverageTicket(e.target.value)}
          required={true}
        />

        <div className="d-flex  mt-3">
          <button className="Nextbtn2 " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const SettlementInfo = ({ Token, message, setMessage }) => {
  const [international_settelment_currency, setSettelmentInfo] = useState("");
  const [usdt_wallet_address, setCryptoWallet] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 6);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultBusinesSettingData`,
          formData,
          config
        );

        setSettelmentInfo(data?.result?.settle_currency);
        setCryptoWallet(data?.result?.wallet_url);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append(
      "international_settelment_currency",
      international_settelment_currency
    );
    formData.append("usdt_wallet_address", usdt_wallet_address);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    axios
      .post(`${baseUrl}/save_settelment_info`, formData, config)
      .then((response) => {
        console.log(response);
        setMessage((message = response.data.message));
        if (response.status === 200) {
          console.log("success");
          toast.success(message, {
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
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        onSubmit={onSubmit}
      >
        <h6 className="logintext">Company Profile </h6>

        <div className="mb-2">
          <label className="form-label loginlable ">Settelment Info</label>
          <select
            className="form-select form-select-sm"
            value={international_settelment_currency}
            onChange={(e) => setSettelmentInfo(e.target.value)}
          >
            <option value="">Please Select</option>
            <option value="INR">INR</option>
            <option value="CNY">CNY</option>
            <option value="IDR">IDR</option>
            <option value="MYR">MYR</option>
            <option value="THB">THB</option>
            <option value="VND">VND </option>
          </select>
        </div>
        <InputComp
          label="Crypto Wallet Address (Optional) 	"
          type="text"
          value={usdt_wallet_address}
          onChange={(e) => setCryptoWallet(e.target.value)}
        />

        <div className="d-flex  mt-3">
          <button className="Nextbtn2 " type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

//<><><><><><><><><><><><> Keys <><><><><><><><><><>

const Keys = ({ Token }) => {
  const [id, setId] = useState("");
  const [key, setKey] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("tab", 7);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        const { data } = await axios.post(
          `${baseUrl}/defaultBusinesSettingData`,
          formData,
          config
        );

        setId(data?.result?.id);
        setKey(data?.result?.secretkey);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Token]);
  return (
    <>
      <div className="formBlock mx-3">
        <h6 className="profileHeading">Settlement Info </h6>
        <br />
        <br />
        <div className="d-flex ">
          <strong className="keyBlock mx-4">Merchant No: {id}</strong>
          <strong className="keyBlock">Secret Key: {key}</strong>
        </div>
      </div>
    </>
  );
};
//<><><><><><><><><><> Download <><><><><><><><><>

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
