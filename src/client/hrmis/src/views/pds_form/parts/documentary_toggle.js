import React, { useRef, useState } from "react";
import ToggleSwitchComponent from "../../common/toggle_switch_component/toggle_switch";

const DocumentaryToggle = (props) => {
  const file = useRef();
  const checkboxRef = useRef();
  const [checkedValue, setCheckedValue] = useState(false);
  const whenChecked = async () => {
    if (checkboxRef.current.checked == true) {
      file.current.click();
      setCheckedValue(true);
    } else setCheckedValue(false);
  };

  return (
    <div className="documentary-toggle">
      <div className="margin-right-1">
        <ToggleSwitchComponent
          checked={checkedValue}
          checkboxRef={checkboxRef}
          onClick={() => whenChecked()}
          name={props.togglename}
          onChange={props.onToggleChange}
        />

        <input
          ref={file}
          id={props.filename}
          type="file"
          name={props.filename}
          onChange={props.onFileChange}
          accept="application/pdf, application/zip"
          hidden
          multiple={true}
        />
      </div>
      <div>
        {checkedValue === false ? (
          <span>
            <span className="margin-right-1">{props.label}</span>
            {props.linkLabel && (
              <span>
                <a className="margin-right-1" href={props.link} target="_blank">
                  {props.linkLabel}
                </a>
              </span>
            )}
            <span className="invalid-response">{props.error}</span>
          </span>
        ) : (
          <span style={{ color: "blue" }}>
            <strong className="margin-right-1">{props.label}</strong>
            <span>
              <a href={props.link} target="_blank">
                {props.linkLabel}
              </a>
            </span>
            <span className="invalid-response">{props.error}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default DocumentaryToggle;
