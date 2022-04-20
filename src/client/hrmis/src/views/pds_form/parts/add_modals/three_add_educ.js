import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import { educationInputItem, formThreeInput } from "../../static/input_items";
import * as Yup from "yup";
import {
  validationRequired,
  validationRequiredNum,
} from "../../../../helpers/global/global_config";

import useAxiosHelper from "../../../../helpers/use_hooks/axios_helper";
// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

const ThreeAddEducationModal = (props) => {
  // ===========================================================
  // CUSTOM HOOK SERVICE
  // ===========================================================
  const { renderFailed, renderBusy, renderSucceed } = usePopUpHelper();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();

  // ===========================================================
  // SUBMIT HANDLER
  // ===========================================================

  const educationPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      item: props?.data?.item ?? "",
      edu_app_level: props?.data?.level ?? "",
      edu_app_school: props?.data?.school ?? "",
      edu_app_degree: props?.data?.degree ?? "",
      edu_app_from: props?.data?.from ?? "",
      edu_app_to: props?.data?.to ?? "",
      edu_app_graduated: props?.data?.graduated ?? "",
      edu_app_units: props?.data?.unit_earned ?? "",
      edu_app_honors: props?.data?.honors ?? "",
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
      renderBusy(true);
      await useAxiosHelper
        .post(values, "new-education", item)
        .then(() => {
          resetForm();
          renderSucceed({ content: "Form submitted" });
          props.onClose();
        })
        .catch((err) => renderFailed({ content: err.message }));
      renderBusy(false);
    },
  });

  useEffect(() => {}, [props.isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Educational Background"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onSubmit={educationPdsForm.handleSubmit}
        onSubmitType="submit"
        onPressed={props.onPressed}
        onClose={props.onClose}
      >
        <br />
        <div className="add-educ-modal-container">
          <div className="first-type-div">
            <label>Level</label>
            <SelectComponent
              defaultTitle="Education Level"
              name="edu_app_level"
              itemList={educationInputItem}
              value={educationPdsForm.values.educationInputItem}
              onChange={educationPdsForm.handleChange}
            />
            {educationPdsForm.touched.educationInputItem &&
            educationPdsForm.errors.educationInputItem ? (
              <span className="invalid-response">
                {educationPdsForm.errors.educationInputItem}
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
                type="number"
                max={new Date().getFullYear()}
                min="1900"
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
                type="number"
                max={new Date().getFullYear()}
                min="1900"
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
                type="number"
                max={new Date().getFullYear()}
                min="1900"
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
