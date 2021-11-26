import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  setMessageError,
  setObjectError,
} from "../../../../features/reducers/error_handler_slice";
import { setBusy } from "../../../../features/reducers/loading_slice";
import { API_HOST } from "../../../../helpers/global/global_config";
import useAxiosRequestHelper from "../../../../helpers/use_hooks/axios_request_helper";
import { useFormHelper } from "../../../../helpers/use_hooks/form_helper";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";
import ButtonComponent from "../../../common/button_component/button_component.js";
import CheckboxComponent from "../../../common/input_component/checkbox_input_component/checkbox_input_component";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ValidationComponent from "../../../common/response_component/validation_component/validation_component";
import FourAddReferenceModal from "../add_modals/five_add_reference";
import DostHeader from "../dost_header";
import PrevNextSubButtons from "../prev_next_sub_buttons";

const FormPageFive = () => {
  useScrollToTop();

  const [dataState, dataInput, customDataInput, setter] = useFormHelper();
  const dispatch = useDispatch();
  let imageIncompleteLinkStr =
    "http://localhost:8000/storage/applicant/passport-img/";
  const { item } = useParams();
  let navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);

  const uploadFileHandler = (e) => {
    const image = e.target.files[0];
    let blob = new Blob([image], { type: "image/jpg" });
    setImgUrl(URL.createObjectURL(blob));
    customDataInput(e.target.name, e.target.files[0]);
  };

  ///HANDLER FOR SUBMIT
  const { renderFail, renderSuccess } = usePopUpHelper();
  const errorObj = useSelector((state) => state.error.objectError);
  const errorMsg = useSelector((state) => state.error.messageError);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setBusy(true));
    await useAxiosRequestHelper
      .post(dataState, "new-profile", item, true)
      .then(() => {
        renderSuccess();
        dispatch(setObjectError({}));
        dispatch(setMessageError(undefined));
      })
      .catch((error) => {
        renderFail();
        if (typeof error === "object") {
          dispatch(setObjectError(error));
          dispatch(setMessageError("Unprocessable Entity"));
        } else {
          dispatch(setObjectError({}));
          dispatch(setMessageError(error));
        }
      });
    dispatch(setBusy(false));
  };

  const getApplcntGvrnmntIdRecord = async () => {
    await axios
      .get(API_HOST + "/get-new-applicant/" + item)
      .then((response) => {
        setter({
          app_id_issued: response.data.data
            ? response.data.data.app_id_issued
            : "",
          app_id_no: response.data.data ? response.data.data.app_id_no : "",
          app_id_dateplace: response.data.data
            ? response.data.data.app_id_dateplace
            : "",
          app_photo: response.data.data
            ? response.data.data.app_photo === imageIncompleteLinkStr
              ? ""
              : response.data.data.app_photo
            : "",
        });
      });
  };

  useEffect(() => {
    console.log(imgUrl);
    getApplcntGvrnmntIdRecord();
  }, []);

  return (
    <React.Fragment>
      <div className="pds-profile-main-view">
        <DostHeader />
        <br />
        <div>
          <ReferenceTable />
        </div>
        <br />
        <br />
        <form onSubmit={submitHandler} encType="multipart/form-data">
          {errorMsg && (
            <ValidationComponent title="FAILED TO SUBMIT">
              <p>- {errorMsg} </p>
            </ValidationComponent>
          )}
          <br />
          <div className="form-4-div">
            <div className="form-4-input-div">
              <div className="id-containers">
                <div className="gov-id-container">
                  GOVERNMENT ISSUED ID <br /> (i.e. Passport, GSIS, SSS, PRC,
                  Driver's License, etc.) <br />
                  <br />
                  <div>
                    <label>Government Issued ID</label>
                    <span className="invalid-response">
                      {errorObj ? errorObj.app_id_issued : ""}
                    </span>
                    <InputComponent
                      maxLenght="50"
                      name="app_id_issued"
                      value={dataState ? dataState.app_id_issued : undefined}
                      onChange={(e) => dataInput(e)}
                    />
                  </div>
                  <div>
                    <label>ID/License/Passport No</label>
                    <span className="invalid-response">
                      {errorObj ? errorObj.app_id_no : ""}
                    </span>
                    <InputComponent
                      maxLenght="20"
                      name="app_id_no"
                      value={dataState ? dataState.app_id_no : undefined}
                      onChange={(e) => dataInput(e)}
                    />
                  </div>
                  <div>
                    <label>Date/Place of Issuance</label>
                    <span className="invalid-response">
                      {errorObj ? errorObj.app_id_dateplace : ""}
                    </span>
                    <InputComponent
                      maxLenght="50"
                      name="app_id_dateplace"
                      value={dataState ? dataState.app_id_dateplace : undefined}
                      onChange={(e) => dataInput(e)}
                    />
                  </div>
                </div>
                <div className="upload-image-container">
                  <UploadImageComponent
                    //  == ? undefined :
                    imgServer={
                      dataState
                        ? dataState.app_photo === ""
                          ? undefined
                          : dataState.app_photo
                        : undefined
                    }
                    imgUrl={imgUrl}
                    onChange={(e) => uploadFileHandler(e)}
                    error={errorObj ? errorObj.app_photo : ""}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form-4-div">
            <div className="form-4-hereby">
              <div className="">
                <CheckboxComponent
                  name="app_agree"
                  value="1"
                  onChange={(e) =>
                    customDataInput("app_agree", e.target.value, true)
                  }
                />
              </div>

              <div className="p-tag">
                I declare under oath that i have personally accomplished this
                Personal Data Sheet which is a true, correct and complete
                statement pursuant to the provisions of the pertinent laws.
                rules and regulations of the Republic of the Philippines. I
                authorize the agency head/authorized representative to
                veryfy/validate the contents stated herein. I agree that any
                misrepresentation made in this document and its attachments
                shall cause the filling of administrative/criminal case/s
                against me.
                <span className="invalid-response">
                  {errorObj ? errorObj.app_agree : ""}{" "}
                </span>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />

            <div className="form-4-buttons">
              <ButtonComponent
                buttonLogoStart={<AiFillPrinter size="15px" />}
                buttonName="Print"
              />
              <div className="buttons-pos-right">
                <PrevNextSubButtons
                  page={5}
                  onClickBack={() => {
                    navigate(`/ihrmis/pds-applicant/form-page-four/${item}`);
                    dispatch(setMessageError(undefined));
                  }}
                  onClickNext={() => {
                    navigate(`/ihrmis/pds-applicant/form-page-six/${item}`);
                    dispatch(setMessageError(undefined));
                  }}
                />
              </div>
            </div>
          </div>
        </form>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default FormPageFive;

const ReferenceTable = (props) => {
  // ===========================================
  // REACT ROUTER FUNCTIONALITY
  // ===========================================
  const { item } = useParams();

  // ===========================================
  // REDUX TOOLKIT FUNCTIONALITY
  // ===========================================

  const [referenceRecord, setReferenceRecord] = useState();

  const getReferenceRecord = async () => {
    await axios.get(API_HOST + `/new-reference/${item}`).then((response) => {
      setReferenceRecord(response.data.data);
    });
  };

  const removeReferenceRecord = async (record) => {
    await axios
      .delete(API_HOST + `/new-reference/${record}`)
      .then((response) => {
        console.log(response);
      });
    toggleSetter("updateModal");
  };

  const [dataContainer, setDataContainer] = useState();

  // ===========================================
  // FOR EDUCATION INIT STATE RENDER AND TOOGLE UPDATE HANDLER
  // ===========================================
  let [toogle, setToggle] = useState({
    addModal: false,
    updateModal: false,
  });

  const toggleSetter = (name) => {
    setToggle({ ...toogle, [name]: !toogle[name] });
  };

  useEffect(() => {
    getReferenceRecord();
  }, [toogle]);

  return (
    <React.Fragment>
      <FourAddReferenceModal
        isDisplay={toogle.addModal}
        onClose={() => {
          toggleSetter("addModal");
        }}
      />

      <table id="custom-table">
        <thead>
          <tr className="main-headers">
            <th colSpan="12">
              REFERENCES <br />
              <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                (Person not related by consanguinity or affinity to
                applicant/appointee)
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="secondary-headers">
            <th colSpan="3">Name</th>
            <th colSpan="6">Address</th>
            <th colSpan="3">Tel No.</th>
          </tr>

          {referenceRecord == null
            ? null
            : referenceRecord.map((item, key) => {
                return (
                  <tr
                    key={key}
                    className="tr-education-record"
                    onClick={() => {
                      removeReferenceRecord(item.ref_app_email);
                    }}
                  >
                    <td colSpan="3">{item.ref_app_name}</td>
                    <td colSpan="6">{item.ref_app_addr}</td>
                    <td colSpan="3">
                      {item.ref_app_tel_no} &#47; {item.ref_app_email}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <br />
      <ButtonComponent
        buttonLogoStart={<MdAdd size="14px" />}
        buttonName="Add Record"
        onClick={() => {
          toggleSetter("addModal");
        }}
      />
    </React.Fragment>
  );
};

const UploadImageComponent = (props) => {
  useEffect(() => {
    console.log(props.imgServer);
    // console.log(props.imgUrl);
  }, []);
  return (
    <React.Fragment>
      <div className="img-button-container">
        <div className="upload-image-init">
          {props.imgUrl == undefined || props.imgUrl == null ? (
            props.imgServer !== undefined || props.imgServer === null ? (
              <img src={props.imgServer} alt="state" width="172px" />
            ) : (
              <p>
                <span
                  className="invalid-response"
                  style={{ marginLeft: "0px" }}
                >
                  {props.error}
                </span>
                <br />
                ID Picture taken within the last six months
                <br />
                4.5cm x 3.6cm (passport size)
                <br />
                <i>(image mus be in jpeg with 240kb file size)</i>
              </p>
            )
          ) : (
            <img src={props.imgUrl} alt="state" width="172px" />
          )}
        </div>

        <div className="upload-">
          <label className="app-photo-label" htmlFor="app_photo">
            {props.imgUrl === null || props.imgUrl === "" ? (
              props.imgServer === undefined || props.imgServer === null ? (
                <strong>Upload Image</strong>
              ) : (
                <strong>Choose Different Image</strong>
              )
            ) : (
              <strong>Choose Different Image</strong>
            )}
          </label>
          <input
            id="app_photo"
            className="app_photo"
            type="file"
            name="app_photo"
            width="132px"
            width="170px"
            onChange={props.onChange}
            hidden
            accept="image/jpeg"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

// ID
