import React from "react";
import JvsCrwFormPage from "../rsp_module/plantilla/page_component/jvs_crw_pc/parts/forms/jvs_crw_form";
import JvsFormOne from "../rsp_module/plantilla/page_component/jvs_crw_pc/parts/forms/jvs_form_one";

const JvscrsForm = () => {
  return (
    <React.Fragment>
      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "25px",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        <JvsFormOne />
        {/* <JvsCrwFormPage /> */}
      </div>
    </React.Fragment>
  );
};

export default JvscrsForm;
