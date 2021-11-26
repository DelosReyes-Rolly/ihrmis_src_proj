import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { useLocationHelper } from "../../../../helpers/use_hooks/location_helper";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import InputComponent from "../../../common/input_component/input_component/input_component";
import SelectComponent from "../../../common/input_component/select_component/select_component";
import CheckboxComponent from "../../../common/input_component/checkbox_input_component/checkbox_input_component";
import { setBusy } from "../../../../features/reducers/popup_response";
import ReCAPTCHA from "react-google-recaptcha";
import { IoCopySharp } from "react-icons/io5";
import CitizenshipFormOne from "../citizenship_form_one";
import { formOneInput } from "../../static/input_items";
import countryList from "iso-3166-country-list";
import phil from "phil-reg-prov-mun-brgy";
import PrevNextSubButtons from "../prev_next_sub_buttons";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import DostHeader from "../dost_header";
import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useLocation, useNavigate, useParams } from "react-router";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";

const FormPageOne = () => {
  useScrollToTop();
  // ===================================
  // CUSTOM HOOK SERVICE
  // ===================================
  // FOR FORM
  const [applicantDataHolder, setDataInput, arrInput, setter] = useFormHelper(
    {}
  );
  // FOR GETTING BRGY, MUNICIPALITY, PROVINCE STATES
  const [resCity, resBrgy, getResCity, getResBrgy] = useLocationHelper();
  const [perCity, perBrgy, getPerCity, getPerBrgy] = useLocationHelper();
  // FOR CLOSING POPUPS
  const { renderFail, renderSuccess } = usePopUpHelper();
  // ===================================
  // REDUX STATE AND FUNCIONALITIES
  // ===================================
  const dispatch = useDispatch();
  const errorObj = useSelector((state) => state.error.objectError);
  const errorMsg = useSelector((state) => state.error.messageError);

  // ===================================
  // HANDLING ROUTES
  // ===================================
  const { item } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // ===================================
  // DISPLAYING SELECT MENU IN CITIZENSHIP
  // ===================================
  const [isDisplaySelect, setIsDisplaySelect] = useState(undefined);
  // ===================================
  // CAPTCHA LOGIC STATE
  // ===================================
  const [verifyCapcha, setVerifyCaptcha] = useState(false); // Use for determining if user successfully finish the captcha
  const [captcha, setCaptcha] = useState(false); // Use for displaying captcha input error handling

  // ===================================
  // ADDRESS FUNCTION AND STATE
  // ===================================
  const [diplayPermanent, setdiplayPermanent] = useState(true);
  const setCopiedAddress = () => {
    setdiplayPermanent(!diplayPermanent);
    arrInput("copied_addr", diplayPermanent);
  };

  // ===================================
  //  SUBBMIT HANDLER
  // ===================================
  const submitHandler = async (e) => {
    e.preventDefault();
    if (verifyCapcha == true) {
      dispatch(setBusy(true));
      await useAxiosRequestHelper
        .post(applicantDataHolder, "new-applicant", item)
        .then(() => {
          dispatch(setObjectError(undefined));

          renderSuccess();
          if (item === undefined) {
            navigate(
              "/ihrmis/pds-applicant/email-confirmation/" +
                applicantDataHolder.app_email_addr
            );
          }
        })
        .catch((err) => {
          renderFail();
          if (typeof err === "object") {
            dispatch(setObjectError(err));
            dispatch(setMessageError("Unprocessable Entity"));
          } else {
            dispatch(setMessageError(err));
          }
        });
      dispatch(setBusy(false));
      setCaptcha(false);
    } else {
      renderFail();
      setCaptcha(true);
    }
  };

  const getApplicantRecord = async () => {
    await axios.get(API_HOST + `/get-new-applicant/${item}`).then((res) => {
      const data = res ? res.data.data : undefined;

      getResCity(data.res_province ?? "");
      getResBrgy(data.res_municipality ?? "");
      getPerCity(data.per_province ?? "");
      getPerBrgy(data.per_municipality ?? "");

      setIsDisplaySelect(data ? data.app_filipino : "");
      setter({
        app_nm_last: data ? data.app_nm_last : "",
        app_nm_first: data ? data.app_nm_first : "",
        app_nm_extn: data ? data.app_nm_extn : "",
        app_nm_mid: data ? data.app_nm_mid : "",

        app_birth_date: data ? data.app_birth_date : "",
        app_birth_place: data ? data.app_birth_place : "",
        app_sex: data ? data.app_sex : "",
        app_blood_type: data ? data.app_blood_type : "",
        app_civil_status: data ? data.app_civil_status : "",
        app_height: data ? data.app_height : "",
        app_weight: data ? data.app_weight : "",

        app_gsis: data ? data.app_gsis : "",
        app_pagibig: data ? data.app_pagibig : "",
        app_philhealth: data ? data.app_philhealth : "",
        app_sss: data ? data.app_sss : "",
        app_tin: data ? data.app_tin : "",
        app_emp_no: data ? data.app_emp_no : "",

        //CIVI STATUS
        app_filipino: data ? data.app_filipino : "",
        app_dual_type: data ? data.app_dual_type : "",
        app_dual_cny_id: data ? data.app_dual_cny_id : "",

        res_block_lot: data ? data.res_block_lot : "",
        res_street: data ? data.res_street : "",
        res_sub_village: data ? data.res_sub_village : "",
        res_zip_code: data ? data.res_zip_code : "",
        res_barangay: data ? data.res_barangay : "",
        res_municipality: data ? data.res_municipality : "",
        res_province: data ? data.res_province : "",

        per_block_lot: data ? data.per_block_lot : "",
        per_street: data ? data.per_street : "",
        per_sub_village: data ? data.per_sub_village : "",
        per_zip_code: data ? data.per_zip_code : "",
        per_barangay: data ? data.per_barangay : "",
        per_municipality: data ? data.per_municipality : "",
        per_province: data ? data.per_province : "",

        app_tel_no: data ? data.app_tel_no : "",
        app_mobile_no: data ? data.app_mobile_no : "",
        app_email_addr: data ? data.app_email_addr : "",
      });
    });
  };
  const checkItemIfNull = () => {
    if (item !== undefined) setVerifyCaptcha(!verifyCapcha);
  };
  useEffect(() => {
    checkItemIfNull();
    arrInput("copied_addr", !diplayPermanent);
    getApplicantRecord();
  }, []);

  return (
    <React.Fragment>
      <div className="pds-profile-main-view">
        {/* 
            //==========================================
            // PDS ON-210 MAIN HEADER
            //==========================================
        */}

        <DostHeader />
        <br />

        {/* 
            //==========================================
            // PDS ON-210 FORM SERVER ERROR RESPONSE 
            //==========================================
        */}
        {captcha ? (
          <ValidationComponent title="FAILED TO SUBMIT">
            {captcha && <p>Please Complete the CAPTCHA</p>}
          </ValidationComponent>
        ) : errorMsg !== undefined || errorMsg == "" ? (
          <ValidationComponent title="FAILED TO SUBMIT">
            <p>{errorMsg}</p>
          </ValidationComponent>
        ) : null}
        <br />

        {/* 
            //==========================================
            // PDS ON-210 FORM SECTION 
            //==========================================
        */}

        <form style={{ boxSizing: "border-box" }} onSubmit={submitHandler}>
          {/* 
              //==========================================
              // FORM HEADER SECTION 
              //==========================================
          */}
          <table id="custom-table">
            <thead>
              <tr className="main-headers">
                <th className="">I. PERSONAL INFORMATION</th>
              </tr>
            </thead>
          </table>
          <br />

          {/* 
              //==========================================
              // USER NAME INFORMATION SECTION 
              //==========================================
          */}

          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Surname</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_nm_last : ""}
              </span>
              <InputComponent
                maxLength="50"
                value={applicantDataHolder.app_nm_last ?? ""}
                name="app_nm_last"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>First Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_nm_first : ""}
              </span>
              <InputComponent
                maxLength="50"
                value={applicantDataHolder.app_nm_first ?? ""}
                name="app_nm_first"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Name Extension (Jr., Sr.)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_nm_extn : ""}
              </span>
              <InputComponent
                maxLength="10"
                value={applicantDataHolder.app_nm_extn ?? ""}
                name="app_nm_extn"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Middle Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_nm_mid : ""}
              </span>
              <InputComponent
                maxLength="50"
                value={applicantDataHolder.app_nm_mid ?? ""}
                name="app_nm_mid"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
          </div>
          <br />

          {/* 
              //==========================================
              // OTHER USER INFORMATION SECTION 
              //==========================================
          */}
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "25%" }}>
              <label> Date of Birth</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_birth_date : ""}
              </span>
              <InputComponent
                type="date"
                value={applicantDataHolder.app_birth_date ?? ""}
                name="app_birth_date"
                onChange={(e) => setDataInput(e)}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "45%" }}
            >
              <label>Place of Birth</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_birth_place : ""}
              </span>
              <InputComponent
                maxLength="50"
                value={applicantDataHolder.app_birth_place ?? ""}
                name="app_birth_place"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "15%" }}
            >
              <label>Sex</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sex : ""}
              </span>
              <SelectComponent
                name="app_sex"
                itemList={formOneInput.sex}
                value={applicantDataHolder.app_sex ?? ""}
                defaultTitle="Sex"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "15%" }}>
              <label>Blood Type</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_blood_type : ""}
              </span>
              <SelectComponent
                name="app_blood_type"
                itemList={formOneInput.blood_type}
                value={applicantDataHolder.app_blood_type ?? ""}
                defaultTitle="Blood Type"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "25%" }}>
              <label>Civil Status</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_civil_status : ""}
              </span>
              <SelectComponent
                name="app_civil_status"
                itemList={formOneInput.civil_status}
                value={applicantDataHolder.app_civil_status ?? ""}
                defaultTitle="Civil Status"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "45%" }}
            >
              <label>If others, please specify</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_civil_others : ""}
              </span>
              <InputComponent
                maxLength="50"
                value={applicantDataHolder.app_civil_others ?? ""}
                name="app_civil_others"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "15%" }}
            >
              <label>Height (m)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_height : ""}
              </span>
              <InputComponent
                maxLength="6"
                minLength="3"
                value={applicantDataHolder.app_height ?? ""}
                name="app_height"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "15%" }}>
              <label>Weight (kg)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_weight : ""}
              </span>
              <InputComponent
                maxLength="6"
                minLength="3"
                value={applicantDataHolder.app_weight ?? ""}
                name="app_weight"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
          </div>

          {/* 
              //==========================================
              // EMPLOYMENT INFORMATION SECTION 
              //==========================================
          */}
          <div className="pds-prof-class-one">
            <div
              className="pds-prof-class-one"
              style={{ marginBottom: "10px" }}
            >
              <div style={{ marginRight: "5px", width: "33%" }}>
                <label>GSIS ID No.</label>
                <span className="invalid-response">
                  {errorObj ? errorObj.app_gsis : ""}
                </span>
                <InputComponent
                  maxLength="20"
                  value={applicantDataHolder.app_gsis ?? ""}
                  name="app_gsis"
                  onChange={(e) => {
                    setDataInput(e);
                  }}
                />
              </div>
              <div
                style={{ marginRight: "5px", marginLeft: "5px", width: "33%" }}
              >
                <label>PAG-IBIG ID No</label>
                <span className="invalid-response">
                  {errorObj ? errorObj.app_pagibig : ""}
                </span>
                <InputComponent
                  maxLength="20"
                  name="app_pagibig"
                  value={applicantDataHolder.app_pagibig ?? ""}
                  onChange={(e) => {
                    setDataInput(e);
                  }}
                />
              </div>
              <div style={{ marginLeft: "5px", width: "33%" }}>
                <label>PHILHEALTH No.</label>
                <span className="invalid-response">
                  {errorObj ? errorObj.app_philhealth : ""}
                </span>
                <InputComponent
                  page="1"
                  maxLength="20"
                  value={applicantDataHolder.app_philhealth ?? ""}
                  name="app_philhealth"
                  onChange={(e) => {
                    setDataInput(e);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pds-prof-class-one">
            <div
              className="pds-prof-class-one"
              style={{ marginBottom: "10px" }}
            >
              <div style={{ marginRight: "5px", width: "33%" }}>
                <label>SSS No.</label>
                <span className="invalid-response">
                  {errorObj ? errorObj.app_sss : ""}
                </span>
                <InputComponent
                  maxLength="20"
                  name="app_sss"
                  value={applicantDataHolder.app_sss ?? ""}
                  onChange={(e) => {
                    setDataInput(e);
                  }}
                />
              </div>
              <div
                style={{ marginRight: "5px", marginLeft: "5px", width: "33%" }}
              >
                <label>TIN No</label>
                <span className="invalid-response">
                  {errorObj ? errorObj.app_tin : ""}
                </span>
                <InputComponent
                  maxLength="20"
                  value={applicantDataHolder.app_tin ?? ""}
                  name="app_tin"
                  onChange={(e) => {
                    setDataInput(e);
                  }}
                />
              </div>
              <div style={{ marginLeft: "5px", width: "33%" }}>
                <label>Agency Employee No.</label>
                <span className="invalid-response">
                  {errorObj ? errorObj.app_emp_no : ""}
                </span>
                <InputComponent
                  maxLength="20"
                  value={applicantDataHolder.app_emp_no ?? ""}
                  name="app_emp_no"
                  onChange={(e) => {
                    setDataInput(e);
                  }}
                />
              </div>
            </div>
          </div>
          <br />

          {/* 
              //==========================================
              // CITIZENSHIP INFORMATION SECTION 
              //==========================================
          */}
          <h5 style={{ color: "rgba(54, 58, 63, 0.8)", marginBottom: "10px" }}>
            CITIZENSHIP
            <span className="invalid-response">
              {errorObj ? errorObj.app_filipino ?? "" : null}
            </span>
          </h5>
          <div className="pds-prof-class-one">
            <div className="citizenship-container">
              <div className="div-1">
                <CitizenshipFormOne
                  name="app_filipino"
                  value={applicantDataHolder.app_filipino ?? undefined}
                  onChange={(e) => {
                    setDataInput(e);
                    setIsDisplaySelect(e.target.value);
                  }}
                  display={isDisplaySelect}
                >
                  <div
                    className="invalid-response"
                    style={{ marginLeft: "0px" }}
                  >
                    {errorObj ? `${errorObj.app_dual_cny_id ?? ""}` : null}
                  </div>
                  <SelectComponent
                    name="app_dual_cny_id"
                    defaultTitle="Specify Country"
                    itemList={countryList}
                    value={applicantDataHolder.app_dual_cny_id ?? ""}
                    onChange={(e) => {
                      {
                        setDataInput(e);
                      }
                    }}
                  />
                </CitizenshipFormOne>
              </div>

              <div className="div-2">
                {isDisplaySelect == 1 && (
                  <div className="checked-dropdown">
                    <div className="checked-1">
                      <CheckboxComponent
                        name="is_dual_citizen"
                        value="1"
                        onChange={(e) => {
                          setDataInput(e);
                        }}
                      />
                      <span className="margin-left-1">Dual Citizen</span>
                    </div>
                    <div className="checked-2">
                      <div
                        className="invalid-response"
                        style={{ marginLeft: "0px" }}
                      >
                        {errorObj ? `${errorObj.app_dual_type ?? ""}` : null}
                      </div>

                      <SelectComponent
                        name="app_dual_type"
                        defaultTitle="Specify Country"
                        itemList={formOneInput.dual_citizen_type}
                        value={applicantDataHolder.app_dual_type ?? ""}
                        onChange={(e) => {
                          setDataInput(e);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <br />

          {/* 
            //==========================================
            // RESEDENTIAL ADDRESS INFORMATION SECTION 
            //==========================================
          */}

          <h5 style={{ color: "rgba(54, 58, 63, 0.8)", marginBottom: "10px" }}>
            RESIDENTIAL ADDRESS
          </h5>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "20%" }}>
              <label>House/Block/Lot No.</label>
              <span className="invalid-response">
                {errorObj ? errorObj.res_block_lot : ""}
              </span>
              <InputComponent
                maxLength="30"
                value={applicantDataHolder.res_block_lot ?? ""}
                name="res_block_lot"
                onChange={(e) => setDataInput(e)}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "25%" }}
            >
              <label>Street</label>
              <span className="invalid-response">
                {errorObj ? errorObj.res_street : ""}
              </span>
              <InputComponent
                maxLength="40"
                value={applicantDataHolder.res_street ?? ""}
                name="res_street"
                onChange={(e) => setDataInput(e)}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "40%" }}
            >
              <label>Subdivision/Village</label>
              <span className="invalid-response">
                {errorObj ? errorObj.res_sub_village : ""}
              </span>
              <InputComponent
                maxLength="40"
                value={applicantDataHolder.res_sub_village ?? ""}
                name="res_sub_village"
                onChange={(e) => setDataInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "15%" }}>
              <label>Zip Code</label>
              <span className="invalid-response">
                {errorObj ? errorObj.res_zip_code : ""}
              </span>
              <InputComponent
                maxLength="4"
                value={applicantDataHolder.res_zip_code ?? ""}
                name="res_zip_code"
                onChange={(e) => setDataInput(e)}
              />
            </div>
          </div>

          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "33%" }}>
              <label>Province</label>
              <span className="invalid-response">
                {errorObj ? errorObj.res_province : ""}
              </span>
              <SelectComponent
                name="res_province"
                defaultTitle="Province"
                value={applicantDataHolder.res_province ?? ""}
                itemList={phil.provinces}
                onChange={(e) => {
                  setDataInput(e);
                  getResCity(e.target.value);
                }}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "33%" }}
            >
              <label>City/Municipality</label>
              <span className="invalid-response">
                {errorObj ? errorObj.res_municipality : ""}
              </span>
              <SelectComponent
                name="res_municipality"
                defaultTitle="City"
                value={applicantDataHolder.res_municipality ?? ""}
                itemList={resCity == null ? [] : resCity}
                onChange={(e) => {
                  setDataInput(e);
                  getResBrgy(e.target.value);
                }}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "33%" }}>
              <label>Barangay</label>
              <span className="invalid-response">
                {errorObj ? errorObj.res_barangay : ""}
              </span>
              <SelectComponent
                name="res_barangay"
                value={applicantDataHolder.res_barangay ?? ""}
                defaultTitle="Barangay"
                itemList={resBrgy == null ? [] : resBrgy}
                onChange={(e) => setDataInput(e)}
              />
            </div>
          </div>

          <br />
          {/* 
              //==========================================
              // PERMANENT ADDRESS INFORMATION SECTION
              //==========================================
          */}

          <div className="per-address-head">
            {/* header of permanent address */}
            <h5 style={{ color: "rgba(54, 58, 63, 0.8)" }}>
              PERMANENT ADDRESS
            </h5>
            <span
              className="res-address-copy"
              onClick={() => setCopiedAddress()}
            >
              <IoCopySharp className="copy-icon" size="14px" />{" "}
              {diplayPermanent
                ? "Input Permanent Address"
                : "Copy Resedential Address"}
            </span>
          </div>
          {diplayPermanent == true && (
            <div>
              <div
                className="pds-prof-class-one"
                style={{ marginBottom: "10px" }}
              >
                <div style={{ marginRight: "5px", width: "20%" }}>
                  <label>House/Block/Lot No.</label>
                  <span className="invalid-response">
                    {errorObj ? errorObj.per_block_lot : ""}
                  </span>
                  <InputComponent
                    maxLength="30"
                    name="per_block_lot"
                    value={applicantDataHolder.per_block_lot ?? ""}
                    onChange={(e) => setDataInput(e)}
                  />
                </div>
                <div
                  style={{
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "25%",
                  }}
                >
                  <label>Street</label>
                  <span className="invalid-response">
                    {errorObj ? errorObj.per_street : ""}
                  </span>
                  <InputComponent
                    maxLength="40"
                    name="per_street"
                    value={applicantDataHolder.per_street ?? ""}
                    onChange={(e) => setDataInput(e)}
                  />
                </div>
                <div
                  style={{
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "40%",
                  }}
                >
                  <label>Subdivision/Village</label>
                  <span className="invalid-response">
                    {errorObj ? errorObj.per_sub_village : ""}
                  </span>
                  <InputComponent
                    maxLength="40"
                    name="per_sub_village"
                    value={applicantDataHolder.per_sub_village ?? ""}
                    onChange={(e) => setDataInput(e)}
                  />
                </div>
                <div style={{ marginLeft: "5px", width: "15%" }}>
                  <label>Zip Code</label>
                  <span className="invalid-response">
                    {errorObj ? errorObj.per_zip_code : ""}
                  </span>
                  <InputComponent
                    maxLength="4"
                    name="per_zip_code"
                    value={applicantDataHolder.per_zip_code ?? ""}
                    onChange={(e) => setDataInput(e)}
                  />
                </div>
              </div>
              <div
                className="pds-prof-class-one"
                style={{ marginBottom: "10px" }}
              >
                <div style={{ marginRight: "5px", width: "33%" }}>
                  <label>Barangay</label>
                  <span className="invalid-response">
                    {errorObj ? errorObj.per_province : ""}
                  </span>
                  <SelectComponent
                    name="per_province"
                    defaultTitle="Province"
                    itemList={phil.provinces}
                    value={applicantDataHolder.per_province ?? ""}
                    onChange={(e) => {
                      setDataInput(e);
                      getPerCity(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "33%",
                  }}
                >
                  <label>City/Municipality</label>
                  <span className="invalid-response">
                    {errorObj ? errorObj.per_municipality : ""}
                  </span>
                  <SelectComponent
                    name="per_municipality"
                    defaultTitle="City"
                    itemList={perCity == null ? [] : perCity}
                    value={applicantDataHolder.per_municipality ?? ""}
                    onChange={(e) => {
                      setDataInput(e);
                      getPerBrgy(e.target.value);
                    }}
                  />
                </div>
                <div style={{ marginLeft: "5px", width: "33%" }}>
                  <label>Province</label>
                  <span className="invalid-response">
                    {errorObj ? errorObj.per_barangay : ""}
                  </span>
                  <SelectComponent
                    name="per_barangay"
                    defaultTitle="Barangay"
                    value={applicantDataHolder.per_barangay ?? ""}
                    itemList={perBrgy == null ? [] : perBrgy}
                    onChange={(e) => setDataInput(e)}
                  />
                </div>
              </div>
            </div>
          )}
          <br />
          {/* 
              //==========================================
              // CONTACT INFORMATION SECTION
              //==========================================
          */}
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "30%" }}>
              <label>Telephone No.</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_tel_no : ""}
              </span>
              <InputComponent
                maxLength="50"
                name="app_tel_no"
                value={applicantDataHolder.app_tel_no ?? ""}
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div
              style={{ marginRight: "5px", marginLeft: "5px", width: "30%" }}
            >
              <label>Mobile No</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_mobile_no : ""}
              </span>
              <InputComponent
                maxLength="50"
                value={applicantDataHolder.app_mobile_no ?? ""}
                name="app_mobile_no"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "40%" }}>
              <label>Email Address</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_email_addr : ""}
              </span>
              <InputComponent
                maxLength="150"
                value={applicantDataHolder.app_email_addr ?? ""}
                name="app_email_addr"
                onChange={(e) => {
                  setDataInput(e);
                }}
              />
            </div>
          </div>
          <br />
          <br />

          {/* 
              //==========================================
              // CAPTCHA INFORMATION SECTION
              //==========================================
          */}
          <div
            className={"pds-prof-class-two"}
            style={
              item == undefined
                ? { justifyContent: "space-between" }
                : { justifyContent: "end" }
            }
          >
            {item === undefined ? (
              <div>
                <ReCAPTCHA
                  sitekey="6LdIujEcAAAAAJRdTNTP0jkmHt60fVZMlj7Fn7nT"
                  onChange={() => setVerifyCaptcha(true)}
                  onExpired={() => {
                    if (item === undefined) {
                      setVerifyCaptcha(false);
                    }
                  }}
                  onErrored={() => setVerifyCaptcha(false)}
                />
              </div>
            ) : undefined}
            <div>
              <PrevNextSubButtons
                page={1}
                onClickNext={() => {
                  navigate(`/ihrmis/pds-applicant/form-page-two/${item}`);
                  dispatch(setMessageError(undefined));
                }}
              />
            </div>
          </div>
        </form>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default FormPageOne;
