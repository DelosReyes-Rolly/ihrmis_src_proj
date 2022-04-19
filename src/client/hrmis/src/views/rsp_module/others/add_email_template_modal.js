import { useFormik } from "formik";
import React from "react";
import InputComponent from "../../common/input_component/input_component/input_component";
import SelectComponent from "../../common/input_component/select_component/select_component";
import ModalComponent from "../../common/modal_component/modal_component";
import RichTextEditorComponent from "../../common/rich_text_editor_component/rich_text_editor_component";
import { usePopUpHelper } from "../../../helpers/use_hooks/popup_helper";
import * as Yup from "yup";
import {
  API_HOST,
  validationRequired,
} from "../../../helpers/global/global_config";
import axios from "axios";

const AddEmailTemplateModal = ({ isDisplay, onClose }) => {
  const { renderBusy, renderSucceed, renderFailed } = usePopUpHelper();
  const templateForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      eml_type: "",
      eml_name: "",
      eml_message: "",
      eml_link: "",
    },
    validationSchema: Yup.object({
      eml_type: validationRequired,
      eml_name: validationRequired,
      eml_message: validationRequired,
      eml_link: validationRequired,
    }),
    onSubmit: async (values) => {
      renderBusy(true);
      axios
        .post(API_HOST + "add_mail-template", values)
        .then((res) => {
          renderSucceed({});
        })
        .catch((err) => {
          renderFailed({ content: err.message });
        });
      renderBusy(false);
    },
  });

  return (
    <React.Fragment>
      <ModalComponent
        onSubmit={templateForm.handleSubmit}
        title="Email Template"
        isDisplay={isDisplay}
        onClose={onClose}
        onSubmitType="submit"
      >
        <div>
          <label>Email Type</label>
          <SelectComponent
            itemList={emailType}
            name="eml_type"
            values={templateForm.values.eml_type}
            onChange={templateForm.handleChange}
          />
          {templateForm.touched.eml_type && templateForm.errors.eml_type ? (
            <p className="error-validation-styles">
              {templateForm.errors.eml_type}
            </p>
          ) : null}
        </div>

        <br />
        <div>
          <label>Email Name</label>
          <InputComponent
            name="eml_name"
            values={templateForm.values.eml_type}
            onChange={templateForm.handleChange}
          />
          {templateForm.touched.eml_name && templateForm.errors.eml_name ? (
            <p className="error-validation-styles">
              {templateForm.errors.eml_name}
            </p>
          ) : null}
        </div>

        <br />
        <div>
          <label>Email Message</label>
          <RichTextEditorComponent
            setFieldValue={(val) =>
              templateForm.setFieldValue("eml_message", val)
            }
            value={templateForm.values.eml_message}
          />
          {templateForm.touched.eml_message &&
          templateForm.errors.eml_message ? (
            <p className="error-validation-styles">
              {templateForm.errors.eml_message}
            </p>
          ) : null}
        </div>

        <br />
        <div>
          <label>Email Link</label>
          <InputComponent
            name="eml_link"
            values={templateForm.values.eml_type}
            onChange={templateForm.handleChange}
          />
          {templateForm.touched.eml_link && templateForm.errors.eml_link ? (
            <p className="error-validation-styles">
              {templateForm.errors.eml_link}
            </p>
          ) : null}
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default AddEmailTemplateModal;

const emailType = [
  {
    id: "USR",
    title: "Notice to End-User",
  },
  {
    id: "NIR",
    title: "Notice to Next-in-Rank",
  },
  {
    id: "PEE",
    title: "Schedule of Pre-employment Examination",
  },
  {
    id: "INT",
    title: "Schedule of PSB Interview",
  },
  {
    id: "PSY",
    title: "Schedule of Psycho Examination",
  },
  {
    id: "PER",
    title: "Pre-employment Examination Results",
  },
  {
    id: "DOC",
    title: "Completion of Documentary Requirements",
  },
  {
    id: "ASS",
    title: "Notification for End-User Assessment",
  },
  {
    id: "BCK",
    title: "Background Check",
  },
  {
    id: "DSQ",
    title: "Notification of Disqualification",
  },
  {
    id: "PSB",
    title: "Notification to HRMPSB",
  },
];
