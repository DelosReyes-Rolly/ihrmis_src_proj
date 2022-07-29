import React, { useEffect, useState, Component } from "react";
import { useDispatch } from "react-redux";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useScrollToTop } from "../../../../helpers/use_hooks/useScollTop";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setMessageError } from "../../../../features/reducers/error_handler_slice";
import { API_HOST } from "../../../../helpers/global/global_config";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { setRefresh } from "../../../../features/reducers/popup_response";
import PrevNextSubButtons from "../../parts/prev_next_sub_buttons";
import dostLogo from "../../../../assets/images/logo.png";
import InputComponent from "../../../common/input_component/input_component/input_component";
import ButtonComponent from "../../../common/button_component/button_component";
import {
	AiFillFacebook,
	AiFillHome,
	AiFillTwitterSquare,
	AiFillYoutube,
	AiOutlineLeft,
	AiOutlineRight,
} from "react-icons/ai";
import TextAreaComponent from "../../../common/input_component/textarea_input_component/textarea_input_component";
import IconComponent from "../../../common/icon_component/icon";
import { FaGlobeAsia } from "react-icons/fa";

const BackgroundCheckThankYou = () => {
	useScrollToTop();
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<div className="pds-profile-main-view">
				<div className="form-header">
					<img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
					<h3>Department of Science and Technology</h3>
					<p>
						DOST Building, Gen. Santos Avenue Bicutan, Taguig City Metro Manila
						1631 Philippines
					</p>
					<p>(632) 8837-20-71 to 82 (632) 8837-2937</p>
					<br />
					<h1 style={{ color: "rgb(0, 78, 135)", marginTop: "5rem" }}>
						THANK YOU
					</h1>
					<div style={{ width: "50%", marginTop: "4rem" }}>
						<p>
							We appreciate you taking the time out of your day to respond. We
							assure that any information that you supplied about the applicant
							will be held in strict confidence. If there is ever an opportunity
							for us to reciprocate, we will be pleased to do so.
						</p>
						<br />
						<p>Thank you very much for your time and cooperation</p>
					</div>
					<div style={{ width: "50%", marginTop: "4rem", display: "flex" }}>
						<Icons
							id="facebook"
							icon={<AiFillFacebook size="50" />}
							url="https://www.facebook.com/DOSTph/"
							helper="Like us on our Facebook Page"
							text="Like Us"
							color="#2374E1"
						/>
						<Icons
							id="twitter"
							icon={<AiFillTwitterSquare size="50" />}
							url="https://mobile.twitter.com/dostphl"
							helper="Follow us on Twitter"
							text="Follow us on Twitter"
							color="rgb(29, 155, 240)"
						/>
						<Icons
							id="home"
							icon={<AiFillHome size="50" />}
							url="https://helpdesk.dost.gov.ph/"
							helper="Contact us on our help desk"
							text="Contact Us"
							color="#2c8cb3"
						/>
						<Icons
							id="website"
							icon={<FaGlobeAsia size="50" />}
							url="https://www.dost.gov.ph/"
							helper="Visit our Website"
							text="Visit Us"
						/>
						<Icons
							id="watch"
							icon={<AiFillYoutube size="50" />}
							url="https://www.youtube.com/c/DOSTvPH/featured"
							helper="Watch us on our YouTube Channel"
							text="Watch Us"
							color="#c00"
						/>
					</div>
				</div>
				<br></br>
				<br />
				<br />
			</div>
		</React.Fragment>
	);
};

const Icons = ({ id, text, helper, url, icon, color }) => {
	return (
		<div
			style={{
				justifyContent: "center",
				width: "100%",
				flexDirection: "row",
			}}
		>
			<IconComponent
				id={id}
				className=""
				divStyle={{ justifyContent: "center", width: "100%" }}
				icon={icon}
				toolTipId={id + "-tooltip"}
				onClick={() => {
					window.open(url);
				}}
				textHelper={helper}
				color={color}
			/>
			<p
				style={{
					textAlign: "center",
				}}
			>
				{text}
			</p>
		</div>
	);
};

export default BackgroundCheckThankYou;
