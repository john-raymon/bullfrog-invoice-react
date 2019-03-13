import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {
  Route,
  Link,
  Redirect,
  Switch
} from "react-router";
import Login from './Login'

import '../styles/application.css';


const Home = (props) => {
  return (
  <div>Home </div>
  )
};

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
      <Switch>
        <ProtectedRoute path="/" exact auth={false} component={Home} />
        <Route path="/login" exact component={Login} />
        // <ProtectedRoute path="/*" auth={false} component={NotFound} />
      </Switch>
    );
  }
}


export default App;
