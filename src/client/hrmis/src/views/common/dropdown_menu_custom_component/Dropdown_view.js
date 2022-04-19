import React, { useRef, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const DropdownViewComponent = ({
	title = {},
	className,
	itemList,
	alignItems = "start",
	toolTipId,
	textHelper,
	position = "top",
	effect = "solid",
}) => {
	const [dropable, setDropable] = useState(false);
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
		>
			{toolTipId && (
				<ReactTooltip id={toolTipId} place={position} effect={effect}>
					{textHelper}
				</ReactTooltip>
			)}

			<button
				data-tip
				data-for={toolTipId}
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
				/>
			)}
		</div>
	);
};

export default DropdownViewComponent;

const DropList = ({ itemList = [], display = "none" }) => {
	const navigate = useNavigate();

	const linkDetector = (item) => {
		if (typeof item === "string" || item instanceof String)
			return navigate(item);
		item();
	};

	return (
		<React.Fragment>
			<ul className="ul-dropdown-container" style={{ display: display }}>
				<div className="ul-menu-item-arrow">
					<AiFillCaretUp size="15px" />
				</div>
				{itemList?.map((element, key) => {
					return (
						<li
							style={{ listStyle: "none" }}
							className="ul-menu-item"
							onClick={() => linkDetector(element.link)}
							key={key}
						>
							{element.label}
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};
