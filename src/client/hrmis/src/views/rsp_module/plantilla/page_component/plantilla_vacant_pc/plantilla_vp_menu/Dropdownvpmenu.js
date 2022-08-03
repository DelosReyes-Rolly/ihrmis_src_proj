import React, { useRef, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
import {
	setEmailRecepients,
	setNextRank,
	setNotifyOffice,
	setSelectAgency,
} from "../../../../../../features/reducers/plantilla_item_slice";
import usePositionSetter from "../../../../../../helpers/use_hooks/position_setter";
import useSweetAlertHelper from "../../../../../../helpers/use_hooks/sweetalert_helper";
import { printMemoOnPostingOfVpForCsc } from "../../../../../../router/outside_routes";

const DropdownVpMenu = ({
	title,
	className,
	itemList,
	alignItems = "start",
	tooltipData = { position: "top", effect: "solid" },
	isScrollable = false,
}) => {
	const [dropable, setDropable] = useState(false);
	const [Xpos, Ypos, location, size] = usePositionSetter(dropable);
	const timerRef = useRef();

	const navigate = useNavigate();

	const selectedProperty = (link = null) => {
		if (link !== null) {
			navigate(link);
			setDropable(false);
		}

		if (link === null) {
			timerRef.current = setTimeout(() => {
				setDropable(false);
			}, 200);
		}
	};

	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				alignItems: alignItems,
			}}
			onBlur={() => selectedProperty()}
			ref={location}
		>
			{tooltipData.toolTipId && (
				<ReactTooltip
					id={tooltipData.toolTipId}
					place={tooltipData.position}
					effect={tooltipData.effect}
				>
					{tooltipData.textHelper}
				</ReactTooltip>
			)}

			<button
				data-tip
				data-for={tooltipData.toolTipId}
				className={className}
				style={{ width: "max-content" }}
				onClick={() => {
					setDropable(!dropable);
				}}
			>
				{title}
			</button>
			{itemList && (
				<DropList
					itemList={itemList}
					display={dropable ? "block" : "none"}
					onClick={selectedProperty}
					xpos={Xpos}
					ypos={Ypos}
					size={size}
					isScrollable={isScrollable}
				/>
			)}
		</div>
	);
};

export default DropdownVpMenu;

const DropList = ({
	itemList = [],
	display = "none",
	xpos,
	ypos,
	size,
	isScrollable,
}) => {
	const navigate = useNavigate();
	const { toastSuccessFailMessage } = useSweetAlertHelper();
	const scrollableStyle = {
		display: display,
		position: "fixed",
		top: ypos - 10,
		left: xpos + 180,
		overflow: "auto",
		overscrollBehaviorY: "smooth",
		cursor: "pointer",
	};

	const { selected_agency, plantilla_items, item_id, is_notify } = useSelector(
		(state) => state.plantillaItem
	);

	const dispatch = useDispatch();
	// const confirmedMemoAction = () => {
	// 	dispatch(setSelectAgency());
	// };

	// const cancelMemoCallback = () => {
	// 	printMemoOnPostingOfVpForCsc();
	// };

	const linkNavigationHandler = (item) => {
		const itemlink = item.link;
		const itemlabel = item.label;

		switch (itemlabel) {
			case "JVS & CRW": {
				navigate(itemlink + "/" + item_id);
				return;
			}
			case "Memo on Posting of Announcement of Vacancy": {
				SelectMemoForPosting();
				return;
			}
			case "Notify Office": {
				dispatch(setNotifyOffice());
				dispatch(setEmailRecepients(selected_agency.agn_head_email));
				return;
			}
			case "Notice of Vacancy": {
				return noticeOfVacancyAction(itemlink);
			}
			case "Next-in-rank": {
				dispatch(setNextRank());
				return;
			}
			default: {
				/**
				 * General cases of routing
				 */
				if (typeof itemlink === "string" && itemlink !== "#") {
					navigate(itemlink);
					return;
				}
				if (typeof itemlink === "function") {
					itemlink();
					return;
				}
			}
		}
	};

	const SelectMemoForPosting = async () => {
		// let confirmButtonText = "DOST Agencies",
		// 	cancelButtonColor = "#d33",
		// 	cancelButtonText = "CSC";
		// Swal.fire({
		// 	title: "<span>Memo on Posting of Vacancy</span>",
		// 	html: "<span><i>Select DOST Agencies or CSC to generate report</i></span>",
		// 	icon: "question",
		// 	showCloseButton: true,
		// 	showCancelButton: true,
		// 	confirmButtonColor: "#3085d6",
		// 	confirmButtonText: confirmButtonText,
		// 	cancelButtonColor: cancelButtonColor,
		// 	cancelButtonText: cancelButtonText,
		// }).then((result) => {
		// 	if (result.isConfirmed) {
		// 		confirmedMemoAction();
		// 	} else if (result.dismiss === Swal.DismissReason.cancel) {
		// 		cancelMemoCallback();
		// 	}
		// });

		let positions = plantilla_items["positions"];
		if (typeof positions === "undefined") {
			let response = {
				data: {
					code: 500,
					message: "No selected row to print!",
				},
			};
			toastSuccessFailMessage(response.data);
		} else {
			dispatch(setSelectAgency());
		}
	};

	const noticeOfVacancyAction = (itemlink) => {
		let positions = plantilla_items["positions"];

		if (typeof positions === "undefined") {
			// console.log("Gago!");
			let response = {
				data: {
					code: 500,
					message: "No selected row to print!",
				},
			};
			toastSuccessFailMessage(response.data);
		} else {
			console.log(plantilla_items);
			itemlink(plantilla_items["positions"]);
		}
		return;
	};

	const disabled = {
		listStyle: "none",
		cursor: "not-allowed",
		backgroundColor: "#cccccc",
		color: "#666666",
	};

	const defstyle = {
		display: display,
		position: "fixed",
		top: ypos,
		left: xpos,
	};
	return (
		<React.Fragment>
			<ul
				className="ul-dropdown-container"
				style={isScrollable ? scrollableStyle : defstyle}
				ref={size}
			>
				<div className="ul-menu-item-arrow">
					<AiFillCaretUp size="15px" />
				</div>
				{itemList?.map((element, key) => {
					return (
						<li
							style={
								is_notify && element?.label.includes("JVS")
									? disabled
									: {
											listStyle: "none",
									  }
							}
							className="ul-menu-item"
							onClick={() => {
								if (is_notify && element?.label.includes("JVS")) return;
								else linkNavigationHandler(element);
							}}
							key={key}
						>
							{element?.label}
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};
