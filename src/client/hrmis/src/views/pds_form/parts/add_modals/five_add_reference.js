import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setBusy } from "../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import {
  API_HOST,
  validationEmail,
  validationRequired,
  validationRequiredNum,
} from "../../../../helpers/global/global_config";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import * as Yup from "yup";

const FourAddReferenceModal = ({
  onClose,
  isDisplay,
  onPressed,
  reference,
  endpoint,
}) => {
  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();

  // ===================================
  // REDUX STATE AND FUNCIONALITIES
  // ===================================
  const dispatch = useDispatch();

  const formHandler = useFormik({
    enableReinitialize: true,
    initialValues: {
      ref_app_id: item,
      ref_app_name: reference?.ref_app_name ?? "",
      ref_app_addr: reference?.ref_app_addr ?? "",
      ref_app_email: reference?.ref_app_email ?? "",
      ref_app_tel_no: reference?.ref_app_tel_no ?? "",
    },
    validationSchema: Yup.object({
      ref_app_name: validationRequired,
      ref_app_addr: validationRequired,
      ref_app_email: validationEmail,
      ref_app_tel_no: validationRequiredNum,
    }),
    onSubmit: async (values, { resetForm }) => {
      const plantilla =
        reference?.ref_id === undefined ? "" : `/${reference?.ref_id}`;
      const link =
        endpoint === undefined
          ? "new-reference" + plantilla
          : endpoint + plantilla;
      dispatch(setBusy(true));
      await axios
        .post(API_HOST + link, values)
        .then(() => {
          resetForm();
          let MESSAGE = "New reference was added successfully";
          if (reference !== undefined)
            MESSAGE = "Reference was edited successfully";
          popupAlert({
            message: MESSAGE,
            type: ALERT_ENUM.success,
          });
          onClose();
        })
        .catch((error) => {
          resetForm();
          onClose();
          popupAlert({
            message: error?.response?.data?.message ?? error?.message,
            type: ALERT_ENUM.fail,
          });
        });
      dispatch(setBusy(false));
    },
  });

  useEffect(() => {
    if (isDisplay === false) {
      formHandler.setTouched({}, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="References"
        onSubmitName="Save"
        onCloseName={onPressed === undefined ? "Close" : "Delete"}
        isDisplay={isDisplay}
        onSubmit={formHandler.handleSubmit}
        onSubmitType="submit"
        onPressed={onPressed}
        onClose={onClose}
      >
        <div className="add-csc-modal-container">
          <div className="first-type-div">
            <label>Name</label>
            <InputComponent
              maxLenght="150"
              name="ref_app_name"
              value={formHandler.values.ref_app_name}
              onChange={formHandler.handleChange}
            />
            {formHandler.touched.ref_app_name &&
            formHandler.errors.ref_app_name ? (
              <span className="invalid-response">
                {formHandler.errors.ref_app_name}
              </span>
            ) : null}
          </div>
          <div className="first-type-div">
            <label>Address</label>
            <InputComponent
              maxLenght="255"
              name="ref_app_addr"
              value={formHandler.values.ref_app_addr}
              onChange={formHandler.handleChange}
            />
            {formHandler.touched.ref_app_addr &&
            formHandler.errors.ref_app_addr ? (
              <span className="invalid-response">
                {formHandler.errors.ref_app_addr}
              </span>
            ) : null}
          </div>
          <div className="first-type-div">
            <label>Tel. no.</label>
            <InputComponent
              maxLenght="150"
              name="ref_app_tel_no"
              value={formHandler.values.ref_app_tel_no}
              onChange={formHandler.handleChange}
            />
            {formHandler.touched.ref_app_tel_no &&
            formHandler.errors.ref_app_tel_no ? (
              <span className="invalid-response">
                {formHandler.errors.ref_app_tel_no}
              </span>
            ) : null}
          </div>
          <div className="first-type-div">
            <label>Email Address</label>
            <InputComponent
              name="ref_app_email"
              value={formHandler.values.ref_app_email}
              onChange={formHandler.handleChange}
            />
            {formHandler.touched.ref_app_email &&
            formHandler.errors.ref_app_email ? (
              <span className="invalid-response">
                {formHandler.errors.ref_app_email}
              </span>
            ) : null}
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default FourAddReferenceModal;
