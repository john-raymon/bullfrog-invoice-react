import React, { Component, Fragment } from 'react';
import {
  Route,
  Link,
  Redirect,
  Switch
} from "react-router";

import Login from './Login'

import '../styles/application.css';

const Test = (props) => {
  return (
  <div>Hello </div>
  )
};

function ProtectedRoute({ component: Component, auth, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => auth ? (
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
}

class App extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute path="/" exact auth={false} component={Test} />
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/*" auth={false} component={Test} />
      </Switch>
    );
  }
}


export default App;
