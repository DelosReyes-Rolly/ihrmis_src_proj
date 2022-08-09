import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsMounted } from "../../../helpers/use_hooks/isMounted";
import { usePopUpHelper } from "../../../helpers/use_hooks/popup_helper";

import * as Yup from "yup";
import axios from "axios";
import { API_HOST, SANCTUM } from "../../../helpers/global/global_config";
import { ALERT_ENUM, popupAlert } from "../../../helpers/alert_response";
import { setRefresh } from "../../../features/reducers/popup_response";
import ToggleSwitchComponent from "../../common/toggle_switch_component/toggle_switch";
import { useParams } from "react-router-dom";
import ButtonComponent from "../../common/button_component/button_component.js";
import IconComponent from "../../common/icon_component/icon";
import { BsTrashFill } from "react-icons/bs";

const DocumentUploadToggle = ({ label, docID, uploadedFiles }) => {
  const { item } = useParams();
  const mounted = useIsMounted();
  const dispatch = useDispatch();
  const { renderBusy } = usePopUpHelper();
  const { refresh } = useSelector((state) => state.popupResponse);
  const [files, setFiles] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const [checkedValue, setCheckedValue] = useState(false);
  const file = useRef();
  const checkboxRef = useRef();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: async (value, { resetForm }) => {
      const formData = new FormData();
      formData.append("app_id", item);
      formData.append("doc_id", docID);
      if (files.length > 0) {
        for (let index = 0; index < files.length; index++) {
          formData.append("files[]", files[index]);
        }
      }
      renderBusy(true);
      await axios
        .post(API_HOST + "new-requirement/" + item, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          popupAlert({
            message: "Document saved successfully",
            type: ALERT_ENUM.success,
          });
          dispatch(setRefresh());
        })
        .catch((err) => {
          popupAlert({
            message: err.message,
            type: ALERT_ENUM.fail,
          });
        });

      renderBusy(false);
      resetForm();
    },
  });

  const checkIfCancelled = () => {
    if (uploadedFiles !== undefined) {
      checkboxRef.current.checked = true;
      setCheckedValue(true);
    } else {
      checkboxRef.current.checked = false;
      setCheckedValue(false);
    }
  };

  const deleteDocs = async (id) => {
    renderBusy(true);
    await axios
      .delete(API_HOST + `documentary-applicant-requirement/${id}`)
      .then(() => {
        popupAlert({
          message: "Document was deleted",
          type: ALERT_ENUM.success,
        });
      })
      .catch((err) => {
        popupAlert({
          message: err.message,
          type: ALERT_ENUM.fail,
        });
      });
    dispatch(setRefresh());
    renderBusy(false);
    checkIfCancelled();
    checkboxRef.current.checked = false;
    setCheckedValue(false);
  };

  useEffect(() => {
    if (uploadedFiles.length !== 0) {
      setFileArray(uploadedFiles);
      checkIfCancelled();
    }
  }, [uploadedFiles]);
  return (
    <React.Fragment>
      <form onSubmit={form.handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div className="documentary-toggle">
          <div className="margin-right-1">
            <ToggleSwitchComponent
              checked={checkedValue}
              checkboxRef={checkboxRef}
              onClick={() => {
                if (checkboxRef.current.checked === true) {
                  file.current.click();
                }
              }}
            />

            <input
              ref={file}
              id="props.filename"
              type="file"
              name="appName[]"
              onChange={(e) => {
                setFiles(e.target.files);
                form.handleSubmit();
              }}
              onFocus={() => {
                checkIfCancelled();
              }}
              onBlur={() => {
                checkIfCancelled();
              }}
              accept="application/pdf, application/zip"
              hidden
              multiple={true}
            />
            <span>
              <span className="margin-right-1"> {label}</span>
            </span>
          </div>
        </div>
        <div className="file-item-container">
          {uploadedFiles.length !== 0 &&
            fileArray.map((file, key) => {
              return (
                <>
                  <div className="file-item">
                    <a
                      href={
                        SANCTUM +
                        "storage/applicant/applicant-docs/" +
                        file.file
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {file.filename}
                    </a>
                  </div>
                  <div className="button-remove-file">
                    <IconComponent
                      id={"delete " + key}
                      className={"padding-left-1 point"}
                      icon={<BsTrashFill />}
                      position="top"
					  onClick={() => {
                        deleteDocs(file.id);
                      }}
                      toolTipId={"rc-vp-mail-" + key}
                      textHelper={"Delete this file?"}
                    />
                  </div>
                </>
              );
            })}
        </div>
        <br />
      </form>
    </React.Fragment>
  );
};
export default DocumentUploadToggle;
