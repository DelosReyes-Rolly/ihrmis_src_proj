import React from "react";
import { IoMdAdd } from "react-icons/io";
import SearchComponent from "../search_input/search_input";

const InputComponent = (props) => {
  return (
    <input
      style={props.style}
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
      onFocus={props.onFocus}
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

export const InputIconComponent = ({
  name,
  onChange,
  value,
  icon = <IoMdAdd size={20} />,
  onClick,
  placeholder,
}) => {
  return <SearchComponent />;
};
