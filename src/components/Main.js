import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'

import Header from './Header'
import Dashboard from './Dashboard'
import CreateInvoice from './CreateInvoice'
import Settings from './Settings'
import PDFInvoice from './PDFInvoice'
import NotFound from './../views/NotFound'

import { initApp } from '../state/actions/applicationActions'
import { logout } from '../state/actions/authActions'

import createUUID from '../util/createUUID'

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
            <Route exact path={this.props.match.path + 'invoices/new'} render={() => {
                //this.props.history.push(`/invoices/new/${createUUID()}`)
                return <Redirect
                    to={`/invoices/new/${createUUID()}`}
                  />
              }} />
            <Route path={`${this.props.match.path}settings`} component={Settings} />
            <Route path={`${this.props.match.path}invoices/pdf/:invoiceId`} exact component={PDFInvoice} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}


export default connect(null, { logout, initApp })(Main)
