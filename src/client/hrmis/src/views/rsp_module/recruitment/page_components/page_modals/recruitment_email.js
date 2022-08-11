import React, { useCallback, useEffect, useState } from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UploadAttachmentComponent from "../../../../common/input_component/upload_attachment_component/upload_attachment_component";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import { useFormik } from "formik";
import { API_HOST } from "../../../../../helpers/global/global_config";
import * as Yup from "yup";
import axios from "axios";
import RichTextEditorComponent from "../../../../common/rich_text_editor_component/rich_text_editor_component";
import { usePopUpHelper } from "../../../../../helpers/use_hooks/popup_helper";
import Creatable from "react-select/creatable";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { BsXCircle, BsPlusCircle, BsCheckCircle } from "react-icons/bs";
import IconComponent from "../../../../common/icon_component/icon";
import { useIsMounted } from "../../../../../helpers/use_hooks/isMounted";
import { BiLink } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";

const RecruitmentEmail = ({ isDisplay, onClose, data, type, endpoint }) => {
  const mounted = useIsMounted();
  const dispatch = useDispatch();
  const [mType, setmType] = useState([]);
  const { renderBusy } = usePopUpHelper();
  const [imageValue, setImageValue] = useState();
  const [emailData, setEmailData] = useState();
  const [appID, setAppID] = useState();
  const [emailName, setEmailName] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    let recepients = "";
    let appIDs = [];
    data.forEach((data) => {
      recepients += data.app_email + ",";
      let value = {
        email: data.app_email,
        id: data.app_id,
      };
      appIDs.push(value);
    });
    setEmailData(recepients);
    setAppID(appIDs);
  }, [data, type]);

  const getMessageType = useCallback(async () => {
    let arrHolder = [];
    let arrHolder2 = [];
    await axios
      .get(API_HOST + "mail-template/" + type)
      .then((res) => {
        const dataMType = res?.data?.data;

        dataMType.forEach((element) => {
          arrHolder.push({
            id: element.eml_id,
            title: element.eml_name,
            message: element.eml_message,
            data_id: element.eml_id,
          });
          arrHolder2.push({
            value: element.eml_id,
            label: element.eml_name,
          });
        });
      })
      .catch((err) => {});
    if (!mounted.current) return;

    setOptions(arrHolder2);
    setmType(arrHolder);
  }, [type]);

  const emailFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      appIds: appID,
      recepient: emailData ?? "",
      message_type: emailName.value ?? "",
      message: "",
      sender:
        "Personnel Division, Administrative and Legal Service\nDepartment of Science and Technology\nGen. Santos Avenue. Bicutan, Taguig City",
      image_upload: "",
    },
    validationSchema: Yup.object({
      recepient: Yup.string().required("This field is required"),
      message_type: Yup.string().required("This field is required"),
      message: Yup.string().required("This field is required"),
      sender: Yup.string().required("This field is required"),
    }),
    onSubmit: async (value, { resetForm }) => {
      renderBusy(true);
      const formData = new FormData();
      formData.append("recepient", value.recepient);
      formData.append("eml_type", type);
      formData.append("eml_name", emailName.label);
      formData.append("eml_id", emailName.value);
      formData.append("eml_message", value.message);
      formData.append("sender", value.sender);
      formData.append("appID", JSON.stringify(appID));
      if (imageValue != null) {
        for (let index = 0; index < imageValue.length; index++) {
          formData.append("image_upload[]", imageValue[index]);
        }
      }
      await axios
        .post(endpoint ?? API_HOST + "notify-vacant-office", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setSelectedMsg("");
          resetForm();
          popupAlert({
            message: "Notification was sent successfully",
          });
        dispatch(setRefresh());
        onClose();
        })
        .catch((err) => {
          popupAlert({
            message: err,
            type: ALERT_ENUM.fail,
          });
        });
      renderBusy(false);
      resetForm();
    },
  });

  useEffect(() => {
    setSelectedMsg("");
    setEmailName({ label: null, value: null });
  }, [isDisplay]);

  useEffect(() => {
    getMessageType();
  }, [getMessageType]);

  const addEmailTemplate = async () => {
    const formData = new FormData();
    formData.append("eml_type", type);
    formData.append("eml_name", emailName.label);
    formData.append("eml_id", emailName.value);
    formData.append("eml_message", emailFormik.values.message);
    await axios
      .post(API_HOST + "add_mail-template", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setSelectedMsg("");
        popupAlert({
          message: "Email Template was Saved Successfully",
        });
      })
      .catch((err) => {
        popupAlert({
          message: err.response.date.message,
          type: ALERT_ENUM.fail,
        });
      });
  };

  const deleteEmailTemplate = async () => {
    if (selectedId != null) {
      await axios
        .delete(API_HOST + "delete-mail-template/" + selectedId)
        .then(() => {
          setSelectedMsg("");
          setSelectedId(null);
          setEmailName({ label: null, value: null });
          popupAlert({
            message: "Message type deleted successfully",
          });
          getMessageType();
        })
        .catch((err) => {
          popupAlert({
            message: err.response.date.message,
            type: ALERT_ENUM.fail,
          });
        });
    } else {
      popupAlert({
        message: "Please Select an Email Template to delete",
        type: ALERT_ENUM.fail,
      });
    }
  };
  const customStyles = {
    option: (provided) => ({
      ...provided,
      padding: 3,
      paddingLeft: 5,
      paddingRight: 5,
      margin: 3,
      marginLeft: 5,
      borderRadius: 5,
      width: "99%",
      display: "flex",
    }),

    control: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "white",
      padding: 0,
      borderRadius: "5px 0px 0px 5px",
      fontSize: "small",
      border: state.isFocused
        ? "1px solid 	#A9A9A9 !important"
        : "1px solid #DCDCDC !important",

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

    container: (provided) => ({
      ...provided,
      width: "90%",
    }),
  };

  return (
    <React.Fragment>
      <ModalComponent
        title="Email Notification"
        isDisplay={isDisplay}
        onSubmit={emailFormik.handleSubmit}
        onSubmitType="submit"
        onClose={onClose}
        onSubmitName="Send"
        onPressedHidden={true}
      >
        <div>
          <label>Recepient:</label>
          <InputComponent
            name="recepient"
            value={emailFormik.values.recepient}
            onChange={emailFormik.handleChange}
          />

          {emailFormik.touched.recepient && emailFormik.errors.recepient ? (
            <p className="error-validation-styles">
              {emailFormik.errors.recepient}
            </p>
          ) : null}
        </div>
        <br />
        <label>Message:</label>
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <Creatable
            name="message_type"
            options={options}
            styles={customStyles}
            isClearable={false}
            value={{
              label: options.label ?? emailName.label ?? "Select Template",
              value: options.value ?? emailName.value ?? "0",
            }}
            className="creatable-design"
            onChange={(e) => {
              setEmailName({ label: e?.label, value: e?.value });
              if (e !== null) {
                for (let index = 0; index < mType.length; index++) {
                  if (mType[index].id === e.value) {
                    setSelectedId(mType[index].id);
                    setSelectedMsg(mType[index].message);
                    emailFormik.setFieldValue("message", mType[index].message);
                  }
                }
              } else {
                setSelectedId(null);
              }
            }}
          />
          <div className="email_icon">
            <IconComponent
              id="add=email-template"
              icon={<BsCheckCircle />}
              className="plantilla-icon save"
              toolTipId="email-add"
              textHelper="Create this email template"
              onClick={() => {
                addEmailTemplate();
              }}
            />
          </div>
          <div className="email_icon">
            <IconComponent
              id="delete-email-template"
              icon={<BsXCircle />}
              className="plantilla-icon delete"
              toolTipId="email-delete"
              textHelper="Delete this email Template"
              onClick={() => {
                deleteEmailTemplate();
              }}
            />
          </div>

          <div className="email_icon">
            <IconComponent
              id="add-email-link"
              icon={<BiLink />}
              className="plantilla-icon neutral"
              toolTipId="email-link"
              textHelper="Add a link"
              onClick={() => {
                document.querySelector('[title="Link"]').click();
              }}
            />
          </div>
          {emailFormik.touched.message_type &&
          emailFormik.errors.message_type ? (
            <p className="error-validation-styles">
              {emailFormik.errors.message_type}
            </p>
          ) : null}
        </div>

        <br />
        <div>
          <div className="email-modal-plantilla">
            <RichTextEditorComponent
              setFieldValue={(val) => emailFormik.setFieldValue("message", val)}
              value={selectedMsg}
            />
          </div>
          {emailFormik.touched.message && emailFormik.errors.message ? (
            <p className="error-validation-styles">
              {emailFormik.errors.message}
            </p>
          ) : null}
        </div>

        <br />
        <div>
          <label>Sender:</label>
          <TextAreaComponent
            style={{ whiteSpace: "pre-line" }}
            name="sender"
            value={
              emailFormik.values.sender === ""
                ? "Personnel Division, Administrative and Legal Service\nDepartment of Science and Technology\nGen. Santos Avenue. Bicutan, Taguig City"
                : emailFormik.values.sender
            }
            onChange={emailFormik.handleChange}
          />
          {emailFormik.touched.sender && emailFormik.errors.sender ? (
            <p className="error-validation-styles">
              {emailFormik.errors.sender}
            </p>
          ) : null}
        </div>
        <br />
        <div>
          <label>Attachment:</label>
          <UploadAttachmentComponent
            name="image_upload"
            formik={emailFormik}
            accept="image/png, image/jpeg"
            isMulti={true}
            onChange={(e) => {
              setImageValue(e.target.files);
            }}
          />
          {emailFormik.touched.image_upload &&
          emailFormik.errors.image_upload ? (
            <p className="error-validation-styles">
              {emailFormik.errors.image_upload}
            </p>
          ) : null}
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default RecruitmentEmail;
