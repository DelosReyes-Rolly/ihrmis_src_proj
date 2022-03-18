import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

const RichTextEditorComponent = ({ value = "", setFieldValue }) => {
  const prepareDraft = (value) => {
    const draft = htmlToDraft(value);
    const contentstate = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorstate = EditorState.createWithContent(contentstate);
    return editorstate;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorHandleChange = (state) => {
    const forFormik = draftToHtml(convertToRaw(state.getCurrentContent()));
    if (forFormik.length > 8) {
      setFieldValue(forFormik);
    } else {
      setFieldValue("");
    }
    setEditorState(state);
  };

  return (
    <React.Fragment>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editor-class"
        onEditorStateChange={onEditorHandleChange}
      />
    </React.Fragment>
  );
};

export default RichTextEditorComponent;
