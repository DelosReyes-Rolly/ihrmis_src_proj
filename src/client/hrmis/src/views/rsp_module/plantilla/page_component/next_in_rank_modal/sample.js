import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setNextRank,
	setRankEmail,
	setSelectAgency,
} from "../../../../../features/reducers/plantilla_item_slice.js";
import ButtonComponent from "../../../../common/button_component/button_component.js.js";
import PlantillaEmailModal from "../plantilla_email_modal/plantilla_email_modal.js";
import NextInRankModal from "./next_in_rank_modal.js";
import SelectAgencyModal from "./select_agency_modal.js";

const NextInRankAgency = () => {
	const dispatch = useDispatch();
	const { next_rank, select_agency, rank_email } = useSelector(
		(state) => state.plantillaItem
	);
	return (
		<React.Fragment>
			<NextInRankModal
				isDisplay={next_rank}
				onClose={() => dispatch(setNextRank())}
			/>
			<SelectAgencyModal
				isDisplay={select_agency}
				onClose={() => dispatch(setSelectAgency())}
			/>
			<PlantillaEmailModal
				isDisplay={rank_email}
				onClose={() => dispatch(setRankEmail())}
			/>

			<ButtonComponent
				buttonName="Next in Rank"
				onClick={() => dispatch(setNextRank())}
			/>
		</React.Fragment>
	);
};

export default NextInRankAgency;
