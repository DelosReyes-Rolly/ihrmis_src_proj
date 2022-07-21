import { plantillaItemSelectFilter } from "../../static/filter_items";
import React, { useLayoutEffect, useState } from "react";
import { useAsyncDebounce } from "react-table";
import SearchComponent from "../../../../common/input_component/search_input/search_input";
import { setSelectedFiterValue } from "../../../../../features/reducers/plantilla_item_slice";
import { useDispatch } from "react-redux";

/**
 * FilterPlantillaItems
 * @param type,
 * @param search,
 * @param setSearch,
 * @param statusFilter
 * @param preFilteredRows,
 * @param globalFilter,
 * @param setGlobalFilter,
 * @param setAllFilters,
 * @param setSelectedFilter,
 * @returns
 */
export const FilterPlantillaItems = ({
	search,
	setSearch,
	statusFilter,
	globalFilter,
	setGlobalFilter,
	setAllFilters,
	// setFiltersTable,
}) => {
	const [selected, setSelected] = useState({
		value: undefined,
	});

	const [value, setValue] = useState(globalFilter);
	const [disabledOption, setDisabledOption] = useState(false);
	const [counter, setcounter] = useState(0);
	const dispatch = useDispatch();

	const handleChange = useAsyncDebounce((e) => {
		let tvalue = e.target.value;
		if (counter === 0 && selected.value !== "FB") {
			setDisabledOption(true);
			setcounter(+1);
		}

		if (isNaN(tvalue) && tvalue.length === 0) {
			setGlobalFilter(value || undefined);
		} else if (isNaN(tvalue) && tvalue.length > 0) {
			statusFilter("pos_category", tvalue);
		} else {
			statusFilter("itm_state", tvalue);
		}

		dispatch(setSelectedFiterValue(selected.value));
		// console.log(selected.value);
		// console.log(preFilteredRows);
	});

	return (
		<React.Fragment>
			<div className="selector-buttons">
				<div className="selector-container">
					<span className="selector-span-1">
						<select
							value={selected.value}
							onChange={(e) => {
								setSelected({ value: e.target.value });
								setValue(e.target.value);
								setAllFilters([]);
								handleChange(e);
							}}
						>
							{plantillaItemSelectFilter.map((item, i) => {
								return (
									<option
										className="options"
										key={i}
										value={item.value}
										disabled={
											item.title === "Filter By" && disabledOption
												? "disabled"
												: ""
										}
									>
										{item.title}
									</option>
								);
							})}
						</select>
					</span>
				</div>
				<div style={{ width: "300px" }}>
					<SearchComponent
						value={search || ""}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default FilterPlantillaItems;
