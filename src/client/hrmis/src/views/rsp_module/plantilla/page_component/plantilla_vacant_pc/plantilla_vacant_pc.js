import React from "react";
import BreadcrumbComponent from "../../../../common/breadcrumb_component/Breadcrumb";
import IconComponent from "../../../../common/icon_component/icon";
import { BsFillCheckCircleFill, BsGlobe } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
import { plantillaVacantBreadCramp } from "../../static/breadcramp_data";
import { printVacantPositions } from "./print_vacant_positions";
import { PlantillaDataTableDisplay } from "./plantilla_data_table_display";
// eslint-disable-next-line
// import { BreadCrumbsData } from "../../static/breadcramp_data";

// let bc = BreadCrumbsData();

const PlantillaItemsVacantPositionComponentView = () => {
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
						onClick={printVacantPositions}
					/>
					<IconComponent
						id="print_vacantposition"
						className="padding-left-1"
						icon={<BsGlobe />}
						toolTipId="pl-vp-view"
						textHelper="View/Edit Selected Vacant Position"
						onClick={printVacantPositions}
					/>
					<IconComponent
						id="print_vacantposition"
						className="padding-left-1"
						icon={<BsFillCheckCircleFill />}
						toolTipId="pl-vp-check"
						textHelper="Close Vacant Position"
						onClick={printVacantPositions}
					/>
				</div>
				<div>
					<PlantillaDataTableDisplay type={1} />
				</div>
			</div>
		</React.Fragment>
	);
};

export default PlantillaItemsVacantPositionComponentView;
