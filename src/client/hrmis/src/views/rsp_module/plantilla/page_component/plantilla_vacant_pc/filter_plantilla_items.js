import { plantillaItemSelectFilter } from "../../static/filter_items";
import React, { useLayoutEffect, useState } from "react";
import { useAsyncDebounce } from "react-table";
import SearchComponent from "../../../../common/input_component/search_input/search_input";

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
	type,
	search,
	setSearch,
	statusFilter,
	preFilteredRows,
	globalFilter,
	setGlobalFilter,
	setAllFilters,
	setFiltersTable,
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

	useLayoutEffect(() => {
		setFiltersTable(selected);
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
				<SearchFilter
					type={type}
					search={search}
					setSearch={setSearch}
					statusFilter={statusFilter}
				/>
			</div>
		</React.Fragment>
	);
};

export default FilterPlantillaItems;

const SearchFilter = ({ type, search, setSearch, statusFilter }) => {
	return (
		<React.Fragment>
			<div className="selector-buttons">
				<div className="search-container">
					<span className="margin-right-1 selector-search-label">
						<label>Search</label>
					</span>
					<span>
						<SearchComponent
							placeholder="Search"
							value={search || ""}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</span>
				</div>
			</div>
		</React.Fragment>
	);
};
