import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  NavLink,
} from "react-router-dom";

import LoaderComponent from "../views/common/loader_component/loader_component";
import FailResponseComponent from "../views/common/response_component/fail_response_component/fail_response_component";
import SuccessResponseComponent from "../views/common/response_component/success_response_component/success_response_component";
import MainPageLayout from "../views/app";
import DashboardView from "../views/rsp_module/dashboard/dashboard_view";
import LoginView from "../views/authentication/login_view";
import FourOfourPage from "../views/common/response_component/404_page/fourofour_page";
import MeetingOne from "../views/meeting_local/pages/meeting_one";
import StatusMonitoring from "../views/pm_module/major_final_output/pages/mfo_status_monitoring";

const MainRouter = () => {
  const isBusy = useSelector((state) => state.popupResponse.isBusy);
  const isSuccess = useSelector((state) => state.popupResponse.isSuccess);
  const isFail = useSelector((state) => state.popupResponse.isFail);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // if (window.sessionStorage.getItem('token') == null) navigate('/');
    if (window.sessionStorage.getItem("user_level") === "3") {
      if (!location.pathname.includes("/hrmpsb")) {
        navigate("/hrmpsb");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <React.Fragment>
      {isBusy && <LoaderComponent />}
      {isSuccess && <SuccessResponseComponent />}
      {isFail && <FailResponseComponent />}

      <Routes>
        {/* ===========================================
				AUTHENTICATION ROUTE IS DEFINED HERE
				===========================================
				*/}

        <Route exact path="/" element={<LoginView />} />

        {/* ===========================================
					RSP MODULE ROUTES ARE DEFINED HERE
					===========================================
				*/}

        <Route exact path="/rsp" element={<MainPageLayout />}>
          {/* RSP MODULE ROUTES */}
          <Route index element={<Navigate to="/rsp/dashboard" />} />
          <Route path="/rsp/dashboard" element={<DashboardView />} />
        </Route>
        {/* 	===========================================
					PDS ROUTES ARE DEFINED HERE																																																																																																																																																																																							                              ===========================================
				*/}

        {/* ===========================================
					PERFORMANCE MODULE ROUTES ARE DEFINED HERE
					===========================================
				*/}

      {/* <Route exact path="/performance" element={<MainPageLayout />}>
        <Route path="/performance/mfo-status-monitoring" element={<StatusMonitoring />} />
      </Route> */}

      <Route exact path="/performance">
        <Route path="/performance/mfo" element={<MainPageLayout />}>
          <Route path="/performance/mfo/status-monitoring" element={<StatusMonitoring />} />
        </Route>
      </Route>

      <Route exact path="/meeting-local" element={<MainPageLayout />}>
        <Route path="/meeting-local/meeting-one" element={<MeetingOne />} />
      </Route>

        {/* ===========================================
             		404 PAGE: WHEN ROUTES AREN'T DEFINE
            		===========================================
				*/}
        <Route
          path="*"
          element={
            <React.Fragment>
              <FourOfourPage />
            </React.Fragment>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default MainRouter;
