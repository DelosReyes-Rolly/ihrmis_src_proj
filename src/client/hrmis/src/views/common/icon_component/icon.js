import React from "react";
import ReactTooltip from "react-tooltip";

const IconComponent = ({
	id,
	icon,
	className,
	toolTipId,
	textHelper = "",
	position = "top",
	effect = "solid",
	onClick = () => {},
	cursor = "pointer",
	color = "map-get($primaryColor, regular)",
	divStyle,
}) => {
	let addClassName = "plantilla-icon " + className;
	let style = { display: "flex", ...divStyle };
	return (
		<React.Fragment>
			<div style={style}>
				{toolTipId && (
					<ReactTooltip
						id={toolTipId}
						place={position}
						effect={effect}
						html={true}
					>
						{textHelper}
					</ReactTooltip>
				)}

				<span
					id={id}
					data-tip
					data-for={toolTipId}
					className={addClassName}
					onClick={onClick}
					style={{ cursor: cursor, color: color }}
				>
					{icon}
				</span>
			</div>
		</React.Fragment>
	);
};

export default IconComponent;
