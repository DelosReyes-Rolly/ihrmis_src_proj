import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

const RichTextEditorComponent = ({
  value = "",
  setFieldValue,
  toolbar = {},
  isRemove = false,
  height = "100px",
}) => {
  const prepareDraft = (content) => {
    const draft = htmlToDraft(content);
    const contentstate = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorstate = EditorState.createWithContent(contentstate);
    return editorstate;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorHandleChange = (state) => {
    const forFormik = draftToHtml(convertToRaw(state.getCurrentContent()));
    //<p> </p>
    if (forFormik.length > 8) {
      setFieldValue(forFormik);
    } else {
      setFieldValue("");
    }
    setEditorState(state);
  };

  useEffect(() => {
    if (value) {
      setEditorState(prepareDraft(value));
    }
  }, [value]);

  return (
    <React.Fragment>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editor-class"
        toolbar={toolbar}
        onEditorStateChange={onEditorHandleChange}
        editorStyle={{ height: height }}
      />
    </React.Fragment>
  );
};

export default RichTextEditorComponent;
