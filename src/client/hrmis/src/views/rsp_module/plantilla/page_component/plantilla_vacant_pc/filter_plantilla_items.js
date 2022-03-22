import { plantillaItemSelectFilter } from "../../static/filter_items";
import React from "react";

/**
 * FilterPlantillaItems
 * @param type,
 * @param search,
 * @param setSearch,
 * @param statusFilter
 * @returns
 */
export const FilterPlantillaItems = ({
	type,
	search,
	setSearch,
	statusFilter,
}) => {
	return (
		<React.Fragment>
			<div className="selector-container">
				<span className="vacant-position-filter selector-span-1">
					<select
						onChange={(e) => statusFilter("pos_category", e.target.value)}
					>
						<option className="options" key="0" value="0">
							Filter By
						</option>
						{plantillaItemSelectFilter.map((item) => {
							return (
								<option className="options" key={item.value} value={item.value}>
									{item.title}
								</option>
							);
						})}
					</select>
				</span>
			</div>
		</React.Fragment>
	);
};

export default FilterPlantillaItems;
