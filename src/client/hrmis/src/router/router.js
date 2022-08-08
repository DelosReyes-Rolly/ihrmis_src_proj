import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";
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
import RecruitmentView from "../views/rsp_module/recruitment/recruitment_view";
import RecruitmentBaseComponent from "../views/rsp_module/recruitment/page_components/recruitment_base_component";
import EmployeePageComponentView from "../views/rsp_module/plantilla/page_component/employee_pc/employee_pc_view";
import PlantillaItemPageComponentView from "../views/rsp_module/plantilla/page_component/plantilla_items_pc/plantilla_items";
import JvsCrwPageComponentView from "../views/rsp_module/plantilla/page_component/jvs_crw_pc/jvs_crw";
import CompensationView from "../views/rsp_module/compensation/compensation_view";
import RequestView from "../views/rsp_module/request/request_view";
import PlantillaVacantPageComponent from "../views/rsp_module/plantilla/page_component/plantilla_vacant_pc/plantilla_vacant_pc";
import LoginView from "../views/authentication/login_view";
import PlantillaItemInformation from "../views/rsp_module/plantilla/page_component/plantilla_item_info_pc/plantilla_item_info";
import FourOfourPage from "../views/common/response_component/404_page/fourofour_page";
import JvscrsForm from "../views/jvs_form/jvscrw_form";
import EmployeePds from "../views/rsp_module/plantilla/page_component/employee_pds/emplpyee_pds";
import LibraryOfficeView from "../views/library/office_page/parts/office_library_view";
import CategoryGroupsBaseComponent from "../views/library/category_groups_page/parts/categoryGroupsBaseComponent";
import HistoryServiceLibrary from "../views/library/history_service.js/history_service";
import DocumentRequirementsBase from "../views/library/documentary_requirements/parts/documentaryRequirementsBase";
import EvaluationBatteryBaseComponent from "../views/library/evaluation_battery/parts/evaluationBatteryBaseComponent";
import PositionLibrary from "../views/library/postion_page/position_library";
import RecruitmentComparativeMatrix from "../views/rsp_module/recruitment/recruitment_comparative_matrix/recruitment_comparative_matrix";
import FormSix from "../views/pds_form/parts/forms/form_six";
import UserAccountsBaseComponent from "../views/library/user_accounts/parts/user_accounts_base_component";
import HRMPSB from "../views/rsp_module/hrmpsb/hrmpsb_base_component";
import HRMPSBpositions from "../views/rsp_module/hrmpsb/parts/hrmpsb_open_positions";
import HRMPSBDetails from "../views/rsp_module/hrmpsb/parts/hrmpsb_details";
import HRMPSBEvaluation from "../views/rsp_module/hrmpsb/parts/hrmpsb_evaluation";
import OnboardingMain from "../views/rsp_module/recruitment/onboarding/onboarding_main";
import CalendarView from "../views/rsp_module/calendar/calendar_view";
import WelcomeAboardPage from "../views/rsp_module/recruitment/welcome_aboard_page/welcome_aboard_page";
import BackgroundCheckFormOne from "../views/pds_form/backgorund_check/forms/background_check_one";
import BackgroundCheckFormTwo from "../views/pds_form/backgorund_check/forms/background_check_two";
import BackgroundCheckFormThree from "../views/pds_form/backgorund_check/forms/background_check_three";
import BackgroundCheckThankYou from "../views/pds_form/backgorund_check/forms/background_check_thank_you";
import GetStartedPage from "../views/rsp_module/recruitment/get_started_page/get_start_page";
import JoinPageMainComponent from "../views/rsp_module/recruitment/join_page/join_page_main_component";
import JoinPageFormOne from "../views/rsp_module/recruitment/join_page/join_page_form_one";
import JoinPageFormTwo from "../views/rsp_module/recruitment/join_page/join_page_form_two";
import JoinPageFormThree from "../views/rsp_module/recruitment/join_page/join_page_form_three";
import JoinPageFormFour from "../views/rsp_module/recruitment/join_page/join_page_form_four";
import ContactUsPage from "../views/rsp_module/recruitment/contactus_page/contactus_page";

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
							path="/rsp/plantilla/employee/:item"
							element={<EmployeePds />}
						/>

						<Route
							exact
							path="/rsp/plantilla/plantilla-items"
							element={<PlantillaItemPageComponentView />}
						/>
						<Route
							path="/rsp/plantilla/plantilla-items/jvs-crw/:item"
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

					<Route path="/rsp/jvs" element={<JvsCrwPageComponentView />} />

					<Route
						exact
						path="/rsp/plantilla/plantilla-items/vacantpositions"
						element={<PlantillaVacantPageComponent />}
					/>

					<Route path="/rsp/jvs" element={<JvsCrwPageComponentView />} />

					<Route path="/rsp/recruitment" element={<RecruitmentView />}>
						<Route
							path="/rsp/recruitment/"
							element={<RecruitmentBaseComponent />}
						/>
						<Route
							path="/rsp/recruitment/comparative-matrix/:item"
							element={<RecruitmentComparativeMatrix />}
						/>
						<Route
							path="/rsp/recruitment/comparative-matrix/:item/:item2"
							element={<RecruitmentComparativeMatrix />}
						/>
					</Route>

					<Route path="/rsp/onboarding/" element={<OnboardingMain />}></Route>

					<Route path="/rsp/request" element={<RequestView />} />

					<Route path="/rsp/compensation" element={<CompensationView />} />

					<Route path="/rsp/calendar" element={<CalendarView />} />
				</Route>
				{/* 	===========================================
					PDS ROUTES ARE DEFINED HERE
																																																																																																																																																																																																																																		===========================================
				*/}
				<Route path="/background-check/">
					<Route
						exact
						path="/background-check/:reference/:applicant"
						element={<BackgroundCheckFormOne />}
					/>
					<Route
						exact
						path="/background-check/two/:reference/:applicant"
						element={<BackgroundCheckFormTwo />}
					/>
					<Route
						exact
						path="/background-check/three/:reference/:applicant"
						element={<BackgroundCheckFormThree />}
					/>
					<Route
						exact
						path="/background-check/thank-you"
						element={<BackgroundCheckThankYou />}
					/>
				</Route>

				<Route path="/applicant/:position" element={<FormPageOne />}></Route>
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
						path="/pds-applicant/applicant/:plantilla"
						element={<FormPageOne />}
					/>

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
						element={<FormSix />}
						// element={<FormPageSix />}
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

				{/* ===========================================
				JVS ROUTE IS DEFINED HERE
				===========================================
				*/}

				<Route path="/welcome_aboard" element={<WelcomeAboardPage />} />
				<Route path="/jvs-crw/:item" element={<JvscrsForm />} />
				<Route path="/get-start-page" element={<GetStartedPage />} />

				<Route path="/join-page" element={<JoinPageMainComponent />}>
					<Route path="/join-page/" element={<JoinPageFormOne />} />

					<Route path="/join-page/one/:item" element={<JoinPageFormOne />} />
					<Route path="/join-page/two/:item" element={<JoinPageFormTwo />} />
					<Route
						path="/join-page/three/:item"
						element={<JoinPageFormThree />}
					/>
					<Route path="/join-page/four/:item" element={<JoinPageFormFour />} />
				</Route>
				<Route path="/contact_us" element={<ContactUsPage />} />

				{/* ===========================================
			LIBRARY ROUTES ARE DEFINED HERE
			===========================================
		*/}
				<Route path="/library" element={<MainPageLayout />}>
					<Route index element={<Navigate to="/library/office/" />} />
					<Route path="/library/office/" element={<LibraryOfficeView />} />
					<Route
						path="/library/category-groups/"
						element={<CategoryGroupsBaseComponent />}
					/>
					<Route
						path="/library/documentary-requirements/"
						element={<DocumentRequirementsBase />}
					/>
					<Route
						path="/library/evaluation-battery/"
						element={<EvaluationBatteryBaseComponent />}
					/>
					<Route
						path="/library/position-csc-library"
						element={<PositionLibrary />}
					/>
					<Route
						path="/library/service-history"
						element={<HistoryServiceLibrary />}
					/>
					<Route
						path="/library/user-accounts"
						element={<UserAccountsBaseComponent />}
					/>
				</Route>
				<Route path="/hrmpsb" element={<HRMPSB />}>
					<Route path="/hrmpsb/" element={<HRMPSBpositions />}></Route>
					<Route
						path="/hrmpsb/details/:item"
						element={<HRMPSBDetails />}
					></Route>
					<Route
						path="/hrmpsb/evaluation/:item/:item2"
						element={<HRMPSBEvaluation />}
					></Route>
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
