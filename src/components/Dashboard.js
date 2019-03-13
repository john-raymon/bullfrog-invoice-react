import React, { Component } from 'react'
import {Route} from 'react-router'


import Arrow from '../images/arrow';
import logo from '../images/small_logo.png';

class Dashboard extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <header>
          <div className="flex flex-row items-center justify-around pv4">
            <img src={logo} width="65px" height="auto" alt="" />
            <nav className="flex flex-row self-stretch">
              <ul className="flex flex-row items-end list pa0 ma0">
                <li>
                  <p className="pa0 ma0 mh3 dinLabel gray">Dashboard</p>
                </li>
                <li>
                  <p className="pa0 ma0 mh3 dinLabel gray">Create an Invoice</p>
                </li>
                <li>
                  <p className="pa0 ma0 mh3 dinLabel gray">Settings</p>
                </li>
              </ul>
            </nav>
            <button
              className="flex flex-row items-center self-center dinLabel f7 blue self-start pointer bn bg-transparent">
              SIGN OUT <div className="ArrowIcon mh2"><Arrow /></div>
            </button>
          </div>
        </header>
      </div>
    )
  }
}


export default Dashboard
