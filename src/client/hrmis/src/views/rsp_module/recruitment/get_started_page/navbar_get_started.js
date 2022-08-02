import React from "react";
import { MdHome } from "react-icons/md";
import dostLogo from "../../../../assets/images/logo.png";

const NavbarGetStartedPage = () => {
  return (
    <div className="get-started-page-container">
      <div style={{ padding: "5px 0px" }}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div>
              <img src={dostLogo} style={{ height: "40px" }} />
            </div>
            <div style={{ color: "white", fontSize: "20px" }}>
              <strong>DEPARTMENT OF SCIENCE AND TECHNOLOGY</strong>
            </div>
          </div>
          {/* NAVIGATE HOME */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdHome color="white" size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarGetStartedPage;
