import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setBusy } from "../../../../features/reducers/loading_slice";
import { setFail } from "../../../../features/reducers/popup_response";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import TextAreaComponent from "../../../common/input_component/textarea_input_component/textarea_input_component";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";

const ThreeAddVoluntrayWorkModal = (props) => {
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

  // ===========================================================
  // SUBMIT HANDLER
  // ===========================================================
  const { renderFail, renderSuccess } = usePopUpHelper();
  const errorObj = useSelector((state) => state.error.objectError);
  const errorMsg = useSelector((state) => state.error.messageError);
  const submitHandler = async (e) => {
    e.preventDefault();
    await useAxiosRequestHelper
      .post(dataState, "/new-voluntary-work/", item)
      .then(() => {
        e.target.reset();
        dispatch(setMessageError(undefined));
        renderSuccess();
        props.onClose();
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

  useEffect(() => {
    console.log(props.data);
    setter({
      item: props.data ? props.data.vol_app_time : "",
      vol_app_org: props.data ? props.data.vol_app_org : "",
      vol_app_addr: props.data ? props.data.vol_app_addr : "",
      vol_app_from: props.data ? props.data.vol_app_from : "",
      vol_app_to: props.data ? props.data.vol_app_to : "",
      vol_app_hours: props.data ? props.data.vol_app_hours : "",
      vol_app_work: props.data ? props.data.vol_app_work : "",
    });
  }, [props.isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Voluntary Work"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onPressed={props.onPressed}
        onSubmit={submitHandler}
        onSubmitType="submit"
        onClose={props.onClose}
      >
        <div className="add-volwork-modal-container">
          {errorMsg && (
            <ValidationComponent title="FAILED TO SUBMIT">
              <p> {errorMsg} </p>
            </ValidationComponent>
          )}
          <br />

          <div className="first-type-div">
            <label>Name of Organization (write in full)</label>
            <span className="invalid-response">
              {errorObj ? errorObj.vol_app_org : ""}
            </span>
            <InputComponent
              name="vol_app_org"
              value={dataState.vol_app_org}
              onChange={(e) => singleInput(e)}
            />
          </div>

          <div className="first-type-div">
            <label>Address</label>
            <span className="invalid-response">
              {errorObj ? errorObj.vol_app_addr : ""}
            </span>
            <TextAreaComponent
              name="vol_app_addr"
              value={dataState.vol_app_addr}
              onChange={(e) => singleInput(e)}
            />
          </div>

          <div className="first-type-div">
            <label>
              <strong>INCLUSIVE DATES</strong>
            </label>
          </div>

          <div className="second-type-div">
            <div className="from">
              <label>From</label>
              <span className="invalid-response">
                {errorObj ? errorObj.vol_app_from : ""}
              </span>
              <InputComponent
                type="date"
                name="vol_app_from"
                value={dataState.vol_app_from}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div className="to">
              <label>To</label>
              <span className="invalid-response">
                {errorObj ? errorObj.vol_app_to : ""}
              </span>
              <InputComponent
                type="date"
                name="vol_app_to"
                value={dataState.vol_app_to}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>

          <div className="second-type-div">
            <div className="position">
              <label>Position/Nature of Work</label>
              <span className="invalid-response">
                {errorObj ? errorObj.vol_app_work : ""}
              </span>
              <InputComponent
                maxLenght="150"
                name="vol_app_work"
                value={dataState.vol_app_work}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div className="hours">
              <label>Number of Hours</label>
              <span className="invalid-response">
                {errorObj ? errorObj.vol_app_hours : ""}
              </span>
              <InputComponent
                maxLenght="3"
                name="vol_app_hours"
                value={dataState.vol_app_hours}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddVoluntrayWorkModal;
