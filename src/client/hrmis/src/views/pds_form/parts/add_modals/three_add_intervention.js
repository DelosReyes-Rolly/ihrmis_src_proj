import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import * as Yup from "yup";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import TextAreaComponent from "../../../common/input_component/textarea_input_component/textarea_input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import { formThreeInput } from "../../static/input_items";
import {
  API_HOST,
  validationDate,
  validationRequired,
  validationRequiredNum,
} from "../../../../helpers/global/global_config";
import axios from "axios";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";

const dateValidationAfter = validationDate.min(
  Yup.ref("trn_app_from"),
  ({ min }) =>
    `Date from needs to be after ${new Date(min).toLocaleDateString()}`
);

const ThreeAddInterventionModal = ({
  reference,
  isDisplay,
  onClose,
  endpoint,
  remove,
}) => {
  const { renderBusy } = usePopUpHelper();
  const { item } = useParams();

  const trainingPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      trn_app_id: item ?? "",
      trn_app_title: reference?.trn_app_title ?? "",
      trn_app_from: reference?.trn_app_from ?? "",
      trn_app_to: reference?.trn_app_to ?? "",
      trn_app_hours: reference?.trn_app_hours ?? "",
      trn_app_type: reference?.trn_app_type ?? "",
      trn_app_sponsor: reference?.trn_app_sponsor ?? "",
      trn_app_cmptncy: reference?.trn_app_cmptncy ?? "",
    },
    validationSchema: Yup.object({
      trn_app_title: validationRequired,
      trn_app_from: validationDate,
      trn_app_to: dateValidationAfter,
      trn_app_hours: validationRequiredNum,
      trn_app_type: validationRequired,
      trn_app_sponsor: validationRequired,
      trn_app_cmptncy: validationRequired,
    }),
    onSubmit: async (values, { resetForm }) => {
      renderBusy(true);
      const refID =
        reference?.cse_id === undefined ? "" : `/${reference?.cse_id}`;
      const link =
        endpoint === undefined ? "new-training" + refID : endpoint + refID;
      await axios
        .post(API_HOST + link, values)
        .then(() => {
          let MESSAGE = "New Training was added successfully";
          if (reference !== undefined)
            MESSAGE = "Training was edited successfully";
          popupAlert({
            message: MESSAGE,
            type: ALERT_ENUM.success,
          });
          resetForm();
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
      renderBusy(false);
    },
  });

  useEffect(() => {
    if (isDisplay === false) {
      trainingPdsForm.setTouched({}, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Learning and Development Interventions"
        onSubmitName="Save"
        onCloseName={remove === undefined ? "Close" : "Delete"}
        isDisplay={isDisplay}
        onPressed={remove}
        onSubmit={trainingPdsForm.handleSubmit}
        onSubmitType="submit"
        onClose={onClose}
      >
        <div className="add-intervention-modal-container">
          <br />

          <div className="first-type-div">
            <label>
              Title of Learning and DEvelopment Interventions/Training Programs
              (write in full)
            </label>

            <InputComponent
              maxLenght="255"
              name="trn_app_title"
              value={trainingPdsForm.values.trn_app_title}
              onChange={trainingPdsForm.handleChange}
            />
            {trainingPdsForm.touched.trn_app_title &&
            trainingPdsForm.errors.trn_app_title ? (
              <span className="invalid-response">
                {trainingPdsForm.errors.trn_app_title}
              </span>
            ) : null}
          </div>

          <div className="first-type-div">
            <label>
              <strong>INCLUSIVE DATES OF ATTENDANCE</strong>
            </label>
          </div>

          <div className="second-type-div">
            <div className="from">
              <label>From</label>
              <InputComponent
                type="date"
                name="trn_app_from"
                value={trainingPdsForm.values.trn_app_from}
                onChange={trainingPdsForm.handleChange}
              />
              {trainingPdsForm.touched.trn_app_from &&
              trainingPdsForm.errors.trn_app_from ? (
                <span className="invalid-response">
                  {trainingPdsForm.errors.trn_app_from}
                </span>
              ) : null}
            </div>
            <div className="to">
              <label>To</label>

              <InputComponent
                type="date"
                name="trn_app_to"
                value={trainingPdsForm.values.trn_app_to}
                onChange={trainingPdsForm.handleChange}
              />
              {trainingPdsForm.touched.trn_app_to &&
              trainingPdsForm.errors.trn_app_to ? (
                <span className="invalid-response">
                  {trainingPdsForm.errors.trn_app_to}
                </span>
              ) : null}
            </div>
          </div>

          <div className="second-type-div">
            <div className="type">
              <label>Type of Learning and Development</label>

              <SelectComponent
                name="trn_app_type"
                itemList={formThreeInput.add_training_type}
                defaultTitle="Type"
                value={trainingPdsForm.values.trn_app_type}
                onChange={trainingPdsForm.handleChange}
              />
              {trainingPdsForm.touched.trn_app_type &&
              trainingPdsForm.errors.trn_app_type ? (
                <span className="invalid-response">
                  {trainingPdsForm.errors.trn_app_type}
                </span>
              ) : null}
            </div>
            <div className="hours">
              <label>Number of Hours</label>

              <InputComponent
                maxLenght="3"
                name="trn_app_hours"
                value={trainingPdsForm.values.trn_app_hours}
                onChange={trainingPdsForm.handleChange}
              />
              {trainingPdsForm.touched.trn_app_hours &&
              trainingPdsForm.errors.trn_app_hours ? (
                <span className="invalid-response">
                  {trainingPdsForm.errors.trn_app_hours}
                </span>
              ) : null}
            </div>
          </div>

          <div className="first-type-div">
            <label>Conducted/Sponsored bY (write in full)</label>
            <TextAreaComponent
              name="trn_app_sponsor"
              value={trainingPdsForm.values.trn_app_sponsor}
              onChange={trainingPdsForm.handleChange}
            />
            {trainingPdsForm.touched.trn_app_sponsor &&
            trainingPdsForm.errors.trn_app_sponsor ? (
              <span className="invalid-response">
                {trainingPdsForm.errors.trn_app_sponsor}
              </span>
            ) : null}
          </div>

          <div className="first-type-div">
            <label>Competency Addressed</label>
            <InputComponent
              name="trn_app_cmptncy"
              value={trainingPdsForm.values.trn_app_cmptncy}
              onChange={trainingPdsForm.handleChange}
            />
            {trainingPdsForm.touched.trn_app_cmptncy &&
            trainingPdsForm.errors.trn_app_cmptncy ? (
              <span className="invalid-response">
                {trainingPdsForm.errors.trn_app_cmptncy}
              </span>
            ) : null}
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddInterventionModal;
