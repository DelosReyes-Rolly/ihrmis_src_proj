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
import AddPlantillaItemDutiesAndRespoModal from "../plantilla/page_component/plantilla_info_modals/add_duties_respo_modal.js";

//Main Component
const LibraryView = () => {
  //STATES/HOOK
  const [showModal, setShowModal] = useToggleService(false); //SHOW MODAL HOOK

  return (
    <div style={{ margin: "20px" }}>
      <h1>Library</h1>
      <br />
      <ButtonComponent onClick={() => setShowModal()} buttonName="Position" />

      {/* <PositionModal onClose={() => setShowModal()} isDisplay={showModal} /> */}

      <AddPlantillaItemDutiesAndRespoModal
        onClose={() => setShowModal()}
        isDisplay={showModal}
      />

      <br />
      <TagsInputComponent />
    </div>
  );
};

export default LibraryView;
