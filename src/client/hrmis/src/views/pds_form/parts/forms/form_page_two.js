import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import PrevNextSubButtons from "../prev_next_sub_buttons";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import DostHeader from "../dost_header";
import axios from "axios";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useToggleHelper } from "../../../../helpers/use_hooks/toggle_helper";
import { setBusy } from "../../../../features/reducers/popup_response";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";

const FormPageTwo = () => {
  useScrollToTop();
  // =====================================
  // CUSTOM HOOK SERVICES
  // =====================================
  const [dataState, singleInput, multiInput, setter] = useFormHelper(); // FORM SERVICE
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
  let navigate = useNavigate();
  const { item } = useParams();

  // =====================================
  // SUBMIT HANDLER FUNCTION
  // =====================================
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setBusy(true));
    await useAxiosRequestHelper
      .post(dataState, "/new-afc/", item)
      .then(() => {
        renderSuccess();
        dispatch(setMessageError(undefined));
      })
      .catch((err) => {
        renderFail();
        console.log(err);
        if (typeof err === "object") {
          dispatch(setObjectError(err));
          dispatch(setMessageError("Unprocessable Entity"));
        } else {
          dispatch(setMessageError(err));
        }
      });
    dispatch(setBusy(false));
  };

  const getFamilyRecord = async () => {
    await axios.get(API_HOST + "/get-new-family/" + item).then((res) => {
      let data = res.data.data ? res.data.data : undefined;
      setter({
        app_sps_nm_last: data.app_sps_nm_last ?? "",
        app_sps_nm_first: data.app_sps_nm_first ?? "",
        app_sps_nm_mid: data.app_sps_nm_mid ?? "",
        app_sps_nm_extn: data.app_sps_nm_extn ?? "",
        app_sps_occupation: data.app_sps_occupation ?? "",
        app_sps_bus_name: data.app_sps_bus_name ?? "",
        app_sps_bus_addr: data.app_sps_bus_addr ?? "",
        app_sps_tel_no: data.app_sps_tel_no ?? "",

        app_fthr_nm_last: data.app_fthr_nm_last ?? "",
        app_fthr_nm_first: data.app_fthr_nm_first ?? "",
        app_fthr_nm_mid: data.app_fthr_nm_mid ?? "",
        app_fthr_nm_extn: data.app_fthr_nm_extn ?? "",

        app_mthr_nm_last: data.app_mthr_nm_last ?? "",
        app_mthr_nm_first: data.app_mthr_nm_first ?? "",
        app_mthr_nm_mid: data.app_mthr_nm_mid ?? "",
        app_mthr_nm_extn: data.app_mthr_nm_extn ?? "",
      });
    });
  };

  const [toggleState, enableToggle] = useToggleHelper();
  const [displayChildren, setDisplayChildren] = useState();

  const getChildrenRecord = async () => {
    await axios.get(API_HOST + "/new-children/" + item).then((response) => {
      setDisplayChildren(response.data.data);
    });
  };

  useEffect(() => {
    getFamilyRecord();
  }, []);
  useEffect(() => {
    getChildrenRecord();
  }, [toggleState]);

  return (
    <div className="pds-profile-main-view">
      {/* 
        // =============================================s
        // FORM PAGE TWO HEADER
        // =============================================
      */}
      <DostHeader />
      <br />
      {errorMsg && (
        <ValidationComponent title="FAILED TO SUBMIT">
          <p>{errorMsg}</p>
        </ValidationComponent>
      )}
      <br />
      {/* 
        // =============================================
        // FORM PAGE TWO HEADER
        // =============================================
      */}
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
      <form id="form-family" onSubmit={submitHandler}>
        <div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>SPOUSE's Surname</label>{" "}
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_nm_last : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_sps_nm_last"
                value={dataState ? dataState.app_sps_nm_last : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>First Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_nm_last : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_sps_nm_first"
                value={dataState ? dataState.app_sps_nm_first : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Middle Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_nm_mid : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_sps_nm_mid"
                value={dataState ? dataState.app_sps_nm_mid : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Name Extension (Jr., Sr.)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_nm_extn : ""}
              </span>
              <InputComponent
                maxLenght="10"
                name="app_sps_nm_extn"
                value={dataState ? dataState.app_sps_nm_extn : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Occupation</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_occupation : ""}
              </span>
              <InputComponent
                maxLenght="150"
                name="app_sps_occupation"
                value={dataState ? dataState.app_sps_occupation : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Employer/Business Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_bus_name : ""}
              </span>
              <InputComponent
                maxLenght="150"
                name="app_sps_bus_name"
                value={dataState ? dataState.app_sps_bus_name : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "65%" }}>
              <label>Business Address</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_bus_addr : ""}
              </span>
              <InputComponent
                maxLenght="255"
                name="app_sps_bus_addr"
                value={dataState ? dataState.app_sps_bus_addr : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "35%" }}>
              <label>Telephone No.</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_sps_tel_no : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_sps_tel_no"
                value={dataState ? dataState.app_sps_tel_no : ""}
                onChange={(e) => singleInput(e)}
              />
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
              <span className="invalid-response">
                {errorObj ? errorObj.app_fthr_nm_last : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_fthr_nm_last"
                value={dataState ? dataState.app_fthr_nm_last : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>First Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_fthr_nm_first : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_fthr_nm_first"
                value={dataState ? dataState.app_fthr_nm_first : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>Middle Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_fthr_nm_mid : ""}
              </span>
              <InputComponent
                name="app_fthr_nm_mid"
                maxLenght="50"
                value={dataState ? dataState.app_fthr_nm_mid : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Name Extension (Jr., Sr.)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_fthr_nm_extn : ""}
              </span>
              <InputComponent
                maxLenght="10"
                name="app_fthr_nm_extn"
                value={dataState ? dataState.app_fthr_nm_extn : ""}
                onChange={(e) => singleInput(e)}
              />
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
              <span className="invalid-response">
                {errorObj ? errorObj.app_mthr_nm_last : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_mthr_nm_last"
                value={dataState ? dataState.app_mthr_nm_last : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>First Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_mthr_nm_first : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_mthr_nm_first"
                value={dataState ? dataState.app_mthr_nm_first : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
          </div>
          <div className="pds-prof-class-one" style={{ marginBottom: "10px" }}>
            <div style={{ marginRight: "5px", width: "50%" }}>
              <label>MOTHER's MAIDEN Middle Name</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_mthr_nm_mid : ""}
              </span>
              <InputComponent
                maxLenght="50"
                name="app_mthr_nm_mid"
                value={dataState ? dataState.app_mthr_nm_mid : ""}
                onChange={(e) => singleInput(e)}
              />
            </div>
            <div style={{ marginLeft: "5px", width: "50%" }}>
              <label>Name Extension (Jr., Sr.)</label>
              <span className="invalid-response">
                {errorObj ? errorObj.app_mthr_nm_extn : ""}
              </span>
              <InputComponent
                maxLenght="10"
                name="app_mthr_nm_extn"
                value={dataState ? dataState.app_mthr_nm_extn : ""}
                onChange={(e) => singleInput(e)}
              />
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
            navigate(`/ihrmis/pds-applicant/form-page-one/${item}`);
            dispatch(setMessageError(undefined));
          }}
          form="form-family"
          onClickNext={() => {
            navigate(`/ihrmis/pds-applicant/form-page-three/${item}`);
            dispatch(setMessageError(undefined));
          }}
        />
      </div>
    </div>
  );
};

export default FormPageTwo;

const ChildrenList = (props) => {
  const dispatch = useDispatch();
  const [dataState, singleInput, _, setter] = useFormHelper();
  const { item } = useParams();

  const errorObj = useSelector((state) => state.error.objectError);

  const submitHandler = async (e) => {
    e.preventDefault();

    await useAxiosRequestHelper
      .post(dataState, "/new-children/", item)
      .then(() => {
        e.target.reset();
        setter({});
        dispatch(setObjectError({}));
        dispatch(setMessageError(undefined));
      })
      .catch((error) => {
        if (typeof error === "object") {
          dispatch(
            setObjectError({
              ...errorObj,
              ...error,
            })
          );
        } else {
          dispatch(setMessageError(error));
        }
      });
    props.updateData();
  };

  const removeChildRecord = async (id) => {
    await axios.delete(API_HOST + "/new-children/" + id);
    props.updateData();
  };

  return (
    <React.Fragment>
      <div>
        <div className="pds-prof-class-one">
          <label style={{ marginRight: "5px", width: "70%" }}>
            Full Name{" "}
            <span className="invalid-response">
              {errorObj ? errorObj.chi_app_name : ""}
            </span>
          </label>
          <label
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              width: "30%",
            }}
          >
            Date of Birth
            <span className="invalid-response">
              {errorObj ? errorObj.chi_app_birthdate : ""}
            </span>
          </label>
          <span>{}</span>
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
              <div className="pds-prof-class-one" key={key}>
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
        <form id="children-form" onSubmit={submitHandler}>
          <div className="pds-prof-class-one">
            <div style={{ marginRight: "5px", width: "70%" }}>
              <InputComponent
                onChange={(e) => singleInput(e)}
                name="chi_app_name"
              />
            </div>
            <div
              style={{ marginLeft: "5px", marginRight: "5px", width: "30%" }}
            >
              <InputComponent
                onChange={(e) => singleInput(e)}
                type="date"
                name="chi_app_birthdate"
              />
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
