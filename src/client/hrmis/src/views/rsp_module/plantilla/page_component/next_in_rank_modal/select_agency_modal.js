import React from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";

const SelectAgencyModal = ({ isDisplay, onClose }) => {
  return (
    <React.Fragment>
      <ModalComponent
        style={{ zIndex: "101" }}
        title="Select Agency"
        isDisplay={isDisplay}
        onClose={onClose}
        onPressedHidden={true}
        onSubmitName="Save"
      ></ModalComponent>
    </React.Fragment>
  );
};

export default SelectAgencyModal;
