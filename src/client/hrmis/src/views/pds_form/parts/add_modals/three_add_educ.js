import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import InputComponent from "../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import { educationInputItem } from "../../static/input_items";
import * as Yup from "yup";
import {
  API_HOST,
  validationRequired,
  validationRequiredNum,
} from "../../../../helpers/global/global_config";
import { useDispatch } from "react-redux";
import { setBusy } from "../../../../features/reducers/popup_response";
import axios from "axios";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

const ThreeAddEducationModal = ({
  isDisplay,
  onClose,
  reference,
  endpoint,
  remove,
}) => {
  const { item } = useParams();
  const dispatch = useDispatch();

  const educationPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      edu_app_id: item ?? "",
      edu_app_level: reference?.edu_app_level ?? "",
      edu_app_school: reference?.edu_app_school ?? "",
      edu_app_degree: reference?.edu_app_degree ?? "",
      edu_app_from: reference?.edu_app_from ?? "",
      edu_app_to: reference?.edu_app_to ?? "",
      edu_app_graduated: reference?.edu_app_graduated ?? "",
      edu_app_units: reference?.edu_app_units ?? "",
      edu_app_honors: reference?.edu_app_honors ?? "",
    },
    validationSchema: Yup.object({
      edu_app_level: validationRequired,
      edu_app_school: validationRequired,
      edu_app_degree: validationRequired,
      edu_app_from: validationRequiredNum,
      edu_app_to: validationRequiredNum,
      edu_app_graduated: validationRequiredNum,
      edu_app_units: validationRequiredNum,
      edu_app_honors: validationRequired,
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(setBusy(true));
      const plantilla =
        reference?.edu_id === undefined ? "" : `/${reference?.edu_id}`;
      const link =
        endpoint === undefined
          ? "new-education" + plantilla
          : endpoint + plantilla;

      await axios
        .post(API_HOST + link, values)
        .then(() => {
          let MESSAGE = "New CS Elibility was added successfully";
          if (reference !== undefined)
            MESSAGE = "CS Elibility was edited successfully";
          resetForm();

          popupAlert({
            message: MESSAGE,
            type: ALERT_ENUM.success,
          });

          onClose();
        })
        .catch((error) => {
          resetForm();
          popupAlert({
            message: error?.response?.data?.message ?? error?.message,
            type: ALERT_ENUM.fail,
          });
          onClose();
        });

      dispatch(setBusy(false));
    },
  });

  useEffect(() => {
    if (isDisplay === false) {
      educationPdsForm.setTouched({}, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Educational Background"
        onSubmitName="Save"
        onCloseName={remove === undefined ? "Close" : "Delete"}
        isDisplay={isDisplay}
        onSubmit={educationPdsForm.handleSubmit}
        onSubmitType="submit"
        onPressed={remove}
        onClose={onClose}
      >
        <br />
        <div className="add-educ-modal-container">
          <div className="first-type-div">
            <label>Level</label>
            <SelectComponent
              defaultTitle="Education Level"
              name="edu_app_level"
              itemList={educationInputItem}
              value={educationPdsForm.values.edu_app_level}
              onChange={educationPdsForm.handleChange}
            />
            {educationPdsForm.touched.edu_app_level &&
            educationPdsForm.errors.edu_app_level ? (
              <span className="invalid-response">
                {educationPdsForm.errors.edu_app_level}
              </span>
            ) : null}
          </div>
          <br />

          <div className="first-type-div">
            <label>Name of School (write in full)</label>
            <InputComponent
              maxLenght="255"
              name="edu_app_school"
              value={educationPdsForm.values.edu_app_school}
              onChange={educationPdsForm.handleChange}
            />
            {educationPdsForm.touched.edu_app_school &&
            educationPdsForm.errors.edu_app_school ? (
              <span className="invalid-response">
                {educationPdsForm.errors.edu_app_school}
              </span>
            ) : null}
          </div>

          <div className="first-type-div">
            <label>Basic Education/Degree/Course</label>
            <InputComponent
              maxLenght="150"
              name="edu_app_degree"
              value={educationPdsForm.values.edu_app_degree}
              onChange={educationPdsForm.handleChange}
            />
            {educationPdsForm.touched.edu_app_degree &&
            educationPdsForm.errors.edu_app_degree ? (
              <span className="invalid-response">
                {educationPdsForm.errors.edu_app_degree}
              </span>
            ) : null}
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
              <InputComponent
                maxLenght="4"
                name="edu_app_from"
                value={educationPdsForm.values.edu_app_from}
                onChange={educationPdsForm.handleChange}
              />
              {educationPdsForm.touched.edu_app_from &&
              educationPdsForm.errors.edu_app_from ? (
                <span className="invalid-response">
                  {educationPdsForm.errors.edu_app_from}
                </span>
              ) : null}
            </div>

            <div className="to">
              <label>To</label>
              <InputComponent
                maxLenght="4"
                name="edu_app_to"
                value={educationPdsForm.values.edu_app_to}
                onChange={educationPdsForm.handleChange}
              />
              {educationPdsForm.touched.edu_app_to &&
              educationPdsForm.errors.edu_app_to ? (
                <span className="invalid-response">
                  {educationPdsForm.errors.edu_app_to}
                </span>
              ) : null}
            </div>
          </div>

          <div className="second-type-div">
            <div className="yearend">
              <label>Year Graduated</label>
              <InputComponent
                maxLenght="50"
                name="edu_app_graduated"
                value={educationPdsForm.values.edu_app_graduated}
                onChange={educationPdsForm.handleChange}
              />
              {educationPdsForm.touched.edu_app_graduated &&
              educationPdsForm.errors.edu_app_graduated ? (
                <span className="invalid-response">
                  {educationPdsForm.errors.edu_app_graduated}
                </span>
              ) : null}
            </div>
            <div className="highest">
              <label>Highest Level/Units Earned (If not graduated)</label>
              <InputComponent
                maxLenght="50"
                name="edu_app_units"
                value={educationPdsForm.values.edu_app_units}
                onChange={educationPdsForm.handleChange}
              />
              {educationPdsForm.touched.edu_app_units &&
              educationPdsForm.errors.edu_app_units ? (
                <span className="invalid-response">
                  {educationPdsForm.errors.edu_app_units}
                </span>
              ) : null}
            </div>
          </div>
          <div className="first-type-div">
            <label>Scholarship / Academic Honors Recieved</label>
            <InputComponent
              maxLenght="50"
              name="edu_app_honors"
              value={educationPdsForm.values.edu_app_honors}
              onChange={educationPdsForm.handleChange}
            />
            {educationPdsForm.touched.edu_app_honors &&
            educationPdsForm.errors.edu_app_honors ? (
              <span className="invalid-response">
                {educationPdsForm.errors.edu_app_honors}
              </span>
            ) : null}
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddEducationModal;
