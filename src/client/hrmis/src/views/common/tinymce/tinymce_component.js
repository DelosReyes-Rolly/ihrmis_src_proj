import React, { useEffect, useLayoutEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useServiceHooks from "../../../helpers/use_hooks/service_hooks";

const TinyMceEditorComponent = ({
	initialValue = "<p>This is the initial content of the editor.</p>",
	setFieldValue,
}) => {
	const [value, setValue] = useState(initialValue ?? "");
	const [removeElementByClass] = useServiceHooks();

	useEffect(() => setValue(initialValue ?? ""), [initialValue]);

	useEffect(() => {
		removeElementByClass("tox-statusbar__branding");
	}, [value]);

	return (
		<React.Fragment>
			<Editor
				tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
				initialValue={initialValue}
				value={value}
				onEditorChange={(newValue, editor) => {
					setValue(newValue);
					setFieldValue(newValue);
				}}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"preview",
						"help",
						"wordcount",
					],
					toolbar:
						"undo redo | blocks | " +
						"bold italic forecolor | alignleft aligncenter " +
						"alignright alignjustify | bullist numlist outdent indent | " +
						"removeformat | help",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				}}
			/>
		</React.Fragment>
	);
};

export default TinyMceEditorComponent;
