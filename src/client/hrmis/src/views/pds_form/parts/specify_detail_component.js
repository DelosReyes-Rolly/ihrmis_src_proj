//scss at _pds_profile.scss
import React from "react";
import InputComponent from "../../common/input_component/input_component/input_component";

const SpecifyDetailComponents = (props) => {
  const formik = props.formik;
  return (
    <div className="pds-prof-class-three">
      <div className="container-detail-1">{props.label}</div>

      {props.componentNo == 1 ? (
        <div className="container-detail-2">
          <InputComponent
            maxLenght="255"
            name={props.name}
            onChange={formik?.handleChange}
            value={formik?.values[props.name]}
          />
          {formik?.touched[props.name] && formik?.errors[props.name] ? (
            <span className="invalid-response error-position">
              {formik?.errors[props.name]}
            </span>
          ) : null}
        </div>
      ) : (
        <div className="container-detail-3">
          <div className="case-status">
            <label>Date Filled</label>
            <div>
              <InputComponent
                name={props.date_name}
                onChange={formik?.handleChange}
                value={formik?.values[props.date_value]}
                type="date"
              />
              {formik?.touched[props.date_name] &&
              formik?.errors[props.date_name] ? (
                <span className="invalid-response error-position">
                  {formik?.errors[props.date_name]}
                </span>
              ) : null}
            </div>
          </div>
          <div className="case-status">
            <label>Status of Case/s</label>
            <div>
              <InputComponent
                maxLenght="255"
                name={props.name}
                onChange={formik?.handleChange}
                value={formik?.values[props.name]}
              />
              {formik?.touched[props.name] && formik?.errors[props.name] ? (
                <span className="invalid-response error-position">
                  {formik?.errors[props.name]}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SpecifyDetailComponents.defaultProps = {
  componentNo: 1,
};

export default SpecifyDetailComponents;
