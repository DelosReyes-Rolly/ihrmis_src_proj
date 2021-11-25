import React from "react";
import { RadioComponent } from "../../common/input_component/checkbox_input_component/checkbox_input_component";

const CitizenshipFormOne = (props) => {
  return (
    <React.Fragment>
      <div style={{ marginBottom: "10px" }}>
        <RadioComponent
          name={props.name}
          value="1"
          checked={props.value == 1}
          onChange={props.onChange}
        />
        <span className="margin-left-1">Filipino</span>
      </div>
      <div className="checked-dropdown">
        <div className="checked-1">
          <RadioComponent
            name={props.name}
            value="0"
            checked={props.value == 0}
            onChange={props.onChange}
          />
          <span className="margin-left-1">Others</span>
        </div>
        <div className="checked-2">
          {props.display == 1 || props.display == null ? null : props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CitizenshipFormOne;
