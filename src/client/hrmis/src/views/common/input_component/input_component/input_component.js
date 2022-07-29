import React from "react";

const InputComponent = (props) => {
  return (
    <input
      style={props.style ?? { marginTop: "3px" }}
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      className={`input-component ${props.className}`}
      id={props.id}
      type={props.type}
      maxLength={props.maxLength}
      minLength={props.minLength}
      min={props.min}
      max={props.max}
      size={props.size}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      disabled={props.disabled}
      step={props.step}
      checked={props.checked}
    ></input>
  );
};

InputComponent.defaultProps = {
  type: "text",
  maxLength: 255,
  size: 999,
  className: "",
  placeholder: "",
  onchange: () => {},
  readOnly: false,
};

export default InputComponent;
