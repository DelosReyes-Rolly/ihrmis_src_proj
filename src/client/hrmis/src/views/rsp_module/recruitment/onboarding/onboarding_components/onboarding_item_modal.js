import React, { useState } from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  API_HOST,
  validationRequired,
} from "../../../../../helpers/global/global_config";
import RichTextEditorComponent from "../../../../common/rich_text_editor_component/rich_text_editor_component";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBusy } from "../../../../../features/reducers/popup_response";
import { ALERT_ENUM, popupAlert } from "../../../../../helpers/alert_response";
import { setUpdateSectionItem } from "../../../../../features/reducers/onboarding_slice";
import UploadAttachmentComponent from "../../../../common/input_component/upload_attachment_component/upload_attachment_component";

const OnboardingItemModal = ({ isDisplay, onClose, title, data, sec_id }) => {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const dispatch = useDispatch();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      itm_onb_id: data?.itm_onb_id ?? "",
      itm_sec_onb_id: sec_id ?? "",
      itm_onb_name: data?.itm_onb_name ?? "",
      itm_onb_url: data?.itm_onb_url ?? "",
      itm_onb_content: data?.itm_onb_content ?? "",
      files: "",
    },
    validationSchema: Yup.object({
      itm_onb_name: validationRequired,
      itm_onb_url: Yup.string().typeError("Invalid Input"),
      itm_onb_content: Yup.string().typeError("Invalid Input"),
    }),
    onSubmit: async (value, { resetForm }) => {
      const formData = new FormData();
      formData.append("itm_onb_id", value?.itm_onb_id);
      formData.append("itm_sec_onb_id", value?.itm_sec_onb_id);
      formData.append("itm_onb_name", value?.itm_onb_name);
      formData.append("itm_onb_url", value?.itm_onb_url);
      formData.append("itm_onb_content", value?.itm_onb_content);

      if (attachments.length > 0) {
        for (let index = 0; index < attachments.length; index++) {
          formData.append("files[]", attachments[index]);
        }
      }

      dispatch(setBusy(true));
      await axios
        .post(API_HOST + "add-onboarding-section-item", formData)
        .then(() => {
          dispatch(setBusy(false));
          dispatch(setUpdateSectionItem());
          // Reset after submition
          resetForm();
          setContent("<p></p>"); // Reset the UI
          setContent(""); // Reset the value
        })
        .catch((err) => {
          popupAlert({
            message: err.message ?? "Error Try again Later",
            type: ALERT_ENUM.fail,
          });
          dispatch(setBusy(false));
        });

      onClose();
    },
  });

  const [fullScreen, setFullscreen] = useState(false);

  return (
    <React.Fragment>
      <ModalComponent
        title={title}
        onSubmit={form.handleSubmit}
        onSubmitType="submit"
        isDisplay={isDisplay}
        onClose={onClose}
        fullScreen={fullScreen}
        onMaxView={() => setFullscreen(!fullScreen)}
        allowFullscreen={true}
      >
        <div>
          <div style={{ marginBottom: "10px" }}>
            <label>Title</label>
            <InputComponent
              name="itm_onb_name"
              value={form.values.itm_onb_name}
              onChange={form.handleChange}
            />
            {form.touched.itm_onb_name && form.errors.itm_onb_name ? (
              <p className="error-validation-styles">
                {form.errors.itm_onb_name}
              </p>
            ) : null}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>URL Address (Link)</label>
            <InputComponent
              name="itm_onb_url"
              value={form.values.itm_onb_url}
              onChange={form.handleChange}
            />
            {form.touched.itm_onb_url && form.errors.itm_onb_url ? (
              <p className="error-validation-styles">
                {form.errors.itm_onb_url}
              </p>
            ) : null}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Content</label>
            <RichTextEditorComponent
              value={content}
              setFieldValue={(val) => {
                form.setFieldValue("itm_onb_content", val);
                setContent((val) => val);
              }}
              height={fullScreen ? "400px" : null}
            />
            {form.touched.itm_onb_content && form.errors.itm_onb_content ? (
              <p className="error-validation-styles">
                {form.errors.itm_onb_content}
              </p>
            ) : null}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Attachment</label>
            <UploadAttachmentComponent
              formik={form}
              name="files"
              isMulti={true}
              onChange={(e) => {
                setAttachments(e.target.files);
              }}
            />
          </div>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default OnboardingItemModal;
