import React, { useRef, useState } from "react";

const UploadAttachmentComponent = ({
	formik,
	name,
	isMulti = false,
	type,
	accept,
	value,
	onChange,
}) => {
	const [files, setFiles] = useState([]);
	const fileRef = useRef();

	const removeFile = () => {
		fileRef.current.value = null;
		formik.setFieldValue(name, "");
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
					<div className="file-holder" onClick={() => fileRef.current.click()}>
						<DisplayFilename files={files} />
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
				value={value}
				multiple={isMulti}
				id="upload-attachment"
				type={type ?? "file"}
				hidden
				accept={accept}
				onChange={(e) => {
					formik.handleChange(e);
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

const FileNameViewer = ({ text }) => {
	return (
		<React.Fragment>
			<div className="container-file">
				<p>{text}</p>
			</div>
		</React.Fragment>
	);
};

const DisplayFilename = ({ files }) => {
	if (files.length === 0) return <p>Enter title or name...</p>;

	return (
		<React.Fragment>
			{Array.from(files).map((value, id) => {
				console.log(id + ":" + value);
				return (
					<div key={id}>
						<FileNameViewer text={value} />
					</div>
				);
			})}
		</React.Fragment>
	);
};
