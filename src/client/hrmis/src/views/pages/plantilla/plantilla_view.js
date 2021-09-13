import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EmployeePageComponentView from './page_component/employee_pc/employee_pc_view';
import PlantillaItemPageComponentView from './page_component/plantilla_items_pc/plantilla_items';
import JvsCrwPageComponentView from './page_component/jvs_crw_pc/jvs_crw';

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
            </Switch>

        </React.Fragment>
    );
}
 
export default PlantillaView;