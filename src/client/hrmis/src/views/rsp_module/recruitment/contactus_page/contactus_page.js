import React, { useEffect, useState } from "react";
import { BsAsterisk, BsDot, BsMessenger } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TiPhone } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dostLogo from "../../../../assets/images/logo.png";
import InputComponent from "../../../common/input_component/input_component/input_component";
import {
	API_HOST,
	validationEmail,
	validationName,
	validationRequired,
} from "../../../../helpers/global/global_config";
import ButtonComponent from "../../../common/button_component/button_component";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import { setRefresh } from "../../../../features/reducers/popup_response";
import { MessengerChat, showMessenger } from "react-messenger-chat-plugin";
const ContactUsPage = () => {
	return (
		<React.Fragment>
			<ContactNavBar />
			<div className="contact-us-body">
				<div className="div-body">
					<div className="div-body-1">
						<ContactUsForm />
					</div>
					<div className="div-body-2">
						<QuickResponseHotLine />
					</div>
				</div>
				<div className="contact-us-footer">
					&#169; 2020 DOST ALL RIGHTS RESERVED
				</div>
			</div>
		</React.Fragment>
	);
};

export default ContactUsPage;

const ContactNavBar = () => {
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<div className="navbar-div">
				<nav>
					<h1
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "15px",
							height: "100%",
						}}
					>
						<span className="zoom-effect">
							<img src={dostLogo} width="25" height="25" alt="dost_logo" />
						</span>
						<span
							className="fs-13"
							style={{
								textTransform: "uppercase",
								color: "white",
							}}
						>
							Department of Science and Technology
						</span>
					</h1>
					<span
						className="zoom-effect onboarding_home"
						onClick={() => {
							navigate("/welcome_aboard");
						}}
					>
						<IoHome size={25} />
					</span>
				</nav>
			</div>
		</React.Fragment>
	);
};
const ContactUsForm = () => {
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const [contactnos, setContactNos] = useState({});

	const emailus = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: "",
			sender: "", //sender email
			contacts: "",
			message: "",
		},
		validationSchema: Yup.object({
			name: validationName,
			sender: validationEmail, //sender email
			contacts: validationRequired,
			message: validationRequired,
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);

			const formData = new FormData();
			formData.append("name", value.name);
			formData.append("sender", value.sender);
			formData.append("contactnos", value.contacts);
			formData.append("message", value.message);

			await axios
				.post(API_HOST + "notify-vacant-office", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					let response = res.data;
					console.log(response);
					if (response.message.includes("Error")) {
						popupAlert({
							message: "Error, email not sent. Please try again.",
							type: ALERT_ENUM.fail,
						});
					} else {
						resetForm();
						popupAlert({
							message: "Email was sent successfully.",
						});
						dispatch(setRefresh());
						//onClose();
					}
				})
				.catch((err) => {
					popupAlert({
						message: err.response.message,
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
		},
	});

	return (
		<React.Fragment>
			<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
				<h1 style={{ fontWeight: "400" }}>Contact Us</h1>
				<hr className="line-border" />
			</div>
			<br />
			<p className="font-secondary-color">Let us know your thoughts!</p>
			<br />
			<br />
			<div style={{ boxSizing: "content-box" }}>
				<p
					className="font-secondary-color"
					style={{ textAlign: "justify", width: "80%" }}
				>
					Please don't hesitate to contact us for any concerns and
					clarifications. Feel free to message us using the form below. Our
					support team will be in touch very soon.
				</p>
			</div>
			<br />
			<form>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
						padding: "10px",
					}}
				>
					<div class="form__group field">
						<InputComponent
							type="text"
							className="form__field"
							placeholder="Name"
							name="name"
							id="name"
							value={emailus.values.name}
							onChange={emailus.handleChange}
							style={{ borderRadius: "0 !important" }}
						/>
						{emailus.touched.name && emailus.errors.name ? (
							<p className="error-validation-styles">{emailus.errors.name}</p>
						) : null}
						<label for="name" class="form__label">
							Name&nbsp;
							<BsAsterisk color="red" size={8} />
						</label>
					</div>
					<div class="form__group field">
						<InputComponent
							type="email"
							className="form__field"
							placeholder="Email"
							name="contact-email"
							id="contact-email"
							style={{ borderRadius: "0 !important" }}
							value={emailus.values.name}
							onChange={emailus.handleChange}
						/>
						{emailus.touched.sender && emailus.errors.sender ? (
							<p className="error-validation-styles">{emailus.errors.sender}</p>
						) : null}
						<label for="contact-email" class="form__label">
							Email&nbsp;
							<BsAsterisk color="red" size={8} />
						</label>
					</div>
					<div class="form__group field">
						<InputComponent
							type="tel"
							className="form__field"
							placeholder="Contact Number"
							name="contactnos"
							id="contactnos"
							style={{ borderRadius: "0 !important" }}
							value={emailus.values.contacts}
							onChange={emailus.handleChange}
							multiple
						/>
						{/* <Creatable
							components={components}
							inputValue={contactnos}
							isClearable
							isMulti
							menuIsOpen={false}
							onChange={this.handleChange}
							onInputChange={this.handleInputChange}
							onKeyDown={this.handleKeyDown}
							placeholder="Press enter to enter more contact number..."
							value={value}
						/> */}
						{emailus.touched.contacts && emailus.errors.contacts ? (
							<p className="error-validation-styles">
								{emailus.errors.contacts}
							</p>
						) : null}
						<label for="contactnos" class="form__label">
							Contact Nos.&nbsp;
							<BsAsterisk color="red" size={8} />
						</label>
					</div>
					<div class="form__group field" style={{ paddingTop: "60px" }}>
						<textarea
							type="tel"
							className="form__field"
							placeholder="Message"
							name="message"
							id="message"
							required
							style={{ height: "25px" }}
							value={emailus.values.message}
							onChange={emailus.handleChange}
						/>
						{emailus.touched.message && emailus.errors.message ? (
							<p className="error-validation-styles">
								{emailus.errors.message}
							</p>
						) : null}
						<label for="message" class="form__label">
							Message&nbsp;
							<BsAsterisk color="red" size={8} />
						</label>
					</div>
				</div>
				<div className="send-button">
					<ButtonComponent buttonName="Send" onClick={emailus.handleSubmit} />
				</div>
			</form>
		</React.Fragment>
	);
};

const QuickResponseHotLine = () => {
	return (
		<React.Fragment>
			<div className="div-body2-header">
				<h2>Need a quick response?</h2>
			</div>
			<div className="div-body2-content">
				<div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
					<div className="zoom-effect primary-color">
						<TiPhone style={{ transform: "rotateY(200deg)" }} size={30} />
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "20px",
						}}
					>
						<div>
							<p>(02) 8837-2071 to 82 Local 2036</p>
							<p className="font-secondary-color fs-11">Trunk Line</p>
						</div>
						<div>
							<p>(02) 8838-9080</p>
							<p className="font-secondary-color fs-11">Direct Line</p>
						</div>
					</div>
				</div>
				<hr style={{ height: "0.5px", backgroundColor: "lightgray" }}></hr>
				<div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
					<div className="zoom-effect primary-color">
						<MdEmail size={30} />
					</div>
					<div>
						<p>dostco.personnel@gmail.com</p>
						<p className="font-secondary-color fs-11">Email</p>
					</div>
				</div>
				<hr style={{ height: "0.5px", backgroundColor: "lightgray" }}></hr>
				<div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
					<div
						className="contact-us-circle zoom-effect primary-color"
						onClick={showMessenger(true)}
					>
						<BsMessenger className="zoom-effect" size={20} />
					</div>
					<div>
						<p>Chat with us</p>
						<p className="font-secondary-color fs-11">Facebook Messenger</p>
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "10px",
					paddingTop: "50px",
				}}
			>
				<BsDot />
				<p className="font-secondary-color fs-12">
					Support hours are Monday through Friday, 8am - 5pm
				</p>
			</div>
		</React.Fragment>
	);
};

const OpenMessengerChat = () => {
	//L&J PISO WIFI page
	return (
		<React.Fragment>
			<MessengerChat pageId="119548799878958" />
		</React.Fragment>
	);
};
