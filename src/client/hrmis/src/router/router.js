import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  SentEmailConfirmation,
  SuccessEmailConfirmation,
} from "../views/pds_form/parts/previous_next";
import LoaderComponent from "../views/common/loader_component/loader_component";
import FailResponseComponent from "../views/common/response_component/fail_response_component/fail_response_component";
import FormPageFive from "../views/pds_form/parts/forms/form_page_five";
import FormPageFour from "../views/pds_form/parts/forms/form_page_four";
import FormPageOne from "../views/pds_form/parts/forms/form_page_one";
import FormPageSix from "../views/pds_form/parts/forms/form_page_six";
import FormPageThree from "../views/pds_form/parts/forms/form_page_three";
import FormPageTwo from "../views/pds_form/parts/forms/form_page_two";
import SuccessResponseComponent from "../views/common/response_component/success_response_component/success_response_component";
import MainPageLayout from "../views/app";
import DashboardView from "../views/rsp_module/dashboard/dashboard_view";
import PlantillaView from "../views/rsp_module/plantilla/plantilla_view";
import LibraryView from "../views/rsp_module/library/library_view";
import RecruitmentView from "../views/rsp_module/recruitment/recruitment_view";
import EmployeePageComponentView from "../views/rsp_module/plantilla/page_component/employee_pc/employee_pc_view";
import PlantillaItemPageComponentView from "../views/rsp_module/plantilla/page_component/plantilla_items_pc/plantilla_items";
import JvsCrwPageComponentView from "../views/rsp_module/plantilla/page_component/jvs_crw_pc/jvs_crw";
import CompensationView from "../views/rsp_module/compensation/compensation_view";
import RequestView from "../views/rsp_module/request/request_view";
import PlantillaVacantPageComponent from "../views/rsp_module/plantilla/page_component/plantilla_vacant_pc/plantilla_vacant_pc";
import LoginView from "../views/authentication/login_view";
import PlantillaItemInformation from "../views/rsp_module/plantilla/page_component/plantilla_item_info_pc/plantilla_item_info";
import FourOfourPage from "../views/common/response_component/404_page/fourofour_page";

const MainRouter = () => {
  const isBusy = useSelector((state) => state.popupResponse.isBusy);
  const isSuccess = useSelector((state) => state.popupResponse.isSuccess);
  const isFail = useSelector((state) => state.popupResponse.isFail);
  return (
    <React.Fragment>
      <div className="main-body">
        {isBusy && <LoaderComponent />}
        {isSuccess && <SuccessResponseComponent />}
        {isFail && <FailResponseComponent />}
        <BrowserRouter basename="/ihrmis">
          {/* basename="" */}
          <Routes>
            <Route exact path="/" element={<LoginView />} />
            <Route exact path="/rsp" element={<MainPageLayout />}>
              {/* RSP MODULE ROUTES */}
              <Route index element={<Navigate to="/rsp/dashboard" />} />
              <Route path="/rsp/dashboard" element={<DashboardView />} />

              <Route path="/rsp/plantilla" element={<PlantillaView />}>
                <Route
                  path="/rsp/plantilla/"
                  element={<EmployeePageComponentView />}
                />
                <Route
                  path="/rsp/plantilla/employee"
                  element={<EmployeePageComponentView />}
                />
                <Route
                  exact
                  path="/rsp/plantilla/plantilla-items"
                  element={<PlantillaItemPageComponentView />}
                />
                <Route
                  path="/rsp/plantilla/plantilla-items/jvs-crw"
                  element={<JvsCrwPageComponentView />}
                />

                <Route
                  path="/rsp/plantilla/plantilla-items/info/:item"
                  element={<PlantillaItemInformation />}
                />
              </Route>
              <Route
                exact
                path="/rsp/plantilla/plantilla-items/vacantpositions"
                element={<PlantillaVacantPageComponent />}
              />

              <Route path="/rsp/library" element={<LibraryView />} />

              <Route path="/rsp/jvs" element={<JvsCrwPageComponentView />} />

              <Route path="/rsp/recruitment" element={<RecruitmentView />} />

              <Route path="/rsp/request" element={<RequestView />} />

              <Route path="/rsp/compensation" element={<CompensationView />} />

              {/* OTHER MODULE ROUTES */}
            </Route>

            {/* PDS FORM APPLICANT ROUTES */}
            <Route path="/pds-applicant">
              <Route path="/pds-applicant">
                <Route
                  exact
                  path="/pds-applicant/form-page-one/:item"
                  element={<FormPageOne />}
                />
                <Route exact path="/pds-applicant/" element={<FormPageOne />} />
              </Route>

              <Route
                path="/pds-applicant/form-page-two/:item"
                element={<FormPageTwo />}
              />
              <Route
                path="/pds-applicant/form-page-three/:item"
                element={<FormPageThree />}
              />
              <Route
                path="/pds-applicant/form-page-four/:item"
                element={<FormPageFour />}
              />
              <Route
                path="/pds-applicant/form-page-five/:item"
                element={<FormPageFive />}
              />
              <Route
                path="/pds-applicant/form-page-six/:item"
                element={<FormPageSix />}
              />
              <Route
                path="/pds-applicant/email-confirmation/:email"
                element={<SentEmailConfirmation />}
              />
              <Route
                path="/pds-applicant/success-confirmation/:item"
                element={<SuccessEmailConfirmation />}
              />
            </Route>

            <Route
              path="*"
              element={
                <React.Fragment>
                  <FourOfourPage />
                </React.Fragment>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
};

export default MainRouter;
