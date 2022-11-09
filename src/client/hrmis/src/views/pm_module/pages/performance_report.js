import React from "react";
import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import { PerformanceReportButtonNavbar } from "../components/performance_report_button_navbar";
import { performReportBreadCrumbList } from "../static/mfo_breadcrumb_data";

export const PerformanceReport = () => {
  return (
    <>
      <BreadcrumbComponent list={performReportBreadCrumbList} />
      <PerformanceReportButtonNavbar />
    </>
  );
};
