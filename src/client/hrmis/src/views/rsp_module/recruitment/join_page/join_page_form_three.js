import axios from "axios";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_ENUM, popupAlert } from "../../../../helpers/alert_response";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../helpers/use_hooks/isMounted";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import InputComponent from "../../../common/input_component/input_component/input_component";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setRefresh } from "../../../../features/reducers/popup_response";
import IconComponent from "../../../common/icon_component/icon";
import {
	IoLocationSharp,
	IoMailOutline,
	IoMailSharp,
	IoPerson,
} from "react-icons/io5";
import ButtonComponent from "../../../common/button_component/button_component";
import { BsFillPhoneFill, BsFillTelephoneFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

const JoinPageFormThree = () => {
	const navigate = useNavigate();
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const resend = useRef();
	const { refresh } = useSelector((state) => state.popupResponse);
	const { item } = useParams();
	const [verified, setVerified] = useState(false);
	const [data, setData] = useState([]);
	const [code, setCode] = useState(["", "", "", "", "", "", ""]);
	const codeRef = useRef(code.map(() => createRef()));
	const [counter, setCounter] = useState(30);

	const resendEmail = async () => {
		await axios
			.get(API_HOST + "verify-account/" + item)
			.then((response) => {
				const data = response.data.data;
				console.log(data);
				if (!mounted.current) return;
			})
			.catch((error) => {});
	};

	const verifiedEmail = async () => {
		await axios
			.get(API_HOST + "verified-account/" + item)
			.then((response) => {
				const data = response.data.data;
				navigate("/join-page/four/" + item);
				console.log(data);
				if (!mounted.current) return;
			})
			.catch((error) => {});
	};

	const getAccountRequest = async () => {
		await axios
			.get(API_HOST + "account-request/" + item)
			.then((response) => {
				const data = response.data.data;
				if (!mounted.current) return;
				if (data.verified === "Verified") {
					setVerified(true);
				}
				setData(data);
			})
			.catch((error) => {});
	};
	const codeInput = (index, newItem) => {
		let newCode = [...code];
		newCode[index] = newItem;
		setCode(newCode);
		let checker = index;
		if (newItem !== "") {
			checker += 1;
		} else {
			checker -= 1;
		}
		if (checker !== -1 && checker !== 7) {
			const input = codeRef.current[checker];
			input.current.focus();
		}
		// codeRef.current[index + 1].focus();
	};

	const getCode = async (codeChecker) => {
		const form = new FormData();
		form.append("code", codeChecker);
		renderBusy(true);
		await axios
			.post(API_HOST + "account-check-code/" + item, form)
			.then((response) => {
				if (response.data.message === "Verified") {
					setVerified(true);
					console.log(verified);
				}
				dispatch(setRefresh());
			})
			.catch((err) => {
				popupAlert({
					message: err.message,
					type: ALERT_ENUM.fail,
				});
			});
		renderBusy(false);
	};

	useEffect(() => {
		getAccountRequest();
	}, []);
	useEffect(() => {
		let codeChecker = code.join("");
		if (codeChecker.length === 7) {
			getCode(codeChecker);
		}
	}, [code]);

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
		if (counter === 0) {
			resend.current.className = "link-resend";
		} else {
			resend.current.className = "link-active";
		}
	}, [counter]);
	return (
		<>
			<div className="verfication">
				<p>
					Please verify your email address. We have sent a verification code to{" "}
					{data?.acc_req_email}. If this is incorrect, you may go back to the
					previous page and enter the correct email address.
				</p>
				<br />
				<p>
					If within a few seconds you can't find the email, kindly check your
					spam folder.
				</p>
				<br />
				<p>
					Did not receive the verification code?{" "}
					<span
						className="link-resend"
						ref={resend}
						onClick={() => {
							if (counter <= 0) {
								resendEmail();
								setCounter(30);
								resend.current.className = "link-active";
							}
						}}
					>
						[RESEND]
					</span>{" "}
					{counter !== 0 && <b>{counter}</b>}
				</p>
			</div>
			<div className="form-inputs">
				<div className="join-inputs w100">
					{code.map((elements, index) => {
						return (
							<InputComponent
								innerRef={codeRef.current[index]}
								id={index}
								value={code[index]}
								disabled={verified}
								key={index}
								onChange={(e) => {
									codeInput(index, e.target.value);
								}}
								maxLength="1"
							/>
						);
					})}
				</div>
				<div className="w100 align-center">
					{verified && (
						<IconComponent
							className={"check"}
							icon={<AiFillCheckCircle size={25} />}
						/>
					)}
				</div>
			</div>
			<div
				className="mt5"
				style={{
					display: "flex",
					flexDirection: "row",
					width: "4.5rem",
					gap: "0.5rem",
				}}
			>
				<ButtonComponent
					buttonName={"Back"}
					onClick={(e) => {
						e.stopPropagation();
						navigate("/join-page/two/" + item);
					}}
				/>
				{verified && (
					<ButtonComponent
						buttonName={"Submit"}
						onClick={() => {
							verifiedEmail();
						}}
					/>
				)}
			</div>
		</>
	);
};

export default JoinPageFormThree;
