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
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../../../../../features/reducers/popup_response";
import useSweetAlertHelper from "../../../../../helpers/use_hooks/sweetalert_helper";
import SelectAgencyModal from "../next_in_rank_modal/select_agency_modal";
import PostingOnJobVacancyModal from "../posting_job_vacancy_modal/posting_job_vacancy_modal";
import { setSelectAgency } from "../../../../../features/reducers/plantilla_item_slice";
import {
	printMemoOnPostingOfVpForCsc,
	printMemoOnPostingOfVpForDost,
} from "../../../../../router/outside_routes";
import { setRefreh } from "../../../../../features/reducers/jvscrw_slice";
import Swal from "sweetalert2";
import DropdownVpMenu from "./plantilla_vp_menu/Dropdownvpmenu";

const PlantillaItemsVacantPositionComponentView = () => {
	const dispatch = useDispatch();
	const [axiosCall] = useAxiosCallHelper();
	const [posting_vacancy, setPostingJobVancy] = useState(false);
	const { selected_agency, select_agency, plantilla_items } = useSelector(
		(state) => state.plantillaItem
	);
	const { toastSuccessFailMessage } = useSweetAlertHelper();

	const closeSelectedVacantPostions = async () => {
		if (preConfirm()) {
			let confirmButtonText = "OK",
				cancelButtonColor = "#d33",
				cancelButtonText = "Cancel";
			Swal.fire({
				title: "<span>Confirmation Dialog</span>",
				html: "<span><i>Click OK to confirm to close selected vacant position/s</i></span>",
				icon: "question",
				showCloseButton: true,
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				confirmButtonText: confirmButtonText,
				cancelButtonColor: cancelButtonColor,
				cancelButtonText: cancelButtonText,
				preConfirm: () => {
					preConfirm();
				},
			}).then((result) => {
				if (result.isConfirmed) {
					confirmedAction();
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					cancelCallback();
					dispatch(setRefreh());
				}
			});
		}
	};

	const preConfirm = () => {
		if (
			typeof plantilla_items["positions"] === "undefined" ||
			plantilla_items["positions"].length === 0
		) {
			let response = {
				data: {
					code: 500,
					message: "No selected position/s!",
				},
			};
			toastSuccessFailMessage(response.data);
			return false;
		} else {
			return true;
		}
	};

	const confirmedAction = () => {
		console.log(plantilla_items);
		axiosCall(
			"post",
			API_HOST + "closeVacantPositions",
			plantilla_items["positions"]
		).then(
			(response) => {
				let resdata = response.data;

				let data = response.data;
				if (data.code === 200) {
					const result = resdata.result;
					let str_html = "";
					for (const key in result) {
						const element = result[key];
						str_html +=
							"Plantilla Item No.: " +
							+'<span style="font-weight: 600">' +
							element.itm_no +
							"</span>" +
							'<br><span style="font-style: italic; color: ' +
							(element.code === 200 ? "green" : "red") +
							'">' +
							element.message +
							"</span> <br>";
					}

					Swal.fire({
						title: "<span>Closing Vacant Positions</span>",
						html: '<div style="text-align:left">' + str_html + "</div>",
						icon: "info",
						showCloseButton: true,
						showCancelButton: false,
						showConfirmButton: false,
					});

					dispatch(setRefreh());
				} else {
					toastSuccessFailMessage(resdata);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const cancelCallback = () => {
		let response = {
			data: {
				code: 500,
				message: "No selected position/s!",
			},
		};
		toastSuccessFailMessage(response.data);
	};

	return (
		<React.Fragment>
			<div className="plantilla-view">
				<div className="container-plantilla">
					{/* <BreadcrumbComponent list={bc.getBreadcrumbData('vacant')} className="" /> */}
					<BreadcrumbComponent list={plantillaVacantBreadCramp} className="" />
				</div>
				<div className="three-idiot">
					<DropdownVpMenu
						itemList={plantillaItemsReportsMenuItems}
						title={<AiFillPrinter size="22" />}
						alignItems="end"
						className="button-icon unstyled-button"
						tooltipData={{ toolTipId: "pl-vp-printer", textHelper: "Print" }}
					/>
					<IconComponent
						id="view_edit_vacantposition"
						className="padding-left-1"
						icon={<BsGlobe />}
						toolTipId="pl-vp-view"
						textHelper="View/Edit Job Vacancy"
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
					<PlantillaDataTableDisplay type={1} />
				</div>
			</div>
			<SelectAgencyModal
				isDisplay={select_agency}
				onClose={() => {
					dispatch(setSelectAgency());
				}}
				onClickSubmit={() => {
					if (selected_agency.length === 0) {
						let response = {
							data: {
								code: 500,
								message: "No selected agency!",
							},
						};
						toastSuccessFailMessage(response.data, "top");
					} else {
						printMemoOnPostingOfVpForDost(selected_agency);
					}
				}}
			/>
			<PostingOnJobVacancyModal
				isDisplay={posting_vacancy}
				onClose={() => setPostingJobVancy()}
			/>
		</React.Fragment>
	);
};

export default PlantillaItemsVacantPositionComponentView;
