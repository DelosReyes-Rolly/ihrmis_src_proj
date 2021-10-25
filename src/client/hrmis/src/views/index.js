import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardView from './pages/dashboard/dashboard_view';
import NavbarComponent from './common/navbar_component/Navbar';
import SidebarComponent from './common/sidebar_component/sidebar';
import FooterComponent from './common/footer_components/Footer';
import PlantillaView from './pages/plantilla/plantilla_view';
import LibraryView from './pages/library/library_view';
import RecruitmentView from './pages/recruitment/recruitment_view';
import LoaderComponent from './common/loader_component/loader_component';
import { useSelector } from 'react-redux';
import SuccessResponseComponent from './common/response_component/success_response_component/success_response_component';
import FailResponseComponent from './common/response_component/fail_response_component/fail_response_component';
import PdsProfilePageComponentView from './pages/library/page_components/pds_profiles_pc/pds_profile';

const MainPageLayout = () => {
  const isBusy = useSelector((state) => state.load.isBusy);
  const isSuccess = useSelector((state) => state.popupResponse.isSuccess);
  const isFail = useSelector((state) => state.popupResponse.isFail);

  return (
    
    <Router>
      <h1>{isFail}</h1>
      {isBusy && <LoaderComponent />}
      {isSuccess && <SuccessResponseComponent />}
      {isFail && <FailResponseComponent />}
      
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
