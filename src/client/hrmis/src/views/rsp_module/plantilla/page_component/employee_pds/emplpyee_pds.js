import React, { useState } from "react";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import { employeeItemsBreadCramp } from "../../static/breadcramp_data";
import PersonalTab from "./personal_tab";

const EmployeePds = () => {
  return (
    <React.Fragment>
      <BreadcrumbComponent list={employeeItemsBreadCramp} className="" />
      <div style={{ margin: "10px 20px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div style={{ border: "1px solid grey" }}>
            <img
              style={{ width: "200px", height: "200px", borderRadius: "5px" }}
              src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
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
            <h1>Sean Terrence Calzada</h1>
            <div className="default-table" style={{ margin: "0px" }}>
              <table className="table-design">
                <tbody>
                  <tr>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Employee No.
                    </th>
                    <td></td>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Nature of Employment
                    </th>
                    <td></td>
                  </tr>
                  <tr>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Position
                    </th>
                    <td></td>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Employee Status
                    </th>
                    <td></td>
                  </tr>
                  <tr>
                    <th className="main-header" style={{ textAlign: "end" }}>
                      Office
                    </th>
                    <td></td>
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
                className="list-tab-style"
                style={{
                  borderRadius: "10px 0px 0px 10px",
                  padding: "13px 0px",
                  flexGrow: 1,
                  textAlign: "center",
                }}
                key={element.value}
                onClick={() => {
                  setStabState(key + 1);
                }}
              >
                {element.label}
              </li>
            );
          }

          if (key === TAB_LIST.length - 1) {
            return (
              <li
                className="list-tab-style"
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
              className="list-tab-style"
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
