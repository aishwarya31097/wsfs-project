import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import LogoBankema from '../images/wsfs-logo.jpg';

export default function LayoutRoute({ component: Component, ...rest }) {
  console.log(Component);
  return (
    <Route {...rest} render={(props) => (
      <LoginLayout>
        {Component &&
          <Component {...props} />
        }
      </LoginLayout>
    )} />
  );
}

function LoginLayout({ children }) {
  return (
    <React.Fragment>
      <div id="mainContent">
        <div className="site-header-without-login">
          <h2><img class="site-logo" src={LogoBankema} alt="" /></h2>
        </div>
        <div className="container-fluid">
          <div className="row align-self-center custom-height">
            <div className="col-sm-12 col-lg-6  d-flex custom-height login-left-image" >
              <div className="login-content align-self-center text-center left-content">
                <h1>Welcome to WSFS Securitization Platform </h1>
                <p>Access all your deal information and insights with complete access control, privacy and transparency in a distributed ledger environment.</p>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 custom-height custom-height-scrollbar" >
              <div className="login-content align-self-center justify-content-center">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
