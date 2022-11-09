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
  const formHandler = useFormik({ //formik - functiont that handles form in react
    initialValues: {              //here is initial value
      psn_name: "",               //laman ng db
      psn_email: "",
    },
    validationSchema: Yup.object({    //validation - checker
      psn_name: Yup.string()          //string dapat, kapag hindi string papasok as baba
        .typeError("Invalid Input")
        .required("This field is required"),    //required
      psn_email: Yup.string()
        .typeError("Invalid Input")         
        .required("This field is required")
        .email("Invalid Input"),              //meron sa yup na email validation
    }),
    onSubmit: async (values, { resetForm }) => {    //kapag sinubmit - kailangan ng value at resetForm
      axios
        .post(API_HOST + "add-person", values)    //api_host = link, add-person = route, values = value to be submitted
        .then(() => {
          popupAlert("Success", ALERT_ENUM.success);  //if success
          resetForm();                                //form will reset
          onClose();                                  //and then form will close
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
        onSubmit={formHandler.handleSubmit} //maghahandle ng submit
      >
        <div>
          <label>Name</label>
          <InputComponent
            name="psn_name"         //yung nasa taas laman ng db
            value={formHandler.values.psn_name} //value ng form handler sa taas
            onChange={formHandler.handleChange} //onChange - ano mangyayari kapag may bago sa input = ""
          />

          {formHandler.touched.psn_name && formHandler.errors.psn_name ? (
            <p className="error-validation-styles">
              {formHandler.errors.psn_name}
            </p>
          ) : null}  {/* copy paste */}
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