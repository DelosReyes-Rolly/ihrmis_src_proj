import React from "react";

const ButtonComponent = (props) => {
  return (
    <button
      className={`button-components ${props.className}`}
      form={props.form}
      onClick={props.onClick}
      type={props.type}
      style={{
        background: props.bgColor,
        color: props.color,
        border: props.border,
      }}
    >
      <span
        className="bc-logo-component"
        style={
          props.buttonLogoStart !== null
            ? { marginRight: "5px" }
            : { marginRight: "0px" }
        }
      >
        {props.buttonLogoStart}
      </span>
      <span className="bc-logo-component">{props.buttonName}</span>
      <span
        className="bc-logo-component"
        style={
          props.buttonLogoEnd !== null
            ? { marginLeft: "5px" }
            : { marginLeft: "0px" }
        }
      >
        {props.buttonLogoEnd}
      </span>
    </button>
  );
};

ButtonComponent.defaultProps = {
  buttonName: "Click Me",
};

export default ButtonComponent;
