import React, { useEffect, useState } from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import { convertToHTML } from "draft-convert";
import UploadAttachmentComponent from "../../../../common/input_component/upload_attachment_component/upload_attachment_component";
import InputComponent from "../../../../common/input_component/input_component/input_component";
import { useFormik } from "formik";
import { API_HOST } from "../../../../../helpers/global/global_config";
import * as Yup from "yup";
import axios from "axios";
import RichTextEditorComponent from "../../../../common/rich_text_editor_component/rich_text_editor_component";

const PlantillaEmailModal = ({ isDisplay, onClose, plantillaId }) => {
  //TYPE LOGIC
  const [mType, setmType] = useState([]);

  const selectedType = (value) => {
    // mType?.forEach((element) => {
    //   if (value === element.title) {
    //     if (element.data_id === 1) {
    //       setEditorState(
    //         EditorState.createWithContent(
    //           ContentState.createFromText(
    //             element.message[0] +
    //               " Information Technology Officer, SG 15, " +
    //               element.message[1] +
    //               " EXR-DSF-2021 " +
    //               element.message[2]
    //           )
    //         )
    //       );
    //     } else {
    //       setEditorState(
    //         EditorState.createWithContent(
    //           ContentState.createFromText(element.message[0] ?? "")
    //         )
    //       );
    //     }
    //   } else {
    //     setEditorState(
    //       EditorState.createWithContent(ContentState.createFromText(""))
    //     );
    //   }
    // });
  };

  const getMessageType = async () => {
    await axios
      .get(API_HOST + "mail-types")
      .then((res) => {
        let arrHolder = [];
        const dataMType = res?.data?.data;
        dataMType.forEach((element) => {
          arrHolder.push({
            id: element.mail_title,
            title: element.mail_title,
            message: element.mail_message,
            data_id: element.mail_id,
          });
        });
        setmType(arrHolder);
      })
      .catch((err) => {});
  };

  const [imageValue, setImageValue] = useState();

  const emailFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      recepient: "",
      message_type: "",
      message: "",
      sender: "",
      image_upload: "",
    },
    validationSchema: Yup.object({
      recepient: Yup.string().required("This field is required"),
      message_type: Yup.string().required("This field is required"),
      message: Yup.string().required("This field is required"),
      sender: Yup.string().required("This field is required"),
      image_upload: Yup.string().required("This field is required"),
    }),
    onSubmit: async (value) => {
      const formData = new FormData();
      formData.append("recepient", value.recepient);
      formData.append("message_type", value.message_type);
      formData.append("message", value.message);
      formData.append("sender", value.sender);
      imageValue.forEach((element, index) => {
        formData.append("image_upload[" + index + "]", element);
      });

      await axios
        .post(API_HOST + "notify-vacant-office", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then()
        .catch();
    },
  });

  useEffect(() => {
    getMessageType();
  }, []);

  return (
    <React.Fragment>
      <ModalComponent
        title="Email Notification"
        isDisplay={isDisplay}
        onSubmit={emailFormik.handleSubmit}
        onSubmitType="submit"
        onClose={onClose}
        onSubmitName="Send"
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
        <div>
          <label>Message:</label>
          <SelectComponent
            name="message_type"
            itemList={mType}
            value={emailFormik.values.message_type}
            onChange={(e) => {
              emailFormik.handleChange(e);
              selectedType(e.target.value);
            }}
            defaultTitle="Subject"
          />
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
              value={emailFormik.values.message}
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
            name="sender"
            value={emailFormik.values.sender}
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
              const files = Array.prototype.slice.call(e.target.files);
              setImageValue(files);
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

export default PlantillaEmailModal;
