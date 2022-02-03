import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import axios from "axios";
import {
  validationRequiredNum,
  API_HOST,
  validationName,
  validationRequired,
  validationDate,
  yesterday,
} from "../../../../helpers/global/global_config";
import { useToggleHelper } from "../../../../helpers/use_hooks/toggle_helper";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";
import { useFormik } from "formik";
import * as Yup from "yup";
import DostHeader from "../dost_header";
import PrevNextSubButtons from "../prev_next_sub_buttons";
import useAxiosHelper from "../../../../helpers/use_hooks/axios_helper";

const FormPageTwo = () => {
  useScrollToTop();
  const [getApplicantData, setGetApplicantData] = useState();
  // =====================================
  // CUSTOM HOOK SERVICES
  // =====================================
  const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();

  // ===================================
  // REDUX STATE AND FUNCIONALITIES
  // ===================================
  const dispatch = useDispatch();

  // ===================================
  // HANDLING ROUTES
  // ===================================
  let navigate = useNavigate();
  const { item } = useParams();

  const pdsTwoInputHandler = useFormik({
    enableReinitialize: true,
    initialValues: {
      app_sps_nm_last: getApplicantData?.app_sps_nm_last ?? "",
      app_sps_nm_first: getApplicantData?.app_sps_nm_first ?? "",
      app_sps_nm_mid: getApplicantData?.app_sps_nm_mid ?? "",
      app_sps_nm_extn: getApplicantData?.app_sps_nm_extn ?? "",
      app_sps_occupation: getApplicantData?.app_sps_occupation ?? "",
      app_sps_bus_name: getApplicantData?.app_sps_bus_name ?? "",
      app_sps_bus_addr: getApplicantData?.app_sps_bus_addr ?? "",
      app_sps_tel_no: getApplicantData?.app_sps_tel_no ?? "",

      app_fthr_nm_last: getApplicantData?.app_fthr_nm_last ?? "",
      app_fthr_nm_first: getApplicantData?.app_fthr_nm_first ?? "",
      app_fthr_nm_mid: getApplicantData?.app_fthr_nm_mid ?? "",
      app_fthr_nm_extn: getApplicantData?.app_fthr_nm_extn ?? "",

      app_mthr_nm_last: getApplicantData?.app_mthr_nm_last ?? "",
      app_mthr_nm_first: getApplicantData?.app_mthr_nm_first ?? "",
      app_mthr_nm_mid: getApplicantData?.app_mthr_nm_mid ?? "",
      app_mthr_nm_extn: getApplicantData?.app_mthr_nm_extn ?? "",
    },
    validationSchema: Yup.object({
      app_sps_nm_last: validationName,
      app_sps_nm_first: validationName,
      app_sps_nm_mid: validationName,
      app_sps_nm_extn: validationName,
      app_sps_occupation: validationRequired,
      app_sps_bus_name: validationRequired,
      app_sps_bus_addr: validationRequired,
      app_sps_tel_no: validationRequiredNum,

      app_fthr_nm_last: validationName,
      app_fthr_nm_first: validationName,
      app_fthr_nm_mid: validationName,
      app_fthr_nm_extn: validationName,

      app_mthr_nm_last: validationName,
      app_mthr_nm_first: validationName,
      app_mthr_nm_mid: validationName,
      app_mthr_nm_extn: validationName,
    }),
    onSubmit: async (values) => {
      renderBusy(true);
      await useAxiosHelper
        .post(values, "new-afc", item)
        .then((res) => renderSucceed({ content: "Form submitted" }))
        .catch((err) => {
          renderFailed({ content: err.message });
          console.log(err);
        });
      renderBusy(false);
    },
  });

  const getFamilyRecord = async () => {
    await axios.get(API_HOST + "get-new-family/" + item).then((res) => {
      let data = res.data.data ? res.data.data : undefined;
      setGetApplicantData({ ...data });
    });
  };
  useEffect(() => {
    getFamilyRecord();
  }, []);

  // =============================================
  // CHILDREN STATE AND DATA
  // =============================================
  const [toggleState, enableToggle] = useToggleHelper();
  const [displayChildren, setDisplayChildren] = useState();
  const getChildrenRecord = async () => {
    await axios.get(API_HOST + "new-children/" + item).then((response) => {
      setDisplayChildren(response.data.data);
    });
  };
  useEffect(() => {
    getChildrenRecord();
  }, [toggleState]);

  return (
    <div className="pds-profile-main-view">
      <DostHeader />
      <br />
      <table id="custom-table">
        <thead>
          <tr className="main-headers">
            <th className="">II. FAMILY BACKGROUND</th>
          </tr>
        </thead>
      </table>
      <br />
      {/* 
        // =============================================
        // SPOUSE INFORMATION
        // =============================================
      */}
      <form id="form-family" onSubmit={pdsTwoInputHandler.handleSubmit}>
        <div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>SPOUSE's Surname</label>
              <InputComponent
                maxLenght="50"
                name="app_sps_nm_last"
                value={pdsTwoInputHandler.values.app_sps_nm_last}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_nm_last &&
              pdsTwoInputHandler.errors.app_sps_nm_last ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_nm_last}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>First Name</label>
              <InputComponent
                maxLenght="50"
                name="app_sps_nm_first"
                value={pdsTwoInputHandler.values.app_sps_nm_first}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_nm_first &&
              pdsTwoInputHandler.errors.app_sps_nm_first ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_nm_first}
                </span>
              ) : null}
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Middle Name</label>
              <InputComponent
                maxLenght="50"
                name="app_sps_nm_mid"
                value={pdsTwoInputHandler.values.app_sps_nm_mid}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_nm_mid &&
              pdsTwoInputHandler.errors.app_sps_nm_mid ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_nm_mid}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Name Extension (Jr., Sr.)</label>
              <InputComponent
                maxLenght="10"
                name="app_sps_nm_extn"
                value={pdsTwoInputHandler.values.app_sps_nm_extn}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_nm_extn &&
              pdsTwoInputHandler.errors.app_sps_nm_extn ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_nm_extn}
                </span>
              ) : null}
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Occupation</label>
              <InputComponent
                maxLenght="150"
                name="app_sps_occupation"
                value={pdsTwoInputHandler.values.app_sps_occupation}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_occupation &&
              pdsTwoInputHandler.errors.app_sps_occupation ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_occupation}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Employer/Business Name</label>
              <InputComponent
                maxLenght="150"
                name="app_sps_bus_name"
                value={pdsTwoInputHandler.values.app_sps_bus_name}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_bus_name &&
              pdsTwoInputHandler.errors.app_sps_bus_name ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_bus_name}
                </span>
              ) : null}
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "65%" }}>
              <label>Business Address</label>
              <InputComponent
                maxLenght="255"
                name="app_sps_bus_addr"
                value={pdsTwoInputHandler.values.app_sps_bus_addr}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_bus_addr &&
              pdsTwoInputHandler.errors.app_sps_bus_addr ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_bus_addr}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "35%" }}>
              <label>Telephone No.</label>
              <InputComponent
                maxLenght="50"
                name="app_sps_tel_no"
                value={pdsTwoInputHandler.values.app_sps_tel_no}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_sps_tel_no &&
              pdsTwoInputHandler.errors.app_sps_tel_no ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_sps_tel_no}
                </span>
              ) : null}
            </div>
          </div>{" "}
          <br />
          <br />
          {/* 
              // =============================================
              // FATHERS INFORMATION
              // =============================================
          */}
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>FATHERS's Surname</label>
              <InputComponent
                maxLenght="50"
                name="app_fthr_nm_last"
                value={pdsTwoInputHandler.values.app_fthr_nm_last}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_fthr_nm_last &&
              pdsTwoInputHandler.errors.app_fthr_nm_last ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_fthr_nm_last}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>First Name</label>
              <InputComponent
                maxLenght="50"
                name="app_fthr_nm_first"
                value={pdsTwoInputHandler.values.app_fthr_nm_first}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_fthr_nm_first &&
              pdsTwoInputHandler.errors.app_fthr_nm_first ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_fthr_nm_first}
                </span>
              ) : null}
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Middle Name</label>

              <InputComponent
                name="app_fthr_nm_mid"
                maxLenght="50"
                value={pdsTwoInputHandler.values.app_fthr_nm_mid}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_fthr_nm_mid &&
              pdsTwoInputHandler.errors.app_fthr_nm_mid ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_fthr_nm_mid}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Name Extension (Jr., Sr.)</label>
              <InputComponent
                maxLenght="10"
                name="app_fthr_nm_extn"
                value={pdsTwoInputHandler.values.app_fthr_nm_extn}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_fthr_nm_extn &&
              pdsTwoInputHandler.errors.app_fthr_nm_extn ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_fthr_nm_extn}
                </span>
              ) : null}
            </div>
          </div>
          <br />
          <br />
          {/* 
              // =============================================
              // MOTHERS MAIDEN INFORMATION
              // =============================================
          */}
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>MOTHER's MAIDEN Surname</label>
              <InputComponent
                maxLenght="50"
                name="app_mthr_nm_last"
                value={pdsTwoInputHandler.values.app_mthr_nm_last}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_mthr_nm_last &&
              pdsTwoInputHandler.errors.app_mthr_nm_last ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_mthr_nm_last}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>First Name</label>
              <InputComponent
                maxLenght="50"
                name="app_mthr_nm_first"
                value={pdsTwoInputHandler.values.app_mthr_nm_first}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_mthr_nm_first &&
              pdsTwoInputHandler.errors.app_mthr_nm_first ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_mthr_nm_first}
                </span>
              ) : null}
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>MOTHER's MAIDEN Middle Name</label>
              <InputComponent
                maxLenght="50"
                name="app_mthr_nm_mid"
                value={pdsTwoInputHandler.values.app_mthr_nm_mid}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_mthr_nm_mid &&
              pdsTwoInputHandler.errors.app_mthr_nm_mid ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_mthr_nm_mid}
                </span>
              ) : null}
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Name Extension (Jr., Sr.)</label>
              <InputComponent
                maxLenght="10"
                name="app_mthr_nm_extn"
                value={pdsTwoInputHandler.values.app_mthr_nm_extn}
                onChange={pdsTwoInputHandler.handleChange}
              />
              {pdsTwoInputHandler.touched.app_mthr_nm_extn &&
              pdsTwoInputHandler.errors.app_mthr_nm_extn ? (
                <span className="invalid-response">
                  {pdsTwoInputHandler.errors.app_mthr_nm_extn}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* 
            // =============================================
            // LIST OF CHILDREN INFORMATION
            // =============================================
        */}
      </form>

      <p style={{ color: "rgba(54, 58, 63, 0.8)", fontSize: "medium" }}>
        <strong>NAME OF CHILDREN</strong> (List all)
      </p>

      <br />
      <ChildrenList
        children={displayChildren}
        updateData={() => enableToggle()}
      />
      <br />
      <br />

      <div className="buttons-pos-right">
        <PrevNextSubButtons
          page="2"
          onClickBack={() => {
            navigate(`/pds-applicant/form-page-one/${item}`);
            dispatch(setMessageError(undefined));
          }}
          form="form-family"
          onClickNext={() => {
            navigate(`/pds-applicant/form-page-three/${item}`);
            dispatch(setMessageError(undefined));
          }}
        />
      </div>
    </div>
  );
};

export default FormPageTwo;

const ChildrenList = (props) => {
  const { item } = useParams();
  const { renderFailed } = usePopUpHelper();
  const removeChildRecord = async (id) => {
    await axios.delete(API_HOST + "new-children/" + id);
    props.updateData();
  };

  const pdsTwoInputChildren = useFormik({
    enableReinitialize: true,
    initialValues: {
      chi_app_name: "",
      chi_app_birthdate: "",
    },
    validationSchema: Yup.object({
      chi_app_name: validationName,
      chi_app_birthdate: validationDate.max(yesterday, "Invalid Birthdate"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await useAxiosHelper
        .post(values, "new-children", item)
        .then(() => {
          props.updateData();
          resetForm();
        })
        .catch((err) => {
          renderFailed({ content: err.message });
        });
    },
  });

  return (
    <React.Fragment>
      <div>
        <div className="pds-prof-class-one">
          <label style={{ marginRight: "5px", width: "70%" }}>Full Name</label>
          <label
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              width: "30%",
            }}
          >
            Date of Birth
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AiOutlineMinusCircle //HIDDEN BUTTON <--- DISREGARD THIS
              style={{ color: "white" }}
              size="22px"
              aria-hidden
            />
          </div>
        </div>

        {props.children &&
          props.children.map((item, key) => {
            return (
              <div className="pds-prof-class-two-children" key={key}>
                <div style={{ marginRight: "5px", width: "70%" }}>
                  <InputComponent
                    maxLenght="150"
                    value={item ? item.chi_app_name : ""}
                    readOnly={true}
                  />
                </div>
                <div
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    width: "30%",
                  }}
                >
                  <InputComponent
                    value={item ? item.chi_app_birthdate : ""}
                    readOnly={true}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AiOutlineMinusCircle
                    style={{ color: "red", cursor: "pointer" }}
                    size="22px"
                    onClick={() => {
                      removeChildRecord(item.chi_timestamp_id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        <form id="children-form" onSubmit={pdsTwoInputChildren.handleSubmit}>
          <div className="pds-prof-class-two-children">
            <div style={{ marginRight: "5px", width: "70%" }}>
              <InputComponent
                name="chi_app_name"
                value={pdsTwoInputChildren.values.chi_app_name}
                onChange={pdsTwoInputChildren.handleChange}
              />
              {pdsTwoInputChildren.touched.chi_app_name &&
              pdsTwoInputChildren.errors.chi_app_name ? (
                <span className="invalid-response error-position">
                  {pdsTwoInputChildren.errors.chi_app_name}
                </span>
              ) : null}
            </div>
            <div
              style={{ marginLeft: "5px", marginRight: "5px", width: "30%" }}
            >
              <InputComponent
                type="date"
                name="chi_app_birthdate"
                value={pdsTwoInputChildren.values.chi_app_birthdate}
                onChange={pdsTwoInputChildren.handleChange}
              />
              {pdsTwoInputChildren.touched.chi_app_birthdate &&
              pdsTwoInputChildren.errors.chi_app_birthdate ? (
                <span className="invalid-response error-position">
                  {pdsTwoInputChildren.errors.chi_app_birthdate}
                </span>
              ) : null}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                id="submit-child"
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  border: "0px",
                }}
              >
                <AiOutlinePlusCircle
                  type="submit"
                  style={{ color: "green", cursor: "pointer" }}
                  size="22px"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
