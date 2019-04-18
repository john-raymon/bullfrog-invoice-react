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
    const roomUUID = this.props.match.params.roomId
    return (
      <div className="LineItems fixed top-0 left-0 w-100 z-1 vh-100 bg-black-70">
        <div className="fixed top-0 left-0 vh-85 w-100 bg-white overflow-scroll">
          <div className="measure-70 flex flex-column center">
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
                    if (lineItem === undefined) return;
                    return (
                      <AccordionItem
                        key={key}
                      >
                        <AccordionItemHeading className="w-100">
                          <AccordionItemButton className="relative accordion__button flex flex-row items-center ttc pv3">
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0 overflow-scroll pr2 pt2 pb3">
                              { lineItem.description }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0 overflow-scroll pr2 pt2 pb3">
                              { lineItem.quantity }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0 overflow-scroll pr2 pt2 pb3">
                              { lineItem.uom }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0 overflow-scroll pr2 pt2 pb3">
                              { lineItem.laborCost }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0 overflow-scroll pr2 pt2 pb3">
                              { lineItem.materialCost }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0 overflow-scroll pr2 pt2 pb3">
                              { lineItem.totalMaterial }
                            </p>
                            <p className="dinLabel f7 mid-gray w-25 pa0 ma0 overflow-scroll pr2 pt2 pb3">
                              { lineItem.totalLabor }
                            </p>
                            <div className="absolute right-0 h-100 items-center flex flex-row">
                              <button
                                onClick={() => this.props.removeLineItem(roomUUID, lineItemUUID)}
                                className="flex flex-row items-center dinLabel f8 mid-gray pointer bn bg-transparent dim ttu">
                                <div className="ArrowIcon mh1"><TrashIcon /></div>
                              </button>
                              <div className="ArrowIcon rotate-90 mh1">
                                <Arrow />
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="LineItem__container w-50 pv2">
                            <input
                              className="InputField measure-1"
                              type="text"
                              name="description"
                              placeholder="Enter the line-item's description"
                              value={this.props.room.lineItems[lineItemUUID].description}
                              onChange={(e) => this.props.handleLineItemChange(e, roomUUID, lineItemUUID)}
                            />
                            <label htmlFor="newLineItemDescription">
                              <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                                description
                              </p>
                            </label>

                            <div className="flex flex-row items-center flex-wrap justify-start">
                              <div className="w-20 flex flex-column items-center mr2">
                                <input
                                  className="InputField tc"
                                  type="number"
                                  name="quantity"
                                  placeholder="1"
                                  onBlur={(e) => this.props.handleCostInputBlur(e, roomUUID, lineItemUUID)}
                                  value={this.props.room.lineItems[lineItemUUID].quantity}
                                  onChange={(e) => this.props.handleLineItemChange(e, roomUUID, lineItemUUID)}
                                />
                                <label htmlFor="newLineItemQuantity">
                                  <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                                    qty
                                  </p>
                                </label>
                              </div>

                              <div className="w-20 flex flex-column items-center mr2">
                                <div className="relative InputField flex flex-row justify-center pointer">
                                  <p className="dinLabel ttu mid-gray f7 pa0 ma0 self-center mr3">
                                    { this.props.room.lineItems[lineItemUUID].uom || 'UOM'}
                                  </p>
                                  <div className="ArrowIcon self-center rotate-90"><Arrow /></div>
                                  <select onChange={(e) => this.props.handleLineItemChange(e, roomUUID, lineItemUUID)} name="uom" className="absolute z-2 top-0 left-0 w-100 h-100 o-0 pointer ttc">
                                    <option value="CY">cubic yard</option>
                                    <option value="DA">day</option>
                                    <option value="EA">each</option>
                                    <option value="HR">hour</option>
                                    <option value="JC">job cost</option>
                                    <option value="LF">linear foot</option>
                                    <option value="LS">lump sum</option>
                                    <option value="MC">mininum change</option>
                                    <option value="MO">month</option>
                                    <option value="RM">room</option>
                                    <option value="SF">square foot</option>
                                    <option value="SQ">square</option>
                                    <option value="SY">square yard</option>
                                    <option value="TN">ton</option>
                                    <option value="WK">week</option>
                                  </select>
                                </div>
                                <label htmlFor="newLineItemUOM">
                                  <p className="dinLabel pa0 ma0 mb2 f7 ttu">
                                    uom
                                  </p>
                                </label>
                              </div>

                              <div className="w-20 flex flex-column items-center mr2">
                                <div className="flex flex-row items-center">
                                  <span className="dinLabel f7 mh1">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0.00"
                                    onBlur={(e) => this.props.handleCostInputBlur(e, roomUUID, lineItemUUID)}
                                    className="InputField tc"
                                    name="laborCost"
                                    value={this.props.room.lineItems[lineItemUUID].laborCost}
                                    onChange={(e) => this.props.handleLineItemChange(e, roomUUID, lineItemUUID)}
                                  />
                                </div>
                                <label htmlFor="newLineItemLaborCost">
                                  <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                                    labor
                                  </p>
                                </label>
                              </div>

                              <div className="w-20 flex flex-column items-center mr2">
                                <div className="flex flex-row items-center">
                                  <span className="dinLabel f7 mh1">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0.00"
                                    onBlur={(e) => this.props.handleCostInputBlur(e, roomUUID, lineItemUUID)}
                                    className="InputField tc"
                                    name="materialCost"
                                    value={this.props.room.lineItems[lineItemUUID].materialCost}
                                    onChange={(e) => this.props.handleLineItemChange(e, roomUUID, lineItemUUID)}
                                  />
                                </div>
                                <label htmlFor="newLineItemMaterialCost">
                                  <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                                    material
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    )
                  })
                }
              </Accordion>

              <div className="flex flex-row justify-between mt4">
                <div className="w-50 br bw1 b--light-gray pr4">
                  <div className="NewLineItem__container">
                    { this.props.errors.newLineItem && ( <p className="dinLabel red f6 o-70"> {this.props.errors.newLineItem } </p> )}
                    <input
                      className="InputField measure-1"
                      type="text"
                      name="newLineItemDescription"
                      placeholder="Enter the line-item's description"
                      value={this.props.newLineItemDescription}
                      onChange={this.props.handleChange}
                    />
                    <label htmlFor="newLineItemDescription">
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
                          placeholder="1"
                          onChange={this.props.handleChange}
                          value={this.props.newLineItemQuantity}
                        />
                        <label htmlFor="newLineItemQuantity">
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
                          <select onChange={this.props.handleChange} name="newLineItemUOM" className="absolute z-2 top-0 left-0 w-100 h-100 o-0 pointer ttc">
                            <option value="CY">cubic yard</option>
                            <option value="DA">day</option>
                            <option value="EA">each</option>
                            <option value="HR">hour</option>
                            <option value="JC">job cost</option>
                            <option value="LF">linear foot</option>
                            <option value="LS">lump sum</option>
                            <option value="MC">mininum change</option>
                            <option value="MO">month</option>
                            <option value="RM">room</option>
                            <option value="SF">square foot</option>
                            <option value="SQ">square</option>
                            <option value="SY">square yard</option>
                            <option value="TN">ton</option>
                            <option value="WK">week</option>
                          </select>
                        </div>
                        <label htmlFor="newLineItemUOM">
                          <p className="dinLabel pa0 ma0 mb2 f7 ttu">
                            uom
                          </p>
                        </label>
                      </div>

                      <div className="w-20 flex flex-column items-center mr2">
                        <div className="flex flex-row items-center">
                          <span className="dinLabel f7 mh1">
                            $
                          </span>
                          <input
                            type="number"
                            step="0.01"
                            min="0.00"
                            onBlur={this.props.handleCostInputBlur}
                            className="InputField tc"
                            name="newLineItemLaborCost"
                            value={this.props.newLineItemLaborCost}
                            onChange={this.props.handleChange}
                          />
                        </div>
                        <label htmlFor="newLineItemLaborCost">
                          <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                            labor
                          </p>
                        </label>
                      </div>

                      <div className="w-20 flex flex-column items-center mr2">
                        <div className="flex flex-row items-center">
                          <span className="dinLabel f7 mh1">
                            $
                          </span>
                          <input
                            type="number"
                            step="0.01"
                            min="0.00"
                            onBlur={this.props.handleCostInputBlur}
                            className="InputField tc"
                            name="newLineItemMaterialCost"
                            value={this.props.newLineItemMaterialCost}
                            onChange={this.props.handleChange}
                          />
                        </div>
                        <label htmlFor="newLineItemMaterialCost">
                          <p className="dinLabel pa0 ma0 mb2 f7 ttc">
                            material
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
                      className="GenericButton tc dinLabel pv3 f7 mt3 ttu"
                      onClick={() => this.props.addNewLineItem(roomUUID)}
                      >
                      add line item
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 dib self-center">
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
    this.addNewLineItem = this.addNewLineItem.bind(this)
    this.handleCostInputBlur = this.handleCostInputBlur.bind(this)
    this.calculateTotals = this.calculateTotals.bind(this)
    this.handleLineItemChange = this.handleLineItemChange.bind(this)
    this.removeRoom = this.removeRoom.bind(this)
    this.removeLineItem = this.removeLineItem.bind(this)
    this.sumTotals = this.sumTotals.bind(this)
    this.sumRoomTotals = this.sumRoomTotals.bind(this)
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
      newLineItemQuantity: '1',
      newLineItemUOM: '',
      newLineItemLaborCost: '0.00',
      newLineItemMaterialCost: '0.00',
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
              quantity: '14',
              total: '0.00'
            }
          },
          roomTotals: {
            totalLabor: '0',
            totalMaterial: '0',
            totalCost: '0'
          }
        }
      },
      totalLaborCost: '0',
      totalMaterialCost: '0',
      totalCost: '0',
      errors: {
        newRoom: '',
        newLineItem: ''
      }
    }
  }

  sumTotals(roomUUID, lineItems) {
    console.log('sumTotals() was invoked')
    const currentRoom = this.state.rooms[roomUUID]
    if (currentRoom === undefined) return;
    const lineItemTotals = Object.keys(lineItems).reduce((totalsObj, lineItemUUID) => {
      const currentLineItem = lineItems[lineItemUUID]
      if (currentLineItem === undefined || typeof currentLineItem === "undefined") return totalsObj;
      totalsObj.totalLabor = (parseFloat(totalsObj.totalLabor) + parseFloat(currentLineItem.totalLabor)).toFixed(2)
      totalsObj.totalMaterial = (parseFloat(totalsObj.totalMaterial) + parseFloat(currentLineItem.totalMaterial)).toFixed(2)
      totalsObj.totalCost = (parseFloat(totalsObj.totalCost) + parseFloat(currentLineItem.total)).toFixed(2)
      return totalsObj
    }, {
      totalLabor: '0',
      totalMaterial: '0',
      totalCost: '0'
    })
    console.log('inside sumTotals() the line item totals are', lineItemTotals)
    return lineItemTotals;
  }

  sumRoomTotals() {
    return Object.keys(this.state.rooms).reduce((totalsObj, roomUUID) => {
      const currentRoom = this.state.rooms[roomUUID]
      if (currentRoom === undefined) return totalsObj;
      const { totalLabor, totalMaterial, totalCost } = currentRoom.roomTotals
      totalsObj.totalLaborCost = (parseFloat(totalsObj.totalLaborCost) + parseFloat(totalLabor)).toFixed(2)
      totalsObj.totalMaterialCost = (parseFloat(totalsObj.totalMaterialCost) + parseFloat(totalMaterial)).toFixed(2)
      totalsObj.totalCost = (parseFloat(totalsObj.totalCost) + parseFloat(totalCost)).toFixed(2)
      return totalsObj
    }, {
      totalLaborCost: '0',
      totalMaterialCost: '0',
      totalCost: '0'
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.rooms !== this.state.rooms) {
      this.setState({
        ...this.sumRoomTotals()
      })
    }
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

  // this handles updating existing lineItem's by being passed the roomUUID of
  // the line item's room, and also the lineItemUUID of the line item
  handleLineItemChange(e, roomUUID, lineItemUUID) {
    const eventTargetName = e.target.name
    const eventTargetValue = e.target.value
    console.log('sumTotal() about to be invoked with', eventTargetName, eventTargetValue)
    const calcCB = (prevState) => {
      const { laborTotal, materialTotal, combinedTotal } = this.calculateTotals(
        (eventTargetName === 'quantity' ? (eventTargetValue.trim() || '0') : (prevState.rooms[roomUUID].lineItems[lineItemUUID].quantity.trim() || '0')),
        prevState.rooms[roomUUID].lineItems[lineItemUUID].uom,
        (eventTargetName === 'laborCost' ? (eventTargetValue.trim() || '0') : (prevState.rooms[roomUUID].lineItems[lineItemUUID].laborCost.trim() || '0')),
        (eventTargetName === 'materialCost' ? (eventTargetValue.trim() || '0') : (prevState.rooms[roomUUID].lineItems[lineItemUUID].materialCost.trim() || '0' )))
      return {
        ...prevState.rooms[roomUUID].lineItems[lineItemUUID],
        [eventTargetName] : eventTargetValue,
        totalLabor: laborTotal,
        totalMaterial: materialTotal,
        total: combinedTotal
      }
    }
    const updatedLineItem = calcCB(this.state)
    return this.setState({
      ...this.state,
      rooms: {
        ...this.state.rooms,
        [roomUUID]: {
          ...this.state.rooms[roomUUID],
          lineItems: {
            ...this.state.rooms[roomUUID].lineItems,
            [lineItemUUID] : updatedLineItem
          },
          roomTotals: {
            ...this.state.rooms[roomUUID].roomTotals,
            ...this.sumTotals(roomUUID, {...this.state.rooms[roomUUID].lineItems, [lineItemUUID] : updatedLineItem })
          }
        }
      }
    })
  }

  // this handles newLineItems and newRooms because of it being on the root of the state,
  // it also handles existing rooms, by being passed the uuid of the room
  handleChange(e, roomUUID) {
    const uuid = roomUUID
    if (uuid) {
      const eventTargetName = e.target.name
      const eventTargetValue = e.target.value
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
      return this.setState({
        [e.target.name] : e.target.value
      })
    }
  }

  handleCostInputBlur(e, roomUUID, lineItemUUID) {
    if (lineItemUUID && roomUUID) {
      // make sure factors are not empty strings before calculating
      if ((e.target.name === 'laborCost' || e.target.name === 'materialCost' || e.target.name === 'quantity')) {
        const calcCB = (prevState) => {
          let totals;
          if (this.state.rooms[roomUUID].lineItems[lineItemUUID][e.target.name].trim()) {
            totals = this.calculateTotals(prevState.rooms[roomUUID].lineItems[lineItemUUID].quantity, prevState.rooms[roomUUID].lineItems[lineItemUUID].uom, prevState.rooms[roomUUID].lineItems[lineItemUUID].laborCost, prevState.rooms[roomUUID].lineItems[lineItemUUID].materialCost)
            return {
              ...prevState.rooms[roomUUID].lineItems[lineItemUUID],
              totalLabor: totals.laborTotal,
              totalMaterial: totals.materialTotal,
              total: totals.combinedTotal
            }
          }
          if (e.target.name === 'laborCost') {
            totals = this.calculateTotals(prevState.rooms[roomUUID].lineItems[lineItemUUID].quantity, prevState.rooms[roomUUID].lineItems[lineItemUUID].uom, '0.00', prevState.rooms[roomUUID].lineItems[lineItemUUID].materialCost)
          } else if (e.target.name === 'materialCost') {
            totals = this.calculateTotals(prevState.rooms[roomUUID].lineItems[lineItemUUID].quantity, prevState.rooms[roomUUID].lineItems[lineItemUUID].uom, prevState.rooms[roomUUID].lineItems[lineItemUUID].laborCost, '0.00')
          } else if (e.target.name === 'quantity') {
            totals = this.calculateTotals('0', prevState.rooms[roomUUID].lineItems[lineItemUUID].uom, prevState.rooms[roomUUID].lineItems[lineItemUUID].laborCost, prevState.rooms[roomUUID].lineItems[lineItemUUID].materialCost)
          }
          return {
            ...prevState.rooms[roomUUID].lineItems[lineItemUUID],
            [e.target.name]: (e.target.name === 'quantity' ? '0' : '0.00'),
            totalLabor: totals.laborTotal,
            totalMaterial: totals.materialTotal,
            total: totals.combinedTotal
          }
        }
        return this.setState({
          ...this.state,
          rooms: {
            ...this.state.rooms,
            [roomUUID]: {
              ...this.state.rooms[roomUUID],
              lineItems: {
                ...this.state.rooms[roomUUID].lineItems,
                [lineItemUUID] : calcCB(this.state)
              }
            }
          }
        })
      }

    }
    if ((e.target.name === 'newLineItemLaborCost' || e.target.name === 'newLineItemMaterialCost') && !this.state[e.target.name].trim()) {
      return this.setState({
        [e.target.name] : '0.00'
      })
    }
    return;
  }

  calculateTotals(quantity, uom, laborCost, materialCost) {
    // implement feature later on to have different precisions https://fdotwww.blob.core.windows.net/sitefinity/docs/default-source/programmanagement/estimates/basisofestimates/boemanual/files/chapter02.pdf?sfvrsn=f052688d_4
    // for different units (UOM)
    const laborTotal = (parseFloat(quantity) * parseFloat(laborCost)).toFixed(2)
    const materialTotal = (parseFloat(quantity) * parseFloat(materialCost)).toFixed(2)
    const combinedTotal = (parseFloat(laborTotal) + parseFloat(materialTotal)).toFixed(2)
    return {
      laborTotal,
      materialTotal,
      combinedTotal
    }
  }

  addNewLineItem(roomUUID) {
    const {
      newLineItemDescription : description,
      newLineItemQuantity : quantity,
      newLineItemUOM : uom,
      newLineItemLaborCost : laborCost,
      newLineItemMaterialCost : materialCost,
    } = this.state
    const numberReg = /^-?\d*(\.\d+)?$/;
    if (!numberReg.test(laborCost) || !numberReg.test(materialCost) || !numberReg.test(quantity)) {
      return this.setState((prevState) => ({
        ...prevState,
        errors : {
          ...prevState.errors,
          newLineItem: 'Labor cost, material cost, and quantity must be a number'
        }
      }))
    }
    if (!description.trim() || !(quantity > 0) || !uom.trim()) {
      return this.setState((prevState) => ({
        ...prevState,
        errors : {
          ...prevState.errors,
          newLineItem: 'You must provide a quantity greater than 0, a UOM, and a description'
        }
      }))
    }

    // everythng is good, continue, make calculations
    const { laborTotal, materialTotal, combinedTotal } = this.calculateTotals(quantity, uom, laborCost, materialCost)
    const newlineItemUUID = createUUID();
    const newLineItem = {
      description: description,
      uom: uom,
      materialCost: materialCost,
      laborCost: laborCost,
      totalMaterial: materialTotal,
      totalLabor: laborTotal,
      quantity: quantity,
      total: combinedTotal
    }
    return this.setState((prevState) => ({
      errors: { ...prevState.errors, newLineItem: '' },
      newLineItemDescription: '',
      newLineItemQuantity: '1',
      newLineItemUOM: '',
      newLineItemLaborCost: '0.00',
      newLineItemMaterialCost: '0.00',
      rooms: {
        ...prevState.rooms,
        [roomUUID]: {
          ...prevState.rooms[roomUUID],
          lineItems: {
            ...prevState.rooms[roomUUID].lineItems,
            [newlineItemUUID] : newLineItem
          },
          roomTotals: {
            ...this.state.rooms[roomUUID].roomTotals,
            ...this.sumTotals(roomUUID, {...this.state.rooms[roomUUID].lineItems, [newlineItemUUID] : newLineItem })
          }
        }
      }
    }))

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
        ...prevState,
        errors: {
          ...prevState.errors,
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

  removeRoom(roomUUID) {
    return this.setState({
      ...this.state,
      rooms: {
        ...this.state.rooms,
        [roomUUID]: undefined
      }
    })
  }

  removeLineItem(roomUUID, lineItemUUID) {
    return this.setState({
      ...this.state,
      rooms: {
        ...this.state.rooms,
        [roomUUID]: {
          ...this.state.rooms[roomUUID],
          lineItems: {
            ...this.state.rooms[roomUUID].lineItems,
            [lineItemUUID] : undefined
          },
          roomTotals: {
            ...this.state.rooms[roomUUID].roomTotals,
            ...this.sumTotals(roomUUID, {...this.state.rooms[roomUUID].lineItems, [lineItemUUID] : undefined })
          }
        }
      }
    })
  }

  render() {
    return (
      <div ref={this.invoiceContainerRef}>
        <Route
          path={`${this.props.match.path}/line-items/:roomId`}
          render={
            (props) =>
              <LineItems
                handleCostInputBlur={this.handleCostInputBlur}
                addNewLineItem={this.addNewLineItem}
                newLineItemLaborCost={this.state.newLineItemLaborCost}
                newLineItemMaterialCost={this.state.newLineItemMaterialCost}
                newLineItemUOM={this.state.newLineItemUOM}
                newLineItemDescription={this.state.newLineItemDescription}
                newLineItemQuantity={this.state.newLineItemQuantity}
                handleLineItemChange={this.handleLineItemChange}
                errors={this.state.errors}
                handleChange={this.handleChange}
                removeLineItem={this.removeLineItem}
                room={this.state.rooms[props.match.params.roomId] || {}}
                {...this.props}
                {...props}
                />
            }
        />
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
              <label htmlFor="invoiceName">
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
              <label htmlFor="customersFullName">
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
              <label htmlFor="customersAddress">
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
              <label htmlFor="customersCityState">
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
              <label htmlFor="customersZipcode">
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
              <label htmlFor="insuranceCarrier">
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
              <label htmlFor="policyNumber">
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
              <label htmlFor="claimNumber">
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
              <label htmlFor="dateOfLoss">
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
                <label htmlFor="newRoomName">
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
                      <label htmlFor="newRoomLength">
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
                      <label htmlFor="newRoomWidth">
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
                    <label htmlFor="newRoomHeight">
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
                      if (room === undefined) return;
                      return (
                        <AccordionItem
                          key={key}
                        >
                          <AccordionItemHeading className="w-100">
                            <AccordionItemButton className="accordion__button flex flex-row items-center justify-between">
                              <p className="tc dinLabel f7 ttu"> { room.name || roomUUID } </p>
                              <div className="flex flex-row items-center justify-between">
                                <button
                                  onClick={() => this.removeRoom(roomUUID)}
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
                              <label htmlFor="newRoomName">
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
                                      name="length"
                                      placeholder="0"
                                      onChange={(e) => this.handleChange(e, roomUUID)}
                                      value={room.length}
                                    />
                                    <label htmlFor="newRoomLength">
                                      <p className="dinLabel pa0 ma0 mb3 f6">
                                        Length
                                      </p>
                                    </label>
                                  </div>

                                  <div className="w-30 flex flex-column items-center">
                                    <input
                                      className="InputField tc"
                                      type="number"
                                      name="width"
                                      placeholder="0"
                                      onChange={(e) => this.handleChange(e, roomUUID)}
                                      value={room.width}
                                    />
                                    <label htmlFor="newRoomWidth">
                                      <p className="dinLabel pa0 ma0 mb3 f6">
                                        Width
                                      </p>
                                    </label>
                                  </div>

                                  <div className="w-30 flex flex-column items-center">
                                    <input
                                      className="InputField tc"
                                      type="number"
                                      name="height"
                                      placeholder="8"
                                      onChange={(e) => this.handleChange(e, roomUUID)}
                                      value={room.height}
                                    />
                                  <label htmlFor="newRoomHeight">
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
                  className="absolute w-100 h-100 o-0 pointer"
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
                  if (room === undefined) return;
                  return (
                    <li className="flex flex-row items-center justify-between" key={key}>
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
