import axios from "axios";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_HOST } from "../../../../helpers/global/global_config";
import { useIsMounted } from "../../../../helpers/use_hooks/isMounted";
import { usePopUpHelper } from "../../../../helpers/use_hooks/popup_helper";
import { useNavigate, useParams } from "react-router-dom";

const JoinPageFormFour = () => {
	const navigate = useNavigate();
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const [data, setData] = useState([]);
	const { item } = useParams();

	const getAccountRequest = async () => {
		await axios
			.get(API_HOST + "account-confirmed/" + item)
			.then((response) => {
				const data = response.data.data;
				if (!mounted.current) return;
				setData(data);
			})
			.catch((error) => {});
	};
	useEffect(() => {
		getAccountRequest();
	}, []);

	return (
		<>
			<div className="confirmation">
				<h2 className="check">SUCCESS</h2>
				<p>Your request for a user access account has been submitted.</p>
				<br />
				<br />
				<b>Profile Details</b>
				<table>
					<tr>
						<td>Name</td>
						<td>{data.name}</td>
					</tr>
					<tr>
						<td>Position/Designation</td>
						<td>{data.position}</td>
					</tr>
					<tr>
						<td>Office/Location</td>
						<td>{data.office}</td>
					</tr>
					<tr>
						<td>Email Address</td>
						<td>{data.email}</td>
					</tr>
					<tr>
						<td>Phone Number</td>
						<td>{data.phone}</td>
					</tr>
					<tr>
						<td>Mobile Number</td>
						<td>{data.mobile}</td>
					</tr>
				</table>
				<br />
				<br />
				<p>
					This information you provided will be validated by the Personnel
					Division and will be forwarded to the Information Technology Division
					for processing, ITD will send you your user access account through the
					email address you provided.
				</p>
				<br />
				<br />
				<p>
					Do not hesitate to reach out to us should you have any questions or
					concerns. We are so excited to have you joing!
				</p>
			</div>
		</>
	);
};

export default JoinPageFormFour;
