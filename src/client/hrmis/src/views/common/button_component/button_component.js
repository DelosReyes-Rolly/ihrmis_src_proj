import React from "react";
import ReactTooltip from "react-tooltip";

const ButtonComponent = (props) => {
	return (
		<React.Fragment>
			{props.toolTipId && (
				<ReactTooltip
					id={props.toolTipId}
					place={props.tipPosition}
					effect="solid"
				>
					{props.tips ?? props.buttonName}
				</ReactTooltip>
			)}

			<button
				data-tip
				data-for={props.toolTipId}
				className={`button-components ${props.className}`}
				form={props.form}
				onClick={props.onClick}
				type={props.type}
				style={{
					background: props.bgColor,
					color: props.color,
					border: props.border,
				}}
			>
				<span
					className="bc-logo-component"
					style={
						props.buttonLogoStart !== null
							? { marginRight: "5px" }
							: { marginRight: "0px" }
					}
				>
					{props.buttonLogoStart}
				</span>

				<span className="bc-logo-component">{props.buttonName}</span>

				<span
					className="bc-logo-component"
					style={
						props.buttonLogoEnd !== null
							? { marginLeft: "5px" }
							: { marginLeft: "0px" }
					}
				>
					{props.buttonLogoEnd}
				</span>

				{props.children}
			</button>
		</React.Fragment>
	);
};

ButtonComponent.defaultProps = {
	buttonName: "Click Me",
};

export default ButtonComponent;
