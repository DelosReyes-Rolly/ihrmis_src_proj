import React, { useRef, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const DropdownViewComponent = ({
	title = {},
	className,
	itemList,
	alignItems = "start",
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
};

export default DropdownViewComponent;

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
