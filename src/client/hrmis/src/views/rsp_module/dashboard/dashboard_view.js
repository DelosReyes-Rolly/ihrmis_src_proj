import React from "react";
import BreadcrumbConfig, {
  crumbSecondLevel,
} from "../../../router/breadcrumb_config";

const DashboardView = () => {
  const { getSecondLevel } = crumbSecondLevel();
  return (
    <React.Fragment>
      <BreadcrumbConfig array={getSecondLevel(1)} />
      <div className="dashborad-view">
        <div className="header-account-name">
          Welcome <strong>Jessica Moral!</strong>
        </div>
        <br />
      </div>
    </React.Fragment>
  );
};

export default DashboardView;
