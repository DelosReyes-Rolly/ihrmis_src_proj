import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import LoaderComponent from "../views/common/loader_component/loader_component";
import FailResponseComponent from "../views/common/response_component/fail_response_component/fail_response_component";
import SuccessResponseComponent from "../views/common/response_component/success_response_component/success_response_component";
import MainPageLayout from "../views/app";
import DashboardView from "../views/rsp_module/dashboard/dashboard_view";
import LoginView from "../views/authentication/login_view";
import FourOfourPage from "../views/common/response_component/404_page/fourofour_page";
import MeetingOne from "../views/meeting_local/pages/meeting_one";
import DevelopmentPlan from "../views/learning/pages/development_plan";
import Submissions from "../views/learning/components/submissions";
import Consolidated from "../views/learning/components/consolidated";
import TeamDevelopmentPlan from "../views/learning/pages/team_development_plan";
import TeamDevelopment from "../views/learning/pages/team_development";
import IndividualDevelopmentPlan from "../views/learning/pages/individual_development_plan";
import IpcrPage from "../views/pm_module/pages/ipc_page";
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

        <Route exact path="/meeting-local" element={<MainPageLayout />}>
          <Route path="/meeting-local/meeting-one" element={<MeetingOne />} />
        </Route>

        <Route exact path="/learning" element={<MainPageLayout />}>
          <Route exact path="/learning/development/submissions" element={<Submissions/>} />
          <Route exact path="/learning/development/consolidated" element={<Consolidated />} />
          <Route exact path="/learning/development/teamdevelopmentplan" element={<TeamDevelopmentPlan/>} />
          <Route exact path="/learning/development/teamdevelopment" element={<TeamDevelopment/>} />
          <Route exact path="/learning/development/individualdevelopment" element={<IndividualDevelopmentPlan/>} />
        </Route>



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

        <Route exact path="/pm" element={<MainPageLayout />}>
          <Route path="/pm/ipcr-page" element={<IpcrPage />} />
        </Route>


        {/* <Route exact path="/module-name" element={<MainPageLayout />}>
          <Route path="/module-name/page-one" element={<PageOne />} />
        </Route> */}

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
