import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setFail } from "../../../../features/reducers/popup_response";

const FailResponseComponent = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.popupResponse);
  return (
    <React.Fragment>
      <div className="fail-response">
        <div className="title-fail-response">
          <strong>{message?.title}</strong>{" "}
          <span onClick={() => dispatch(setFail(false))}>
            <MdClose size="14px" />
          </span>
        </div>
        <div className="children-fail-response">{message?.content}</div>
      </div>
    </React.Fragment>
  );
};

export default FailResponseComponent;
