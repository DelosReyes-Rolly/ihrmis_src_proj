// ===========================================================
// USED IN FORM PAGE THREE
// ===========================================================

import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import InputComponent from "../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import { formThreeInput } from "../../static/input_items";
import * as Yup from "yup";
import {
  API_HOST,
  validationDate,
  validationRequired,
  validationRequiredNum,
} from "../../../../helpers/global/global_config";
import { setBusy } from "../../../../features/reducers/popup_response";
import axios from "axios";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";

const dateValidationAfter = validationDate.min(
  Yup.ref("exp_app_from"),
  ({ min }) =>
    `Date from needs to be after ${new Date(min).toLocaleDateString()}`
);

const ThreeAddWorkExperienceModal = ({
  reference,
  isDisplay,
  remove,
  onClose,
  endpoint,
}) => {
  const dispatch = useDispatch();
  const { item } = useParams();

  const workexpPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      exp_app_id: item ?? "",
      exp_app_from: reference?.exp_app_from ?? "",
      exp_app_to: reference?.exp_app_to ?? "",
      exp_app_position: reference?.exp_app_position ?? "",
      exp_app_agency: reference?.exp_app_agency ?? "",
      exp_app_salary: reference?.exp_app_salary ?? "",
      exp_app_grade: reference?.exp_app_grade ?? "",
      exp_app_step: reference?.exp_app_step ?? "",
      exp_app_appntmnt: reference?.exp_app_appntmnt ?? "",
      exp_app_govt: reference?.exp_app_govt ?? "",
      exp_app_rel_fields: reference?.exp_app_rel_fields ?? "",
    },
    validationSchema: Yup.object({
      exp_app_from: validationDate,
      exp_app_to: dateValidationAfter,
      exp_app_position: validationRequired,
      exp_app_agency: validationRequired,
      exp_app_salary: validationRequiredNum,
      exp_app_grade: Yup.number().typeError("Must be a number"),
      exp_app_step: Yup.number().typeError("Must be a number"),
      exp_app_appntmnt: validationRequired,
      exp_app_govt: validationRequired,
      exp_app_rel_fields: validationRequired,
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(setBusy(true));
      const plantilla =
        reference?.exp_id === undefined ? "" : `/${reference?.exp_id}`;
      const link =
        endpoint === undefined
          ? "new-work-experience" + plantilla
          : endpoint + plantilla;
      await axios
        .post(API_HOST + link, values)
        .then(() => {
          let MESSAGE = "New Work Experience was added successfully";
          if (reference !== undefined)
            MESSAGE = "Work Experience was edited successfully";
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
      workexpPdsForm.setTouched({}, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Work Experience"
        onSubmitName="Save"
        onCloseName={remove === undefined ? "Close" : "Delete"}
        isDisplay={isDisplay}
        onPressed={remove}
        onSubmit={workexpPdsForm.handleSubmit}
        onSubmitType="submit"
        onClose={onClose}
      >
        <div className="add-workexp-modal-container">
          <br />
          <div className="first-type-div">
            <label>
              <strong>INCLUSIVE DATES</strong>
            </label>
          </div>
          <div className="second-type-div">
            <div className="from">
              <label>From</label>
              <InputComponent
                type="date"
                name="exp_app_from"
                value={workexpPdsForm.values.exp_app_from}
                onChange={workexpPdsForm.handleChange}
              />
              {workexpPdsForm.touched.exp_app_from &&
              workexpPdsForm.errors.exp_app_from ? (
                <span className="invalid-response">
                  {workexpPdsForm.errors.exp_app_from}
                </span>
              ) : null}
            </div>
            <div className="to">
              <label>To</label>
              <InputComponent
                type="date"
                name="exp_app_to"
                value={workexpPdsForm.values.exp_app_to}
                onChange={workexpPdsForm.handleChange}
              />
              {workexpPdsForm.touched.exp_app_to &&
              workexpPdsForm.errors.exp_app_to ? (
                <span className="invalid-response">
                  {workexpPdsForm.errors.exp_app_to}
                </span>
              ) : null}
            </div>
          </div>

          <div className="first-type-div">
            <label>Position Title (write in full/do not abbreviate)</label>
            <InputComponent
              maxLenght="150"
              name="exp_app_position"
              value={workexpPdsForm.values.exp_app_position}
              onChange={workexpPdsForm.handleChange}
            />
            {workexpPdsForm.touched.exp_app_position &&
            workexpPdsForm.errors.exp_app_position ? (
              <span className="invalid-response">
                {workexpPdsForm.errors.exp_app_position}
              </span>
            ) : null}
          </div>

          <div className="first-type-div">
            <label>
              Department/Agency/Office/Company (write in full/do not abbreviate)
            </label>
            <InputComponent
              maxLenght="255"
              name="exp_app_agency"
              value={workexpPdsForm.values.exp_app_agency}
              onChange={workexpPdsForm.handleChange}
            />
            {workexpPdsForm.touched.exp_app_agency &&
            workexpPdsForm.errors.exp_app_agency ? (
              <span className="invalid-response">
                {workexpPdsForm.errors.exp_app_agency}
              </span>
            ) : null}
          </div>

          <div className="third-type-div">
            <div className="salary">
              <label>Monthly Salary</label>
              <InputComponent
                name="exp_app_salary"
                value={workexpPdsForm.values.exp_app_salary}
                onChange={workexpPdsForm.handleChange}
              />
              {workexpPdsForm.touched.exp_app_salary &&
              workexpPdsForm.errors.exp_app_salary ? (
                <span className="invalid-response">
                  {workexpPdsForm.errors.exp_app_salary}
                </span>
              ) : null}
            </div>
            <div className="grade">
              <label>(if applicable) Salary/Job/Grade</label>
              <SelectComponent
                defaultTitle="Salary Grade"
                itemList={formThreeInput.add_work_grade}
                name="exp_app_grade"
                value={workexpPdsForm.values.exp_app_grade}
                onChange={workexpPdsForm.handleChange}
              />
              {workexpPdsForm.touched.exp_app_grade &&
              workexpPdsForm.errors.exp_app_grade ? (
                <span className="invalid-response">
                  {workexpPdsForm.errors.exp_app_grade}
                </span>
              ) : null}
            </div>

            <div className="increment">
              <label>Step Increment</label>
              <SelectComponent
                defaultTitle="Step Increment"
                itemList={formThreeInput.add_work_step}
                name="exp_app_step"
                value={workexpPdsForm.values.exp_app_step}
                onChange={workexpPdsForm.handleChange}
              />
              {workexpPdsForm.touched.exp_app_step &&
              workexpPdsForm.errors.exp_app_step ? (
                <span className="invalid-response">
                  {workexpPdsForm.errors.exp_app_step}
                </span>
              ) : null}
            </div>
          </div>

          <div className="second-type-div">
            <div className="status">
              <label>Status of Appointment</label>
              <SelectComponent
                defaultTitle="Status"
                itemList={formThreeInput.add_work_status}
                name="exp_app_appntmnt"
                value={workexpPdsForm.values.exp_app_appntmnt}
                onChange={workexpPdsForm.handleChange}
              />
              {workexpPdsForm.touched.exp_app_appntmnt &&
              workexpPdsForm.errors.exp_app_appntmnt ? (
                <span className="invalid-response">
                  {workexpPdsForm.errors.exp_app_appntmnt}
                </span>
              ) : null}
            </div>

            <div className="service">
              <label>Government Service</label>
              <SelectComponent
                itemList={formThreeInput.add_work_service}
                defaultTitle="Goverment Service"
                name="exp_app_govt"
                value={workexpPdsForm.values.exp_app_govt}
                onChange={workexpPdsForm.handleChange}
              />
              {workexpPdsForm.touched.exp_app_govt &&
              workexpPdsForm.errors.exp_app_govt ? (
                <span className="invalid-response">
                  {workexpPdsForm.errors.exp_app_govt}
                </span>
              ) : null}
            </div>
          </div>

          <div className="first-type-div">
            <label>Related Field of Work</label>
            <InputComponent
              name="exp_app_rel_fields"
              value={workexpPdsForm.values.exp_app_rel_fields}
              onChange={workexpPdsForm.handleChange}
            />
            {workexpPdsForm.touched.exp_app_rel_fields &&
            workexpPdsForm.errors.exp_app_rel_fields ? (
              <span className="invalid-response">
                {workexpPdsForm.errors.exp_app_rel_fields}
              </span>
            ) : null}
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddWorkExperienceModal;
