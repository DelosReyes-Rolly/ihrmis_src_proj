import React from "react";

const CheckboxComponent = (props) => {
  return (
    <input
      className={props.className}
      name={props.name}
      checked={props.checked}
      value={props.value}
      onChange={props.onChange}
      type="checkbox"
    ></input>
  );
};

export const RadioComponent = (props) => {
  return (
    <input
      className={props.className}
      ref={props.ref}
      name={props.name}
      checked={props.checked}
      value={props.value}
      onChange={props.onChange}
      type="radio"
    ></input>
  );
};

export default CheckboxComponent;
