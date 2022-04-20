import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import useAxiosHelper from "../../../../helpers/use_hooks/axios_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ModalComponent from "../../../common/modal_component/modal_component";
import * as Yup from "yup";
import {
  validationDate,
  validationRequired,
  validationRequiredNum,
  yesterday,
} from "../../../../helpers/global/global_config";
import Creatable from "react-select/creatable";
import { eligibilityInputItems } from "../../static/input_items";

const ThreeAddCivilServiceModal = (props) => {
  // ===========================================================
  // CUSTOM HOOK SERVICE
  // ===========================================================
  const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();
  const style = {
    control: (provided, state) => ({
      backgroundColor: "white",
      border: state.isFocused
        ? "1px solid 	#A9A9A9 !important"
        : "1px solid #DCDCDC !important",
      borderRadius: 5,
      fontSize: "small",
      ...provided,
      boxShadow: "none",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return {
        ...provided,
        opacity,
        transition,
      };
    },
  };
  // ===========================================================
  // SUBMIT HANDLER
  // ===========================================================
  const cscPdsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      item: props?.data?.cse_app_time ?? "",
      cse_app_title: props?.data?.cse_app_title ?? [],
      cse_app_date: props?.data?.cse_app_date ?? "",
      cse_app_place: props?.data?.cse_app_place ?? "",
      cse_app_rating: props?.data?.cse_app_rating ?? "",
      cse_app_license: props?.data?.cse_app_license ?? "",
      cse_app_validity: props?.data?.cse_app_validity ?? "",
    },
    validationSchema: Yup.object({
      cse_app_title: Yup.array().required("This field is required"),
      cse_app_date: validationDate.max(yesterday, "Invalid Date"),
      cse_app_place: validationRequired,
      cse_app_rating: validationRequiredNum,
      cse_app_license: validationRequired,
      cse_app_validity: validationDate,
    }),
    onSubmit: async (values, { resetForm }) => {
      renderBusy(true);
      await useAxiosHelper
        .post(values, "new-csc-eleigibility", item)
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
        title="Civil Service Eligibility"
        onSubmitName="Save"
        onCloseName="Delete"
        isDisplay={props.isDisplay}
        onSubmit={cscPdsForm.handleSubmit}
        onSubmitType="submit"
        onPressed={props.onPressed}
        onClose={props.onClose}
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
              value={cscPdsForm.values.cse_app_title}
              error={cscPdsForm?.errors?.cse_app_title}
              name="cse_app_title"
              simpleValue
              options={eligibilityInputItems}
              styles={style}
              isMulti
              onChange={(value) => {
                cscPdsForm.setFieldValue("cse_app_title", value);
              }}
            />
            {/* <InputComponent
              name="cse_app_title"
              maxLenght="150"
              value={cscPdsForm.values.cse_app_title}
              onChange={cscPdsForm.handleChange}
            /> */}
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
                maxLenght="3"
                name="cse_app_rating"
                value={cscPdsForm.values.cse_app_rating}
                onChange={cscPdsForm.handleChange}
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
