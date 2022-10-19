import { useFormik } from 'formik';
import React from 'react';
import ModalComponent from '../../../common/modal_component/modal_component';
import * as Yup from "yup";
import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import TextAreaComponent from '../../../common/input_component/textarea_input_component/textarea_input_component';

const ModalRemarks = ({ isDisplay, onClose }) => {

  const formHandler = useFormik({
    initialValues: {
      remarks: "",
    },
    validationSchema: Yup.object({
      remarks: Yup.string()
        .typeError("Invalid Input")
        .required("This field is required"),
    }),
    onSubmit: async (values, {resetForm}) => {
      axios
        .post(API_HOST + "add-remarks", values)
        .then(() => {
          popupAlert("Success", ALERT_ENUM.success);
          resetForm();
          onClose();
        })
        .catch((err) => {
          popupAlert("Failed", ALERT_ENUM.fail);
        })
    },
  });

  return (
    <React.Fragment>
      <ModalComponent 
        isDisplay={isDisplay} 
        onClose={onClose} 
        title={'Remarks'}
        onSubmitType="submit"
        onSubmit={formHandler.handleSubmit}
      >
        <div className="remarks-body">
          <TextAreaComponent 
            row={5}
            name="remarks"
            value={formHandler.values.remarks}
            onChange={formHandler.handleChange}
          />
          {formHandler.touched.remarks && formHandler.errors.remarks ? (
            <p className="error-validation-styles">
              {formHandler.errors.remarks}
            </p>
          ) : null}
        </div>
      </ModalComponent>
    </React.Fragment>
  )
}

export default ModalRemarks;