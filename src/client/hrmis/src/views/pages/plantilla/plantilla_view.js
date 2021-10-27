import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EmployeePageComponentView from './page_component/employee_pc/employee_pc_view';
import PlantillaItemPageComponentView from './page_component/plantilla_items_pc/plantilla_items';
import FormPageOne from '../library/page_components/pds_profiles_pc/parts/forms/form_page_one';
import JvsCrwPageComponentView from './page_component/jvs_crw_pc/jvs_crw';
import { SuccessEmailConfirmation, SentEmailConfirmation, SubmitSuccess } from '../library/page_components/pds_profiles_pc/parts/previous_next';
import FormPageTwo from '../library/page_components/pds_profiles_pc/parts/forms/form_page_two';
import FormPageThree from '../library/page_components/pds_profiles_pc/parts/forms/form_page_three'

const PlantillaView =()=> {

    return ( 
        <React.Fragment>

            <Switch>
                <Route exact path="/ihrmis/plantilla/">
                    <Redirect from="/ihrmis/plantilla/" to="/ihrmis/plantilla/employee"/>
                </Route>
                <Route path="/ihrmis/plantilla/employee">
                    <EmployeePageComponentView />
                </Route>
                <Route exact path="/ihrmis/plantilla/plantilla-items"> 
                    <PlantillaItemPageComponentView />
                </Route>
                <Route path="/ihrmis/plantilla/plantilla-items/jvs-crw"> 
                    <JvsCrwPageComponentView />
                </Route> 

                {/* 
                  // =============================================
                  // ROUTES FOR PDS FORMS
                  // =============================================
                */}

                <Route path="/ihrmis/plantilla/form-page-one/:item">
                  <FormPageOne/>
                </Route>
                <Route path="/ihrmis/plantilla/form-page-two/:item">
                  <FormPageTwo />
                </Route>
                <Route path="/ihrmis/plantilla/form-page-three/:item">
                  <FormPageThree />
                </Route>


                {/* 
                  // =============================================
                  // ROUTES FOR PDS FORMS SUBMIT SUCCESSTIONS
                  // =============================================
                */}
                <Route path="/ihrmis/plantilla/verify-email">
                  <SentEmailConfirmation/>
                </Route>
                <Route path="/ihrmis/plantilla/success-confirmation/:item">
                  <SuccessEmailConfirmation/>
                </Route>
                <Route path="/ihrmis/plantilla/subbmit-success/:item">
                  <SubmitSuccess />
                </Route>
            </Switch>

        </React.Fragment>
    );
}
 
export default PlantillaView;