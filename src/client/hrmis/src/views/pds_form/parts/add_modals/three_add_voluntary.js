import React, { useEffect } from "react";
import { useParams } from "react-router";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import TextAreaComponent from "../../../common/input_component/textarea_input_component/textarea_input_component";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  API_HOST,
  validationDate,
  validationRequired,
  validationRequiredNum,
} from "../../../../helpers/global/global_config";
import axios from "axios";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";

const dateValidationAfter = validationDate.min(
  Yup.ref("vol_app_from"),
  ({ min }) =>
    `Date from needs to be after ${new Date(min).toLocaleDateString()}`
);

const ThreeAddVoluntrayWorkModal = ({
  reference,
  isDisplay,
  remove,
  onClose,
  endpoint,
}) => {
  const { renderBusy } = usePopUpHelper();

  const { item } = useParams();

  const voluntaryPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      vol_app_id: item ?? "",
      vol_app_org: reference?.vol_app_org ?? "",
      vol_app_addr: reference?.vol_app_addr ?? "",
      vol_app_from: reference?.vol_app_from ?? "",
      vol_app_to: reference?.vol_app_to ?? "",
      vol_app_hours: reference?.vol_app_hours ?? "",
      vol_app_work: reference?.vol_app_work ?? "",
    },
    validationSchema: Yup.object({
      vol_app_org: validationRequired,
      vol_app_addr: validationRequired,
      vol_app_from: validationDate,
      vol_app_to: dateValidationAfter,
      vol_app_hours: validationRequiredNum,
      vol_app_work: validationRequired,
    }),
    onSubmit: async (values, { resetForm }) => {
      // renderBusy(true);

      const plantilla =
        reference?.vol_id === undefined ? "" : `/${reference?.vol_id}`;
      const link =
        endpoint === undefined
          ? "new-voluntary-work" + plantilla
          : endpoint + plantilla;

      await axios
        .post(API_HOST + link, values)
        .then(() => {
          resetForm();
          let MESSAGE = "New voluntary work was added successfully";
          if (reference !== undefined)
            MESSAGE = "Voluntary work was edited successfully";
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
      // renderBusy(false);
    },
  });

  useEffect(() => {
    if (isDisplay === false) {
      voluntaryPdsForm.setTouched({}, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplay]);

  return (
    <React.Fragment>
      <ModalComponent
        title="Voluntary Work"
        onSubmitName="Save"
        onCloseName={remove === undefined ? "Close" : "Delete"}
        isDisplay={isDisplay}
        onPressed={remove}
        onSubmit={voluntaryPdsForm.handleSubmit}
        onSubmitType="submit"
        onClose={onClose}
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
