import ModalComponent from "../../../../common/modal_component/modal_component";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../../../../helpers/global/global_config";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import TextareaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import {
  apiCategoryServiceModalInputItem,
  apiEmploymentBasisModalInputItem,
  apiEmploymentStatModalInputItem,
  apiLevelPositionModalInputItem,
  apiModeCreationModalInputItem,
} from "../../static/input_items";
import { useFormHelper } from "../../../../../helpers/use_hooks/form_helper";
import axios from "axios";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";

const AddPlantillaItemModal = (props) => {
  // ==========================================
  // ERROR HANDLING
  // ==========================================
  const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();

  // ==========================================
  // CUSTOM HOOKS
  // ==========================================
  const [dataToSubmit, setDataToSubmit, setHidden, setter] = useFormHelper();

  // ==========================================
  // REDUX STATE MANAGEMENT
  // ==========================================

  // ==========================================
  // SUBMIT HANDLER
  // ==========================================
  const submitHandler = async (e) => {
    e.preventDefault();
    renderBusy(true);
    await axios
      .post(API_HOST + "plantilla-items", dataToSubmit)
      .then(() => {
        e.target.reset();
        setter(null);
        renderSucceed();
      })
      .catch((err) => {
        renderFailed({});
        console.log(err.response);
      });
    renderBusy(false);
  };

  // ==========================================
  // GETTING POSITION AND OFFICE VALUE
  // ==========================================
  const [officePositionState, setOfficePositionState] = useState();

  const getPositionAndOffice = () => {
    axios
      .get(API_HOST + "office-position")
      .then((response) => {
        setOfficePositionState(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getPositionAndOffice();
    setHidden("itm_regular", props.regularValue);
  }, []);

  return (
    <React.Fragment>
      <ModalComponent
        title="Plantilla Items"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onSubmit={submitHandler}
        onSubmitType="submit"
        onClose={props.onClose}
      >
        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-1">
            <label>Item No.</label>
            <InputComponent
              name="itm_no"
              onChange={(e) => setDataToSubmit(e)}
              maxLength="30"
            />
          </span>
          <span className="right-input item-modal-2">
            <label>Employment Status</label>
            <SelectComponent
              name="itm_status"
              onChange={(e) => setDataToSubmit(e)}
              itemList={apiEmploymentStatModalInputItem}
            />
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-1">
            <label>Position</label>
            <select
              className="select-component"
              style={{ marginTop: "3px" }}
              name="itm_pos_id"
              onChange={(e) => setDataToSubmit(e)}
            >
              <option className="option-component" value="">
                Default
              </option>
              {officePositionState &&
                officePositionState.positions.map((item, key) => {
                  return (
                    <option
                      className="option-component"
                      key={key}
                      value={item.pos_id}
                    >
                      {item.pos_title}
                    </option>
                  );
                })}
            </select>
          </span>

          <span className="right-input item-modal-2">
            <label>Office</label>
            <select
              className="select-component"
              style={{ marginTop: "3px" }}
              name="itm_ofc_id"
              onChange={(e) => setDataToSubmit(e)}
            >
              <option className="option-component" value="">
                Default
              </option>
              {officePositionState &&
                officePositionState.offices.map((item, key) => {
                  return (
                    <option
                      className="option-component"
                      key={key}
                      value={item.ofc_id}
                    >
                      {item.ofc_name}
                    </option>
                  );
                })}
            </select>
          </span>
        </div>
        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-3">
            <label>Employment Basis</label>
            <SelectComponent
              name="itm_basis"
              onChange={(e) => setDataToSubmit(e)}
              itemList={apiEmploymentBasisModalInputItem}
            />
          </span>
          <span className="middle-input item-modal-3">
            <label>Category Service</label>
            <SelectComponent
              name="itm_category"
              onChange={(e) => setDataToSubmit(e)}
              itemList={apiCategoryServiceModalInputItem}
            />
          </span>
          <span className="right-input item-modal-4">
            <label>Level of Position</label>
            <SelectComponent
              name="itm_level"
              onChange={(e) => setDataToSubmit(e)}
              itemList={apiLevelPositionModalInputItem}
            />
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="item-modal-5">
            <label>Description of Position Function</label>
            <TextareaComponent
              name="itm_function"
              onChange={(e) => setDataToSubmit(e)}
              maxLength="255"
            />
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="left-input item-modal-2">
            <label>Mode of Creation</label>
            <SelectComponent
              name="itm_creation"
              onChange={(e) => setDataToSubmit(e)}
              itemList={apiModeCreationModalInputItem}
            />
          </span>
          <span className="right-input item-modal-1">
            <label>Source of Fund</label>
            <SelectComponent />
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="item-modal-5">
            <label>Position of Immediate Supervisor</label>
            <SelectComponent />
          </span>
        </div>

        <div className="add-plantilla-item-modal">
          <span className="item-modal-5">
            <label>Position of Next Higher Supervisor</label>
            <SelectComponent />
          </span>
        </div>
        <br />
      </ModalComponent>
    </React.Fragment>
  );
};

export default AddPlantillaItemModal;
