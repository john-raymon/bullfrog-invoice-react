import React, { Component } from 'react'

class CreateInvoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoiceName: '',
      customerFullName: '',
      customerAddress: '',
      customerAddress: '',
      customerCityState: '',
      dateOfLoss: "2019-01-01"
    }
  }
  render() {
    return (
      <div className="flex flex-row measure-70 center pt5 mb5">

        <div className="flex flex-column w-50 pr5">
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

          <p className="dinTitle pa0 ma0 f4 mid-gray mb3 mt4">
            CLAIM DETAILS
          </p>

          <input
            className="InputField"
            type="text"
            name="insuranceCarrier"
            placeholder="Enter the name of the insurance carrier"
            value={this.state.insuranceCarrier}
          />
          <label for="insuranceCarrier">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Insurance Carrier
            </p>
          </label>

          <input
            className="InputField"
            type="text"
            name="policyNumber"
            placeholder="Policy Number"
            value={this.state.policyNumber}
          />
          <label for="policyNumber">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Policy Number
            </p>
          </label>

          <input
            className="InputField"
            type="text"
            name="claimNumber"
            placeholder="Claim Number"
            value={this.state.claimNumber}
          />
          <label for="claimNumber">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Claim Number
            </p>
          </label>

          <input
            className="InputField measure-1"
            type="date"
            name="dateOfLoss"
            value={this.state.dateOfLoss}
          />
          <label for="dateOfLoss">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Date of Loss
            </p>
          </label>
        </div>

        <div className="flex flex-column w-50 pl5">
          <p className="dinTitle pa0 ma0 f3 mb3">
            Rooms
          </p>

          <input
            className="InputField measure-1"
            type="text"
            name="newRoomName"
            placeholder="Enter the room name"
            value={this.state.newRoomName}
          />
          <label for="newRoomName">
            <p className="dinLabel pa0 ma0 mb3 f6">
              Room Name
            </p>
          </label>
        </div>
      </div>
    )
  }
}

export default CreateInvoice
