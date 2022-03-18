import React from "react";

const TextAreaComponent = (props) => {
  return (
    <textarea
      style={{ marginTop: "3px" }}
      className="textarea-component"
      ref={props.ref}
      id={props.id}
      styles={props.styles}
      name={props.name}
      onChange={props.onChange}
      maxLength={props.maxLength}
      rows={props.row}
      placeholder={props.placeHolder}
      value={props.value}
      readOnly={props.readOnly}
    ></textarea>
  );
};

TextAreaComponent.defaultProps = {
  maxLength: 255,
  numRow: 1,
  placeHolder: "",
};

export default TextAreaComponent;
