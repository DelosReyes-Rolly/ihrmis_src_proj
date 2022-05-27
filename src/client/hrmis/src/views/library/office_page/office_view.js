import React from "react";
import { Outlet } from "react-router";

const OfficeView = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default OfficeView;
