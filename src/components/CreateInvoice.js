import React, { Component } from 'react'

class CreateInvoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoiceName: '',
      customerFullName: '',
      customerAddress: '',
      customerAddress: '',
      customerCityState: ''
    }
  }
  render() {
    return (
      <div className="flex flex-row measure-70 center pt5 mb5">

        <div className="flex flex-column w-50 pr6">
          <p className="dinTitle pa0 ma0 f3 mb3">
            Invoice Details
          </p>

          <input
            className="InputField"
            type="text"
            name="invoiceName"
            placeholder="Enter the invoice name here"
            value={this.state.invoiceName}
          />
          <label for="invoiceName">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Invoice Name
            </p>
          </label>

          <p className="dinTitle pa0 ma0 f3 mb3 mt4">
            Customer Details
          </p>

          <input
            className="InputField"
            type="text"
            name="customersFullName"
            placeholder="Enter the customer's full here"
            value={this.state.customerFullName}
          />
          <label for="customersFullName">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Customer's Full Name
            </p>
          </label>

          <input
            className="InputField"
            type="text"
            name="customersAddress"
            placeholder="Enter the customer's address here"
            value={this.state.customerAddress}
          />
          <label for="customersAddress">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Customer's Address
            </p>
          </label>

          <input
            className="InputField"
            type="text"
            name="customersCityState"
            placeholder="City, State"
            value={this.state.customerCityState}
          />
          <label for="customersCityState">
            <p className="dinLabel pa0 ma0 mb3 f6">
              City, State
            </p>
          </label>

          <input
            className="InputField"
            type="text"
            name="customersZipCode"
            placeholder="Zipcode"
            value={this.state.customerZipCode}
          />
          <label for="customersZipcode">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Zip Code
            </p>
          </label>
        </div>

        <div className="flex flex-column w-50 pl6">
          testing
        </div>
      </div>
    )
  }
}

export default CreateInvoice
