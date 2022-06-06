import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import * as Yup from "yup";
import {
  API_HOST,
  validationDate,
  validationRequired,
  validationRequiredNum,
} from "../../../../helpers/global/global_config";
import Creatable from "react-select/creatable";
import { eligibilityInputItems } from "../../static/input_items";
import { useDispatch } from "react-redux";
import { setBusy } from "../../../../features/reducers/popup_response";
import axios from "axios";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";

const ThreeAddCivilServiceModal = ({
  isDisplay,
  onClose,
  reference,
  endpoint,
  remove,
}) => {
  const { item } = useParams();
  const dispatch = useDispatch();

  const cscPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      cse_app_id: item ?? "",
      cse_app_title: "",
      cse_app_date: reference?.cse_app_date ?? "",
      cse_app_place: reference?.cse_app_place ?? "",
      cse_app_rating: reference?.cse_app_rating ?? "",
      cse_app_license: reference?.cse_app_license ?? "",
      cse_app_validity: reference?.cse_app_validity ?? "",
    },
    validationSchema: Yup.object({
      cse_app_title: Yup.object()
        .typeError("This field is required")
        .required("This field is required"),
      cse_app_date: validationDate,
      cse_app_place: validationRequired,
      cse_app_rating: validationRequiredNum,
      cse_app_license: validationRequired,
      cse_app_validity: validationDate,
    }),
    onSubmit: async (values, { resetForm }) => {
      const plantilla =
        reference?.cse_id === undefined ? "" : `/${reference?.cse_id}`;
      const link =
        endpoint === undefined
          ? "new-csc-eleigibility" + plantilla
          : endpoint + plantilla;
      dispatch(setBusy(true));
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
      cscPdsForm.setTouched({}, false);
    }
    if (reference !== undefined) {
      cscPdsForm.setFieldValue("cse_app_title", {
        label: eligibilityInputItems[reference?.cse_app_title]?.label,
        value: reference?.cse_app_title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplay]);

  const [selectFocus, setSelectFocus] = useState();

  const style = {
    control: (provided, state) => ({
      backgroundColor: "white",
      border: state.isFocused
        ? "1px solid 	#55555599 !important"
        : "1px solid #55555555 !important",
      borderRadius: 5,
      fontSize: "small",
      ...provided,
      boxShadow: "none",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "200ms";
      const color = selectFocus ? "black" : "#55555599";
      return {
        ...provided,
        opacity,
        color,
        transition,
      };
    },
  };

  return (
    <React.Fragment>
      <ModalComponent
        title="Civil Service Eligibility"
        onSubmitName="Save"
        onCloseName={remove === undefined ? "Close" : "Delete"}
        isDisplay={isDisplay}
        onSubmit={cscPdsForm.handleSubmit}
        onSubmitType="submit"
        onPressed={remove}
        onClose={onClose}
      >
        <div className="add-csc-modal-container">
          <br />
          <div className="first-type-div">
            <label>
              Career Service/RA 1080 (Board Bar) Under Special Law/ CES/ CSEE
              Barangay Eligibility, Driver's License
            </label>
            <Creatable
              isClearable
              placeholder=""
              value={cscPdsForm.values.cse_app_title}
              error={cscPdsForm?.errors?.cse_app_title}
              name="cse_app_title"
              simpleValue
              onFocus={() => setSelectFocus(true)}
              onBlur={() => setSelectFocus(false)}
              options={eligibilityInputItems}
              styles={style}
              onChange={(value) => {
                cscPdsForm.setFieldValue("cse_app_title", value);
              }}
            />
            {cscPdsForm.touched.cse_app_title &&
            cscPdsForm.errors.cse_app_title ? (
              <span className="invalid-response">
                {cscPdsForm.errors.cse_app_title}
              </span>
            ) : null}
          </div>

          <div className="second-type-div">
            <div className="rating">
              <label>Rating (if applicable)</label>
              <InputComponent
                maxLenght="5"
                name="cse_app_rating"
                value={cscPdsForm.values.cse_app_rating}
                onChange={cscPdsForm.handleChange}
                placeholder=""
              />
              {cscPdsForm.touched.cse_app_rating &&
              cscPdsForm.errors.cse_app_rating ? (
                <span className="invalid-response">
                  {cscPdsForm.errors.cse_app_rating}
                </span>
              ) : null}
            </div>
            <div className="examination-date">
              <label>Date of Examination Conferment</label>
              <InputComponent
                maxLenght="150"
                type="date"
                name="cse_app_date"
                value={cscPdsForm.values.cse_app_date}
                onChange={cscPdsForm.handleChange}
              />
              {cscPdsForm.touched.cse_app_date &&
              cscPdsForm.errors.cse_app_date ? (
                <span className="invalid-response">
                  {cscPdsForm.errors.cse_app_date}
                </span>
              ) : null}
            </div>
          </div>

          <div className="first-type-div">
            <label>Place of Examination/Confernment</label>
            <InputComponent
              name="cse_app_place"
              value={cscPdsForm.values.cse_app_place}
              onChange={cscPdsForm.handleChange}
            />
            {cscPdsForm.touched.cse_app_place &&
            cscPdsForm.errors.cse_app_place ? (
              <span className="invalid-response">
                {cscPdsForm.errors.cse_app_place}
              </span>
            ) : null}
          </div>

          <div className="second-type-div">
            <div className="license-number">
              <label>License Number (if applicable)</label>
              <InputComponent
                maxLenght="30"
                name="cse_app_license"
                value={cscPdsForm.values.cse_app_license}
                onChange={cscPdsForm.handleChange}
              />
              {cscPdsForm.touched.cse_app_license &&
              cscPdsForm.errors.cse_app_license ? (
                <span className="invalid-response">
                  {cscPdsForm.errors.cse_app_license}
                </span>
              ) : null}
            </div>
            <div className="validity">
              <label>Date of Validity</label>
              <InputComponent
                type="date"
                name="cse_app_validity"
                value={cscPdsForm.values.cse_app_validity}
                onChange={cscPdsForm.handleChange}
              />
              {cscPdsForm.touched.cse_app_validity &&
              cscPdsForm.errors.cse_app_validity ? (
                <span className="invalid-response">
                  {cscPdsForm.errors.cse_app_validity}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default ThreeAddCivilServiceModal;
