import { useState } from "react";
import NavigationBar from "./navigation_bar";
import "./../../../helpers/sass/_submission_form.css";
import BreadcrumbConfig, {
  crumbThirdLevel,
} from "../../../router/breadcrumb_config";
import TableConsolidated from "./table_consolidated";
const Consolidated = ({}) => {
  const { getThirdLevel } = crumbThirdLevel();
  const [username] = useState(window.sessionStorage.getItem("user"));
  return (
    <div>
      <BreadcrumbConfig array={getThirdLevel(4)} />
      <div style={{ margin: 20 }}>
        <br />
        <NavigationBar />
        <div className="buttons">
          <select className="button-dropdown">
            <option value="2021-2023">2021-2023</option>
            <option value="2018-2020">2018-2020</option>
            <option value="2015-2017">2015-2017</option>
          </select>
          <select className="button-dropdown">
            <option value="" hidden>Office</option>
            <option value="0">All</option>
          </select>
          <select className="button-dropdown">
            <option value="" hidden>Development Activity</option>
            <option value="0">All</option>
          </select>
          <div className="left-button">
            <select className="button-dropdown">
                <option value="" hidden>All Group</option>
                <option value="0">All</option>
            </select> 
            <button className="circle-button" onclick="activateLasers()"> + </button>
            <button className="circle-button circle-butttonx" onclick="activateLasers()"> x </button>
          </div>
          <TableConsolidated />
        </div>
      </div>
    </div>
    
  );
};

export default Consolidated;
