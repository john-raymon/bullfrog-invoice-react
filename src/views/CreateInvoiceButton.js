import React from 'react'

// Static Assets
import Arrow from '../images/arrow';

export default function CreateInvoiceButton() {
  return (
    <button className="dinLabel f8 mid-gray tracked-mega ttu ma0 mr1 pa0 bn bg-transparent flex flex-row items-center">
      Create Invoice
      <div className="ArrowIcon mh2"><Arrow /></div>
    </button>
  )
}
