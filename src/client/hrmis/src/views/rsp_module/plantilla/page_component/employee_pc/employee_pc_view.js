import React, { useState } from "react";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import { employeeItemsBreadCramp } from "../../static/breadcramp_data";
import SearchComponent from "../../../../common/input_component/search_input/search_input";
import { employeeSelectFilter } from "../../static/filter_items";
import { employeeTableData } from "../../fake_data/table_data";
import { BsArrowUp } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router";

const EmployeePageComponentView = () => {
  const [toggleState, setToggleState] = useState(1);
  let navigate = useNavigate();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const pushToPdsForms = () => {
    navigate("/pds-applicant/");
  };

  const patternTabOne = (
    <React.Fragment>
      <div className="selector-buttons">
        <div className="selector-container">
          <span className="selector-span-1">
            <button>
              <MdAdd size="18" />
              <span>Employee</span>
            </button>
          </span>
          <span className="margin-left-1 selector-span-1">
            <select defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Filter By
              </option>
              {employeeSelectFilter.map((item, key) => {
                return (
                  <option className="options" key={key} value={item.value}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </span>
        </div>

        <div className="search-container">
          <span className="margin-right-1 selector-search-label">
            <label>Search</label>
          </span>
          <span>
            {" "}
            <SearchComponent placeholder="Search" />
          </span>
        </div>
      </div>

      <div className="plantilla-table">
        <div className="scrollable-div-table">
          <table id="custom-table">
            <thead>
              <tr className="fixed-label-table">
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Item No.
                </th>
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Position
                </th>
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Office
                </th>
                <th>
                  <button>
                    <BsArrowUp />
                  </button>{" "}
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {employeeTableData.map((data, key) => {
                return (
                  <tr className="trClass" key={key}>
                    <td>{data.itemNo}</td>
                    <td>{data.position}</td>
                    <td>{data.office}</td>
                    <td className="column-option">
                      <div className="inline-div-td-1">
                        {data.status}
                        <br />
                        {data.status.score}
                      </div>
                      <div className="inline-div-td-2"></div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="data-entry">
          Total of {employeeTableData.length} Entries
        </p>
      </div>
    </React.Fragment>
  );

  return (
    <div className="plantilla-view">
      <div className="container-plantilla">
        <BreadcrumbComponent list={employeeItemsBreadCramp} className="" />
      </div>

      <div className="tab-button">
        <button
          onClick={() => toggleTab(1)}
          className={toggleState === 1 ? "tab-tap tab-tap-activate" : "tab-tap"}
        >
          List of Employee
        </button>
        <button
          onClick={() => {
            toggleTab(2);
            pushToPdsForms();
          }}
          className={
            toggleState === 2
              ? "tab-tap tab-tap-activate margin-left-1"
              : "tab-tap margin-left-1"
          }
        >
          PDS Profile
        </button>
        <hr className="solid" />
      </div>

      {/* <div className={ toggleState === 1 ? "current-tab" : "show-none"}> */}
      {patternTabOne}
      {/* </div> */}

      {/* TAB SECOND NON REGULAR */}
      {/* <div className={toggleState === 2 ? "current-tab" : "show-none"}> */}
      {/* <PdsProfilePageComponentView/> */}
      {/* </div> */}
    </div>
  );
};

export default EmployeePageComponentView;
