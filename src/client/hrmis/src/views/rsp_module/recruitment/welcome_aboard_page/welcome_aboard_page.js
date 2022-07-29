import React from "react";
import dostLogo from "../../../../assets/images/logo.png";
import { IoIosSend } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { TiMessages } from "react-icons/ti";
import { outsiteWebHelper } from "../../../../router/outside_routes";
import GoogleMapReact from "google-map-react";

const WelcomeAboardPage = () => {
  return (
    <React.Fragment>
      <div>
        <AboardFirstPage />
      </div>
      <div>
        <AboardSecondPage />
      </div>
    </React.Fragment>
  );
};

export default WelcomeAboardPage;

const AboardFirstPage = () => {
  return (
    <React.Fragment>
      <div className="aboard_holder">
        <div className="aboard_page_container">
          <div className="header-container">
            <img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
            <p style={{ marginTop: "10px" }}>
              DEPARTMENT OF SCIENCE AND TECHNOLOGY
            </p>
            <span style={{ textAlign: "center" }}>
              General Santos Avenue, Bicutan, Taguig City, Metro Manila 1631
              Philippines
            </span>
            <span style={{ textAlign: "center" }}>
              Tel. No. (02) 8837-2071 to 82
            </span>
            <br />
          </div>
          <div className="body-container" style={{ marginTop: "30px" }}>
            <div>
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#004e87",
                }}
              >
                WELCOME ABOARD!
              </h1>
              <p>
                On behalf of all employees and the management, we could like to
                extend our warmest celcome and congratulations!
              </p>
              <br />
              <p>
                We are delighted to have you among us and looking forward to a
                mutually benificial relationship with you. Your skills would be
                of great use to the department and its success. We hope you find
                your new role rewarding and challenging.
              </p>
              <br />
              <p>
                For a start, we encourage you ti familiarize yourself with our
                organization. Below are a few things that will help you out in
                order to have a successful start, and be able to sign into your
                work email and join communication platform
              </p>
            </div>
            <div className="on-click-containers">
              <div className="div-click-container">
                <IoIosSend size={30} color={"#004e87"} />
                <div>
                  <p className="container-title">Get started</p>
                  <p className="container-content">
                    Get a quick tour around the different sections of the
                    resource page
                  </p>
                </div>
              </div>
              <div className="div-click-container">
                <HiUserGroup size={28} color={"#004e87"} />
                <div>
                  <p className="container-title">Join our workforce</p>

                  <p className="container-content">
                    Fill in form to request for an email and corporate account
                  </p>
                </div>
              </div>
              <div className="div-click-container">
                <TiMessages size={28} color={"#004e87"} />
                <div>
                  <p className="container-title">Start a converstion</p>
                  <p className="container-content">
                    If you have any questions, need some help, or just want to
                    say hello, you can drop us a message
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-aboard-container">
          <div>
            "We are commited to provide relevant science, technology and
            innovation (STI) services to the general public, government,
            academic and the private sector with the highest standards of
            quality within our capabilities and resources, according to customer
            and all applicable regulatory and statutory requirements, and
            continually improve the effectiveness of our Quality Management
            System (QMS) in order to meet customer satisfaction and
            organizational fullfillment"
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const AboardSecondPage = () => {
  const defaultProps = {
    center: {
      lat: 14.490234780697362,
      lng: 121.0490488570856,
    },
    zoom: 15,
  };

  return (
    <React.Fragment>
      <div className="aboard-page-2">
        <div className="page-two-container-body">
          <div className="body-1">
            <div>
              <h3>Regional Offices</h3>
              <ul>
                {REGIONALOFFICES.map((item) => {
                  return (
                    <li
                      onClick={() => outsiteWebHelper(item.link)}
                      key={item.id}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div></div>
          </div>
          <div className="body-2">
            <div>
              <h3>Sectoral Planning Councils</h3>
              <ul>
                {SPCOUNCILS.map((item) => {
                  return (
                    <li
                      onClick={() => outsiteWebHelper(item.link)}
                      key={item.id}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ marginTop: "15px" }}>
              <h3>Research and Development Institutes</h3>
              <ul>
                {RDINSTITUTES.map((item) => {
                  return (
                    <li
                      onClick={() => outsiteWebHelper(item.link)}
                      key={item.id}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ marginTop: "15px" }}>
              <h3>Scienctific and Technological Service Institutes</h3>
              <ul>
                {STSINSTITUTE.map((item) => {
                  return (
                    <li
                      onClick={() => outsiteWebHelper(item.link)}
                      key={item.id}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ marginTop: "15px" }}>
              <h3>Advisory Bodies</h3>
              <ul>
                {ABODIES.map((item) => {
                  return (
                    <li
                      onClick={() => outsiteWebHelper(item.link)}
                      key={item.id}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="body-3">
            <div style={{ width: "100%", height: "50%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCfvLZ7TfPHtlK5PkdsCdmlggTVwA98gFs",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
              >
                <AnyReactComponent
                  lat="14.490234780697362"
                  lng="121.0490488570856"
                  text="DOST"
                />
              </GoogleMapReact>
            </div>
          </div>
        </div>
        <div className="page-two-container-footer">
          <div style={{ color: "white", fontSize: "11px", padding: "10px" }}>
            &#169; 2020 DOST ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const REGIONALOFFICES = [
  {
    id: 1,
    label: "DOST National Capital Region (NCR)",
    link: "https://ncr.dost.gov.ph",
  },
  {
    id: 2,
    label: "DOST Cordillera Administrative Region (CAR)",
    link: "https://car.dost.gov.ph",
  },
  {
    id: 3,
    label: "DOST Region I",
    link: "https://region1.dost.gov.ph",
  },
  {
    id: 4,
    label: "DOST DOST Region II",
    link: "https://region2.dost.gov.ph",
  },
  {
    id: 5,
    label: "DOST DOST Region III",
    link: "https://region3.dost.gov.ph",
  },
  {
    id: 6,
    label: "DOST DOST Region IV-A (CALABARZON)",
    link: "https://region4a.dost.gov.ph",
  },
  {
    id: 7,
    label: "DOST DOST Region IV-B (MIMAROPA)",
    link: "https://region4b.dost.gov.ph",
  },
  {
    id: 8,
    label: "DOST Region V",
    link: "https://region5.dost.gov.ph",
  },
  {
    id: 9,
    label: "DOST Region VI",
    link: "https://region6.dost.gov.ph",
  },
  {
    id: 10,
    label: "DOST Region VII",
    link: "https://region7.dost.gov.ph",
  },
  {
    id: 11,
    label: "DOST Region VIII",
    link: "https://region8.dost.gov.ph",
  },
  {
    id: 12,
    label: "DOST Region IX",
    link: "https://region9.dost.gov.ph",
  },
  {
    id: 13,
    label: "DOST Region X",
    link: "https://region10.dost.gov.ph",
  },
  {
    id: 14,
    label: "DOST Region XI",
    link: "https://region11.dost.gov.ph",
  },
  {
    id: 15,
    label: "DOST Region XII",
    link: "https://region12.dost.gov.ph",
  },
  {
    id: 16,
    label: "DOST CARAGA REGION",
    link: "https://caraga.dost.gov.ph",
  },
  {
    id: 17,
    label: "DOST Autonomous Region in Muslim Mindanao (ARMM)",
    link: "https://armm.dost.gov.ph",
  },
];

const SPCOUNCILS = [
  {
    id: 1,
    link: "http://www.pcaarrd.dost.gov.ph",
    label:
      "Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development (PCAARRD)",
  },
  {
    id: 2,
    link: "https://www.pchrd.dost.gov.ph",
    label: "Philippine Council for Health Research and Development (PCHRD)",
  },
  {
    id: 3,
    link: "https://pcieerd.dost.gov.ph",
    label:
      "Philippine council for Industry, Energy and Emerging Technology Research and Development (PCIEERD)",
  },
];

const RDINSTITUTES = [
  {
    id: 1,
    link: "https://asti.dost.gov.ph",
    label: "Advance Science and Technology Institute (ASTI)",
  },
  {
    id: 2,
    link: "https://www.fnri.dost.gov.ph",
    label: "FOod and Nutrition Research Institute (FNRI)",
  },
  {
    id: 3,
    link: "https://fprdi.dost.gov.ph",
    label: "Forests Product Research and Development Institute (FPRDI)",
  },
  {
    id: 4,
    link: "https://itdi.dost.gov.ph",
    label: "Industrial Technology Development Institute (ITDI)",
  },
  {
    id: 5,
    link: "https://mirdc.dost.gov.ph",
    label: "Metal Industry Research and Development Center (MIRDC)",
  },
  {
    id: 6,
    link: "https://pnri.dost.gov.ph",
    label: "Philippine Nuclear Research Institute (PNRI)",
  },
  {
    id: 7,
    link: "https://ptri.dost.gov.ph",
    label: "Philippine Textile Research Institute (PTRI)",
  },
];

const STSINSTITUTE = [
  {
    id: 1,
    link: "https://www.pagasa.dost.gov.ph",
    label:
      "Philippine Atmospheric, Geophysical and Astronomical Services Administration (PAGASA)",
  },
  {
    id: 2,
    link: "https://www.phivolcs.dost.gov.ph",
    label: "Philippine Institute of Volcanology and Seismology (PHILVOLCS)",
  },
  {
    id: 3,
    link: "http://www.pshs.edu.ph",
    label: "Phlippine Science High School (PSHS) System",
  },
  {
    id: 4,
    link: "https://www.sei.dost.gov.ph",
    label: "Science Education Institute (SEI))",
  },
  {
    id: 5,
    link: "https://stii.dost.gov.ph",
    label: "Science and Technology Information Institute(STII)",
  },
  {
    id: 6,
    link: "http://www.tapi.dost.gov.ph",
    label: "Technology Application and Promotion (TAPI)",
  },
];

const ABODIES = [
  {
    id: 1,
    link: "https://www.nast.ph",
    label: "National Academy of Science and Technology (NAST)",
  },
  {
    id: 2,
    link: "https://nrcp.dost.gov.ph",
    label: "National Research Council of the Philippines (NRCP)",
  },
];
