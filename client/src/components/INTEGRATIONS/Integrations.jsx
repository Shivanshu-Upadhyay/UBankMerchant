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
            <div className="secondBlock p-3 row">
              <div className="mb-4 col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a href="doc/Technical_Integration_Document_Bankconnect_INR_Deposit (1).pdf" download>INR API Deposite</a>
              </div>
              <div className="mb-4 col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a  href="Technical Integration Document Bankconnect_INR_Payout.pdf" download>INR API Payout</a>
              </div>
              <div className="mb-4 col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a  href="Technical Integration Document Bankconnect for SEA & CNY Updated.pdf" download>SEA & CNY Updated</a>
              </div>
              <div className="col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a  href="Technical Integration Document Bankconnect for Payout SEA_CNY Updated 1.3.pdf" download>Payout SEA_CNY Updated 1.3</a>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Integrations;
