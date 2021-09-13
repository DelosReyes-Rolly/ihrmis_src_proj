import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardView from './pages/dashboard/dashboard_view';
import NavbarComponent from './common/navbar_component/Navbar';
import SidebarComponent from './common/sidebar_component/sidebar';
import FooterComponent from './common/footer_components/Footer';
import PlantillaView from './pages/plantilla/plantilla_view';
import LibraryView from './pages/library/library_view';
import RecruitmentView from './pages/recruitment/recruitment_view';
import LoaderComponent from './common/loader_component/loader_component';
import store from '../features/store/store';
import { useSelector } from 'react-redux';

const MainPageLayout = () => {
  const isBusy = useSelector((state) => state.load.isBusy);
  return (
    
    <Router>

      {isBusy && <LoaderComponent /> }
      
      <div className="App">

        <NavbarComponent />

        <div className="container">
          <div >
            <SidebarComponent />
          </div>
          <div className="positioning">
            <Switch>
                <Route exact path="/">
                  <DashboardView />
                </Route>
                <Route exact path="/ihrmis/">
                  <DashboardView />
                </Route>
                <Route path="/ihrmis/plantilla">
                  <PlantillaView />
                </Route>
                <Route path="/ihrmis/library">
                  <LibraryView />
                </Route>
                <Route path="/ihrmis/recruitment">
                  <RecruitmentView />
                </Route>
                {/* <Route path="/ihrmis/request">
                  <RequestMainView />
                </Route>

                <Route path="/ihrmis/compensation">
                  <CompensationMainView />
                </Route>
                
                <Route path="/ihrmis/library">
                  <LibraryMainView />
                </Route> */}
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

export default MainPageLayout;
