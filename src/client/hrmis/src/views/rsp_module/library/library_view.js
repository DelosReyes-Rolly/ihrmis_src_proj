// --------------------------------------------------------------------------------------
// DEVELOPER: SEAN TERRENCE A. CALZADA
// PAGE COMPONENT: LB-110
// COMPANY: DEPARTMENT OF SCIENCE AND TECHNOLOGY
// DATE: SEPTEMBER 1-2 2021
// --------------------------------------------------------------------------------------

import React from "react";
import ButtonComponent from "../../common/button_component/button_component.js.js";
import TagsInputComponent from "../../common/input_component/tags_input_component/tags_input_component";
import { useToggleService } from "../../../services/toggle_service.js";
import PlantillaEmailModal from "../plantilla/page_component/plantilla_email_modal/plantilla_email_modal.js";
import PositionModal from "../plantilla/page_component/plantilla_info_modals/position_modal";
//Main Component
const LibraryView = () => {
  //STATES/HOOK
  const [showModal, setShowModal] = useToggleService(false); //SHOW MODAL HOOK
  const [showPosModal, setShowPosModal] = useToggleService(false); //SHOW MODAL HOOK
  return (
    <div style={{ margin: "20px" }}>
      <h1>Library</h1>
      <br />
      <ButtonComponent onClick={() => setShowModal()} buttonName="Email" />
      <br />
      <ButtonComponent
        onClick={() => setShowPosModal()}
        buttonName="Position"
      />

      <PositionModal
        onClose={() => setShowPosModal()}
        isDisplay={showPosModal}
      />

      <PlantillaEmailModal
        onClose={() => setShowModal()}
        isDisplay={showModal}
      />

      <br />
      <TagsInputComponent />
    </div>
  );
};

export default LibraryView;
