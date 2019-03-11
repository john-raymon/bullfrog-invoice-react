import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

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
      <div>
        <p onClick={this.login}>LOGIN</p>
      </div>
    )
  }
}

export default connect(null, { push })(Login);
