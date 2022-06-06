import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setEmployee } from "../../../../../features/reducers/employee_slice";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { API_HOST } from "../../../../../helpers/global/global_config";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import { employeeItemsBreadCramp } from "../../static/breadcramp_data";
import { statusDisplay, svcStatusDisplay } from "../../static/display_option";
import EducationalTab from "./tab_educational";
import EligibilityTab from "./tab_eligibility";
import ExperienceTab from "./tab_experience";
import OtherTab from "./tab_other";
import PersonalTab from "./tab_personal";
import ReferenceTab from "./tab_reference";
import TrainingTab from "./tab_training";
import VoluntaryTab from "./tab_voluntary";

const getEmployeeInformation = async (id) => {
  let data;
  try {
    await axios.get(API_HOST + "get-single-employee/" + id).then((res) => {
      console.log(res.data.data);
      data = res.data.data;
    });
  } catch (error) {
    throw error;
  }
  return data;
};

const EmployeePds = () => {
  const { employee } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const { item } = useParams();

  const fetchEmployee = async () => {
    setEmployee();
    await getEmployeeInformation(item)
      .then((res) => dispatch(setEmployee(res)))
      .catch((err) =>
        popupAlert({
          message: err.response.message ?? err.message,
          type: ALERT_ENUM.fail,
        })
      );
  };
  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <React.Fragment>
      <BreadcrumbComponent list={employeeItemsBreadCramp} className="" />
      <div style={{ margin: "10px 20px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div style={{ border: "1px solid grey" }}>
            <img
              style={{ width: "200px", height: "200px", borderRadius: "5px" }}
              src={
                employee?.profile?.emp_photo !== ""
                  ? employee?.profile?.emp_photo
                  : "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              }
              alt="user image"
            />
          </div>
          <div
            style={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <h1>
              {employee?.emp_nm_last}, {employee?.emp_nm_first}{" "}
              {employee?.emp_nm_mid} {employee?.emp_nm_extn}
            </h1>
            <div className="default-table" style={{ margin: "0px" }}>
              <table className="table-design">
                <tbody>
                  <tr>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Employee No.
                    </th>
                    <td>{employee?.emp_no}</td>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Nature of Employment
                    </th>
                    <td>{statusDisplay[employee?.plantilla?.itm_status]}</td>
                  </tr>
                  <tr>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Position
                    </th>
                    <td>{employee?.plantilla?.tblpositions?.pos_title}</td>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Employee Status
                    </th>
                    <td>
                      {svcStatusDisplay[employee?.service_history?.svc_status]}
                    </td>
                  </tr>
                  <tr>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Office
                    </th>
                    <td>{employee?.plantilla?.tbloffices?.ofc_name}</td>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Years in DOST
                    </th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ margin: "20px 0px" }}>
          <TablistDisplay />
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeePds;

const TablistDisplay = () => {
  const [tabState, setStabState] = useState(1);

  const changeTabHandler = (tab_no) => {
    return setStabState(tab_no);
  };

  return (
    <React.Fragment>
      <ul
        style={{
          cursor: "pointer",
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          gap: 5,
        }}
      >
        {TAB_LIST.map((element, key) => {
          if (key === 0) {
            return (
              <li
                onClick={() => changeTabHandler(key + 1)}
                className={
                  "list-tab-style " + (key + 1 === tabState ? "blue-bg" : "")
                }
                style={{
                  borderRadius: "10px 0px 0px 10px",
                  padding: "13px 0px",
                  flexGrow: 1,
                  textAlign: "center",
                }}
                key={element.value}
              >
                {element.label}
              </li>
            );
          }

          if (key === TAB_LIST.length - 1) {
            return (
              <li
                onClick={() => changeTabHandler(key + 1)}
                className={
                  "list-tab-style " + (key + 1 === tabState ? "blue-bg" : "")
                }
                style={{
                  borderRadius: "0px 10px 10px 0px",
                  padding: "13px 0px",
                  flexGrow: 1,
                  textAlign: "center",
                }}
                key={element.value}
              >
                {element.label}
              </li>
            );
          }
          return (
            <li
              onClick={() => changeTabHandler(key + 1)}
              className={
                "list-tab-style " + (key + 1 === tabState ? "blue-bg" : "")
              }
              style={{
                padding: "13px 0px",
                flexGrow: 1,
                textAlign: "center",
              }}
              key={element.value}
            >
              {element.label}
            </li>
          );
        })}
      </ul>
      {tabState === 1 && <PersonalTab />}
      {tabState === 2 && <EducationalTab />}
      {tabState === 3 && <EligibilityTab />}
      {tabState === 4 && <ExperienceTab />}
      {tabState === 5 && <VoluntaryTab />}
      {tabState === 6 && <TrainingTab />}
      {tabState === 7 && <ReferenceTab />}
      {tabState === 8 && <OtherTab />}
    </React.Fragment>
  );
};

const TAB_LIST = [
  { value: 1, label: "Personal" },
  { value: 2, label: "Education" },
  { value: 3, label: "Eligibility" },
  { value: 4, label: "Experience" },
  { value: 5, label: "Voluntary" },
  { value: 6, label: "Training" },
  { value: 7, label: "Reference" },
  { value: 8, label: "Others" },
];
