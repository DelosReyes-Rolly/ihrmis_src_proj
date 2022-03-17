import React, { useRef, useState } from "react";

const UploadAttachmentComponent = ({
  onChange = null,
  name,
  isMulti = false,
  type,
}) => {
  const [files, setFiles] = useState([]);
  const fileRef = useRef();

  const removeFile = () => {
    fileRef.current.value = null;
    setFiles([]);
  };

  const onChangeDisplay = (e) => {
    let arrFiles = [];
    Array.from(e.target?.files)?.forEach((element) => {
      arrFiles.push(element.name);
    });
    setFiles([...arrFiles]);
  };

  return (
    <React.Fragment>
      <div className="upload-input-design">
        <div className="div-file-container">
          <div className="file-holder">
            {Array.from(files)?.map((value, id) => {
              return (
                <div key={id}>
                  <FileNameViewer
                    text={value}
                    onRemove={() => removeFile(id)}
                  />
                </div>
              );
            })}
          </div>
          {files.length === 0 ? null : (
            <div className="clear-div" onClick={() => removeFile()}>
              <p>Clear</p>
            </div>
          )}
        </div>
        <label htmlFor="upload-attachment">Upload</label>
      </div>

      <input
        ref={fileRef}
        name={name}
        multiple={isMulti}
        id="upload-attachment"
        type={type ?? "file"}
        hidden
        onChange={(e) => {
          if (onChange !== null) {
            onChange(e);
          }
          onChangeDisplay(e);
        }}
      />
    </React.Fragment>
  );
};

export default UploadAttachmentComponent;

const FileNameViewer = ({ text, onRemove }) => {
  return (
    <React.Fragment>
      <div className="container-file">
        <p>{text}</p>
      </div>
    </React.Fragment>
  );
};
