import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import AOS from "aos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import baseUrl from "../config/baseUrl.js";
import CachedIcon from "@mui/icons-material/Cached";

function SignUp() {
  const [comp, setComp] = useState(0);
  const [Token, setToken] = useState();
  let [message, setMessage] = useState("");
  useEffect(() => {
    AOS.init();
  }, [comp]);

  console.log(Token);

  const InputComp = ({ label, type, value, onChange, required, pattern }) => {
    return (
      <>
        <div className="mb-3">
          <label className="form-label loginlable mb-3 ">{label}</label>
          <input
            type={type}
            className="form-control inputField2"
            placeholder={label}
            value={value}
            onChange={onChange}
            required={required}
            pattern={pattern}
          />
        </div>
      </>
    );
  };

  const RegisterDash = () => {
    const [email, setEmail] = useState("");
    const [confirm_email, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const onSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append("email", email);
      formData.append("confirm_email", confirm_email);
      formData.append("password", password);
      formData.append("confirm_password", confirm_password);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      axios
        .post(`${baseUrl}/register`, formData, config)
        .then((response) => {
          setMessage((message = response.data.message));
          console.log(response.data.data);
          setToken(response.data.data.token);
          console.log(response.data.message);

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
            setComp((pre) => pre + 1);
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
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          data-aos-easing="ease-in-out"
          onSubmit={onSubmit}
        >
          <h6 className="logintext">Register / Create Account</h6>
          <br />
          <InputComp
            label="Email"
            type="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required="required"
          />
          <InputComp
            label=" Confirm Email"
            type="email"
            name="ConfirmEmail"
            value={confirm_email}
            onChange={(e) => setConfirmEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required="required"
          />
          <InputComp
            label="Password"
            type="password"
            name="Password"
            value={password}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={(e) => setPassword(e.target.value)}
            required="required"
          />
          <InputComp
            label="Confirm Password"
            type="password"
            name="ConfirmPassword"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="mb-5">
            Note: Your password must be 8-20 characters long, contain letters
            and numbers, one of these special characters: "$@#^|!~=+-_." and
            must not conatin spaces.
          </div>
          <button className="next mt-2" type="submit">
            Next <i className="fa-solid fa-arrow-right" />
          </button>
        </form>
      </>
    );
  };

  const CompanyProfile = () => {
    const [company_name, setCompanyName] = useState("");
    const [trading_dba, setTradingDoing] = useState("");
    const [registered_address, setRegisteredAddress] = useState("");
    const [company_registration_no, setCompanyNumber] = useState("");
    const [country_of_incorporation, setCountryofIncorporation] = useState("");
    const [main_contact_person, setMainContactPerson] = useState("");
    const [main_contact_email, setMainContactEmailAddress] = useState("");
    const [countryName, setCountryName] = useState([]);

    useEffect(() => {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      };

      axios
        .post(`${baseUrl}/country-list`, formData, config)
        .then((res) => {
          setCountryName(res.data.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const onSubmit = async (e) => {
      e.preventDefault();

      let formData = new FormData();

      formData.append("company_name", company_name);
      formData.append("trading_dba", trading_dba);
      formData.append("registered_address", registered_address);
      formData.append("company_registration_no", company_registration_no);
      formData.append("country_of_incorporation", country_of_incorporation);
      formData.append("main_contact_person", main_contact_person);
      formData.append("main_contact_email", main_contact_email);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      };

      axios
        .post("http://localhost:9240/save-company-profile", formData, config)
        .then((response) => {
          console.log(response);
          setMessage((message = response.data.message));

          if (response.status === 200) {
            setComp((pre) => pre + 1);
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
          data-aos-easing="ease-in-out"
          onSubmit={onSubmit}
        >
          <h6 className="logintext">Company Profile</h6>

          <InputComp
            label="Company Name"
            type="text"
            name="CompanyName"
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
            required="required"
          />
          <InputComp
            label="Trading As / Doing Business As (DBA) 	"
            type="text"
            name="TradingDoingBusiness"
            value={trading_dba}
            onChange={(e) => setTradingDoing(e.target.value)}
            required="required"
          />
          <InputComp
            label="Registered Address"
            type="text"
            name="RegisteredAddress"
            value={registered_address}
            onChange={(e) => setRegisteredAddress(e.target.value)}
            required="required"
          />
          <InputComp
            label="Company Number / Registration Number 	"
            type="text"
            name="CompanyNumberRegistrationNumber"
            value={company_registration_no}
            onChange={(e) => setCompanyNumber(e.target.value)}
            required="required"
          />

          <label className="form-label loginlable mb-3">
            Country of Incorporation
          </label>

          <select
            className="form-select form-select-sm mb-3 boldOption overflow-auto"
            value={country_of_incorporation}
            onChange={(e) => setCountryofIncorporation(e.target.value)}
          >
            <option className="" value="">
              Country of Incorporation
            </option>
            {countryName.map((item, index) => {
              return (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <InputComp
            label="Main Contact Person 	"
            type="text"
            name="MainContactPerson"
            value={main_contact_person}
            onChange={(e) => setMainContactPerson(e.target.value)}
            required="required"
          />
          <InputComp
            label="Main Contact Email Address 	"
            type="text"
            name="MainContactEmailAddress"
            value={main_contact_email}
            onChange={(e) => setMainContactEmailAddress(e.target.value)}
            required="required"
          />

          <div className="d-flex justify-content-center mt-3">
            <button
              className=" back "
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2 " type="submit">
              Next
            </button>
          </div>
        </form>
      </>
    );
  };

  const [SfullName, setSFullName] = useState();
  const [SdateOfBirth, setSDateOfBirth] = useState("");
  const [Snationality, setSNationality] = useState("");
  const [SfullName2, setSFullName2] = useState("");
  const [SdateOfBirth2, setSDateOfBirth2] = useState("");
  const [Snationality2, setSNationality2] = useState("");

  const DirectorInfo = () => {
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
            setComp((pre) => pre + 1);
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
    return (
      <>
        <form
          action=""
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          onSubmit={onSubmit}
        >
          <h6 className="logintext">Director’s Info</h6>
          <hr className="hrstyle" />

          <h6 className="director">Director 1</h6>

          <InputComp
            label="Full Name"
            type="text"
            value={director1_name}
            onChange={(e) => setFullName(e.target.value)}
            required="required"
          />
          <InputComp
            label="Date of Birth 	"
            type="date"
            value={director1_dob}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required="required"
          />
          <InputComp
            label="Nationality  	"
            type="text"
            value={director1_nationality}
            onChange={(e) => setNationality(e.target.value)}
            required="required"
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

          <div className="d-flex justify-content-center mt-3">
            <button
              className=" back "
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2 ">Next</button>
          </div>
        </form>
      </>
    );
  };

  const ShareholderInfo = () => {
    let [shareholder1_name, setFullName] = useState("");
    let [shareholder1_dob, setDateOfBirth] = useState("");
    let [shareholder1_nationality, setNationality] = useState("");
    let [shareholder2_name, setFullName2] = useState("");
    let [shareholder2_dob, setDateOfBirth2] = useState("");
    let [shareholder2_nationality, setNationality2] = useState("");
    const [isChecked, setIsChecked] = useState(false);

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
            setComp((pre) => pre + 1);
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
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          onSubmit={onSubmit}
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
            required="required"
          />
          <InputComp
            label="Date of Birth 	"
            type="date"
            value={shareholder1_dob}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required="required"
          />
          <InputComp
            label="Nationality  	"
            type="text"
            value={shareholder1_nationality}
            onChange={(e) => setNationality(e.target.value)}
            required="required"
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

          <div className="d-flex justify-content-center mt-3">
            <button
              className=" back "
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2 ">Next</button>
          </div>
        </form>
      </>
    );
  };

  const SolutionsApplying = () => {
    const [show, setshow] = useState(false);
    const [apiData, setApiData] = useState([]);
    // const [isChecked, setIsChecked] = useState(false);
    const [solution_apply_for_country, setSolution_apply_for_country] =
      useState([]);
    const [mode_of_solution, setMode_of_solution] = useState([]);

    const selectAll = (e) => {
      setSolution_apply_for_country([
        ...solution_apply_for_country,
        e.target.value,
      ]);
    };

    const selectAll2 = (e) => {
      setMode_of_solution([...mode_of_solution, e.target.value]);
    };

    useEffect(() => {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      };

      axios
        .post(`${baseUrl}/solution-apply`, formData, config)
        .then((res) => {
          // console.log(res.data.data);
          let result = res.data.data;
          setApiData((pre) => (pre = result));
          console.log("im call");
        })
        .catch((err) => console.log(err));
    }, []);

    const handleChange = () => {
      console.log(solution_apply_for_country, mode_of_solution);
    };
    handleChange();

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
        .post(
          "http://localhost:9240/save-country-solution-apply",
          formData,
          config
        )
        .then((response) => {
          console.log(response);
          setMessage((message = response.data.message));
          if (response.status === 200) {
            setComp((pre) => pre + 1);
            console.log("Success");
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
          onSubmit={onSubmit}
        >
          <h6 className="logintext">Solutions Applying For</h6>
          <label className="form-label loginlable mb-3 ">Country</label>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Select one or more Country</Accordion.Header>
              <Accordion.Body>
                {apiData.map((item, index) => {
                  return (
                    <>
                      <div key={index}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center p-2 w-100">
                            <input
                              type="checkbox"
                              className="mx-1"
                              name={item.name}
                              value={item.id}
                              onChange={selectAll}
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
                                <>
                                  <div
                                    className="d-flex align-items-center mb-3"
                                    key={index}
                                  >
                                    <input
                                      type="checkbox"
                                      className="mx-1"
                                      value={`${item.id}.${user.id}`}
                                      onChange={selectAll2}
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
                    </>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="d-flex justify-content-center mt-3">
            <button
              className=" back "
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2 " type="submit">
              Next
            </button>
          </div>
        </form>
      </>
    );
  };

  const BusinessProfile = () => {
    const [company_website_processing_url, setWebsite] = useState("");
    const [company_nature_of_business, setNatureofbusiness] = useState("");
    const [company_estimated_monthly_volume, setEstimatedMonthly] =
      useState("");
    const [company_avarage_ticket_size, setAverageTicket] = useState("");
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
      formData.append(
        "company_avarage_ticket_size",
        company_avarage_ticket_size
      );

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
            setComp((pre) => pre + 1);
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
          className="logindash"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          onSubmit={onSubmit}
        >
          <h6 className="logintext">Company Profile</h6>

          <InputComp
            label="Website / Processing URL"
            type="url"
            value={company_website_processing_url}
            onChange={(e) => setWebsite(e.target.value)}
            required="required"
          />
          <InputComp
            label="Nature of Business 	"
            type="text"
            value={company_nature_of_business}
            onChange={(e) => setNatureofbusiness(e.target.value)}
            required="required"
          />

          <div className="mb-2">
            <label className="form-label loginlable ">
              Estimated Monthly Volume per Market (in USD)
            </label>
            <select
              className="form-select form-select-sm"
              value={company_estimated_monthly_volume}
              onChange={(e) => setEstimatedMonthly(e.target.value)}
            >
              <option value="">Please Select</option>
              <option value="Below 50000">Below 50000</option>
              <option value="50000 - 100000">50000 - 100000</option>
              <option value="100001 - 300000">100001 - 300000 </option>
              <option value="300001 - 500000">300001 - 500000 </option>
              <option value="500001 - 800000 ">500001 - 800000 </option>
              <option value="800001 and above">800001 and above </option>
            </select>
          </div>
          <InputComp
            label="Average Ticket Size (in USD) 	"
            type="text"
            value={company_avarage_ticket_size}
            onChange={(e) => setAverageTicket(e.target.value)}
            required="required"
          />

          <div className="d-flex justify-content-center mt-3">
            <button
              className=" back "
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2 " type="submit">
              Next
            </button>
          </div>
        </form>
      </>
    );
  };

  const SettlementInfo = () => {
    const [international_settelment_currency, setSettelmentInfo] = useState("");
    const [usdt_wallet_address, setCryptoWallet] = useState("");

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
            setComp(comp + 1);
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

          <div className="d-flex justify-content-center mt-3">
            <button className=" back " onClick={() => setComp(comp - 1)}>
              Back
            </button>
            <button className="Nextbtn2 " type="submit">
              Next
            </button>
          </div>
        </form>
      </>
    );
  };

  const QusAns = () => {
    const [question, setQuestion] = useState("");
    const [refreshNumber, setRefreshNumber] = useState(
      Math.floor(Math.random() * 10)
    );

    const [functionCallCount, setFunctionCallCount] = useState(0);
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [question_id1, setQuestionId1] = useState("");
    const [question_id2, setQuestionId2] = useState("");
    const [question_id3, setQuestionId3] = useState("");

    useEffect(() => {
      fetchQus();
    }, []);
    async function fetchQus() {
      try {
        let formData = new FormData();
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        let result = await axios.post(`${baseUrl}/qusAns`, formData, config);
        setQuestion(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    const handleSubmit = async () => {
      console.log(
        question_id1,
        answer1,
        question_id2,
        answer2,
        question_id3,
        answer3
      );
      try {
        let formData = new FormData();
        formData.append("answer1", answer1);
        formData.append("answer2", answer2);
        formData.append("answer3", answer3);
        formData.append("question_id1", question_id1);
        formData.append("question_id2", question_id2);
        formData.append("question_id3", question_id3);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        };
        let result = await axios.post(`${baseUrl}/qusAns`, formData, config);
        console.log(result.data);
        if (result.data.database) {
          console.log(result);
          setComp(comp + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const nextQusVal = (e) => {
      e.preventDefault();
      if (functionCallCount === 0) {
        setRefreshNumber(Math.floor(Math.random() * 10));
        setFunctionCallCount(1);
      } else if (functionCallCount === 1) {
        setRefreshNumber(Math.floor(Math.random() * 10));
        setFunctionCallCount(2);
      } else if (functionCallCount === 2) {
        handleSubmit();
      }
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
        >
          <h6 className="logintext">Secuirty Question For Forgot Password</h6>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label loginlable mb-3 ">
                {question[refreshNumber]?.question}
              </label>
              <div
                className="refreshIconButton mb-3"
                onClick={() => setRefreshNumber(Math.floor(Math.random() * 10))}
              >
                <CachedIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
            {functionCallCount === 0 ? (
              <input
                type="text"
                className="form-control inputField2"
                placeholder="Answer"
                value={answer1}
                onChange={(e) => {
                  setAnswer1(e.target.value);
                  setQuestionId1(question[refreshNumber]?.id);
                }}
              />
            ) : functionCallCount === 1 ? (
              <input
                type="text"
                className="form-control inputField2"
                placeholder="Answer"
                value={answer2}
                onChange={(e) => {
                  setAnswer2(e.target.value);
                  setQuestionId2(question[refreshNumber]?.id);
                }}
              />
            ) : (
              <input
                type="text"
                className="form-control inputField2"
                placeholder="Answer"
                value={answer3}
                onChange={(e) => {
                  setAnswer3(e.target.value);
                  setQuestionId3(question[refreshNumber]?.id);
                }}
              />
            )}
          </div>

          <div className="d-flex  mt-3 justify-content-around">
            <button
              className=" back "
              onClick={() => {
                setComp(comp - 1);
              }}
            >
              Back
            </button>
            <button className="Nextbtn2 " type="submit" onClick={nextQusVal}>
              Next
            </button>
            <button
              className="Nextbtn2 "
              type="submit"
              onClick={() => setComp(comp + 1)}
            >
              Skip
            </button>
          </div>
        </form>
      </>
    );
  };

  const EndPage = () => {
    return (
      <>
        <div className="lastPage">
          <div className="lastpageBlock">
            <h4 className="lastpagesucces">SUCCESS!</h4>
            <p className=" lastPcolor">
              Your registration and profile completed successfully. <br /> Your account
              is under review. Please contact on sales@ubankconnect.com if not
              activated within next 24 hours. <br />
              Mail sent on your registered email id, verify your email id if not
              verify.
            </p>
            <button className="lastloginbutton"> <Link to="/login"> Login</Link> </button>
            <div>
              <span> <b>Need Help ?</b> </span> <a href="https://ubankconnect.com/#contact">Contact Us</a>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="sighnContainer">
      <div className="row main">
        <header className="col-12 row ">
          <div className="col-6 ">
            <div className="ubank-logo">
              <img src="./imges/ubank.svg" alt="" className=" me-auto ubank" />
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <span className="text1">
              Have a UBank Connect account already ?
            </span>
            <Link to="/" className="button1">
              Log In
            </Link>
          </div>
        </header>

        <div className="col-12 secondblock container">
          {comp <= 7 ? (
            <div className="col-md-7 p-4">
              <img
                src="./imges/loginimg.svg"
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
          ) : null}

          <div className="col-md-5">
            {comp === 0 ? (
              <RegisterDash />
            ) : comp === 1 ? (
              <CompanyProfile />
            ) : comp === 2 ? (
              <SolutionsApplying />
            ) : comp === 3 ? (
              <DirectorInfo />
            ) : comp === 4 ? (
              <ShareholderInfo />
            ) : comp === 5 ? (
              <BusinessProfile />
            ) : comp === 6 ? (
              <SettlementInfo />
            ) : comp === 7 ? (
              <QusAns />
            ) : (
              <EndPage />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
