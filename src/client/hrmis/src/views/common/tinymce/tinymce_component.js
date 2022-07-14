import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import tinymce from "tinymce/tinymce";

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
// import contentCss from "@tinymce/tinymce-react/tinymce/js/tinymce/skins/content/default/content.min.css";
// import contentUiCss from "@tinymce/tinymce-react/tinymce/js/tinymce/skins/ui/oxide/content.min.css";
// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars

const TinyMceEditorComponent = ({
  initialValue = "",
  setFieldValue,
  //   toolbar = {},
}) => {
  //   const textToHtml = (text) => {
  //     const elem = document.createElement("div");
  //     return text
  //       .split(/\n\n+/)
  //       .map((paragraph) => {
  //         return (
  //           "<p>" +
  //           paragraph
  //             .split(/\n+/)
  //             .map((line) => {
  //               elem.textContent = line;
  //               return elem.innerHTML;
  //             })
  //             .join("<br/>") +
  //           "</p>"
  //         );
  //       })
  //       .join("");
  //   };

  const [value, setValue] = useState(initialValue ?? "");

  useEffect(() => setValue(initialValue ?? ""), [initialValue]);

  return (
    <React.Fragment>
      <Editor
        // tinymceScriptSrc="../src/assets/js/tinymce/js/tinymce/tinymce.min.js"
        initialValue={initialValue}
        value={value}
        onEditorChange={(newValue /*editor*/) => {
          setValue(newValue);
          setFieldValue(newValue);
        }}
        init={{
          skin: false,
          content_css: false,
          //   content_style: [contentCss, contentUiCss].join("\n"),
        }}
      />
    </React.Fragment>
  );
};

export default TinyMceEditorComponent;
