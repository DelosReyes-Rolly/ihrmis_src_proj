import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../../../features/reducers/popup_response";

const SuccessResponseComponent = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.popupResponse);
  return (
    <React.Fragment>
      <div className="succeed-response">
        <div className="title-success-response">
          <strong>{message.title}</strong>{" "}
          <span
            onClick={() => {
              dispatch(setSuccess(false));
            }}
          >
            <MdClose size="14px" />
          </span>
        </div>
        <div className="children-success-response">{message.content}</div>
      </div>
    </React.Fragment>
  );
};

export default SuccessResponseComponent;
