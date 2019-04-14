import React, { Component, createRef } from 'react'

import { Route, Link } from 'react-router-dom'

import createUUID from '../util/createUUID'

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

class LineItems extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!Object.keys(this.props.room).length) {
      this.props.history.goBack()
    }
  }

  render() {
    return (
      <div className="LineItems fixed top-0 left-0 w-100 z-1 vh-100 bg-black-70">
        <div className="fixed top-0 left-0 vh-75 w-100 bg-white overflow-scroll">
          <div className="measure-70 center">
            <p className="sticky top-0 dinTitle pa0 ma0 f3 mb3 ttc pt4 bg-white-70">
              line items
              <span className="mid-gray f5 ttc db pt1">
                {this.props.room.name}
              </span>
            </p>
            <div className="relative h-auto w-100 min-height-vh-75">
              <div className="LineItemLabels flex flex-row items-centers ttu bb bw1 pb1 b--light-gray">
                <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                  description
                </p>
                <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                  qty
                </p>
                <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                  uom
                </p>
                <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                  labor unit
                </p>
                <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                  material unit
                </p>
                <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                  total material
                </p>
                <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                  total labor
                </p>
              </div>

              <Accordion>
                { Object.keys(this.props.room).length &&
                  Object.keys(this.props.room.lineItems).map((lineItemUUID, key) => {
                    const lineItem = this.props.room.lineItems[lineItemUUID]
                    return (
                      <AccordionItem
                        key={key}
                      >
                        <AccordionItemHeading className="w-100">
                          <AccordionItemButton className="relative accordion__button flex flex-row items-center ttc pv3">
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                              { lineItem.description }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                              { lineItem.quantity }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                              { lineItem.uom }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                              { lineItem.laborCost }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                              { lineItem.materialCost }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                              { lineItem.totalMaterial }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0">
                              { lineItem.totalLabor }
                            </p>
                            <div className="absolute right-0 h-100 ArrowIcon mh2 rotate-90"><Arrow /></div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          Testing
                        </AccordionItemPanel>
                      </AccordionItem>
                    )
                  })
                }
              </Accordion>
              <div className="flex flex-row justify-between mt4">
                <div className="w-50 br bw1 b--light-gray pr4">
                  <div className="NewLineItem__container">
                    { this.props.errors.newLineItem && ( <p className="dinLabel red f6 o-70"> {this.state.errors.newLineItem } </p> )}
                    <input
                      className="InputField measure-1"
                      type="text"
                      name="newLineItemDescription"
                      placeholder="Enter the line-item's description"
                      value={this.props.newLineItemDescription}
                      onChange={this.props.handleChange}
                    />
                    <label for="newLineItemDescription">
                      <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                        description
                      </p>
                    </label>

                    <div className="flex flex-row items-center flex-wrap justify-start">
                      <div className="w-20 flex flex-column items-center mr2">
                        <input
                          className="InputField tc"
                          type="number"
                          name="newLineItemQuantity"
                          placeholder="0"
                          onChange={this.props.handleChange}
                          value={this.props.newLineItemQuantity}
                        />
                        <label for="newLineItemQuantity">
                          <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                            qty
                          </p>
                        </label>
                      </div>

                      <div className="w-20 flex flex-column items-center mr2">
                        <input
                          className="InputField tc"
                          type="number"
                          name="newLineItemQuantity"
                          placeholder="0"
                          onChange={this.props.handleChange}
                          value={this.props.newLineItemQuantity}
                        />
                        <label for="newLineItemQuantity">
                          <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                            qty
                          </p>
                        </label>
                      </div>
                      <div className="w-20 flex flex-column items-center mr2">
                        <div className="relative InputField flex flex-row justify-center pointer">
                          <p className="dinLabel ttu mid-gray f7 pa0 ma0 self-center mr3">
                            { this.props.newLineItemUOM || 'UOM'}
                          </p>
                          <div className="ArrowIcon self-center rotate-90"><Arrow /></div>
                          <select onChange={this.props.handleChange} name="newLineItemUOM" className="absolute top-0 left-0 w-100 h-100 o-0 pointer">
                            <option>cubic yard</option>
                            <option>day</option>
                            <option>each</option>
                            <option>hour</option>
                            <option>job cost</option>
                            <option>linear foot</option>
                            <option>lump sum</option>
                            <option>mininum change</option>
                            <option>month</option>
                            <option>room</option>
                            <option>square foot</option>
                            <option>square</option>
                            <option>square yard</option>
                            <option>ton</option>
                            <option>unit</option>
                            <option>week</option>
                          </select>
                        </div>
                        <label for="newLineItemUOM">
                          <p className="dinLabel pa0 ma0 mb2 f7 ttu">
                            uom
                          </p>
                        </label>
                      </div>
                    </div>
                    {
                    //   <button
                    //   className="flex flex-row items-center dinLabel f7 mid-gray self-start pointer bt-0 bl-0 br-0 bg-transparent mt2"
                    // >
                    //   ADD LINE ITEMS
                    // </button>
                    }
                    <button
                      className="GenericButton tc dinLabel pv3 f7 mt3"
                      onClick={this.addNewRoom}
                      >
                      ADD ROOM
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 flex justify-center">
              <p className="dinLabel mid-gray f6 ttu pointer"
                onClick={() => this.props.history.goBack()}>
                close
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class CreateInvoice extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.addNewRoom = this.addNewRoom.bind(this)
    this.autoSave = this.autoSave.bind(this)
    this.invoiceContainerRef = createRef()
    this.draftTimeoutId = null;
    const test1 = createUUID();
    const test2 = createUUID();
    const lineItemTest1 = createUUID();
    this.state = {
      invoiceName: '',
      customerFullName: '',
      customerAddress: '',
      customerCityState: '',
      dateOfLoss: "2019-01-01",
      newRoomName: '',
      newRoomLength: '',
      newRoomWidth: '',
      newRoomHeight: '8',
      newRoomLineItems: '',
      newLineItemDescription: '',
      newLineItemQuantity: '0',
      newLineItemUOM: '',
      rooms: {
        [test1]: {
          name: 'Living Room',
          length: '12',
          width: '10',
          height: '8',
          lineItems: {
            [lineItemTest1]: {
              description: 'floor',
              uom: 'LF',
              materialCost: '4',
              laborCost: '14',
              totalMaterial: '',
              totalLabor: '',
              quantity: '14'
            }
          },
          roomTotals: {
            totalLabor: '',
            totalMaterial: '',
            totalCost: ''
          }
        }
      },
      totalCost: '',
      errors: {
        newRoom: '',
        newLineItem: ''
      }
    }
  }

  componentDidUpdate() {
    // If a timer is already started, clear it
    if (this.draftTimeoutId) clearTimeout(this.draftTimeoutId);

    // Set timer that will autosave this invoice on the backend when it fires
    this.draftTimeoutId = setTimeout(this.autoSave, 1250)
  }

  componentDidMount() {
    this.invoiceContainerRef.current.addEventListener('keydown', () => {

      // If a timer is already started, clear it
      if (this.draftTimeoutId) clearTimeout(this.draftTimeoutId);

      // Set timer that will autosave this invoice on the backend when it fires
      this.draftTimeoutId = setTimeout(this.autoSave, 1250)
    })
  }

  componentWillUnmount() {
    if (this.draftTimeoutId) clearTimeout(this.draftTimeoutId)
  }

  autoSave() {
    // auto SAVE
    // use an instance of the agent, with the token from the state to make a request to the server
    // creating a new draft invoice with the UUID, or updating a draft invoice that has the same UUID
    // if not a draft invoice anymore then redirect to pdf detailed version
    console.log('saved')
  }

  handleChange(e, uuid) {
    // console.log('this is the target', e.target.name, this.state.rooms[uuid])
    if (uuid) {
      const eventTargetName = e.target.name
      const eventTargetValue = e.target.value
      console.log('i am in the form of ', eventTargetName)
      this.setState((prevState) => ({
        ...prevState,
        rooms: {
          ...prevState.rooms,
          [uuid]: {
            ...prevState.rooms[uuid],
            [eventTargetName]: eventTargetValue
          }
        }
      }))
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
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
        errors: {
          newRoom: 'You must provide all fields for the new room'
        }
      }))
    }

    const newUUID = createUUID()

    this.setState((prevState) =>
      ({
        errors: { ...prevState.errors, newRoom: '' },
        newRoomName: '' ,
        newRoomLength : '' ,
        newRoomWidth : '' ,
        newRoomHeight : '8',
        rooms: {
          ...prevState.rooms,
          [newUUID] : {
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
        }
      })
    )

  }

  render() {
    return (
      <div ref={this.invoiceContainerRef}>
        <Route path={`${this.props.match.path}/line-items/:roomId`} render={(props) => <LineItems  newLineItemUOM={this.state.newLineItemUOM} newLineItemDescription={this.state.newLineItemDescription} newLineItemQuantity={this.state.newLineItemQuantity} errors={this.state.errors} handleChange={this.handleChange} room={this.state.rooms[props.match.params.roomId] || {}} {...this.props} {...props} />} />
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
                  Customers Full Name
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

              <p className="dinTitle pa0 ma0 f4 mid-gray mb3 mt4 ttu">
                claim details
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
                { this.state.errors.newRoom && ( <p className="dinLabel red f6 o-70"> {this.state.errors.newRoom } </p> )}
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
                        placeholder="0"
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
                {
                //   <button
                //   className="flex flex-row items-center dinLabel f7 mid-gray self-start pointer bt-0 bl-0 br-0 bg-transparent mt2"
                // >
                //   ADD LINE ITEMS
                // </button>
                }
                <button
                  className="GenericButton tc dinLabel pv3 f7 mt3"
                  onClick={this.addNewRoom}
                  >
                  ADD ROOM
                </button>
              </div>

              <div className="RoomsAccordion__container mt5">
                <Accordion>
                  {
                    Object.keys(this.state.rooms).map((roomUUID, key) => {
                      const room = this.state.rooms[roomUUID]
                      return (
                        <AccordionItem
                          key={key}
                        >
                          <AccordionItemHeading className="w-100">
                            <AccordionItemButton className="accordion__button flex flex-row items-center justify-between">
                              <p className="tc dinLabel f7 ttu"> { room.name || roomUUID } </p>
                              <div className="flex flex-row items-center justify-between">
                                <button
                                  className="flex flex-row items-center self-center dinLabel f8 mid-gray pointer bn bg-transparent dim ttu">
                                  delete
                                  <div className="ArrowIcon mh2"><TrashIcon /></div>
                                </button>
                                <div className="ArrowIcon mh2"><Arrow /></div>
                              </div>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="EditRoom__container pv4">
                              <input
                                className="InputField measure-1"
                                type="text"
                                name="name"
                                onChange={(e) => this.handleChange(e, roomUUID)}
                                placeholder="Enter the room name"
                                value={room.name}
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
                              <Link to={`${this.props.match.path.replace(':draftId', this.props.match.params.draftId)}/line-items/${roomUUID}`}>
                                <div
                                  className="flex flex-row items-center dinLabel f7 mid-gray self-start pointer bt-0 bl-0 br-0 bg-transparent mt2"
                                >
                                  ADD/EDIT LINE ITEMS
                                </div>
                              </Link>
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
            <ul className="list bb b-w1 b--light-gray pa0">
              {
                Object.keys(this.state.rooms).map((roomUUID, key) => {
                  const room = this.state.rooms[roomUUID]
                  return (
                    <li className="flex flex-row items-center justify-between">
                      <p className="dinLabel f6 ttu">
                        { room.name || roomUUID }
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
      </div>
    )
  }
}

export default CreateInvoice
