import { useState } from "react";
import BreadcrumbConfig, {
  crumbSecondLevel,
} from "../../../router/breadcrumb_config";
const DashboardView = ({}) => {
  const { getSecondLevel } = crumbSecondLevel();
  const [username] = useState(window.sessionStorage.getItem("user"));
  return (
    <div>
      <BreadcrumbConfig array={getSecondLevel(1)} />
      <div style={{ margin: 20 }}>
        <div className="">
          Welcome <strong>{username}!</strong>
        </div>
        <br />
        <h1>Dashboard Views</h1>
      </div>
    </div>
  );
};

export default DashboardView;
