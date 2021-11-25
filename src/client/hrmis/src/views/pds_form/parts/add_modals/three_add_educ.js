import React, { useEffect } from "react";
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
import SelectComponent from "../../../common/input_component/select_component/select_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import { formThreeInput } from "../../static/input_items";

// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

const ThreeAddEducationModal = (props) => {
  // ===========================================================
  // CUSTOM HOOK SERVICE
  // ===========================================================
  const [dataState, singleInput, multiInput, setter] = useFormHelper();
  const errorObj = useSelector((state) => state.error.objectError);
  const errorMsg = useSelector((state) => state.error.messageError);

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
  const submitHandler = async (e) => {
    e.preventDefault();
    await useAxiosRequestHelper
      .post(dataState, "/new-education/", item)
      .then(() => {
        e.target.reset();
        dispatch(setObjectError({}));
        dispatch(setMessageError(undefined));
        props.onClose();
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

  useEffect(() => {
    setter({
      item: props.data ? props.data.item : "",
      edu_app_level: props.data ? props.data.level : "",
      edu_app_school: props.data ? props.data.school : "",
      edu_app_degree: props.data ? props.data.degree : "",
      edu_app_from: props.data ? props.data.from : "",
      edu_app_to: props.data ? props.data.to : "",
      edu_app_graduated: props.data ? props.data.graduated : "",
      edu_app_units: props.data ? props.data.unit_earned : "",
      edu_app_honors: props.data ? props.data.honors : "",
    });
  }, [props.isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Educational Background"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onSubmit={submitHandler}
        onSubmitType="submit"
        onPressed={props.onPressed}
        onClose={props.onClose}
      >
        {errorMsg && (
          <ValidationComponent title="FAILED TO SUBMIT">
            <p> {errorMsg} </p>
          </ValidationComponent>
        )}
        <br />
        <div className="add-educ-modal-container">
          <div className="first-type-div">
            <label>Level</label>
            <span className="invalid-response">
              {errorObj ? errorObj.edu_app_level : ""}
            </span>
            <SelectComponent
              name="edu_app_level"
              itemList={formThreeInput.add_educ_level}
              value={dataState.edu_app_level}
              defaultTitle="Education Level"
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>
          <br />

          <div className="first-type-div">
            <label>Name of School (write in full)</label>
            <span className="invalid-response">
              {errorObj ? errorObj.edu_app_school : ""}
            </span>
            <InputComponent
              maxLenght="255"
              name="edu_app_school"
              value={dataState.edu_app_school}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>

          <div className="first-type-div">
            <label>Basic Education/Degree/Course</label>
            <span className="invalid-response">
              {errorObj ? errorObj.edu_app_degree : ""}
            </span>
            <InputComponent
              maxLenght="150"
              name="edu_app_degree"
              value={dataState.edu_app_degree}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>

          <br />
          <div className="first-type-div">
            <label>
              <strong>PERIOD OF ATTENDANCE</strong>
            </label>
          </div>

          <div className="second-type-div">
            <div className="from">
              <label>From</label>
              <span className="invalid-response">
                {errorObj ? errorObj.edu_app_from : ""}
              </span>
              <InputComponent
                maxLenght="4"
                name="edu_app_from"
                value={dataState.edu_app_from}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>

            <div className="to">
              <label>To</label>
              <span className="invalid-response">
                {errorObj ? errorObj.edu_app_to : ""}
              </span>
              <InputComponent
                maxLenght="4"
                name="edu_app_to"
                value={dataState.edu_app_to}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
          </div>

          <div className="second-type-div">
            <div className="yearend">
              <label>Year Graduated</label>
              <span className="invalid-response">
                {errorObj ? errorObj.edu_app_graduated : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="edu_app_graduated"
                value={dataState.edu_app_graduated}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
            <div className="highest">
              <label>Highest Level/Units Earned (If not graduated)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.edu_app_units : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="edu_app_units"
                value={dataState.edu_app_units}
                onChange={(e) => {
                  singleInput(e);
                }}
              />
            </div>
          </div>
          <div className="first-type-div">
            <label>Scholarship / Academic Honors Recieved</label>
            <span className="invalid-response">
              {errorObj ? errorObj.edu_app_honors : ""}
            </span>
            <InputComponent
              maxLenght="50"
              name="edu_app_honors"
              value={dataState.edu_app_honors}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddEducationModal;
