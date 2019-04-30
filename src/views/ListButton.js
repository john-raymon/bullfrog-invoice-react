import React from 'react'

// Static Assets
import Arrow from '../images/arrow';

export default function ListButton({children}) {
  return (
    <button className="dim pointer dinLabel f7 mid-gray tracked-mega ttu ma0 mr1 pa0 bn bg-transparent flex flex-row items-center pv1 ttu">
      {children}
      <div className="ArrowIcon mh2"><Arrow /></div>
    </button>
  )
}
