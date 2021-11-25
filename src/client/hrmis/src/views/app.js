import { Outlet } from "react-router-dom";
import NavbarComponent from "./common/navbar_component/Navbar";
import SidebarComponent from "./common/sidebar_component/sidebar";
import FooterComponent from "./common/footer_components/Footer";

import React from "react";

const MainPageLayout = () => {
  return (
    <React.Fragment>
      <div className="App">
        <NavbarComponent />
        <div className="container">
          <div>
            <SidebarComponent />
          </div>
          <div className="positioning">
            <Outlet />
          </div>
        </div>
        <div>
          <FooterComponent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainPageLayout;
