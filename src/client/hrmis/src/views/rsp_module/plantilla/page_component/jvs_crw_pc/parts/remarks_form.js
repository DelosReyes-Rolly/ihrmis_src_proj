import React, { useRef } from "react";
import ButtonComponent from "../../../../../common/button_component/button_component.js";
import { AiFillPrinter } from "react-icons/ai";
import ModalComponent from "../../../../../common/modal_component/modal_component.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRemarksImg } from "../../../../../../features/reducers/jvscrw_slice.js";
import { MdClose } from "react-icons/md";
import axios from "axios";
import {
  API_HOST,
  axiosConfig,
} from "../../../../../../helpers/global/global_config.js";
import { usePopUpHelper } from "../../../../../../helpers/use_hooks/popup_helper";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import Creatable from "react-select/creatable";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import { useUploadImageHelper } from "../../../../../../helpers/use_hooks/upload_image_helper.js";

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
  const { competencies, dtyResContainer, remarksImg } = useSelector(
    (state) => state.jvsform
  );

  const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
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
    app_name: remarksImg.appName,
    pre_name: remarksImg.preName,
    app_sign: remarksImg.approvedBy,
    pre_sign: remarksImg.preparedBy,
  };

  const handleSubmit = async (subType = "") => {
    console.log(dataStructure);
    renderBusy(true);
    await axios
      .post(API_HOST + "jvscrw-competency-rating" + subType, dataStructure)
      .then((res) => renderSucceed({}))
      .catch((err) => renderFailed({ content: err.message }));

    renderBusy(false);
  };

  const onNewVersion = () => {};
  const onExit = () => {};

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
          buttonName="PRINT"
        />
        <div>
          <ButtonComponent
            className="on-save"
            buttonName="Save as New Version"
            onClick={() => {
              handleSubmit("/new");
            }}
          />
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
            onClick={() => {
              handleSubmit("/save");
            }}
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
  option: (provided) => ({
    ...provided,
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 3,
    marginLeft: 5,
    borderRadius: 5,
    width: "100%",
  }),

  control: (provided, state) => ({
    ...provided,
    width: "100%",
    backgroundColor: "white",
    padding: 0,
    borderRadius: "5px 0px 0px 5px",
    fontSize: "small",
    backgroundColor: "white",
    border: state.isFocused
      ? "1px solid 	#A9A9A9 !important"
      : "1px solid #DCDCDC !important",

    fontSize: "small",
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

const PreparedProved = ({ title, upload, objectKey, id, name = null }) => {
  const { remarksImg } = useSelector((state) => state.jvsform);
  const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
  const uploadImageRef = useRef();
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const { imageState, reader64 } = useUploadImageHelper();
  const handleChange = (e) => {
    reader64(e.target.files);
    dispatch(setRemarksImg({ key: objectKey, value: imageState[0] }));
  };

  const handleSubmit = async (type) => {
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
        renderSucceed({});
      })
      .catch((err) => {
        renderFailed({ content: err.message });
      });
    renderBusy(false);
  };

  const clearSignatureDisplay = () => {
    dispatch(setRemarksImg({ key: objectKey, value: null }));
  };

  const options = [
    { value: "Sean Terrence Calzada", label: "Sean Terrence Calzada" },
  ];
  return (
    <React.Fragment>
      <h5 style={{ marginBottom: "5px" }}>{title ?? "TITLE"}</h5>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Creatable
          name="tags_input"
          options={options}
          styles={customStyles}
          className="creatable-design"
          isClearable={true}
          placeholder={state ? "" : "Name"}
          onChange={(e) =>
            dispatch(setRemarksImg({ key: name, value: e?.value }))
          }
          onFocus={() => setState(true)}
          onBlur={() => setState(false)}
        />
        <button className="button-1" onClick={() => upload(true)}>
          Sign
        </button>
        <input
          hidden
          type="file"
          accept="image/*"
          ref={uploadImageRef}
          onChange={handleChange}
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
      <div>
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
  const { remarksImg } = useSelector((state) => state.jvsform);
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
            clearOnResize="true"
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
