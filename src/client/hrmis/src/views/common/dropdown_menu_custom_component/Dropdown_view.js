// import React, { useState } from "react";
// import { AiFillCaretUp } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// function DropdownViewComponent({
// 	title,
// 	className,
// 	link = null,
// 	itemList,
// 	alignItems = "start",
// }) {
// 	const [dropable, setDropable] = useState(false);
// 	return (
// 		<div
// 			style={{
// 				position: "relative",
// 				display: "flex",
// 				flexDirection: "column",
// 				alignItems: alignItems,
// 			}}
// 			onBlur={() => setDropable(false)}
// 		>
// 			<button
// 				className={className}
// 				style={{ width: "max-content" }}
// 				onClick={() => {
// 					setDropable(!dropable);
// 				}}
// 			>
// 				{title}
// 			</button>
// 			{itemList && (
// 				<DropList
// 					itemList={itemList}
// 					display={dropable ? "block" : "none"}
// 					linked={link}
// 				/>
// 			)}
// 		</div>
// 	);

import React, { useRef, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function DropdownViewComponent({
	title,
	className,
	itemList,
	alignItems = "start",
}) {
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
			<button
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
}

export default DropdownViewComponent;

/**
 * itemList is an array of object where each Object contains these keys;
 * - label
 * - link
 */

// const DropList = ({ itemList = [], display = "none", linked = null }) => {
// 	const navigate = useNavigate();
// 	return (
// 		<React.Fragment>
// 			<ul className="ul-dropdown-container" style={{ display: display }}>
// 				<div className="ul-menu-item-arrow">
// 					<AiFillCaretUp size="15px" />
// 				</div>
// 				{itemList?.map((element, key) => {
// 					return (
// 						<li
// 							className="ul-menu-item"
// 							onClick={() => navigate(linked ?? element.link)}
// 							key={key}
// 						>
// 							{element.label}
// 						</li>
// 					);
// 				})}
// 			</ul>
// 		</React.Fragment>
// 	);

const DropList = ({ itemList = [], display = "none", onClick }) => {
	return (
		<React.Fragment>
			<ul className="ul-dropdown-container" style={{ display: display }}>
				<div className="ul-menu-item-arrow">
					<AiFillCaretUp size="15px" />
				</div>
				{itemList?.map((element, key) => {
					return (
						<li
							className="ul-menu-item"
							onClick={() => onClick(element.link)}
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
