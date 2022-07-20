import React from "react";
import { BsSearch } from "react-icons/bs";
import IconComponent from "../../icon_component/icon";
import InputIconComponent from "../input_component/input_component";

const SearchComponent = ({
	placeholder = "Type to search",
	onChange,
	value,
	icon = <BsSearch />,
	hideLabel = false,
	cursor = "text",
}) => {
	return (
		<div className="search-container">
			<div
				className="margin-right-1 selector-search-label"
				style={{ display: hideLabel ? "none" : "block" }}
			>
				<label>Search</label>
			</div>

			<div className="input-div">
				<input
					className="custom-input"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<button className="" type="submit">
					{<IconComponent icon={icon} cursor={cursor} />}
				</button>
			</div>
		</div>
	);
};

export default SearchComponent;
