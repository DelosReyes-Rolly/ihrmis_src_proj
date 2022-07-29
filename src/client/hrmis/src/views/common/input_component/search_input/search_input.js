import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import IconComponent from "../../icon_component/icon";

const SearchComponent = ({
	placeholder = "Type to search",
	onChange,
	value,
	icon = <BsSearch />,
	hideLabel = false,
	cursor = "text",
	className,
	styleInput,
	styleButton,
	styleParentInputDiv,
	iconClassName,
	color,
	onClick = null,
	type = "submit",
	readOnly = false,
}) => {
	const inputElement = useRef();

	const focusInput = () => {
		inputElement.current.focus();
	};

	return (
		<div className="search-container">
			<div
				className="margin-right-1 selector-search-label"
				style={{ display: hideLabel ? "none" : "block" }}
			>
				<label>Search</label>
			</div>

			<div className={`input-div ${styleParentInputDiv}`}>
				<input
					className={`custom-input ${className}`}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					ref={inputElement}
					style={styleInput}
					readOnly={readOnly}
				/>
				<button
					className=""
					type={type}
					onClick={onClick ?? focusInput}
					style={styleButton}
				>
					{
						<IconComponent
							icon={icon}
							cursor={cursor}
							color={color}
							className={iconClassName}
						/>
					}
				</button>
			</div>
		</div>
	);
};

export default SearchComponent;
