// --------------------------------------------------------------------------------------
// DEVELOPER: SEAN TERRENCE A. CALZADA
// PAGE COMPONENT: LB-110
// COMPANY: DEPARTMENT OF SCIENCE AND TECHNOLOGY
// DATE: SEPTEMBER 1-2 2021
// --------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import ButtonComponent from "../../common/button_component/button_component.js.js";
import PlantillaEmailModal from "../plantilla/page_component/plantilla_email_modal/plantilla_email_modal.js";
import PositionModal from "../plantilla/page_component/plantilla_info_modals/position_modal";
import DropdownViewComponent from "../../common/dropdown_menu_custom_component/Dropdown_view.js";
import { MdMoreHoriz } from "react-icons/md";
import AddEmailTemplateModal from "../others/add_email_template_modal.js";
import NextInRankModal from "../plantilla/page_component/next_in_rank_modal/next_in_rank_modal.js";
import { useToggleHelper } from "../../../helpers/use_hooks/toggle_helper.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "../../../features/reducers/vacant_slice.js";
import NotificationComponent from "../../common/notification/notification_component.js";
import NextInRankAgency from "../plantilla/page_component/next_in_rank_modal/sample.js";
//Main Component

const data = [
  { label: "asdfasdfasd", link: "dhezsd" },
  { label: "dfas", link: "" },
  { label: "asdfasddfdsfasd", link: "" },
];

const LibraryView = ({}) => {
  //STATES/HOOK
  const [showModal, setShowModal] = useToggleHelper(false); //SHOW MODAL HOOK
  const [showPosModal, setShowPosModal] = useToggleHelper(false); //SHOW MODAL HOOK
  const [showTempModal, setShowTempModal] = useToggleHelper(false); //SHOW MODAL HOOK
  const [showNIPModal, setShowNIPModal] = useToggleHelper(false); //SHOW MODAL HOOK

  const { count } = useSelector((state) => state.vacant);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Library {count}</h1>
      <button onClick={() => {}}>Click Me</button> <br />
      <NotificationComponent />
      <br />
      <div style={{ display: "flex", gap: 12 }}>
        {/* <ButtonComponent onClick={() => setShowModal()} buttonName="Email" />
        <ButtonComponent onClick={() => setShowPosModal()} buttonName="Position" />
        <ButtonComponent onClick={() => setShowTempModal()} buttonName="Template" /> */}
        {/* <ButtonComponent onClick={() => setShowNIPModal()} buttonName="Next-In-Rank" /> */}
        <NextInRankAgency />
      </div>
      {/* <NextInRankModal onClose={() => setShowNIPModal()} isDisplay={showNIPModal} /> */}
      {/* <PositionModal onClose={() => setShowPosModal()} isDisplay={showPosModal} /> */}
      {/* <PlantillaEmailModal onClose={() => setShowModal()} isDisplay={showModal} plantillaId={2} /> */}
      {/* <AddEmailTemplateModal onClose={() => setShowTempModal()} isDisplay={showTempModal} /> */}
      {/* <br />
      <div style={{ float: "right" }}>
        <DropdownViewComponent className="sadfasdf" itemList={data} alignItems="end" title={<MdMoreHoriz />} />
      </div> */}
      {/* adsfasdf */}
    </div>
  );
};

export default LibraryView;
