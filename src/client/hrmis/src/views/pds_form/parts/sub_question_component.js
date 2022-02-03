//scss at _pds_profile.scss

import React from "react";

const SubQuestionComponent = (props) => {
  const formik = props.formik;
  return (
    <tr className="tr-shade-color">
      <td colSpan="9" className="td-sub-question">
        {props.subQuestion}
        {formik?.touched[props.name] && formik?.errors[props.name] ? (
          <span
            className="invalid-response error-position"
            style={{ marginLeft: "10px" }}
          >
            {formik?.errors[props.name]}
          </span>
        ) : null}
      </td>
      <td colSpan="3" className="td-yes-no">
        <div className="items-checkbox">
          <div className="checkbox-alignment">
            <input
              type="radio"
              name={props.name}
              value="1"
              checked={props.checked == 1}
              onChange={formik?.handleChange}
            />
            <span className="margin-left-1">Yes</span>
          </div>
          <div className="checkbox-alignment">
            <input
              type="radio"
              name={props.name}
              value="0"
              onChange={formik?.handleChange}
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
