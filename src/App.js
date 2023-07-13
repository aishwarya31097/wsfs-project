import React, { Component } from 'react';
import CacheBuster from './CacheBuster';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScrollToTop from './components/scrollToTop';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { history, theme, setUpAxios } from './servies/services';

import LayoutRoute from './container/LayoutRoute';
import LayoutRouteBlank from './container/LayoutRouteBlank';
import LoginLayoutRoute from './container/LoginLayoutRoute';
import Login from './container/admin/Login/login';
import Register from './container/admin/Register/register';
import UpdateProfile from './container/admin/UpdateProfile/UpdateProfile';
import UpdateProfileInside from './container/trustee/UpdateProfileInside/UpdateProfileInside';
import Intermediate from './container/admin/Intermidiate/Intermidiate';

import Users from './container/admin/users/Users';
import ServerDown from './container/Misl/ServerDown';

import InitialSetup from './container/trustee/initialSetup/initialSetup';
import SetupPage from './container/trustee/SetupPage/SetupPage';
import MappingPage from './container/trustee/MappingPage/MappingPage2';
// import Demo from './container/trustee/MappingPage/demo';

import AddNewReport from './container/trustee/addNewReport/addNewReport';
import ServicerDataDB from './container/trustee/servicerDataDB/servicerDataDB';
import ServicerDataBlockchain from './container/trustee/servicerDataBlockchain/servicerDataBlockchain';
// import GenerateInvestorReport from './container/trustee/generateInvestorReport/generateInvestorReport';
// import GenerateInvestorReport from './container/trustee/generateInvestorReport/generatecopy';
import GenerateInvestorReport from './container/trustee/generateInvestorReport/generatenew';

// import validateMonthlyInput from './container/trustee/validateMonthlyInput/validateMonthlyInput';

// import LimaValidateMonthlyInput from './container/trustee/validateMonthlyInput/LimaValidateMonthlyInput';
import DyanamicValidateMonthlyInput from './container/trustee/validateMonthlyInput/DyanamicValidateMonthlyInput';

import CustomizeReport from './container/trustee/customizereport/customizereport';
import Dashboard from './container/trustee/Dasbhoard/Dasbhoard';
import DownloadServicerData from './container/trustee/DownloadServicerData/DownloadServicerData';
import ViewLoanDataTape from './container/trustee/ViewLoanDataTape/ViewLoanDataTape';
import IssuerViewLoanDataTape from './container/trustee/ViewLoanDataTape/IssuerViewLoanDataTape';

import IssuerLoanStratAnalytics from './container/trustee/ViewLoanDataTape/IssuerLoanStratAnalytics';

class App extends Component {

  // setUpAxios();
  render()
  {
   return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          refreshCacheAndReload();
        }
 
  // console.log("+++++++++++++++++++++",JSON.stringify(setUpAxios))
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          maxSnack={3}>
          <Router history={history}>
            <ScrollToTop />
            <Switch>
              
              <LoginLayoutRoute exact={true} path="/" component={Login} />
              <LoginLayoutRoute exact={true} path="/register" component={Register} />
              <LoginLayoutRoute exact={true} path="/update-profile" component={UpdateProfile} />
              <LayoutRoute exact={true} path="/admin/users/:orgname/:status" component={Users} />
                           
              <LayoutRoute exact={true} path="/user/profile-update" component={UpdateProfileInside} />
              <LayoutRoute exact={true} path="/dealnames" component={Intermediate} />


              <LayoutRoute exact={true} path="/report/:DealType/dashboard" component={Dashboard} />
              <LayoutRoute exact={true} path="/report/:DealType/initial-setup/:DealId?/:DealMonth?/:DealYear?" component={InitialSetup} />
              <LayoutRoute exact={true} path="/report/:DealType/setup-page/:DealId?/:DealMonth?/:DealYear?" component={SetupPage} />
              <LayoutRoute exact={true} path="/report/:DealType/mapping-page/:DealId?/:DealMonth?/:DealYear?" component={MappingPage} />
              {/* <LayoutRoute exact={true} path="/report/demo" component={Demo} /> */}

              <LayoutRoute exact={true} path="/report/:DealType/add-new/:DealId?/:DealMonth?/:DealYear?" component={AddNewReport} />
              <LayoutRoute exact={true} path="/report/:DealType/view-servicer-mongodb-data/:DealId?/:DealMonth?/:DealYear?" component={ServicerDataDB} />

              {/* <LayoutRoute exact={true} path="/report/:DealType/validate-monthly-inputs/:DealId?/:DealMonth?/:DealYear?" component={validateMonthlyInput} /> */}
              {/* <LayoutRoute exact={true} path="/report/Lima/validate-monthly-inputs/:DealId?/:DealMonth?/:DealYear?" component={LimaValidateMonthlyInput} /> */}
              <LayoutRoute exact={true} path="/report/:DealType/validate-monthly-inputs/:DealId?/:DealMonth?/:DealYear?" component={DyanamicValidateMonthlyInput} />

                            
              <LayoutRoute exact={true} path="/report/:DealType/view-servicer-blockchain-data/:DealId?/:DealMonth?/:DealYear?" component={ServicerDataBlockchain} />
              <LayoutRoute exact={true} path="/report/:DealType/generate-investor-report/:DealId?/:DealMonth?/:DealYear?" component={GenerateInvestorReport} />
              <LayoutRoute exact={true} path="/report/:DealType/customize-investor-report/:DealId?/:DealMonth?/:DealYear?" component={CustomizeReport} />
              
              <LayoutRoute exact={true} path="/report/:DealType/download-servicer-data/:DealId?/:DealMonth?/:DealYear?" component={DownloadServicerData} />
              <LayoutRoute exact={true} path="/report/:DealType/view-loan-data-tape/:type?/:DealId?/:DealMonth?/:DealYear?/:groupBy?" component={ViewLoanDataTape} />
              <LayoutRoute exact={true} path="/report/:DealType/issuer-view-loan-data-tape/:type?/:DealId?/:DealMonth?/:DealYear?/:groupBy?" component={IssuerViewLoanDataTape} />

              <LayoutRoute exact={true} path="/report/:DealType/issuer-loan-strat-analytics" component={IssuerLoanStratAnalytics} />

              <LayoutRouteBlank exact={true} path="/server-down" component={ServerDown} />

            </Switch>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
);
}}
</CacheBuster>
);
}
}


export default App;
