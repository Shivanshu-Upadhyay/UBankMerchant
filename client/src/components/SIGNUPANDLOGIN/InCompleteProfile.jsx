import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import AOS from "aos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import axios from "axios";
import "./signup.css";
import { Link,useNavigate,useParams } from "react-router-dom";
import baseUrl from "../config/baseUrl.js";
function InCompleteProfile() {
  const [comp, setComp] = useState(0);
  const [Token, setToken] = useState();
  let [message, setMessage] = useState("");
  const navigatetologin = useNavigate();
   const { key } = useParams();
  useEffect(() => {
    AOS.init();
    setToken(key);
  }, [comp,key]);

 console.log(Token);

  const InputComp = ({ label, type, value, onChange,required=false }) => {
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
          />
        </div>
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
          setCountryName(data?.country);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [Token]);

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
        .post(`${baseUrl}/save-company-profile`, formData, config)
        .then((response) => {
          console.log(response);
          setMessage((message = response.data.message));

          if (response.status === 200) {
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
            required={true}
          />
          <InputComp
            label="Trading As / Doing Business As (DBA) 	"
            type="text"
            name="TradingDoingBusiness"
            value={trading_dba}
            onChange={(e) => setTradingDoing(e.target.value)}
            required={true}
          />
          <InputComp
            label="Registered Address"
            type="text"
            name="RegisteredAddress"
            value={registered_address}
            onChange={(e) => setRegisteredAddress(e.target.value)}
            required={true}
          />
          <InputComp
            label="Company Number / Registration Number 	"
            type="text"
            name="CompanyNumberRegistrationNumber"
            value={company_registration_no}
            onChange={(e) => setCompanyNumber(e.target.value)}
            required={true}
          />

          <label className="form-label loginlable mb-3">
            Country of Incorporation
          </label>

          <select
            className="form-select form-select-sm mb-3 boldOption overflow-auto"
            value={country_of_incorporation}
            required={true}
            onChange={(e) => setCountryofIncorporation(e.target.value)}
          >
            <option className="" value="Country of Incorporation">
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
            required={true}
          />
          <InputComp
            label="Main Contact Email Address 	"
            type="text"
            name="MainContactEmailAddress"
            value={main_contact_email}
            onChange={(e) => setMainContactEmailAddress(e.target.value)}
            required={true}
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
            setComp(comp + 1);
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
            setComp(comp + 1);
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
  const [solution_apply_for_country, setSolution_apply_for_country] = useState([]);
  const [mode_of_solution, setMode_of_solution] = useState([]);
    const hideshow = () => {
      setshow(!show);
    };

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
        .post(
          `${baseUrl}/save-country-solution-apply`,
          formData,
          config
        )
        .then((response) => {
          console.log(response);
          setMessage((message = response.data.message));
          if (response.status === 200) {
            setComp(comp + 1);
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
                            item.id +""
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
            setComp(comp + 1);
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
          <h6 className="logintext">Business Info</h6>

          <InputComp
            label="Website / Processing URL"
            type="text"
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
              <option value="0">Below 50000</option>
              <option value="1">50000 - 100000</option>
              <option value="2">100001 - 300000 </option>
              <option value="3">300001 - 500000 </option>
              <option value="4">500001 - 800000 </option>
              <option value="5">800001 and above </option>
            </select>
          </div>
          <InputComp
            label="Average Ticket Size (in USD) 	"
            type="text"
            value={company_avarage_ticket_size}
            onChange={(e) => setAverageTicket(e.target.value)}
            required={true}
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
            navigatetologin('/login')
            console.log("success");
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
          <h6 className="logintext">Settlement Info </h6>

          <div className="mb-2">
            <label className="form-label loginlable ">Settelment Info</label>
            <select
              className="form-select form-select-sm"
              value={international_settelment_currency}
              required={true}
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
              Finish
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <div className="sighnContainer">
        <div className="row main">
          <header className="col-12 row ">
            <div className="col-6 ">
              <div className="ubank-logo">
                <img
                  src="https://www.bankconnect.online/assets/ubankconnect/img/logo.svg"
                  alt=""
                  className="me-auto ubank"
                />
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <span className="text1">
                Have a UBank Connect account already ?
              </span>
              <Link to="/login" className="button1">
                Log In
              </Link>
            </div>
          </header>

          <div className="col-12 secondblock container">
            <div className="col-md-7 p-4">
              <img
                src="https://www.bankconnect.online/assets/ubankconnect/images/undraw_profile_data_re_v81r.svg
vg"
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
              ) : (
                <SettlementInfo />
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default InCompleteProfile