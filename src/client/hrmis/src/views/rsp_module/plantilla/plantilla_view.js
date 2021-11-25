import React from "react";
import { Outlet } from "react-router";

const PlantillaView = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default PlantillaView;
