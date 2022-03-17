import React, { useState } from "react";
import ModalComponent from "../../../../common/modal_component/modal_component";
import TextAreaComponent from "../../../../common/input_component/textarea_input_component/textarea_input_component";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SelectComponent from "../../../../common/input_component/select_component/select_component";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../../../../../helpers/global/global_config";
import { convertToHTML } from "draft-convert";
import UploadAttachmentComponent from "../../../../common/input_component/upload_attachment_component/upload_attachment_component";

const PlantillaEmailModal = ({ isDisplay, onClose, plantillaId }) => {
  // HANDLE EDITOR STATE
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [raw, setRaw] = useState();

  const handleEditorChange = (state) => {
    setEditorState(state);
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setRaw(currentContentAsHTML);
  };

  return (
    <React.Fragment>
      <ModalComponent
        title="Email Notification"
        isDisplay={isDisplay}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onClose={onClose}
        onSubmitName="Send"
      >
        <div>{raw}</div>
        <div>
          <label>Recepient:</label>
          <CreatableSelect
            isMulti
            isClearable={true}
            styles={customStyles}
            placeholder="Add Email of Recepient"
            components={{ DropdownIndicator: null }}
          />
        </div>
        <br />
        <div>
          <label>Message:</label>
          <SelectComponent defaultTitle="Subject" />
        </div>
        <br />
        <div className="email-modal-plantilla">
          <Editor
            editorState={editorState}
            // toolbarClassName="toolbarClassName"
            // wrapperClassName="wrapperClassName"
            editorClassName="editor-class"
            onEditorStateChange={handleEditorChange}
          />
        </div>
        <br />
        <div>
          <label>Sender:</label>
          <TextAreaComponent />
        </div>
        <br />
        <div>
          <label>Attachment:</label>
          <UploadAttachmentComponent isMulti={true} />
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};

export default PlantillaEmailModal;
