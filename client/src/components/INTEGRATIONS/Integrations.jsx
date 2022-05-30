import React from "react";
import { Grid } from "@mui/material";
import "./integrations.css";
function Integrations() {
  return (
    <>
      <h4 className="heading mx-2">Business Setting</h4>
      <Grid container  >
        <Grid item xs={12} className="integrationBox mx-3 ">
          <div className="p-3" style={{ width: "85%" }}>
            <h5 className="firstHeading">Integrations</h5>
            <p>
              By integrating with one or more third party services, you will be
              responsible for reviewing and understanding the terms and
              conditions associated with each third party service.
            </p>
            <p>
              Is there a third party service or integration you'd like to see?
              Let us know at
              <a href="sales@ubankconnect.com">sales@ubankconnect.com.</a>
            </p>
            <div className="secondBlock p-3">
              <div className="mb-4">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a href="h">INR API Deposite</a>
              </div>
              <div>
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a href="h">INR API Payout</a>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Integrations;
