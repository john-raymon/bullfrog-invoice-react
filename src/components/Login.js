import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

import Arrow from '../images/arrow';
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
      <div className="w-100 vh-100 flex flex-row items-center measure-1024 center">
        <div className="fl w-50 flex flex-column items-center">
          <p className="dinTitle">
            Welcome back,
            <br />
            Sign in below.
            <span className="db mt3">
              <img src={logo} width="25%" height="auto" />
            </span>
          </p>
        </div>
        <div className="fl w-50 flex flex-column items-center">
          <div className="w-100 measure ph3">
            <input className="InputField" type="email" value="" placeholder="Knack Email"/>
            <input className="InputField" type="password" value="" placeholder="Knack Password" />
            <p className="flex flex-row items-center dinLabel f7 blue self-start pointer">
              SIGN IN <div className="ArrowIcon mh2"><Arrow /></div>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { push })(Login);
