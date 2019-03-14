import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'


import Header from './Header'
import Dashboard from './Dashboard'

import { logout } from '../state/actions/authActions'


class Main extends Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    this.props.logout()
  }

  render() {
    return (
      <div>
        <Header onLogout={this.logout} />
        <main>
          <Route exact path={this.props.match.path} component={Dashboard} />
        </main>
      </div>
    )
  }
}


export default connect(null, { logout })(Main)
