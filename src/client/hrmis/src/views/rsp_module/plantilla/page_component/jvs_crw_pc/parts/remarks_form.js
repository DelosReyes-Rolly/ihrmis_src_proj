import React, { useEffect } from "react";
import ButtonComponent from "../../../../../common/button_component/button_component.js";
import { AiFillPrinter } from "react-icons/ai";
import ModalComponent from "../../../../../common/modal_component/modal_component.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRefreh,
  setRemarksImg,
} from "../../../../../../features/reducers/jvscrw_slice.js";
import useSessionStorage from "../../../../../../helpers/use_hooks/session_storage.js";
import { MdClose, MdHeight } from "react-icons/md";

const OBJECTKEY = {
  preparedBy: "preparedBy",
  approvedBy: "approvedBy",
};

const RemarksForm = () => {
  const [preparedBy, setPreparedBy] = useState(false);
  const [approvedBy, setApprovedBy] = useState(false);

  const dataStructure = {
    id: 1,
    com_education: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_writtenExam: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_computationSKills: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_oralExam: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_creativeWork: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_analyticalSkills: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_training: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_others: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
    com_experience: {
      com_type: "",
      com_specific: "",
      rating: [],
    },
  };

  const onSubmitForm = () => {};

  const onNewVersion = () => {};

  const onExit = () => {};

  return (
    <React.Fragment>
      <div className="remarks-div-1">
        <PreparedProved
          title="PREPARED BY"
          objectKey={OBJECTKEY.preparedBy}
          upload={setPreparedBy}
        />
        <br />
        <PreparedProved
          title="APPROVED BY"
          objectKey={OBJECTKEY.approvedBy}
          upload={setApprovedBy}
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
          />
          <ButtonComponent className="on-exit" buttonName="Exit" />
          <ButtonComponent className="on-submit" buttonName="Submit" />
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

const PreparedProved = ({ title, upload, objectKey }) => {
  const { remarksImg, refresh } = useSelector((state) => state.jvsform);
  const image = sessionStorage.getItem(objectKey);
  const dispatch = useDispatch();
  const [state, setstate] = useState(JSON.parse(image));

  const checkImage = () => {
    if (image === null) {
      setstate(null);
    } else {
      dispatch(setRemarksImg({ key: objectKey, value: JSON.parse(image) }));
    }
  };

  useEffect(() => {
    checkImage();
    dispatch(setRefreh());
  }, []);

  const clearSignature = () => {
    sessionStorage.removeItem(objectKey);
    setstate(undefined);
    dispatch(setRemarksImg({ key: objectKey, value: undefined }));
    dispatch(setRefreh());
  };

  useEffect(() => {}, [refresh]);

  return (
    <React.Fragment>
      <h5 style={{ marginBottom: "5px" }}>{title ?? "TITLE"}</h5>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <select className="select-component">
          <option defaultValue="1">Default</option>
        </select>
        <button className="button-1">Sign</button>
        <button className="button-2" onClick={() => upload(true)}>
          Upload
        </button>
      </div>
      <br />
      <div>
        {remarksImg[objectKey] == undefined || remarksImg[objectKey] === "" ? (
          false
        ) : (
          <div className="prepared-proved">
            <div className="signature-render">
              <div>
                <img
                  src={remarksImg[objectKey]}
                  alt={objectKey}
                  className="prepared-image"
                />
              </div>

              <div
                onClick={() => clearSignature()}
                style={{ cursor: "pointer" }}
                className="close-button"
              >
                <MdClose size="20px" />
              </div>
            </div>
            <div>
              <button className="prepared-button">Save</button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const PreparedProvedModal = (props) => {
  const dispatch = useDispatch();

  const [storeImg, setStoreImg] = useSessionStorage(
    props.objectKey ?? undefined,
    undefined
  );

  const storeImage = (e) => {
    const imagePath = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setStoreImg(reader.result);
      },
      false
    );
    if (imagePath) {
      reader.readAsDataURL(imagePath);
    }
  };

  const handleSubmit = () => {
    dispatch(setRemarksImg({ key: props.objectKey, value: storeImg }));
    props.onClose(false);
  };

  const { refresh } = useSelector((state) => state.jvsform);

  useEffect(() => {
    if (storeImg === OBJECTKEY.PreparedProved) {
      sessionStorage.removeItem(OBJECTKEY.PreparedProved);
      setStoreImg("");
    } else if (storeImg === OBJECTKEY.PreparedProved) {
      sessionStorage.removeItem(OBJECTKEY.PreparedProved);
      setStoreImg("");
    }
  }, [refresh]);

  return (
    <React.Fragment>
      <ModalComponent
        onClose={() => props.onClose(false)}
        onSubmit={handleSubmit}
        isDisplay={props.isDisplay}
        onSubmitType="Submit"
        title={props.title ?? "Signiture Pad"}
      >
        <div style={{ boxSizing: "border-box" }}>
          {storeImg === "" || storeImg == undefined ? null : (
            <img
              src={storeImg}
              alt={props.altName ?? "approvedBy"}
              style={{ boxSizing: "border-box", width: "100%" }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label
            style={{
              padding: "10px 15px",
              color: "white",
              background: "#4276a4",
              borderRadius: "5px",
              margin: "20px",
            }}
            htmlFor="signature-uploader"
          >
            {storeImg != "" ? (
              <strong>Change Signature</strong>
            ) : (
              <strong>Upload Image</strong>
            )}
          </label>
          <input
            id="signature-uploader"
            type="file"
            hidden
            onChange={storeImage}
          />
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};
