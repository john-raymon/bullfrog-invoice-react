import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import Header from './Header'
import Dashboard from './Dashboard'
import NotFound from './../views/NotFound'

import { initApp } from '../state/actions/applicationActions'
import { logout } from '../state/actions/authActions'


class Main extends Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.props.initApp()
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
          <Route exact path={this.props.match.path + 'invoices/new'} component={Dashboard} />
          <Route path="/*" exact component={NotFound} />
        </main>
      </div>
    )
  }
}


export default connect(null, { logout, initApp })(Main)
