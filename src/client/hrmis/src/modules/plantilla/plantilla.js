import React from 'react';
import PlantillaItemView from './plantilla_items/plantilla_items'
import { Switch, Route, Redirect } from 'react-router-dom';
import EmployeeView from './employee/employee';
import JvsCrwView from './plantilla_items/jvs_crw/jvs_crw';

const PlantillaMainView =()=> {

    return ( 
        <React.Fragment>

            <Switch>
                <Route exact path="/ihrmis/plantilla/">
                    <Redirect from="/ihrmis/plantilla/" to="/ihrmis/plantilla/employee"/>
                </Route>
                <Route path="/ihrmis/plantilla/employee">
                    <EmployeeView />
                </Route>
                <Route exact path="/ihrmis/plantilla/plantilla-items"> 
                    <PlantillaItemView />
                </Route>
                <Route path="/ihrmis/plantilla/plantilla-items/jvs-crw"> 
                    <JvsCrwView />
                </Route>
            </Switch>

        </React.Fragment>
    );
}
 
export default PlantillaMainView;