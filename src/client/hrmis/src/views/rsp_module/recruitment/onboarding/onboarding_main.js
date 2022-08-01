import BreadcrumbComponent from "../../../common/breadcrumb_component/Breadcrumb";
import { OnboardingBreadCrumbs } from "../static/breadcramp_item";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import { FaGlobe } from "react-icons/fa";
import AccordionListComponent from "./onboarding_components/accordion_list_component";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchField,
  setSection,
} from "../../../../features/reducers/onboarding_slice";
import { GrDrag } from "react-icons/gr";
import { navigateResourceOnbording } from "../../../../router/outside_routes";
import IconComponent from "../../../common/icon_component/icon";
import { BsCalendar3RangeFill, BsCheckCircleFill } from "react-icons/bs";
import { ImPrinter } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import {
  OnboardingNewAppointeesTableContainer,
  OnboardingNewScheduleTableContainer,
} from "./onboarding_components/onboarding_tables";
import OnboardingSchedulModal from "./onboarding_components/onboarding_schedule_modal";

const OnboardingMain = () => {
  const { renderBusy } = usePopUpHelper();
  // const [sections, setSections] = useState([]);
  const { section } = useSelector((state) => state.onboarding);
  const dispatch = useDispatch();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      sec_onb_name: "",
    },
    validationSchema: Yup.object({
      sec_onb_name: Yup.string().required("This Field is Required"),
    }),
    onSubmit: async (value, { resetForm }) => {
      renderBusy(true);

      await axios
        .post(API_HOST + "add-onboarding-section", value)
        .then((res) => {
          dispatch(setSection(res.data.data));
          resetForm();
          popupAlert({
            message: "Section Saved successfully",
            type: ALERT_ENUM.success,
          });
          renderBusy(false);
        })
        .catch((err) => {
          popupAlert({
            message: err.message ?? "Error Try again Later",
            type: ALERT_ENUM.fail,
          });
          renderBusy(false);
        });
    },
  });

  const fetchOnBoarding = async () => {
    await axios
      .get(API_HOST + "get-all-onboarding-section")
      .then((res) => dispatch(setSection(res.data.data)))
      .catch((err) => console.log(err?.message));
  };

  const navigateOnboardingPage = () => {
    navigateResourceOnbording();
  };

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchOnBoarding();
  }, []);

  return (
    <React.Fragment>
      <div className="documents-view">
        <BreadcrumbComponent list={OnboardingBreadCrumbs} className="" />
        <div className="onboarding-page">
          <div className="regular-tab-component">
            <div className="reg-tab-container">
              <p className="reg-tab">Orientation Topics</p>
              <p className="reg-tab">Orientation Schedule</p>
            </div>
          </div>
          <hr className="solid" />
        </div>

        <div className="orientation-container">
          <div className="orientation-body">
            <div className="topic-container">
              <div className="topic-section-1">
                <InvisibleDragIcon>
                  <div>Section</div>
                </InvisibleDragIcon>
                <div onClick={navigateOnboardingPage}>
                  <IconComponent
                    toolTipId="onboarding"
                    textHelper="Open a new browser tab to display the onboarding resource page."
                    icon={<FaGlobe size={20} />}
                  />
                </div>
              </div>

              <InvisibleDragIcon>
                <div style={{ width: "100%" }}>
                  <InputIconComponent
                    name="sec_onb_name"
                    value={form.values.sec_onb_name}
                    onChange={form.handleChange}
                    onClick={form.handleSubmit}
                  />
                </div>
              </InvisibleDragIcon>

              <AccordionListComponent list={section} />
            </div>
            <div className="schedule-container">
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginBottom: "15px",
                  marginTop: "10px",
                }}
              >
                <div>
                  <OnboardingSchedulModal
                    isDisplay={openModal}
                    onClose={() => setOpenModal(false)}
                  />
                </div>

                <IconComponent
                  toolTipId="print"
                  textHelper="Generate the New Hire Orientation Checklist Report of selected appointees. Also applicable to appointees collected in schedule list."
                  icon={<ImPrinter size={20} />}
                />

                <IconComponent
                  toolTipId="calendar"
                  textHelper="Open a modal box (RC-201 #2) to schedule the onboarding/orientation of selected appointees. When schedule is selected, open the modal box (RC-201 #2) to edit the schedule."
                  icon={<BsCalendar3RangeFill size={20} />}
                  onClick={() => setOpenModal(true)}
                />

                <IconComponent
                  toolTipId="check"
                  textHelper="Mark onboarding of selected appointees as finished. Appointees who have already been onboarded are remove from the list. Also applicable to appointees collected in schedule list."
                  icon={<BsCheckCircleFill size={20} />}
                />
              </div>
              <div>
                <InputIconComponent
                  cursor="text"
                  onChange={(e) => dispatch(setSearchField(e.target.value))}
                  icon={<FiSearch size={20} />}
                />
              </div>
              <div>
                <OnboardingNewScheduleTableContainer />
                <br />
                <OnboardingNewAppointeesTableContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OnboardingMain;

const InputIconComponent = ({
  name,
  onChange,
  value,
  icon = <IoMdAdd size={20} />,
  onClick,
  cursor = "pointer",
}) => {
  const idInput = useRef();
  const onClickWhenCursorText = () => {
    idInput.current.focus();
  };
  return (
    <div className="div-input-with-symbol">
      <input ref={idInput} name={name} onChange={onChange} value={value} />
      <button
        type="submit"
        style={{ cursor: cursor }}
        onClick={cursor === "text" ? onClickWhenCursorText : onClick}
      >
        {icon}
      </button>
    </div>
  );
};

export const InvisibleDragIcon = ({ children, padding }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: padding ? padding : "0px 10px 0px 0px",
            opacity: 0,
          }}
        >
          <GrDrag size={30} color="gray" />
        </div>
        {children}
      </div>
    </React.Fragment>
  );
};
