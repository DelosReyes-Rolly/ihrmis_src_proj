import React, { useEffect, useState } from "react";
import { BsDot, BsMessenger } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TiPhone } from "react-icons/ti";
import dostLogo from "../../../../assets/images/logo.png";
import ButtonComponent from "../../../common/button_component/button_component";

const ContactUsPage = () => {
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
					<span className="zoom-effect">
						<IoHome size={25} />
					</span>
				</nav>
			</div>
			<div className="div-body">
				<div className="div-body-1">
					<div
						style={{ display: "flex", flexDirection: "column", gap: "10px" }}
					>
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
								<input
									type="text"
									class="form__field"
									placeholder="Name"
									name="name"
									id="name"
									required
								/>
								<label for="name" class="form__label">
									Name
								</label>
							</div>
							<div class="form__group field">
								<input
									type="email"
									class="form__field"
									placeholder="Email"
									name="contact-email"
									id="contact-email"
									required
								/>
								<label for="contact-email" class="form__label">
									Email
								</label>
							</div>
							<div class="form__group field">
								<input
									type="tel"
									class="form__field"
									placeholder="Contact Number"
									name="contact-nos"
									id="contact-nos"
									required
								/>
								<label for="contact-nos" class="form__label">
									Contact Nos.
								</label>
							</div>
							<div class="form__group field" style={{ paddingTop: "60px" }}>
								<textarea
									type="tel"
									class="form__field"
									placeholder="Contact Number"
									name="message"
									id="message"
									required
									style={{ height: "25px" }}
								/>
								<label for="message" class="form__label">
									Message
								</label>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								width: "58%",
								paddingTop: "20px",
							}}
						>
							<ButtonComponent buttonName="Send" />
						</div>
					</form>
				</div>
				<div className="div-body-2">
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
							<div className="contact-us-circle zoom-effect primary-color">
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
				</div>
			</div>
			<div className="contact-us-footer">
				<div style={{ color: "white", fontSize: "11px", padding: "10px" }}>
					&#169; 2020 DOST ALL RIGHTS RESERVED
				</div>
			</div>
		</React.Fragment>
	);
};

export default ContactUsPage;
