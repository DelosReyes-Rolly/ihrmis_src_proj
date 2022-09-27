import { useState } from "react";
import NavigationBar from "./navigation_bar";
import "./../../../helpers/sass/_submission_form.css";
import BreadcrumbConfig, {
  crumbThirdLevel,
} from "../../../router/breadcrumb_config";
import Table from "./table";
const SubmissionView = ({}) => {
  const { getThirdLevel } = crumbThirdLevel();
  const [username] = useState(window.sessionStorage.getItem("user"));
  return (
    <div>
      <BreadcrumbConfig array={getThirdLevel(4)} />
      <div style={{ margin: 20 }}>
        <br />
        <NavigationBar />
        <div className="buttons">
          <button className="button" onclick="activateLasers()"> + Period</button>
          <select className="button-dropdown">
            <option value="2021-2023">2021-2023</option>
            <option value="2018-2020">2018-2020</option>
            <option value="2015-2017">2015-2017</option>
          </select>
          <select className="button-dropdown">
            <option value="" hidden>Status</option>
            <option value="0">All</option>
            <option value="1">In Preparation</option>
            <option value="2">For Revision</option>
            <option value="3">Recommendation</option>
            <option value="4">For Review</option>
            <option value="5">For Approval</option>
            <option value="6">Approved</option>
            <option value="7">Compiled/Received</option>
          </select>
          <Table />
        </div>
      </div>
    </div>
    
  );
};

export default SubmissionView;
