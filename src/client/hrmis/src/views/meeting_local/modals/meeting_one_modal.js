import React, { useEffect } from "react";
import ModalComponent from "../../common/modal_component/modal_component";
import InputComponent from "../../common/input_component/input_component/input_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sub } from "date-fns";
import axios from "axios";
import { API_HOST } from "../../../helpers/global/global_config";
import { ALERT_ENUM, popupAlert } from "../../../helpers/alert_response";

const MeetingOneModal = ({ isDisplay, onClose }) => {
  const formHandler = useFormik({
    initialValues: {
      psn_name: "",
      psn_email: "",
    },
    validationSchema: Yup.object({
      psn_name: Yup.string()
        .typeError("Invalid Input")
        .required("This field is required"),
      psn_email: Yup.string()
        .typeError("Invalid Input")
        .required("This field is required")
        .email("Invalid Input"),
    }),
    onSubmit: async (values, { resetForm }) => {
      axios
        .post(API_HOST + "add-person", values)
        .then(() => {
          popupAlert("Success", ALERT_ENUM.success);
          resetForm();
          onClose();
        })
        .catch((err) => {
          popupAlert("Failed", ALERT_ENUM.fail);
        });
    },
  });

  return (
    <React.Fragment>
      <ModalComponent
        title="Meeting One"
        isDisplay={isDisplay}
        onClose={onClose}
        onSubmitType="submit"
        onSubmit={formHandler.handleSubmit}
      >
        <div>
          <label>Name</label>
          <InputComponent
            name="psn_name"
            value={formHandler.values.psn_name}
            onChange={formHandler.handleChange}
          />

          {formHandler.touched.psn_name && formHandler.errors.psn_name ? (
            <p className="error-validation-styles">
              {formHandler.errors.psn_name}
            </p>
          ) : null}
        </div>
        <br />
        <div>
          <label>Email</label>
          <InputComponent
            name="psn_email"
            value={formHandler.values.psn_email}
            onChange={formHandler.handleChange}
          />

          {formHandler.touched.psn_email && formHandler.errors.psn_email ? (
            <p className="error-validation-styles">
              {formHandler.errors.psn_email}
            </p>
          ) : null}
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default MeetingOneModal;