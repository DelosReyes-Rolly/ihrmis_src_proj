import React from "react";

import { BsCheckCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import dostLogo from "../../../assets/images/logo.png";
import ButtonComponent from "../../common/button_component/button_component.js";

export const SuccessEmailConfirmation = () => {
  let navigate = useNavigate();
  const { item } = useParams();
  return (
    <React.Fragment>
      <div className="success-email-confirm">
        <div style={{ margin: "30px", color: "rgb(92, 153, 92)" }}>
          <BsCheckCircle size="80px" />
        </div>
        <h1>You've Successfully Verified your Email!</h1>
        <div>
          <div>
            <ButtonComponent
              className="back-color"
              buttonName="Previous"
              onClick={() =>
                navigate(`/ihrmis/pds-applicant/form-page-one/${item}`)
              }
            />
          </div>
          <div>
            <ButtonComponent
              className="next-color"
              buttonName="Next step"
              onClick={() =>
                navigate(`/ihrmis/pds-applicant/form-page-two/${item}`)
              }
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const SentEmailConfirmation = () => {
  const { email } = useParams("email");
  return (
    <React.Fragment>
      <div className="success-email-confirm">
        {/* 
            //==========================================
            // PDS ON-210 MAIN HEADER
            //==========================================
        */}

        <div className="header-confirmation">
          <img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
          <h3>Department of Science and Technology</h3>
          <p>General Santos Avenue, Bicutan Taguig City</p> <br />
          <br />
          <h2>VERIFY YOUR EMAIL ACCOUNT TO CONTINUE</h2>
          <br />
          <br />
        </div>
        <div className="header-confirmation">
          <p>
            We sent a message to your email address: <strong> {email} </strong>{" "}
            <br />
            The confirmation email was sent from: recruitment@dost.gov.ph <br />
            <br />
            To complete your application, follow the link in the said email
            within 7 days. Application expires after 7 days if not verified and
            will be deleted, so you'll need to apply again. <br />
            <br />
            You should recieve a verification email within 20 minutes after
            submission. If you're not seeing it in your inbox, check out your
            Spam or Junk folder.
            <br />
            <br />
            If you didn't get our email or having trouble verifying your email
            account, please contact us at recruitment@dost.gov.ph with
            approriate subject line and make sure to describe things exactly as
            they appear on your screen.
            <br />
            <br />
            Thank you.
          </p>
        </div>

        {/* <div style={{ margin: "30px", color:"#4276A4"}}>
                    <FaPaperPlane size="80px"/>
                    </div>
                    <h1>We have sent you an email. Please login to your email and verify it.</h1>
                    <div> 
                </div>*/}
      </div>
    </React.Fragment>
  );
};

export const SubmitSuccess = () => {
  let history = useNavigate();
  const { item } = useParams();
  return (
    <React.Fragment>
      <div className="success-email-confirm">
        <div style={{ margin: "30px", color: "rgb(92, 153, 92)" }}>
          <BsCheckCircle size="80px" />
        </div>
        <h1>Successfully Submitted</h1>
        <div>
          <div>
            <ButtonComponent className="back-color" buttonName="Previous" />
          </div>
          <div>
            <ButtonComponent
              className="next-color"
              buttonName="Next step"
              onClick={() =>
                history.push(`/ihrmis/plantilla/form-page-three/${item}`)
              }
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
