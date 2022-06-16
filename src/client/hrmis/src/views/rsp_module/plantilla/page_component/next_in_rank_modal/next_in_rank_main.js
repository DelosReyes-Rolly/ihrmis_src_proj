import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setContextMenu,
  setNextRank,
  setRankEmail,
} from "../../../../../features/reducers/plantilla_item_slice.js";
import { API_HOST } from "../../../../../helpers/global/global_config.js";
import { useToggleHelper } from "../../../../../helpers/use_hooks/toggle_helper.js";
import ButtonComponent from "../../../../common/button_component/button_component.js.js";
import PlantillaEmailModal, {
  EMAIL_ENUM,
} from "../plantilla_email_modal/plantilla_email_modal.js";
import ContextMenuModal from "./context_menu_modal.js";
import NextInRankModal from "./next_in_rank_modal.js";

const NextInRankMain = ({ plantilla }) => {
  const dispatch = useDispatch();
  const { next_rank, context_menu, rank_email } = useSelector(
    (state) => state.plantillaItem
  );
  return (
    <React.Fragment>
      <NextInRankModal
        isDisplay={next_rank}
        onClose={() => dispatch(setNextRank())}
      />
      <ContextMenuModal
        isDisplay={context_menu}
        onClose={() => dispatch(setContextMenu())}
      />
      <PlantillaEmailModal
        plantilla={plantilla}
        isDisplay={rank_email}
        onClose={() => dispatch(setRankEmail())}
        type={EMAIL_ENUM.next_rank}
        endpoint={API_HOST + "notify-next-rank"}
      />

      <ButtonComponent
        buttonName="Next in Rank"
        onClick={() => dispatch(setNextRank())}
      />
    </React.Fragment>
  );
};

export default NextInRankMain;
