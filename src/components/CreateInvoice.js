import React, { Component, Fragment } from 'react'

import Arrow from '../images/arrow';
import TrashIcon from '../images/trash-icon'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState
} from 'react-accessible-accordion'

class CreateInvoice extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.addNewRoom = this.addNewRoom.bind(this)
    this.state = {
      invoiceName: '',
      customerFullName: '',
      customerAddress: '',
      customerCityState: '',
      dateOfLoss: "2019-01-01",
      newRoomName: '',
      newRoomLength: '',
      newRoomWidth: '',
      newRoomHeight: '',
      newRoomLineItems: '',
      rooms: [
        {
          name: 'Living Room',
          length: '12',
          width: '10',
          height: '8',
          lineItems: [
            {
              description: 'floor',
              uom: 'LF',
              materialCost: '4',
              laborCost: '14',
              totalMaterial: '',
              totalLabor: '',
              quantity: '14'
            }
          ],
          roomTotals: {
            totalLabor: '',
            totalMaterial: '',
            totalCost: ''
          }
        },
        {
          name: 'Living Room',
          length: '12',
          width: '10',
          height: '8',
          lineItems: [
            {
              description: 'floor',
              uom: 'LF',
              materialCost: '4',
              laborCost: '14',
              totalMaterial: '',
              totalLabor: '',
              quantity: '14'
            }
          ],
          roomTotals: {
            totalLabor: '',
            totalMaterial: '',
            totalCost: ''
          }
        }
      ],
      totalCost: '',
      errors: []
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addNewRoom() {
    const {
      newRoomName : name ,
      newRoomLength : length ,
      newRoomWidth : width ,
      newRoomHeight : height
    } = this.state

    if ( (!name.trim().length || !length.trim().length || !width.trim().length || !height.trim().length) ) {
      return this.setState((prevState) => ({
        errors: [
          'You must provide all fields for the new room'
        ]
      }))
    }

    this.setState((prevState) =>
      ({
        rooms: [
          ...prevState.rooms,
          {
            name: name,
            length: length,
            width: width,
            height: height,
            lineItems: [
            ],
            roomTotals: {
              totalLabor: '',
              totalMaterial: '',
              totalCost: ''
            }
          }
        ]
      })
    )

  }

  render() {
    return (
      <div className="flex flex-column measure-70 center pt5 mb5">
        <div className="flex flex-row w100">

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
              onChange={this.handleChange}
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
              value={this.state.customersFullName}
              onChange={this.handleChange}
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
              value={this.state.customersAddress}
              onChange={this.handleChange}
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
              value={this.state.customesrCityState}
              onChange={this.handleChange}
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
              value={this.state.customersZipCode}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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

            <div className="NewRoom__container">
              <input
                className="InputField measure-1"
                type="text"
                name="newRoomName"
                placeholder="Enter the room name"
                value={this.state.newRoomName}
                onChange={this.handleChange}
              />
              <label for="newRoomName">
                <p className="dinLabel pa0 ma0 mb3 f6">
                  Room Name
                </p>
              </label>

              <div className="flex flex-row items-center justify-between">

                <div className="flex flex-row items-center justify-between w-50">

                  <div className="w-30 flex flex-column items-center">
                    <input
                      className="InputField tc"
                      type="number"
                      name="newRoomLength"
                      placeholder="0"
                      onChange={this.handleChange}
                      value={this.state.newRoomLength}
                    />
                    <label for="newRoomLength">
                      <p className="dinLabel pa0 ma0 mb3 f6">
                        Length
                      </p>
                    </label>
                  </div>

                  <div className="w-30 flex flex-column items-center">
                    <input
                      className="InputField tc"
                      type="number"
                      name="newRoomWidth"
                      placeholder="0"
                      onChange={this.handleChange}
                      value={this.state.newRoomWidth}
                    />
                    <label for="newRoomWidth">
                      <p className="dinLabel pa0 ma0 mb3 f6">
                        Width
                      </p>
                    </label>
                  </div>

                  <div className="w-30 flex flex-column items-center">
                    <input
                      className="InputField tc"
                      type="number"
                      name="newRoomHeight"
                      placeholder="8"
                      value={this.state.newRoomHeight}
                      onChange={this.handleChange}
                    />
                  <label for="newRoomHeight">
                      <p className="dinLabel pa0 ma0 mb3 f6">
                        Height
                      </p>
                    </label>
                  </div>

                </div>

              </div>
              <button
                className="flex flex-row items-center dinLabel f7 mid-gray self-start pointer bt-0 bl-0 br-0 bg-transparent mt2"
              >
                ADD LINE ITEMS
              </button>

              <button
                className="GenericButton tc dinLabel pv3 f7 mt3"
                onClick={this.addNewRoom}
                >
                ADD ROOM
              </button>
            </div>

            <div className="RoomsAccordion__container mt4">
              <Accordion>
                {
                  this.state.rooms.map((room, key) => {
                    return (
                      <AccordionItem
                        key={key}
                      >
                        <AccordionItemHeading className="w-100">
                          <AccordionItemButton className="accordion__button flex flex-row items-center justify-between">
                            <p className="tc dinLabel f7 ttu"> { room.name } </p>
                            <div className="flex flex-row items-center justify-between">
                              <button
                                className="flex flex-row items-center self-center dinLabel f8 mid-gray pointer bn bg-transparent dim">
                                DELETE
                                <div className="ArrowIcon mh2"><TrashIcon /></div>
                              </button>
                              <AccordionItemState>
                                {
                                  ({ expanded }) => {
                                    if (expanded) {
                                      return (
                                        <button
                                          className="flex flex-row items-center self-center dinLabel f8 mid-gray pointer bn bg-transparent dim">
                                          SAVE
                                        </button>
                                      )
                                    }
                                    return (
                                      <button
                                        className="flex flex-row items-center self-center dinLabel f8 pointer mid-gray bn bg-transparent dim">
                                        EDIT
                                      </button>
                                    )
                                  }
                                }
                              </AccordionItemState>
                              <div className="ArrowIcon mh3"><Arrow /></div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="EditRoom__container pv4">
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

                            <div className="flex flex-row items-center justify-between">

                              <div className="flex flex-row items-center justify-between w-50">

                                <div className="w-30 flex flex-column items-center">
                                  <input
                                    className="InputField tc"
                                    type="number"
                                    name="newRoomLength"
                                    placeholder="0"
                                    value={this.state.newRoomLength}
                                  />
                                  <label for="newRoomLength">
                                    <p className="dinLabel pa0 ma0 mb3 f6">
                                      Length
                                    </p>
                                  </label>
                                </div>

                                <div className="w-30 flex flex-column items-center">
                                  <input
                                    className="InputField tc"
                                    type="number"
                                    name="newRoomWidth"
                                    placeholder="0"
                                    value={this.state.newRoomWidth}
                                  />
                                  <label for="newRoomWidth">
                                    <p className="dinLabel pa0 ma0 mb3 f6">
                                      Width
                                    </p>
                                  </label>
                                </div>

                                <div className="w-30 flex flex-column items-center">
                                  <input
                                    className="InputField tc"
                                    type="number"
                                    name="newRoomHeight"
                                    placeholder="8"
                                    value={this.state.newRoomHeight}
                                  />
                                <label for="newRoomHeight">
                                    <p className="dinLabel pa0 ma0 mb3 f6">
                                      Height
                                    </p>
                                  </label>
                                </div>

                              </div>

                            </div>
                            <button
                              className="flex flex-row items-center dinLabel f7 mid-gray self-start pointer bt-0 bl-0 br-0 bg-transparent mt2"
                            >
                              EDIT LINE ITEMS
                            </button>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    )
                  })
                }
              </Accordion>
            </div>

            <div className="ImageUploads__container relative w-40 ba bw1 flex items-center justify-center pv2 b--light-gray br2 flex-row mt4">
              <input
                type="file"
                name="roomImages"
                className="absolute w-100 h-100 o-0"
                accept="image/png, image/jpeg"
              />
              <p className="dinLabel pa0 ma0 f7 gray ttu dib">
                Upload an image
              </p>
            </div>

          </div>
        </div>
        <div className="flex flex-column w-100 mt4">
          <ul className="list bb b-w1 b--light-gray">
            {
              this.state.rooms.map((room, key) => {
                return (
                  <li className="flex flex-row items-center justify-between">
                    <p className="dinLabel f6 ttu">
                      { room.name }
                    </p>
                    <p className="dinLabel f6">
                      <span className="ttu">total: </span>
                      $ { room.roomTotals.totalCost }
                    </p>
                  </li>
                )
              })
            }
          </ul>
          <div className="flex items-row items-center justify-between">
            <ul className="list">
              <li>
                <p className="dinLabel f6">
                  <span className="ttu">total cost: </span>
                  $ { this.state.totalCost }
                </p>
              </li>
            </ul>
            <div className="w-40">
              <button className="GenericButton tc dinLabel pv3 f7 mt3">
                GENERATE INVOICE
              </button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default CreateInvoice
