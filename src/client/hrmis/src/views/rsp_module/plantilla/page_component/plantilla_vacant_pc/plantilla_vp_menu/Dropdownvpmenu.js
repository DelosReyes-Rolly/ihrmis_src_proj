import React, { useRef, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
	setEmailRecepients,
	setNextRank,
	setNotifyOffice,
	setSelectAgency,
} from "../../../../../../features/reducers/plantilla_item_slice";
import usePositionSetter from "../../../../../../helpers/use_hooks/position_setter";
import useSweetAlertHelper from "../../../../../../helpers/use_hooks/sweetalert_helper";

const DropdownVpMenu = ({
	title,
	className,
	itemList,
	alignItems = "start",
	tooltipData = { position: "top", effect: "solid" },
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
				/>
			)}
		</div>
	);
};

export default DropdownVpMenu;

const DropList = ({ itemList = [], display = "none", xpos, ypos, size }) => {
	const navigate = useNavigate();
	const { toastSuccessFailMessage } = useSweetAlertHelper();
	const { selected_agency, plantilla_items, item_id } = useSelector(
		(state) => state.plantillaItem
	);

	const dispatch = useDispatch();

	const linkNavigationHandler = (item) => {
		const itemlink = item.link;

		/**
		 * For specific cases of routes or navigate through redux dispatches
		 */

		if (item.label.includes("JVS & CRW")) {
			navigate(itemlink + "/" + item_id);
			return;
		}

		if (item.label.includes("Memo on Posting")) {
			dispatch(setSelectAgency());
			return;
		}

		if (item.label.includes("Notify")) {
			dispatch(setNotifyOffice());
			dispatch(setEmailRecepients(selected_agency.agn_head_email));
			return;
		}

		// if (item.label.includes("Notice")) {
		// 	let positions = plantilla_items["positions"];
		// 	if (typeof positions === "undefined") {
		// 		// console.log("Gago!");
		// 		let response = {
		// 			data: {
		// 				code: 500,
		// 				message: "No selected row to print!",
		// 			},
		// 		};
		// 		toastSuccessFailMessage(response.data);
		// 	} else {
		// 		// console.log(plantilla_items["positions"]);
		// 		itemlink(plantilla_items);
		// 		return;
		// 	}
		// }

		if (item.label.includes("Next-in")) {
			dispatch(setNextRank());
			return;
		}

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

		return;
	};

	return (
		<React.Fragment>
			<ul
				className="ul-dropdown-container"
				style={{ display: display, position: "fixed", top: ypos, left: xpos }}
				ref={size}
			>
				<div className="ul-menu-item-arrow">
					<AiFillCaretUp size="15px" />
				</div>
				{itemList?.map((element, key) => {
					return (
						<li
							style={{ listStyle: "none" }}
							className="ul-menu-item"
							onClick={() => linkNavigationHandler(element)}
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
