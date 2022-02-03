import React, { useEffect } from "react";
import { useParams } from "react-router";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import TextAreaComponent from "../../../common/input_component/textarea_input_component/textarea_input_component";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxiosHelper from "../../../../helpers/use_hooks/axios_helper";
import {
  validationDate,
  validationRequired,
  validationRequiredNum,
  yesterday,
} from "../../../../helpers/global/global_config";

const ThreeAddVoluntrayWorkModal = (props) => {
  // ===========================================================
  // CUSTOM HOOK SERVICE
  // ===========================================================
  const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();

  // ===========================================================
  // SUBMIT HANDLER
  // ===========================================================
  const voluntaryPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      item: props?.data?.vol_app_time ?? "",
      vol_app_org: props?.data?.vol_app_org ?? "",
      vol_app_addr: props?.data?.vol_app_addr ?? "",
      vol_app_from: props?.data?.vol_app_from ?? "",
      vol_app_to: props?.data?.vol_app_to ?? "",
      vol_app_hours: props?.data?.vol_app_hours ?? "",
      vol_app_work: props?.data?.vol_app_work ?? "",
    },
    validationSchema: Yup.object({
      vol_app_org: validationRequired,
      vol_app_addr: validationRequired,
      vol_app_from: validationDate.max(yesterday, "Invalid Date"),
      vol_app_to: validationDate,
      vol_app_hours: validationRequiredNum,
      vol_app_work: validationRequired,
    }),
    onSubmit: async (values, { resetForm }) => {
      renderBusy(true);
      await useAxiosHelper
        .post(values, "new-voluntary-work", item)
        .then(() => {
          resetForm();
          renderSucceed({ content: "Form Submitted" });
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
        title="Voluntary Work"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onPressed={props.onPressed}
        onSubmit={voluntaryPdsForm.handleSubmit}
        onSubmitType="submit"
        onClose={props.onClose}
      >
        <div className="add-volwork-modal-container">
          <br />
          <div className="first-type-div">
            <label>Name of Organization (write in full)</label>
            <InputComponent
              name="vol_app_org"
              value={voluntaryPdsForm.values.vol_app_org}
              onChange={voluntaryPdsForm.handleChange}
            />
            {voluntaryPdsForm.touched.vol_app_org &&
            voluntaryPdsForm.errors.vol_app_org ? (
              <span className="invalid-response">
                {voluntaryPdsForm.errors.vol_app_org}
              </span>
            ) : null}
          </div>

          <div className="first-type-div">
            <label>Address</label>
            <TextAreaComponent
              name="vol_app_addr"
              value={voluntaryPdsForm.values.vol_app_addr}
              onChange={voluntaryPdsForm.handleChange}
            />
            {voluntaryPdsForm.touched.vol_app_addr &&
            voluntaryPdsForm.errors.vol_app_addr ? (
              <span className="invalid-response">
                {voluntaryPdsForm.errors.vol_app_addr}
              </span>
            ) : null}
          </div>

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
                name="vol_app_from"
                value={voluntaryPdsForm.values.vol_app_from}
                onChange={voluntaryPdsForm.handleChange}
              />
              {voluntaryPdsForm.touched.vol_app_from &&
              voluntaryPdsForm.errors.vol_app_from ? (
                <span className="invalid-response">
                  {voluntaryPdsForm.errors.vol_app_from}
                </span>
              ) : null}
            </div>
            <div className="to">
              <label>To</label>
              <InputComponent
                type="date"
                name="vol_app_to"
                value={voluntaryPdsForm.values.vol_app_to}
                onChange={voluntaryPdsForm.handleChange}
              />
              {voluntaryPdsForm.touched.vol_app_to &&
              voluntaryPdsForm.errors.vol_app_to ? (
                <span className="invalid-response">
                  {voluntaryPdsForm.errors.vol_app_to}
                </span>
              ) : null}
            </div>
          </div>

          <div className="second-type-div">
            <div className="position">
              <label>Position/Nature of Work</label>
              <InputComponent
                maxLenght="150"
                name="vol_app_work"
                value={voluntaryPdsForm.values.vol_app_work}
                onChange={voluntaryPdsForm.handleChange}
              />
              {voluntaryPdsForm.touched.vol_app_work &&
              voluntaryPdsForm.errors.vol_app_work ? (
                <span className="invalid-response">
                  {voluntaryPdsForm.errors.vol_app_work}
                </span>
              ) : null}
            </div>
            <div className="hours">
              <label>Number of Hours</label>
              <InputComponent
                maxLenght="3"
                name="vol_app_hours"
                value={voluntaryPdsForm.values.vol_app_hours}
                onChange={voluntaryPdsForm.handleChange}
              />
              {voluntaryPdsForm.touched.vol_app_hours &&
              voluntaryPdsForm.errors.vol_app_hours ? (
                <span className="invalid-response">
                  {voluntaryPdsForm.errors.vol_app_hours}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddVoluntrayWorkModal;
