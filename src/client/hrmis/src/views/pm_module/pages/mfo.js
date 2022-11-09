import React from "react";
import { MfoButtonNavbar } from "../components/mfo_button_navbar";
import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import { mfoBreadCrumbList } from "../static/mfo_breadcrumb_data";
import { MfoTable } from "../components/mfo_table";

export const MFO = (props) => {
  return (
    <>
      <BreadcrumbComponent list={mfoBreadCrumbList} />
      <MfoButtonNavbar />
      {/* <MfoTable /> */}
    </>
  );
};
