import { plantillaItemSelectFilter } from "../../static/filter_items";
import React, { useLayoutEffect, useState } from "react";
import { useAsyncDebounce } from "react-table";

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
	preFilteredRows,
	globalFilter,
	setGlobalFilter,
	setAllFilters,
}) => {
	const [selected, setSelected] = useState({
		value: 0,
	});

	const [value, setValue] = useState(globalFilter);
	const handleChange = useAsyncDebounce((tvalue) => {
		// console.log("selected: " + selected.value);

		if (isNaN(tvalue) && tvalue.length === 0) {
			setGlobalFilter(value || undefined);
		} else if (isNaN(tvalue) && tvalue.length > 0) {
			statusFilter("pos_category", tvalue);
		} else {
			statusFilter("itm_state", tvalue);
		}

		console.log(selected.value);
		console.log(preFilteredRows);
	});

	return (
		<React.Fragment>
			<div className="selector-container">
				<span className="vacant-position-filter selector-span-1">
					<select
						value={selected.value}
						onChange={(e) => {
							setSelected({ value: e.target.value });
							setValue(e.target.value);
							setAllFilters([]);
							handleChange(e.target.value);
						}}
					>
						<option className="options" disabled>
							Filter By
						</option>
						{plantillaItemSelectFilter.map((item, i) => {
							return (
								<option className="options" key={i} value={item.value}>
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
