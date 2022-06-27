import React, { useState } from "react";
import BreadcrumbComponent from "../../../common/breadcrumb_component/Breadcrumb.js";
import { libraryOfficeBreadCrumbs } from "../../../rsp_module/plantilla/static/breadcramp_data.js";
import OfficeLibraryTable from "./officeLibraryTable.js";
import AgencyLibraryTable from "./agencyLibraryTable.js";

const LibraryOfficeView = ({}) => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  // const { globalFilter } = state;
  return (
    <div>
      <BreadcrumbComponent list={libraryOfficeBreadCrumbs} className="" />
      <div className="container-vacant-position">
        <div className="regular-tab-component">
          <div className="reg-tab-container ">
            <button
              onClick={() => toggleTab(1)}
              className={toggleState === 1 ? "reg-tab-activate" : "reg-tab"}
            >
              Offices
            </button>
            <button
              onClick={() => toggleTab(2)}
              className={toggleState === 2 ? "reg-tab-activate" : "reg-tab"}
            >
              Agencies
            </button>
          </div>
        </div>
        <hr className="solid" />
      </div>
      <div>{toggleState === 1 && <OfficeLibraryTable />}</div>
      <div>{toggleState === 2 && <AgencyLibraryTable />}</div>
    </div>
  );
};

export default LibraryOfficeView;
