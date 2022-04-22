import React, { useState } from "react";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import IconComponent from "../../../../common/icon_component/icon";
import { BsFillCheckCircleFill, BsGlobe } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
import { plantillaVacantBreadCramp } from "../../static/breadcramp_data";
import { PlantillaDataTableDisplay } from "./plantilla_data_table_display";
import { API_HOST } from "../../../../../helpers/global/global_config";
import useAxiosCallHelper from "../../../../../helpers/use_hooks/axios_call_helper";
import { plantillaItemsReportsMenuItems } from "../../static/plantilla_vacant_positions_data";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import useSweetAlertHelper from "../../../../../helpers/use_hooks/sweetalert_helper";
import SelectAgencyModal from "../next_in_rank_modal/select_agency_modal";
import PostingOnJobVacancyModal from "../../posting_job_vacancy/posting_job_vacancy";
import DropdownMenu from "../../plantilla_vacant_menu/Dropdown_menu";

const PlantillaItemsVacantPositionComponentView = () => {
	const dispatch = useDispatch();
	const [selectedrowData, setSelectedRowData] = useState([]);
	const [axiosCall] = useAxiosCallHelper();
	const { sweetAlertConfirm, toastSuccessFailMessage } = useSweetAlertHelper();
	const [select_agency, setSelectAgency] = useState(false);
	const [posting_vacancy, setPostingJobVancy] = useState(false);

	const closeSelectedVacantPostions = async () => {
		// console.log(selectedrowData);
		if (preConfirm()) {
			sweetAlertConfirm(
				"Confirmation Dialog",
				<i>Click OK to confirm to close selected vacant position/s</i>,
				"question",
				true,
				preConfirm,
				confirmedAction
			);
		}
	};

	const preConfirm = () => {
		if (selectedrowData.positions.length === 0) {
			let response = {
				data: {
					code: 500,
					message: "No selected position/s!",
				},
			};
			toastSuccessFailMessage(response.data);
			return false;
		}
		return true;
	};

	const displayDropDopdown = (data, item) => {
		if (typeof item.link === "boolean" && item.link) {
			if (item.label.includes("Memo on Posting")) {
				data.setSelectAgency(item.link);
			}
		}
	};

	const confirmedAction = () => {
		axiosCall("post", API_HOST + "closeVacantPositions", selectedrowData).then(
			(response) => {
				//console.log(response.data);
				toastSuccessFailMessage(response.data);
				let data = response.data;
				if (data.code === 200) {
					dispatch(setRefresh());
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};

	return (
		<React.Fragment>
			<div className="plantilla-view">
				<div className="container-plantilla">
					{/* <BreadcrumbComponent list={bc.getBreadcrumbData('vacant')} className="" /> */}
					<BreadcrumbComponent list={plantillaVacantBreadCramp} className="" />
				</div>
				<div className="three-idiot">
					<DropdownMenu
						itemList={plantillaItemsReportsMenuItems}
						title={<AiFillPrinter size="22" />}
						alignItems="end"
						className="button-icon unstyled-button"
						tooltipData={{ toolTipId: "pl-vp-printer", textHelper: "Print" }}
						customData={{ setSelectAgency: setSelectAgency }}
						callback={displayDropDopdown}
					/>
					<IconComponent
						id="view_edit_vacantposition"
						className="padding-left-1"
						icon={<BsGlobe />}
						toolTipId="pl-vp-view"
						textHelper="View/Edit Selected 	 Position"
						onClick={() => {
							setPostingJobVancy(true);
						}}
					/>
					<IconComponent
						id="close_vacant_position"
						className="padding-left-1"
						icon={<BsFillCheckCircleFill />}
						toolTipId="pl-vp-check"
						textHelper="Close Vacant Position"
						onClick={() => closeSelectedVacantPostions()}
					/>
				</div>
				<div>
					<PlantillaDataTableDisplay
						type={1}
						selectedPlantillaItems={setSelectedRowData}
					/>
				</div>
			</div>
			<SelectAgencyModal
				selectedrowData={selectedrowData}
				isDisplay={select_agency}
				onClose={() => setSelectAgency()}
			/>
			<PostingOnJobVacancyModal
				selectedrowData={selectedrowData}
				isDisplay={posting_vacancy}
				onClose={() => setPostingJobVancy()}
			/>
		</React.Fragment>
	);
};

export default PlantillaItemsVacantPositionComponentView;
