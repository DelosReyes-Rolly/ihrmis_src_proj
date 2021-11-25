import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import { setBusy } from "../../../../features/reducers/loading_slice";
import { setFail } from "../../../../features/reducers/popup_response";
import { API_HOST } from "../../../../helpers/global/global_config";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import TextAreaComponent from "../../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import { formThreeInput } from "../../static/input_items";

const ThreeAddInterventionModal = (props) => {
  // ===========================================================
  // CUSTOM HOOK SERVICE
  // ===========================================================
  const [dataState, singleInput, multiInput, setter] = useFormHelper();

  // ===================================
  // REDUX STATE AND FUNCIONALITIES
  // ===================================
  const dispatch = useDispatch();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();

  // ===================================
  // ERROR HANDLING STATE
  // ===================================
  const [serverErrorResponse, setServerErrorResponse] = useState();

  // ===========================================================
  // SUBMIT HANDLER
  // ===========================================================
  const { renderFail, renderSuccess } = usePopUpHelper();
  const errorObj = useSelector((state) => state.error.objectError);
  const errorMsg = useSelector((state) => state.error.messageError);
  const submitHandler = async (e) => {
    e.preventDefault();
    await useAxiosRequestHelper
      .post(dataState, "/new-training/", item)
      .then(() => {
        e.target.reset();
        props.onClose();
        dispatch(setMessageError(undefined));
        renderSuccess();
      })
      .catch((error) => {
        renderFail();
        if (typeof error === "object") {
          dispatch(setObjectError(error));
          dispatch(setMessageError("Unprocessable Entity"));
        } else {
          dispatch(setMessageError(error));
        }
      });
  };

  // ===========================================================
  // INIT STATE
  // ===========================================================
  useEffect(() => {
    console.log(props.data);
    setter({
      item: props.data ? props.data.trn_app_time : "",
      trn_app_title: props.data ? props.data.trn_app_title : "",
      trn_app_from: props.data ? props.data.trn_app_from : "",
      trn_app_to: props.data ? props.data.trn_app_to : "",
      trn_app_hours: props.data ? props.data.trn_app_hours : "",
      trn_app_type: props.data ? props.data.trn_app_type : "",
      trn_app_sponsor: props.data ? props.data.trn_app_sponsor : "",
      trn_app_cmptncy: props.data ? props.data.trn_app_cmptncy : "",
    });
  }, [props.isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Learning and Development Interventions"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onPressed={props.onPressed}
        onSubmit={submitHandler}
        onSubmitType="submit"
        onClose={props.onClose}
      >
        <div className="add-intervention-modal-container">
          {errorMsg && (
            <ValidationComponent title="FAILED TO SUBMIT">
              <p> {errorMsg} </p>
            </ValidationComponent>
          )}
          <br />

          <div className="first-type-div">
            <label>
              Title of Learning and DEvelopment Interventions/Training Programs
              (write in full)
            </label>
            <span className="invalid-response">
              {errorObj ? errorObj.trn_app_title : ""}
            </span>
            <InputComponent
              maxLenght="255"
              name="trn_app_title"
              value={dataState.trn_app_title}
              onChange={(e) => singleInput(e)}
            />
          </div>

          <div className="first-type-div">
            <label>
              <strong>INCLUSIVE DATES OF ATTENDANCE</strong>
            </label>
          </div>

          <div className="second-type-div">
            <div className="from">
              <label>From</label>
              <span className="invalid-response">
                {errorObj ? errorObj.trn_app_from : ""}
              </span>
              <InputComponent
                type="date"
                name="trn_app_from"
                value={dataState.trn_app_from}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div className="to">
              <label>To</label>
              <span className="invalid-response">
                {errorObj ? errorObj.trn_app_to : ""}
              </span>
              <InputComponent
                type="date"
                name="trn_app_to"
                value={dataState.trn_app_to}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>

          <div className="second-type-div">
            <div className="type">
              <label>Type of Learning and Development</label>
              <span className="invalid-response">
                {errorObj ? errorObj.add_training_type : ""}
              </span>
              <SelectComponent
                name="trn_app_type"
                itemList={formThreeInput.add_training_type}
                defaultTitle="Type"
                value={dataState.trn_app_type}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div className="hours">
              <label>Number of Hours</label>
              <span className="invalid-response">
                {errorObj ? errorObj.trn_app_hours : ""}
              </span>
              <InputComponent
                maxLenght="3"
                name="trn_app_hours"
                value={dataState.trn_app_hours}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>

          <div className="first-type-div">
            <label>Conducted/Sponsored bY (write in full)</label>
            <span className="invalid-response">
              {errorObj ? errorObj.trn_app_sponsor : ""}
            </span>
            <TextAreaComponent
              name="trn_app_sponsor"
              value={dataState.trn_app_sponsor}
              onChange={(e) => singleInput(e)}
            />
          </div>

          <div className="first-type-div">
            <label>Competency Addressed</label>
            <span className="invalid-response">
              {errorObj ? errorObj.trn_app_cmptncy : ""}
            </span>
            <InputComponent
              name="trn_app_cmptncy"
              value={dataState.trn_app_cmptncy}
              onChange={(e) => singleInput(e)}
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddInterventionModal;
