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
        <BrowserRouter>
          <Routes>
            <Route exact path="/ihrmis" element={<MainPageLayout />}>
              {/* RSP MODULE ROUTES */}
              <Route index element={<Navigate to="/ihrmis/rsp/dashboard" />} />
              <Route path="/ihrmis/rsp/dashboard" element={<DashboardView />} />

              <Route path="/ihrmis/rsp/plantilla" element={<PlantillaView />}>
                <Route
                  path="/ihrmis/rsp/plantilla/"
                  element={<EmployeePageComponentView />}
                />
                <Route
                  path="/ihrmis/rsp/plantilla/employee"
                  element={<EmployeePageComponentView />}
                />
                <Route
                  exact
                  path="/ihrmis/rsp/plantilla/plantilla-items"
                  element={<PlantillaItemPageComponentView />}
                />
                <Route
                  path="/ihrmis/rsp/plantilla/plantilla-items/jvs-crw"
                  element={<JvsCrwPageComponentView />}
                />
              </Route>

              <Route path="/ihrmis/rsp/library" element={<LibraryView />} />

              <Route
                path="/ihrmis/rsp/recruitment"
                element={<RecruitmentView />}
              />

              <Route path="/ihrmis/rsp/request" element={<RequestView />} />

              <Route
                path="/ihrmis/rsp/compensation"
                element={<CompensationView />}
              />

              {/* OTHER MODULE ROUTES */}
            </Route>

            {/* PDS FORM APPLICANT ROUTES */}
            <Route path="/ihrmis/pds-applicant">
              <Route path="/ihrmis/pds-applicant">
                <Route
                  exact
                  path="/ihrmis/pds-applicant/form-page-one/:item"
                  element={<FormPageOne />}
                />
                <Route
                  exact
                  path="/ihrmis/pds-applicant/"
                  element={<FormPageOne />}
                />
              </Route>

              <Route
                path="/ihrmis/pds-applicant/form-page-two/:item"
                element={<FormPageTwo />}
              />
              <Route
                path="/ihrmis/pds-applicant/form-page-three/:item"
                element={<FormPageThree />}
              />
              <Route
                path="/ihrmis/pds-applicant/form-page-four/:item"
                element={<FormPageFour />}
              />
              <Route
                path="/ihrmis/pds-applicant/form-page-five/:item"
                element={<FormPageFive />}
              />
              <Route
                path="/ihrmis/pds-applicant/form-page-six/:item"
                element={<FormPageSix />}
              />
              <Route
                path="/ihrmis/pds-applicant/email-confirmation/:email"
                element={<SentEmailConfirmation />}
              />
              <Route
                path="/ihrmis/pds-applicant/success-confirmation/:item"
                element={<SuccessEmailConfirmation />}
              />
            </Route>
            <Route
              path="*"
              element={
                <React.Fragment>
                  <h1>404 Not Found</h1>
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
