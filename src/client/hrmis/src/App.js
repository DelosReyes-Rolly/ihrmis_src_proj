import React from 'react';
import NavbarComponent from './components/navbar_component/Navbar';
import SidebarComponent from './components/sidebar_component/Sidebar';
import PlantillaMainView from './modules/plantilla/plantilla';
import FooterComponent from './components/footer_components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardMainView from './modules/dashboard/dashboard';
import RequestMainView from './modules/request/Request';
import CompensationMainView from './modules/compensation/Compensation';
import RecruitmentMainView from './modules/recruitment/recruitment';
import LibraryMainView from './modules/library/library';
import './css/default_table.css';
import './css/default_scrollbar.css';


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
                <Route exact path="/ihrmis/">
                  <DashboardMainView />
                </Route>
                <Route path="/ihrmis/request">
                  <RequestMainView />
                </Route>
                <Route path="/ihrmis/plantilla">
                  <PlantillaMainView />
                </Route>
                <Route path="/ihrmis/compensation">
                  <CompensationMainView />
                </Route>
                <Route path="/ihrmis/recruitment">
                  <RecruitmentMainView />
                </Route>
                <Route path="/ihrmis/library">
                  <LibraryMainView />
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
