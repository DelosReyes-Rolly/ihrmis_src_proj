import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../../../features/reducers/popup_response";

const SuccessResponseComponent = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className="succeed-response">
        <div className="title-success-response">
          <strong>{props.title}</strong>{" "}
          <span
            onClick={() => {
              dispatch(setSuccess(false));
            }}
          >
            <MdClose size="14px" />
          </span>
        </div>
        <div className="children-success-response">{props.children}</div>
      </div>
    </React.Fragment>
  );
};

SuccessResponseComponent.defaultProps = {
  children: "Action succeeded",
  title: "SUCCESS: Action Accepted!",
};

export default SuccessResponseComponent;
