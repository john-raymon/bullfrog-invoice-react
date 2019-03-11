import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

import logo from '../images/small_logo.png';


class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login () {
    this.props.push(this.props.location.state.from)
  }

  render() {
    return(
      <div className="w-100 vh-100 flex flex-row items-center">
        <div class="fl w-50 flex flex-column items-center">
          <p className="dinTitle">
            Welcome back,
            <br />
            Sign in below.
            <span className="db mt3">
              <img src={logo} width="25%" height="auto" />
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(null, { push })(Login);
