// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

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
import ModalComponent from "../../../common/modal_component/modal_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import { formThreeInput } from "../../static/input_items";

const ThreeAddWorkExperienceModal = (props) => {
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
      .post(dataState, "new-work-experience", item)
      .then(() => {
        e.target.reset();
        dispatch(setMessageError(undefined));
        renderSuccess();
        props.onClose();
      })
      .catch((error) => {
        renderFail();
        if (typeof error === "object") {
          console.log(error);
          dispatch(setObjectError(error));
          dispatch(setMessageError("Unprocessable Entity"));
        } else {
          dispatch(setMessageError(error));
        }
      });
  };

  useEffect(() => {
    setter({
      item: props.data ? props.data.exp_app_time : "",
      exp_app_from: props.data ? props.data.exp_app_from : "",
      exp_app_to: props.data ? props.data.exp_app_to : "",
      exp_app_position: props.data ? props.data.exp_app_position : "",
      exp_app_agency: props.data ? props.data.exp_app_agency : "",
      exp_app_salary: props.data ? props.data.exp_app_salary : "",
      exp_app_grade: props.data ? props.data.exp_app_grade : "",
      exp_app_step: props.data ? props.data.exp_app_step : "",
      exp_app_appntmnt: props.data ? props.data.exp_app_appntmnt : "",
      exp_app_govt: props.data ? props.data.exp_app_govt : "",
      exp_app_rel_fields: props.data ? props.data.exp_app_rel_fields : "",
    });
  }, [props.isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Work Experience"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onPressed={props.onPressed}
        onSubmit={submitHandler}
        onSubmitType="submit"
        onClose={props.onClose}
      >
        <div className="add-workexp-modal-container">
          {errorMsg && (
            <ValidationComponent title="FAILED TO SUBMIT">
              <p> {errorMsg} </p>
            </ValidationComponent>
          )}
          <br />

          <div className="first-type-div">
            <label>
              <strong>INCLUSIVE DATES</strong>
            </label>
          </div>
          <div className="second-type-div">
            <div className="from">
              <label>From</label>
              <span className="invalid-response">
                {errorObj ? errorObj.exp_app_from : ""}
              </span>
              <InputComponent
                type="date"
                name="exp_app_from"
                value={dataState.exp_app_from}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
            <div className="to">
              <label>To</label>
              <span className="invalid-response">
                {errorObj ? errorObj.exp_app_to : ""}
              </span>
              <InputComponent
                type="date"
                name="exp_app_to"
                value={dataState.exp_app_to}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
          </div>

          <div className="first-type-div">
            <label>Position Title (write in full/do not abbreviate)</label>
            <span className="invalid-response">
              {errorObj ? errorObj.exp_app_position : ""}
            </span>
            <InputComponent
              maxLenght="150"
              name="exp_app_position"
              value={dataState.exp_app_position}
              onChange={(e) => singleInput(e)}
            />
          </div>

          <div className="first-type-div">
            <label>
              Department/Agency/Office/Company (write in full/do not abbreviate)
            </label>
            <span className="invalid-response">
              {errorObj ? errorObj.exp_app_agency : ""}
            </span>
            <InputComponent
              maxLenght="255"
              name="exp_app_agency"
              value={dataState.exp_app_agency}
              onChange={(e) => singleInput(e)}
            />
          </div>

          <div className="third-type-div">
            <div className="salary">
              <label>Monthly Salary</label>
              <span className="invalid-response">
                {errorObj ? errorObj.exp_app_salary : ""}
              </span>
              <InputComponent
                name="exp_app_salary"
                value={dataState.exp_app_salary}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div className="grade">
              <label>(if applicable) Salary/Job/Grade</label>
              <span className="invalid-response">
                {errorObj ? errorObj.exp_app_grade : ""}
              </span>
              <SelectComponent
                name="exp_app_grade"
                itemList={formThreeInput.add_work_grade}
                value={dataState.exp_app_grade}
                defaultTitle="Salary Grade"
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div className="increment">
              <label>Step Increment</label>
              <span className="invalid-response">
                {errorObj ? errorObj.exp_app_step : ""}
              </span>
              <SelectComponent
                name="exp_app_step"
                itemList={formThreeInput.add_work_step}
                value={dataState.exp_app_step}
                defaultTitle="Step Increment"
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>

          <div className="second-type-div">
            <div className="status">
              <label>Status of Appointment</label>
              <span className="invalid-response">
                {errorObj ? errorObj.exp_app_appntmnt : ""}
              </span>
              <SelectComponent
                name="exp_app_appntmnt"
                itemList={formThreeInput.add_work_status}
                value={dataState.exp_app_appntmnt}
                defaultTitle="Status"
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div className="service">
              <label>Government Service</label>
              <span className="invalid-response">
                {errorObj ? errorObj.exp_app_govt : ""}
              </span>
              <SelectComponent
                name="exp_app_govt"
                itemList={formThreeInput.add_work_service}
                value={dataState.exp_app_govt}
                defaultTitle="Goverment Service"
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>

          <div className="first-type-div">
            <label>Related Field of Work</label>
            <span className="invalid-response">
              {errorObj ? errorObj.exp_app_rel_fields : ""}
            </span>
            <InputComponent
              name="exp_app_rel_fields"
              value={dataState.exp_app_rel_fields}
              onChange={(e) => singleInput(e)}
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddWorkExperienceModal;
