import React, { useEffect, useLayoutEffect, useState } from "react";
import ModalComponent from "../../../../../common/modal_component/modal_component";
import TextAreaComponent from "../../../../../common/input_component/textarea_input_component/textarea_input_component";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SelectComponent from "../../../../../common/input_component/select_component/select_component";
import UploadAttachmentComponent from "../../../../../common/input_component/upload_attachment_component/upload_attachment_component";
import InputComponent from "../../../../../common/input_component/input_component/input_component";
import { useFormik } from "formik";
import {
	API_HOST,
	validationRequired,
} from "../../../../../../helpers/global/global_config";
import * as Yup from "yup";
import axios from "axios";
import RichTextEditorComponent from "../../../../../common/rich_text_editor_component/rich_text_editor_component";
import { usePopUpHelper } from "../../../../../../helpers/use_hooks/popup_helper";
import { useDispatch, useSelector } from "react-redux";
import { setEmailRecepients } from "../../../../../../features/reducers/plantilla_item_slice";
import {
	ALERT_ENUM,
	popupAlert,
} from "../../../../../../helpers/alert_response";

export const EMAIL_ENUM = {
	regular: "regular",
	next_rank: "NextRank",
};

const PlantillaVpEmailModal = ({
	isDisplay,
	onClose,
	plantilla,
	type,
	endpoint,
}) => {
	const { email_recepients, selected_plantilla } = useSelector(
		(state) => state.plantillaItem
	);
	//TYPE LOGIC
	const [mType, setmType] = useState([]);
	const { renderBusy } = usePopUpHelper();
	const [selectedMsg, setSelectedMsg] = useState();

	const getMessageType = async () => {
		await axios
			.get(API_HOST + "mail-template")
			.then((res) => {
				let arrHolder = [];
				const dataMType = res?.data?.data;
				dataMType.forEach((element) => {
					arrHolder.push({
						id: element.eml_id,
						title: element.eml_name,
						message: restructEmailMessage(element.eml_message),
						data_id: element.eml_id,
					});
				});
				setmType(arrHolder);
			})
			.catch((err) => console.log(err?.message));
	};

	const selectedType = (value = 1) => {
		let varHolder = "";
		mType.forEach((element) => {
			if (value === element.id) {
				varHolder = element.message;
				setSelectedMsg(varHolder);
			}
		});
		console.log(varHolder);
		return varHolder;
	};

	const restructEmailMessage = (message) => {
		console.log("selected_plantilla");
		console.log(selected_plantilla);
		// return message;
		if (selected_plantilla !== null) {
			return message
				.replace("{position}", selected_plantilla.tblpositions.pos_title)
				.replace(
					"{salary grade}",
					"SG-" + selected_plantilla.tblpositions.pos_salary_grade
				)
				.replace("{Item No}", "Item No. " + selected_plantilla.itm_no)
				.replace("{jvs-crw id}", selected_plantilla.itm_no);
		}
		return message;
	};

	const dispatch = useDispatch();

	const [imageValue, setImageValue] = useState();
	// const required = Yup.string().required("This field is required");
	const emailFormik = useFormik({
		enableReinitialize: true,
		initialValues: {
			recepient: "",
			message_type: 1,
			message: "",
			sender: senderDefault,
			image_upload: "",
			deadline: "",
		},
		validationSchema: Yup.object({
			recepient: validationRequired,
			message_type: validationRequired,
			message: validationRequired,
			sender: validationRequired,
			image_upload: validationRequired,
			deadline:
				type === EMAIL_ENUM.next_rank
					? Yup.date().required("This field is required")
					: null,
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			const formData = new FormData();
			formData.append("recepient", value.recepient);
			formData.append("message_type", value.message_type);
			formData.append("message", value.message);
			formData.append("sender", value.sender);

			if (type === EMAIL_ENUM.next_rank) {
				formData.append("deadline", value.deadline);
			}
			if (imageValue != null) {
				for (let index = 0; index < imageValue.length; index++) {
					formData.append("image_upload[]", imageValue[index]);
				}
			}

			await axios
				.post(endpoint ?? API_HOST + "notify-vacant-office", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then(() => {
					dispatch(setEmailRecepients([]));
					setSelectedMsg("");
					resetForm();
					popupAlert({
						message: "Email was sent successfully",
					});
					onClose();
				})
				.catch((err) => {
					popupAlert({
						message: err.response.date.message,
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
		},
	});

	useEffect(() => {
		getMessageType();
	}, []);

	useEffect(() => {
		emailFormik.setFieldValue("recepient", email_recepients);
	}, [email_recepients]);

	useEffect(() => {
		if (mType.length > 0) selectedType();
	}, [mType]);

	return (
		<React.Fragment>
			<ModalComponent
				title="Email Notification"
				isDisplay={isDisplay}
				onSubmit={emailFormik.handleSubmit}
				onSubmitType="submit"
				onClose={() => {
					dispatch(setEmailRecepients([]));
					onClose();
				}}
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
						selectedValue={1}
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
							value={selectedMsg}
							setFieldValue={(val) => {
								emailFormik.setFieldValue("message", val);
							}}
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
						style={{ whiteSpace: "pre-line" }}
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
				{type === EMAIL_ENUM.next_rank ? (
					<div>
						<label>Deadline:</label>
						<InputComponent
							type="date"
							name="deadline"
							onChange={emailFormik.handleChange}
						/>
						{emailFormik.touched.deadline && emailFormik.errors.deadline ? (
							<p className="error-validation-styles">
								{emailFormik.errors.deadline}
							</p>
						) : null}
						<br />
					</div>
				) : null}

				<div>
					<label>Attachment:</label>
					<UploadAttachmentComponent
						name="image_upload"
						formik={emailFormik}
						accept="image/png, image/jpeg"
						isMulti={true}
						onChange={(e) => {
							const files = Array.prototype.slice.call(e.target.files);
							setImageValue(e.target.files);
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

export default PlantillaVpEmailModal;

const senderDefault =
	"Personnel Division, Administrative and Legal Service\nDepartment of Science and Technology\nGen. Santos Avenue. Bicutan, Taguig City";
