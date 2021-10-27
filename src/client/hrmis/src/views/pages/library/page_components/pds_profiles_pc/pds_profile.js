import React, { useState } from 'react';
import ButtonComponent from '../../../../common/button_component/button_component.js';
// import FormPageThree from './parts/forms/form_page_three';
// import FormPageOne from './parts/forms/form_page_one';
// import FormPageTwo from './parts/forms/form_page_two';
// import FormPageFour from './parts/forms/form_page_four';
// import FormPageFive from './parts/forms/form_page_five';
// import FormPageSix from './parts/forms/form_page_six';
import FormPageOne from './parts/forms/form_page_one'
import { useDelayService } from '../../../../../services/delay_service.js';
import { useDispatch } from 'react-redux';
import { setBusy } from '../../../../../features/reducers/loading_slice.js';


const PdsProfilePageComponentView = (props) => {
    
    return (
        <div className="pds-profile-main-view">
            {/* <FormPageOne /> */}
        </div>     
    );
}





export default PdsProfilePageComponentView;