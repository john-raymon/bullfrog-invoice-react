import React from 'react'
import { NavLink } from 'react-router-dom'

import createUUID from '../util/createUUID'

import Arrow from '../images/arrow';
import logo from '../images/small_logo.png';

export default ({onLogout}) => {
  return (
  <header>
    <div className="flex flex-column flex-row-l items-center justify-around pv3 ph1 bb b--light-gray">
      <img src={logo} width="65px" height="auto" alt="" />
      <nav className="flex self-stretch">
        <ul className="flex flex-column center mv4 mv0-l flex-row-l items-center list pa0 ma0">
          <li>
            <NavLink to='/' exact className="pa0 ma0 mh4 dinLabel gray">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={`/invoices/new/${createUUID()}`} className="pa0 ma0 mh4 dinLabel gray dim pointer">Create an Invoice</NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="pa0 ma0 mh4 dinLabel gray dim pointer">Settings</NavLink>
          </li>
        </ul>
      </nav>
      <button
        onClick={onLogout}
        className="flex flex-row items-center self-center dinLabel f7 blue self-start pointer bn bg-transparent dim">
        SIGN OUT <div className="ArrowIcon mh2"><Arrow /></div>
      </button>
    </div>
  </header>
)}
