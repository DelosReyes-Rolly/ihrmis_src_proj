import React from "react";
import dostLogo from "../../../assets/images/logo.png";
const DostHeader = () => {
  return (
    <React.Fragment>
      <div className="form-header">
        <img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
        <h3>Department of Science and Technology</h3>
        <p>General Santos Avenue, Bicutan Taguig City</p> <br />
        <br />
        <h2>PERSONAL DATA SHEET</h2>
        <br />
        <br />
      </div>

      <div style={{ fontSize: "small" }}>
        <p>
          <em>
            <strong>WARNING:</strong> Any misrepresentation made in Personal
            Data Sheet and the Work Experience Sheet shall cause the filing of
            administrative/criminal case/s against the person concerned
          </em>
        </p>
        <br />
        <p>
          READ THE <a href="#">GUIDE</a> BEFORE ACOMPLISHING THIS FORM DO NOT
          ABBREVIATE. Indicate N/A if not Applicable.
        </p>
      </div>
    </React.Fragment>
  );
};

export default DostHeader;
