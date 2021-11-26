import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";

const ThreeAddCivilServiceModal = (props) => {
  // ===========================================================
  // CUSTOM HOOK SERVICE
  // ===========================================================
  const [dataState, singleInput, multiInput, setter] = useFormHelper();
  const { renderFail, renderSuccess } = usePopUpHelper();

  // ===================================
  // REDUX TOOLKIT
  // ===================================
  let dispatch = useDispatch();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();

  // ===================================
  // ERROR HANDLING STATE
  // ===================================
  const errorObj = useSelector((state) => state.error.objectError);
  const errorMsg = useSelector((state) => state.error.messageError);
  // ===========================================================
  // SUBMIT HANDLER
  // ===========================================================

  const submitHandler = async (e) => {
    e.preventDefault();
    await useAxiosRequestHelper
      .post(dataState, "new-csc-eleigibility", item)
      .then(() => {
        props.onClose();
        dispatch(setMessageError(undefined));
        renderSuccess();
      })
      .catch((error) => {
        console.log(error);
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
    setter({
      item: props.data ? props.data.cse_app_time : "",
      cse_app_title: props.data ? props.data.cse_app_title : "",
      cse_app_date: props.data ? props.data.cse_app_date : "",
      cse_app_place: props.data ? props.data.cse_app_place : "",
      cse_app_rating: props.data ? props.data.cse_app_rating : "",
      cse_app_license: props.data ? props.data.cse_app_license : "",
      cse_app_validity: props.data ? props.data.cse_app_validity : "",
    });
  }, [props.isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Civil Service Eligibility"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onSubmit={submitHandler}
        onSubmitType="submit"
        onPressed={props.onPressed}
        onClose={props.onClose}
      >
        <div className="add-csc-modal-container">
          {errorMsg && (
            <ValidationComponent title="FAILED TO SUBMIT">
              <p> {errorMsg} </p>
            </ValidationComponent>
          )}
          <br />

          <div className="first-type-div">
            <label>
              Career Service/RA 1080 (Board Bar) Under Special Law/ CES/ CSEE
              Barangay Eligibility, Driver's License
            </label>
            <span className="invalid-response">
              {errorObj ? errorObj.cse_app_title : ""}
            </span>
            <InputComponent
              name="cse_app_title"
              maxLenght="150"
              value={dataState.cse_app_title}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>

          <div className="second-type-div">
            <div className="rating">
              <label>Rating (if applicable)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.cse_app_rating : ""}
              </span>
              <InputComponent
                maxLenght="5"
                maxLenght="3"
                name="cse_app_rating"
                value={dataState.cse_app_rating}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
            <div className="examination-date">
              <label>Date of Examination Conferment</label>
              <span className="invalid-response">
                {errorObj ? errorObj.cse_app_date : ""}
              </span>
              <InputComponent
                maxLenght="150"
                type="date"
                name="cse_app_date"
                value={dataState.cse_app_date}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
          </div>

          <div className="first-type-div">
            <label>Place of Examination/Confernment</label>
            <span className="invalid-response">
              {errorObj ? errorObj.cse_app_place : ""}
            </span>
            <InputComponent
              name="cse_app_place"
              value={dataState.cse_app_place}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>

          <div className="second-type-div">
            <div className="license-number">
              <label>License Number (if applicable)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.cse_app_license : ""}
              </span>
              <InputComponent
                maxLenght="30"
                name="cse_app_license"
                value={dataState.cse_app_license}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
            <div className="validity">
              <label>Date of Validity</label>
              <span className="invalid-response">
                {errorObj ? errorObj.cse_app_validity : ""}
              </span>
              <InputComponent
                type="date"
                name="cse_app_validity"
                value={dataState.cse_app_validity}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddCivilServiceModal;
