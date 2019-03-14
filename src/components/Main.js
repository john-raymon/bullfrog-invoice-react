import React, { Component } from 'react'
import {Route} from 'react-router'

import Header from './Header'
import Dashboard from './Dashboard'


class Main extends Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(){

  }
  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path={this.props.match.path} component={Dashboard} />
        </main>
      </div>
    )
  }
}


export default Main
