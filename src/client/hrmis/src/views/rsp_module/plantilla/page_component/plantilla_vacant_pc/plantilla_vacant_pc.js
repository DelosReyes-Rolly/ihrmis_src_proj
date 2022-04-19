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
import DropdownViewComponent from "../../../../common/dropdown_menu_custom_component/Dropdown_view";
import { MdMoreHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import useSweetAlertHelper from "../../../../../helpers/use_hooks/sweetalert_helper";
// eslint-disable-next-line
// import { BreadCrumbsData } from "../../static/breadcramp_data";

// let bc = BreadCrumbsData();

const PlantillaItemsVacantPositionComponentView = () => {
	const dispatch = useDispatch();
	const [selectedrowData, setSelectedRowData] = useState([]);
	const [axiosCall] = useAxiosCallHelper();
	const { sweetAlertConfirm, toastSuccessFailMessage } = useSweetAlertHelper();

	const closeSelectedVacantPostions = async () => {
		// console.log(selectedrowData);
		sweetAlertConfirm(
			"Confirmation Dialog",
			"Click OK to confirm to close selected vacant position/s",
			"question",
			true,
			() => {},
			preConfirm(),
			confirmedAction()
		);
	};

	const confirmedAction = () => {
		axiosCall("post", API_HOST + "closeVacantPositions", selectedrowData).then(
			(response) => {
				console.log(response.data);
				toastSuccessFailMessage(response.data);
				dispatch(setRefresh());
			},
			(error) => {
				console.log(error);
			}
		);
	};
	const preConfirm = () => {
		if (selectedrowData.positions.length > 0) {
			return true;
		} else {
			let response = {
				data: {
					code: 500,
					message: "No selected position/s!",
				},
			};
			toastSuccessFailMessage(response.data);
		}
		return false;
	};

	return (
		<React.Fragment>
			<div className="plantilla-view">
				<div className="container-plantilla">
					{/* <BreadcrumbComponent list={bc.getBreadcrumbData('vacant')} className="" /> */}
					<BreadcrumbComponent list={plantillaVacantBreadCramp} className="" />
				</div>
				<div className="three-idiot">
					<IconComponent
						id="print_vacantposition"
						icon={<AiFillPrinter />}
						toolTipId="pl-vp-printer"
						textHelper="Print"
						onClick={() => {}}
					/>

					<IconComponent
						id="view_edit_vacantposition"
						className="padding-left-1"
						icon={<BsGlobe />}
						toolTipId="pl-vp-view"
						textHelper="View/Edit Selected 	 Position"
						onClick={() => {}}
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
		</React.Fragment>
	);
};

export default PlantillaItemsVacantPositionComponentView;

const ShowMenuForPlantillaReports = () => {
	return (
		<React.Fragment>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<DropdownViewComponent
					itemList={plantillaItemsReportsMenuItems}
					title={<MdMoreHoriz size="15" />}
					alignItems="end"
				/>
			</div>
		</React.Fragment>
	);
};
