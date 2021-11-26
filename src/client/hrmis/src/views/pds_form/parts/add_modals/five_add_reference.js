import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setBusy } from "../../../../features/reducers/loading_slice";
import httpRequestHelper from "../../../../helpers/http_request_helper";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";

const FourAddReferenceModal = (props) => {
  const [dataState, singleInput, multiInput, setter] = useFormHelper();

  const { renderFail, renderSuccess } = usePopUpHelper();
  // ===================================
  // ERROR HANDLING STATE
  // ===================================
  const [serverErrorResponse, setServerErrorResponse] = useState();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();

  // ===================================
  // REDUX STATE AND FUNCIONALITIES
  // ===================================
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setBusy(true));
    await useAxiosRequestHelper
      .post(dataState, "new-reference", item)
      .then(() => {
        renderSuccess();
        setServerErrorResponse(null);
        props.onClose();
        setter({
          item: "",
          ref_app_name: "",
          ref_app_addr: "",
          ref_app_email: "",
          ref_app_tel_no: "",
        });
      })
      .catch((error) => {
        if (typeof error === "object" && error !== null)
          setServerErrorResponse([error.message]);
        else setServerErrorResponse([error.message]);
        renderFail();
      });
    dispatch(setBusy(false));
  };

  useEffect(() => {
    setServerErrorResponse(null);
    setter({
      item: props.data ? props.data.ref_app_timestamp : "",
      ref_app_name: props.data ? props.data.ref_app_name : "",
      ref_app_addr: props.data ? props.data.ref_app_addr : "",
      ref_app_email: props.data ? props.data.ref_app_email : "",
      ref_app_tel_no: props.data ? props.data.ref_app_tel_no : "",
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
          {serverErrorResponse && (
            <ValidationComponent title="FAILED TO SUBMIT">
              {serverErrorResponse.map((item, key) => {
                return <p key={key}>- {item}</p>;
              })}
            </ValidationComponent>
          )}

          <br />

          <div className="first-type-div">
            <label>Name</label>
            <InputComponent
              maxLenght="150"
              name="ref_app_name"
              value={dataState.ref_app_name}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>
          <div className="first-type-div">
            <label>Address</label>
            <InputComponent
              maxLenght="255"
              name="ref_app_addr"
              value={dataState.ref_app_addr}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>
          <div className="first-type-div">
            <label>Tel. no.</label>
            <InputComponent
              maxLenght="150"
              name="ref_app_tel_no"
              value={dataState.ref_app_tel_no}
              onChange={(e) => {
                singleInput(e);
              }}
            />
          </div>
          <div className="first-type-div">
            <label>Email Address</label>
            <InputComponent
              name="ref_app_email"
              value={dataState.ref_app_email}
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

export default FourAddReferenceModal;
