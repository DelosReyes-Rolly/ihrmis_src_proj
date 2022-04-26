import React from "react";
import { MdClose } from "react-icons/md";
import ButtonComponent from "../button_component/button_component.js.js";

const ModalComponent = (props) => {
  const modalViewFunction = () => {
    return (
      <div className="modal-component-div">
        {props.addElement}
        <form onSubmit={props.onSubmit}>
          <div className="mcf-header">
            <h3>{props.title}</h3>
            <button
              type="button"
              onClick={props.onClose}
              style={{
                padding: "0px",
                margin: "0px",
                background: "whitesmoke",
                border: "none",
              }}
            >
              <MdClose size="20px" />
            </button>
          </div>
          <hr style={{ border: "1px solid rgba(70, 70, 70, 0.1)" }} />
          <div className="mcf-body">{props.children}</div>
          <hr style={{ border: "1px solid rgba(70, 70, 70, 0.1)" }} />
          <div className="mcf-footer">
            {props.onPressedHidden ? (
              ""
            ) : (
              <div>
                <ButtonComponent
                  className={
                    props.onPressStyle ? props.onPressStyle : "ft-button "
                  }
                  type="button"
                  bgColor="rgb(230, 230, 230)"
                  border="1px solid rgba(70, 70, 70, 0.8)"
                  onClick={
                    props.onPressed != null ? props.onPressed : props.onClose
                  }
                  buttonName={props.onCloseName}
                />
              </div>
            )}
            {props.addExtraButton}
            <div className="">
              <ButtonComponent
                className={props.onSubStyle}
                type={props.onSubmitType}
                buttonName={props.onSubmitName}
                onClick={props.onClickSubmit ?? null}
              />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {props.isDisplay ? modalViewFunction() : null}
    </React.Fragment>
  );
};

ModalComponent.defaultProps = {
  title: "Title",
  isDisplay: false,
  onSubmitName: "Submit",
  onSubmitType: "button",
  onCloseName: "Close",
};

export default ModalComponent;
