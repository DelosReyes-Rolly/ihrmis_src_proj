import React from 'react';
import NavbarComponent from './components/navbar_component/Navbar';
import SidebarComponent from './components/sidebar_component/Sidebar';
import PlantillaMainView from './modules/plantilla/Plantilla';
import FooterComponent from './components/footer_components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardMainView from './modules/dashboard/Dashboard';
import RequestMainView from './modules/request/Request';
import CompensationMainView from './modules/compensation/Compensation';
import RecruitmentMainView from './modules/recruitment/Recruitment';


function App() {
  return (

    <Router>
      <div className="App">

        <NavbarComponent />

        <div className="container">
          <div >
            <SidebarComponent />
          </div>
          <div className="positioning">
            <Switch>
                <Route exact path="/">
                  <DashboardMainView />
                </Route>
                <Route path="/request">
                  <RequestMainView />
                </Route>
                <Route path="/plantilla">
                  <PlantillaMainView />
                </Route>
                <Route path="/compensation">
                  <CompensationMainView />
                </Route>
                <Route path="/recruitment">
                  <RecruitmentMainView />
                </Route>
            </Switch>
          </div>
        </div>

        <div>
          <FooterComponent />
        </div>
      </div>
    </Router>
    
  );
}

export default App;
