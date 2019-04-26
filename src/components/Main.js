import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'

import Header from './Header'
import Dashboard from './Dashboard'
import CreateInvoice from './CreateInvoice'
import Settings from './Settings'
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
          <Switch>
            <Route exact path={this.props.match.path} component={Dashboard} />
            <Route path={this.props.match.path + 'invoices/new/:draftId'} component={CreateInvoice} />
            <Route path={`${this.props.match.path}settings`} component={Settings} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}


export default connect(null, { logout, initApp })(Main)
