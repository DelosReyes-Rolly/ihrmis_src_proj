import BreadcrumbComponent from "../../common/breadcrumb_component/Breadcrumb";
import DropdownViewComponent from "../../common/dropdown_menu_custom_component/Dropdown_view";
import SearchComponent from "../../common/input_component/search_input/search_input";
import BadgeComponent from "../../common/badge_component/Badge";
import { recruitmentBreadCramp } from "./static/breadcramp_item";
import { recruitmentTableData } from "./fake_data/table_data";
import { MdAdd, MdMoreHoriz } from "react-icons/md";
// import { BsArrowUpDown } from 'react-icons/bs'
import React, { useState } from "react";
import {
	recruitmentMenuItem,
	recruitmentSelectItem,
} from "./static/menu_items";
import { recruitmentSelectFilter } from "./static/filter_items";

const RecruitmentView = (props) => {
	const [toggleState, setToggleState] = useState(1);
	const toggleTab = (index) => {
		setToggleState(index);
	};

	const [buttonToggleState, setButtonToggleState] = useState({
		on: false,
		index: 0,
	});
	const buttonTogleTab = (number) => {
		if (buttonToggleState.on === false) {
			setButtonToggleState({ on: true, index: number });
		} else {
			setButtonToggleState({ on: false, index: number });
		}
	};
	//const valueStorage = false;

	return (
		<div className="plantilla-view">
			<div className="container-plantilla">
				<BreadcrumbComponent list={recruitmentBreadCramp} className="" />
			</div>

			<div className="tab-button">
				<button
					onClick={() => toggleTab(1)}
					className={toggleState === 1 ? "tab-tap tab-tap-activate" : "tab-tap"}
				>
					Qualified
				</button>
				<BadgeComponent className="tab-badge-add-style" value={"1"} />
				<button
					onClick={() => toggleTab(2)}
					className={
						toggleState === 2
							? "tab-tap tab-tap-activate margin-left-1"
							: "tab-tap margin-left-1"
					}
				>
					Disqualified
				</button>
				<hr className="solid" />
			</div>
			{/* TAB MENU STARTS HERE  */}
			<div className={toggleState === 1 ? "current-tab" : "show-none"}>
				<div className="selector-buttons">
					<div className="selector-container">
						<span className="selector-span-1">
							<button>
								<MdAdd size="18" />
								<span>Applicant</span>
							</button>
						</span>
						<span className="margin-left-1 selector-span-1">
							<select defaultValue={"DEFAULT"}>
								<option value="DEFAULT" disabled>
									Vacant Position
								</option>
								{recruitmentSelectFilter.map((item) => {
									return (
										<option
											className="options"
											key={item.value}
											defaultValue={item.value}
										>
											{item.title}
										</option>
									);
								})}
							</select>
						</span>
						<span className="margin-left-1 selector-span-1">
							<select defaultValue={"DEFAULT"}>
								<option value="DEFAULT" disabled>
									Filter By
								</option>
								{recruitmentSelectItem.map((item) => {
									return (
										<option
											className="options"
											key={item.value}
											defaultValue={item.value}
										>
											{item.title}
										</option>
									);
								})}
							</select>
						</span>
					</div>

					<div className="search-container">
						<span className="margin-right-1 selector-search-label">
							<label>Search</label>
						</span>
						<span>
							<SearchComponent placeholder="Search" />
						</span>
					</div>
				</div>
				<div className="plantilla-table">
					<div className="scrollable-div-table">
						<table id="custom-table">
							<thead>
								<tr className="fixed-label-table">
									{/* <button><BsArrowUpDown/></button> */}
									<th>Name</th>
									<th>Profile</th>
									<th>Qualifications</th>
									<th> Position applied</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{recruitmentTableData.map((data) => {
									return (
										<tr className="trClass" key={data.id}>
											<td>{data.applicant}</td>
											<td>
												{data.profile.info}
												<br />
												{data.profile.email}
												<br />
												{data.profile.cellNo}
											</td>
											<td style={{ width: "250px" }}>{data.qualification}</td>
											<td>
												{data.positionApplied.position}
												<br />
												{data.positionApplied.posAbbrv}
											</td>
											<td className="column-option">
												<div className="inline-div-td-1">
													{data.status.record}
													<br />
													{data.status.score}
												</div>
												<div className="inline-div-td-2">
													<button onClick={() => buttonTogleTab(data.id)}>
														<MdMoreHoriz size="15" />
													</button>
													<DropdownViewComponent
														display={
															buttonToggleState.on
																? buttonToggleState.index === data.id
																	? "block"
																	: "none"
																: "none"
														}
														itemList={recruitmentMenuItem}
													/>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					<p className="data-entry">
						Total of {recruitmentTableData.length} Entries
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecruitmentView;
