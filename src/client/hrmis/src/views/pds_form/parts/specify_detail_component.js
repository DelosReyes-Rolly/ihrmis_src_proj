//scss at _pds_profile.scss
import React from "react";
import InputComponent from "../../common/input_component/input_component/input_component";

const SpecifyDetailComponents = (props) => {
  return (
    <div className="pds-prof-class-three">
      <div className="container-detail-1">{props.label}</div>

      {props.componentNo == 1 ? (
        <div className="container-detail-2">
          <InputComponent
            maxLenght="255"
            name={props.name}
            onChange={props.onChange}
            value={props.value}
          />
        </div>
      ) : (
        <div className="container-detail-3">
          <div className="case-status">
            <label>Date Filled</label>
            <InputComponent
              name={props.date_name}
              onChange={props.onChangeDate}
              value={props.date_value}
              type="date"
            />
          </div>
          <div className="case-status">
            <label>Status of Case/s</label>
            <InputComponent
              maxLenght="255"
              name={props.name}
              onChange={props.onChange}
              value={props.value}
            />
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
