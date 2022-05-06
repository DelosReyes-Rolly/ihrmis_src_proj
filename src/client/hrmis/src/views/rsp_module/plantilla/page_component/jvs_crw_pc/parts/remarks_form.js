import React, { useEffect, useRef } from "react";
import ButtonComponent from "../../../../../common/button_component/button_component.js";
import { AiFillPrinter } from "react-icons/ai";
import ModalComponent from "../../../../../common/modal_component/modal_component.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMinimumRequirement,
  setRemarksImg,
} from "../../../../../../features/reducers/jvscrw_slice.js";
import { MdClose } from "react-icons/md";
import axios from "axios";
import {
  ALERT,
  API_HOST,
  axiosConfig,
} from "../../../../../../helpers/global/global_config.js";
import { usePopUpHelper } from "../../../../../../helpers/use_hooks/popup_helper";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import Creatable from "react-select/creatable";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import { useUploadImageHelper } from "../../../../../../helpers/use_hooks/upload_image_helper.js";
import isBase64 from "../../../../../../helpers/base64_checker.js";
import {
  ALERT_ENUM,
  popupAlert,
} from "../../../../../../helpers/alert_response.js";
import { printJvsCrwReport } from "../../../../../../router/outside_routes";

const OBJECTKEY = {
  preName: "preName",
  appName: "appName",
  preparedBy: "preparedBy",
  approvedBy: "approvedBy",
};

const RemarksForm = ({ jvsId }) => {
  const [preparedBy, setPreparedBy] = useState(false);
  const [approvedBy, setApprovedBy] = useState(false);
  const navigate = useNavigate();
  const {
    competencies,
    dtyResContainer,
    remarksImg,
    minimum_req,
    version_selected,
  } = useSelector((state) => state.jvsform);

  const dispatch = useDispatch();

  const { renderBusy } = usePopUpHelper();

  const dataStructure = {
    jvs_id: jvsId,
    competencies: [
      competencies?.com_education,
      competencies?.com_writtenExam,
      competencies?.com_computationSKills,
      competencies?.com_oralExam,
      competencies?.com_creativeWork,
      competencies?.com_analyticalSkills,
      competencies?.com_training,
      competencies?.com_others,
      competencies?.com_experience,
    ],
    dty_res_item: dtyResContainer,
    min_com_desc: minimum_req,
    jvs_version: version_selected,
    app_name: remarksImg.appName,
    pre_name: remarksImg.preName,
  };

  const handleSubmit = async (submitType = "save") => {
    const form = new FormData();
    form.append("submit_type", submitType);
    form.append("jvs_id", jvsId);
    form.append("app_name", remarksImg.appName);
    form.append("pre_name", remarksImg.preName);
    form.append("app_sign", remarksImg.approvedBy);
    form.append("pre_sign", remarksImg.preparedBy);

    renderBusy(true);
    await axios
      .post(API_HOST + "jvscrw-competency-rating", dataStructure)
      .catch((err) => {
        popupAlert({
          message: err.message,
          type: ALERT_ENUM.fail,
        });
        return null;
      });

    await axios
      .post(API_HOST + "save-generate-jvscrw", form, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then(() => {
        if (submitType === "generate") printJvsCrwReport(jvsId);
        popupAlert({
          message: "Saved Successfully",
          type: ALERT_ENUM.success,
        });
      })
      .catch((err) => {
        popupAlert({
          message: err?.response?.data?.message ?? err.message,
          type: ALERT_ENUM.fail,
        });
      });

    renderBusy(false);
  };

  const submitAlert = () => {
    ALERT.fire({
      title: "Save Changes?",
      icon: "info",
      confirmButtonColor: "#004e87",
      confirmButtonText: "Save Work",
      denyButtonColor: "#5cb85c",
      showDenyButton: true,
      denyButtonText: "Save and Generate",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit("save");
      }

      if (result.isDenied) {
        handleSubmit("generate");
      }
    });
  };

  useEffect(async () => {
    if (jvsId) {
      await axios.get(API_HOST + "get-signature-image/" + jvsId).then((res) => {
        const data = res.data;
        dispatch(
          setRemarksImg({ key: OBJECTKEY.preparedBy, value: data.prepared })
        );
        dispatch(
          setRemarksImg({
            key: OBJECTKEY.preName,
            value: data.prepared_name,
          })
        );
        dispatch(
          setRemarksImg({ key: OBJECTKEY.approvedBy, value: data.approved })
        );
        dispatch(
          setRemarksImg({
            key: OBJECTKEY.appName,
            value: data.approved_name,
          })
        );
        dispatch(setMinimumRequirement(data.requirement));
      });
    }
  }, [jvsId]);

  return (
    <React.Fragment>
      <div className="remarks-div-1">
        <PreparedProved
          title="PREPARED BY"
          objectKey={OBJECTKEY.preparedBy}
          name={OBJECTKEY.preName}
          upload={setPreparedBy}
          id={jvsId}
        />
        <br />
        <PreparedProved
          title="APPROVED BY"
          objectKey={OBJECTKEY.approvedBy}
          name={OBJECTKEY.appName}
          upload={setApprovedBy}
          id={jvsId}
        />
        <br />
      </div>
      <br />
      <br />
      <br />
      <div className="remarks-div-2">
        <ButtonComponent
          buttonLogoStart={<AiFillPrinter size="14px" />}
          onClick={() => {
            printJvsCrwReport(jvsId).catch((err) => {
              popupAlert({
                message: err?.response?.data?.message ?? err.message,
                type: ALERT_ENUM.fail,
              });
            });
          }}
          buttonName="PRINT"
        />
        <div>
          <ButtonComponent
            className="on-exit"
            buttonName="Exit"
            onClick={() => {
              navigate("/rsp/plantilla/plantilla-items");
            }}
          />

          <ButtonComponent
            className="on-submit"
            buttonName="Submit"
            onClick={() => submitAlert()}
          />
        </div>
      </div>

      <PreparedProvedModal
        isDisplay={preparedBy}
        objectKey={OBJECTKEY.preparedBy}
        onClose={setPreparedBy}
      />
      <PreparedProvedModal
        isDisplay={approvedBy}
        objectKey={OBJECTKEY.approvedBy}
        onClose={setApprovedBy}
      />
    </React.Fragment>
  );
};

export default RemarksForm;

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    color: state.selectProps.menuColor,
  }),
  menuList: (provided) => ({
    ...provided,
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    padding: 0,
    borderRadius: "5px 0px 0px 5px",
    fontSize: "small",
    backgroundColor: "white",
    fontSize: "small",
    boxShadow: "none",
  }),
};

const PreparedProved = ({ title, upload, objectKey, id, name = null }) => {
  const uploadImageRef = useRef();
  const dispatch = useDispatch();
  const [blurStyle, setBlurStyle] = useState(false);
  const { imageState, reader64 } = useUploadImageHelper();

  const { remarksImg } = useSelector((state) => state.jvsform);
  const { renderBusy } = usePopUpHelper();

  const handleSubmit = async (type) => {
    if (isBase64(remarksImg[objectKey])) {
      const blob = dataURLtoBlob(remarksImg[objectKey]);
      const formData = new FormData();
      formData.append("name", remarksImg[name]);
      formData.append("signature", blob, "signature.png");

      renderBusy(true);
      await axios
        .post(
          API_HOST + "jvscrw-sign-upload/" + id + "/type/" + type,
          formData,
          axiosConfig
        )
        .then(() => {
          popupAlert({
            message: "Signature Saved",
            type: ALERT_ENUM.success,
          });
        })
        .catch((err) => {
          popupAlert({
            message: err?.response?.data?.message ?? err.message,
            type: ALERT_ENUM.fail,
          });
        });
      renderBusy(false);
    }
  };

  const clearSignatureDisplay = async () => {
    dispatch(setRemarksImg({ key: objectKey, value: "" }));
    const data = {
      jvs_id: id,
      key: objectKey,
    };
    // TODO: ADD AXIOS REMOVE IMAGE
    renderBusy(true);
    await axios
      .delete(
        API_HOST + "remove-signed-image/" + data?.jvs_id + "/" + data?.key
      )
      .then(() =>
        popupAlert({
          message: "Successfully Remove Signature",
          type: ALERT_ENUM.success,
        })
      )
      .catch((err) =>
        popupAlert({
          message: err?.response?.data?.message ?? err.message,
          type: ALERT_ENUM.fail,
        })
      );
    renderBusy(false);
  };

  const { employeeOption } = useSelector((state) => state.jvsform);

  useEffect(() => {
    if (remarksImg) {
      dispatch(setRemarksImg({ key: objectKey, value: imageState[0] }));
    }
  }, [imageState]);

  return (
    <React.Fragment>
      <h5 style={{ marginBottom: "5px" }}>{title ?? "TITLE"}</h5>
      <div className="container-for-creatable-sign">
        <Creatable
          name="tags_input"
          value={{
            label: remarksImg[name] ?? "",
            value: remarksImg[name] ?? "",
          }}
          options={employeeOption}
          styles={customStyles}
          className="creatable-design"
          isClearable={true}
          placeholder={blurStyle ? "" : "Name"}
          onChange={(e) =>
            dispatch(setRemarksImg({ key: name, value: e?.value ?? "" }))
          }
          onFocus={() => setBlurStyle(true)}
          onBlur={() => setBlurStyle(false)}
        />

        <button className="button-1" onClick={() => upload(true)}>
          Sign
        </button>
        <input
          hidden
          type="file"
          accept="image/*"
          ref={uploadImageRef}
          onChange={(e) => reader64(e.target.files)}
        />
        <button
          className="button-2"
          onClick={() => {
            uploadImageRef.current.click();
          }}
        >
          Upload
        </button>
      </div>
      <br />
      <div className="container-for-creatable-sign">
        {remarksImg[objectKey] && (
          <div className="prepared-proved">
            <div
              className="signature-render"
              style={{ backgroundColor: "white", borderRadius: "5px" }}
            >
              <div>
                <img
                  src={remarksImg[objectKey]}
                  alt={objectKey}
                  className="prepared-image"
                />
              </div>

              <div
                onClick={() => clearSignatureDisplay()}
                style={{ cursor: "pointer" }}
                className="close-button"
              >
                <MdClose size="20px" />
              </div>
            </div>
            <div>
              <button
                className="prepared-button"
                onClick={() => {
                  handleSubmit(
                    objectKey == "preparedBy" ? "prepared" : "approved"
                  );
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const PreparedProvedModal = (props) => {
  const reference = useRef();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setRemarksImg({
        key: props.objectKey,
        value: reference.current.getTrimmedCanvas().toDataURL("image/png"),
      })
    );
    props.onClose(false);
  };

  return (
    <React.Fragment>
      <ModalComponent
        onClose={() => props.onClose(false)}
        onPressed={() => reference.current.clear()}
        onSubmit={handleSubmit}
        isDisplay={props.isDisplay}
        onSubmitType="Submit"
        title={props.title ?? "Signiture Pad"}
        onCloseName="Clear"
      >
        <div className="canvas-container">
          <SignatureCanvas
            ref={reference}
            penColor="black"
            clearOnResize={true}
            canvasProps={{
              width: 700,
              height: 300,
              className: "signCanvas",
            }}
          />
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};
