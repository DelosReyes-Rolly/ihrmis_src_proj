//scss at _pds_profile.scss

import React from "react";

const SubQuestionComponent = (props) => {
  return (
    <tr className="tr-shade-color">
      <td colSpan="9" className="td-sub-question">
        {props.subQuestion}
        <span style={{ color: "red", marginLeft: "10px" }}>{props.error}</span>
      </td>
      <td colSpan="3" className="td-yes-no">
        <div className="items-checkbox">
          <div className="checkbox-alignment">
            <input
              type="radio"
              name={props.name}
              value="1"
              checked={props.checked == 1}
              onChange={props.onChange}
            />
            <span className="margin-left-1">Yes</span>
          </div>
          <div className="checkbox-alignment">
            <input
              type="radio"
              name={props.name}
              value="0"
              onChange={props.onChange}
              checked={props.checked == 0}
            />
            <span className="margin-left-1">No</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SubQuestionComponent;
