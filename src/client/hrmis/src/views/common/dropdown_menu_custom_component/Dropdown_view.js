// import React from "react";
// import { AiFillCaretUp } from "react-icons/ai";
// import { Link } from "react-router-dom";

// function DropdownViewComponent(props) {
//   return (
//     <ul className="ul-dropdown-container" style={{ display: props.display }}>
//       <div className="ul-menu-item-arrow">
//         <AiFillCaretUp size="15px" />
//       </div>
//       {props.itemList.map((list) => {
//         if (list.itemTitle === "Next-in-Rank") {
//           return (
//             <li
//               onClick={props.onClick}
//               className="ul-menu-item link-class"
//               key={list.id}
//             >
//               {list.itemTitle}
//             </li>
//           );
//         } else {
//           return (
//             <Link className="link-class" to={list.link} key={list.id}>
//               <li className="ul-menu-item">{list.itemTitle}</li>
//             </Link>
//           );
//         }
//       })}
//     </ul>
//   );
// }

// DropdownViewComponent.defaultProps = {
//   display: "none",
//   link: "#",
// };

// export default DropdownViewComponent;

import React, { useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function DropdownViewComponent({
	title,
	className,
	link = null,
	itemList,
	alignItems = "start",
}) {
	const [dropable, setDropable] = useState(false);
	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				alignItems: alignItems,
			}}
			onBlur={() => setDropable(false)}
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
					linked={link}
				/>
			)}
		</div>
	);
}

export default DropdownViewComponent;

/**
 * itemList is an Object containing;
 * - label
 * - link
 */

const DropList = ({ itemList = [], display = "none", linked = null }) => {
	const navigate = useNavigate();
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
							onClick={() => navigate(linked ?? element.link)}
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
