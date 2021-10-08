import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Signup,
  Login,
  Signout,
  UpdateProfile,
  NewPassword,
  PrivateRoute,
  Dashboard,
  Header,
  ExpAccessScreen,
  Home,
} from "./components";

import AuthContextProvider from "./contexts/AuthContext";
import DirContextProvider from "./contexts/DirContext";
import LoadingContextProvider from "./contexts/LoadingContext";
import "./App.css";

export default function App() {
  return (
    <div id="app">
      <Router>
        <LoadingContextProvider>
          <AuthContextProvider>
            <DirContextProvider>
              <Header />

              <Switch>
                <Route exact path="/" component={Signup} />

                <Route exact path="/login" component={Login} />

                <Route
                  exact
                  path="/forgotten-password"
                  component={NewPassword}
                />

                <PrivateRoute exact path="/signout" component={Signout} />

                <PrivateRoute
                  exact
                  path="/update-profile"
                  component={UpdateProfile}
                />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />

                <Route
                  exact
                  path="/expired-access"
                  component={ExpAccessScreen}
                />

                <PrivateRoute exact path="/home" component={Home} />

                <Redirect to="/" />
              </Switch>

              <footer>
                <p>Alexandre Moraes</p>
              </footer>
            </DirContextProvider>
          </AuthContextProvider>
        </LoadingContextProvider>
      </Router>
    </div>
  );
}
