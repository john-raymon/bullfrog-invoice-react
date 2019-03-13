import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Route,
  Link,
  Redirect,
  Switch
} from "react-router";

import Dashboard from './Dashboard'
import Login from './Login'

import '../styles/application.css';


const NotFound = (props) => {
  return (
  <div>Not Found </div>
  )
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})
const ProtectedRoute = connect(mapStateToProps ,null)(({ component: Component, isAuth, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
})


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <ProtectedRoute path="/" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}


export default App;
