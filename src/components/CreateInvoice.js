import React, { Component, createRef, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import compareKeys from '../util/compareWhitelistedKeys.js'
import createUUID from '../util/createUUID'
import agent from '../util/agent'

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

// Material-UI
import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
    paddingBottom: theme.spacing.unit * 2
  },
  header: {
    position: "sticky",
    top: 0
  },
  table: {
    minWidth: "100%"
  },
});

class ExpandingRow extends Component {
  state = { open: false };

  render() {
    const { lineItem, lineItemUUID, roomUUID } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <TableRow>
          <TableCell align="right">
            <div
              className="h-100 items-center flex flex-row pointer dim"
              onClick={() => this.setState(({ open }) => ({ open: !open }))}
              >
              <p className="dinTitle f7 mid-gray tc">Edit</p>
              <div className="ArrowIcon rotate-90 mh2">
                <Arrow />
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <div
              className="h-100 items-center flex flex-row pointer dim"
              onClick={() => this.props.removeLineItem(roomUUID, lineItemUUID)}
              >
              <p className="dinTitle f7 mid-gray tc">Delete</p>
              <div className="ArrowIcon mh1"><TrashIcon /></div>
            </div>
          </TableCell>
          <TableCell align="right">{lineItem.description}</TableCell>
          <TableCell align="right">{lineItem.quantity}</TableCell>
          <TableCell align="right">{lineItem.uom}</TableCell>
          <TableCell align="right">{lineItem.laborCost}</TableCell>
          <TableCell align="right">{lineItem.materialCost}</TableCell>
          <TableCell align="right">{lineItem.totalMaterial}</TableCell>
          <TableCell align="right">{lineItem.totalLabor}</TableCell>
        </TableRow>
        <TableRow className="relative" style={{ height: "auto" }}>
          <td colSpan="12">
            <Collapse in={open} component="div" style={{display: "block", width: "50%"}}>
              <div className="LineItem__container w-100 pv2 ph2">
                  <input
                    className="InputField measure-1"
                    type="text"
                    name="description"
                    placeholder="Enter the line-item's description"
                    value={lineItem.description}
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
                        value={lineItem.quantity}
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
                          { lineItem.uom || 'UOM'}
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
                          value={lineItem.laborCost}
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
                          value={lineItem.materialCost}
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
            </Collapse>
          </td>
        </TableRow>
      </Fragment>
    );
  }
}


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
    const { classes } = this.props
    return (
      <div className="LineItems fixed top-0 left-0 w-100 z-1 vh-100 bg-black-70">
        <div className="fixed top-0 left-0 vh-85 w-100 bg-white overflow-scroll">
          <div className="measure-70 flex flex-column center ph2">
            <p className="sticky top-0 dinTitle pa0 ma0 f3 mb3 ttc pt4 bg-white-70">
              line items
              <span className="mid-gray f5 ttc db pt1">
                {this.props.room.name}
              </span>
            </p>
            <div className="relative h-auto w-100 min-height-vh-75">
              <div className="w-100">
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">
                          Edit
                        </TableCell>
                        <TableCell align="right">Delete</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">UOM</TableCell>
                        <TableCell align="right">Labor Cost</TableCell>
                        <TableCell align="right">Material Cost</TableCell>
                        <TableCell align="right">Total Material</TableCell>
                        <TableCell align="right">Total Labor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        Object.keys(this.props.room).length &&
                        Object.keys(this.props.room.lineItems)
                        .map((lineItemUUID, key) => {
                          const lineItem = this.props.room.lineItems[lineItemUUID]
                          if (lineItem === undefined) return;
                          return (
                            <ExpandingRow
                              lineItem={lineItem}
                              key={key}
                              roomUUID={roomUUID}
                              lineItemUUID={lineItemUUID}
                              handleLineItemChange={this.props.handleLineItemChange}
                              handleCostInputBlur={this.props.handleCostInputBlur}
                              removeLineItem={this.props.removeLineItem}
                            />
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </Paper>
              </div>

              <div className="flex flex-column flex-row-l justify-between mt4">
                <div className="w-100 w-50-l br bw1 b--light-gray pr4">
                  <div className="NewLineItem__container ph1">
                    { this.props.errors.newLineItem && ( <p className="dinLabel red f6 o-70"> {this.props.errors.newLineItem } </p> )}
                    <input
                      className="InputField measure-1 ml3"
                      type="text"
                      name="newLineItemDescription"
                      placeholder="Enter the line-item's description"
                      value={this.props.newLineItemDescription}
                      onChange={this.props.handleChange}
                    />
                    <label htmlFor="newLineItemDescription">
                      <p className="dinLabel pa0 ma0 mb2 f7 ttc tc">
                        description
                      </p>
                    </label>

                    <div className="flex flex-row items-center flex-wrap justify-start">
                      <div className="w-auto w-20-l flex flex-column items-center mr2 ml3">
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

                      <div className="w-auto w-20-l flex flex-column items-center mr2">
                        <div className="relative InputField flex flex-row justify-center pointer ph3">
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

                      <div className="w-auto w-20-l flex flex-column items-center mr2">
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

                      <div className="w-auto w-20-l flex flex-column items-center mr2">
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
            <div className="sticky bottom-0 dib self-center w-100 bg-white">
              <p className="dinLabel mid-gray f6 ttu pointer tc"
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
    this.handleImageChange = this.handleImageChange.bind(this)
    this.removeRoom = this.removeRoom.bind(this)
    this.removeLineItem = this.removeLineItem.bind(this)
    this.sumTotals = this.sumTotals.bind(this)
    this.removePreviewImage = this.removePreviewImage.bind(this)
    this.removeUploadedImage = this.removeUploadedImage.bind(this)
    this.sumRoomTotals = this.sumRoomTotals.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.generateInvoice = this.generateInvoice.bind(this)
    this.invoiceContainerRef = createRef()
    this.draftTimeoutId = null
    this.customerKnackId = ''
    this.whitelistedKeys = [
      'invoiceName',
      // customer details
      'customersFullName',
      'customersAddress',
      'customersCityState',
      'customersZipCode',
      // claim details
      'insuranceCarrier',
      'policyNumber',
      'claimNumber',
      'dateOfLoss',
      // rooms, includes lineItems
      'rooms',
      // totals
      'totalLaborCost',
      'totalMaterialCost',
      'totalCost'
      ]
    const test1 = createUUID();
    const test2 = createUUID();
    const lineItemTest1 = createUUID();
    this.state = {
      invoiceName: '',
      insuranceCarrier: '',
      policyNumber: '',
      claimNumber: '',
      dateOfLoss: "2019-01-01",
      customersFullName: '',
      customersAddress: '',
      customersCityState: '',
      customersZipCode: '',
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
        newLineItem: '',
        roomImages: ''
      },

      notUploadedImages: {

      },
      uploadedImages: {

      },
      beginAutoSave: false,
      autoSaving: false,
      generatingInvoice: false
    }
  }

  sumTotals(roomUUID, lineItems) {
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

    if ( Object.keys((this.state.notUploadedImages || {})).length > 0 ) {
      this.uploadImage()
    }

    if (this.state.beginAutoSave && compareKeys(prevState, this.state, this.whitelistedKeys)) {
      console.log('component updated prevstate ===, and current state ===', {...prevState}, {...this.state})
      // If a timer is already started, clear it
      if (this.draftTimeoutId) clearTimeout(this.draftTimeoutId);

      // Set timer that will autosave this invoice on the backend when it fires
      this.draftTimeoutId = setTimeout(this.autoSave, 1250)
    }
  }

  componentDidMount() {
    const { token } = this.props
    // check if we have query param
    if (this.props.location.search) {

      const query = this.props.location.search.replace(/(^\?)/,'').split("&").reduce((queryObj, keyValue) => {
        const [key, value] = keyValue.split("=")
        queryObj[key] = value
        return queryObj
      },{})

      if (query.customer_id) {
        this.customerKnackId = query.customer_id
        agent.setToken(token)
        agent.requests.get(`knack/search-customers/${query.customer_id}`).then((response) => {
          if (response.response.statusCode === 401) {
            this.props.dispatch({ type: "LOGOUT" })
          }
          return response
        }).then(({response: res}) => {
          const knackCustomersFullName = res.body[`${process.env.REACT_APP_KNACK_CUSTOMERS_TABLE_NAME_FIELD}_raw`]
          const { city, state, zip, street, street2 } = res.body[`${process.env.REACT_APP_KNACK_CUSTOMERS_TABLE_ADDRESS_FIELD}_raw`]
          // initialize draft invoice on backend, will find existing draft invoice,
          // or create new draft invoice
          agent.setToken(token)
          return agent.requests.post(`invoices/${this.props.match.params.draftId}`).then((invoice) => {

            this.setState({
              ...this.state,
              invoiceName: invoice.invoiceName,
              customersFullName: (knackCustomersFullName || ''),
              customersAddress: `${street || ''} ${street2 || ''}`,
              customersCityState: ((city && state) ? `${city} , ${state}` : ''),
              customersZipCode: (zip || ''),
              insuranceCarrier: invoice.claim.insuranceCarrier,
              policyNumber: invoice.claim.policyNumber,
              claimNumber: invoice.claim.claimNumber,
              dateOfLoss: invoice.claim.dateOfLoss,
              rooms: invoice.rooms || {},
              totalLaborCost: invoice.totalLaborCost,
              totalMaterialCost: invoice.totalMaterialCost,
              totalCost: invoice.totalCost,
              uploadedImages: invoice.images ? invoice.images : {},
              customerKnackId: this.customerKnackId,
              beginAutoSave: true
            })
          })
        })
        .catch((err) => {
          console.log('error fetching customer in CreateInvoice', err)
        })
      }
    } else {
      // initialize draft invoice on backend, will find existing draft invoice,
      // or create new draft invoice
      agent.setToken(token)
      agent.requests.post(`invoices/${this.props.match.params.draftId}`).then((invoice) => {
        console.log('the customer full name is', {...invoice.customer})
        this.setState({
          ...this.state,
          invoiceName: invoice.invoiceName,
          customersFullName: invoice.customer.fullName,
          customersAddress: invoice.customer.address,
          customersCityState: invoice.customer.cityState,
          customersZipCode: invoice.customer.zipCode,
          insuranceCarrier: invoice.claim.insuranceCarrier,
          policyNumber: invoice.claim.policyNumber,
          claimNumber: invoice.claim.claimNumber,
          dateOfLoss: invoice.claim.dateOfLoss,
          rooms: invoice.rooms || {},
          totalLaborCost: invoice.totalLaborCost,
          totalMaterialCost: invoice.totalMaterialCost,
          totalCost: invoice.totalCost,
          uploadedImages: invoice.images ? invoice.images : {},
          customerKnackId: invoice.customer.customerKnackId,
          beginAutoSave: true
        })
      }).catch((err) => {
        if (err.status === 422 && err.response && err.response.body.error === "NOT_DRAFT") {
          // redirect to pdf detailed version since invoice can no longer be updated
          this.props.history.push(`/invoices/pdf/${this.props.match.params.draftId}`)
        }
        console.log('There was an error when attempting find or create a draft invoice on CreateInvoice componentDidMount', { ...err })
      })
    }

  }

  componentWillUnmount() {
    if (this.draftTimeoutId) clearTimeout(this.draftTimeoutId)
  }

  uploadImage(){
    const imageUUID = Object.keys(this.state.notUploadedImages)[0]
    const file = this.state.notUploadedImages[imageUUID].file
    agent.requests.postImage(`invoices/${this.props.match.params.draftId}`, file).then((invoice) => {
      const copyNotUploadedImages = { ...this.state.notUploadedImages }
      delete copyNotUploadedImages[imageUUID]
      this.setState({
        ...this.state,
        notUploadedImages: copyNotUploadedImages,
        uploadedImages: invoice.images
      })
    }).catch((err) => {
      if (err.status === 422 && err.response && err.response.body.error === "NOT_DRAFT") {
        // redirect to pdf detailed version since invoice can no longer be updated
        alert("NOT A DRAFT")
      }
      console.log('There was an error when attempting find or create a draft invoice on CreateInvoice uploadImage', { ...err })
    })
  }

  autoSave() {
    const currentState = {...this.state}
    this.setState({
      autoSaving: true
    })
    const requestBody = this.whitelistedKeys.reduce((requestBodyObj, whitelistedKey) => {
      requestBodyObj[whitelistedKey] = currentState[whitelistedKey]
      return requestBodyObj
    }, {})
    console.log('the request body in autosave is', requestBody)
    const { token } = this.props
    agent.setToken(token)
    agent.requests.post(`invoices/${this.props.match.params.draftId}`, { customerKnackId: this.state.customerKnackId, ...requestBody } ).then((invoice) => {
      // succesfully updated invoice
      this.setState({
        autoSaving: false
      })
    }).catch((err) => {
      if (err.status === 422 && err.response && err.response.body.error === "NOT_DRAFT") {
        // redirect to pdf detailed version since invoice can no longer be updated
        alert("NOT A DRAFT")
        this.setState({
          autoSaving: false
        })
      }
      console.log('There was an error when attempting find or create a draft invoice on CreateInvoice autoSave', { ...err })
    })
  }

  // this handles updating existing lineItem's by being passed the roomUUID of
  // the line item's room, and also the lineItemUUID of the line item
  handleLineItemChange(e, roomUUID, lineItemUUID) {
    const eventTargetName = e.target.name
    const eventTargetValue = e.target.value
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
        ...this.state,
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
              totalLabor: '0',
              totalMaterial: '0',
              totalCost: '0'
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

  removePreviewImage(imageUUID) {
    // not in db or cloudinary yet so simply remove
    this.setState({
      ...this.state,
      notUploadedImages: {
        ...this.state.notUploadedImages,
        [imageUUID]: undefined
      }
    })
  }

  removeUploadedImage(imageId) {
    const { token } = this.props
    const { draftId } = this.props.match.params
    agent.setToken(token)
    agent.requests
    .post(`invoices/${draftId}/remove-image/${encodeURIComponent(imageId)}`)
    .then((res) => {
      if (res.id === draftId) { // consider it deleted succesfully
        this.setState({
          ...this.state,
          uploadedImages : {
            ...this.state.uploadedImages,
            [imageId] : undefined
          }
        })
      }
    })
  }

  handleImageChange(e) {
    const acceptedMimeTypes = ['image/jpeg', 'image/png']
    const file = e.target.files[0]
    if (!file) return;
    if (!acceptedMimeTypes.includes(file.type)) {
      return this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          roomImages: 'You can only upload JPEG or PNG files'
        }
      })
    }
    const imageUUID = createUUID()
    const previewUrl = URL.createObjectURL(file)
    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        roomImages: ''
      },
      notUploadedImages: {
        ...this.state.notUploadedImages,
        [imageUUID]: {
          file,
          previewUrl
        }
      }
    })
  }

  generateInvoice() {
    const { token, history } = this.props
    agent.setToken(token)
    return agent.requests.post(`invoices/${this.props.match.params.draftId}/generate-invoice`).then((knackResponse) => {
      history.push(`/invoices/pdf/${this.props.match.params.draftId}`)
    }).catch(err => {
      console.log('There is an error in CreateInvoice in generateInvoice', err)
    })
  }

  render() {
    return (
      <Fragment>
        {
          this.state.generatingInvoice ?
          (<p className="dinTitle pa0 ma0 f3 mb3">Generating Invoice ...</p>) :
          (
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
           <div className="flex flex-column measure-70 center ph4 pt5 mb5">
              <div className="flex flex-column flex-row-l w100">

                <div className="flex flex-column w-100 w-50-l pr5-l">
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
                    value={this.state.customersCityState}
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

                <div className="flex flex-column w-100 w-50-l pl5-l">
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

                      <div className="flex flex-row items-center justify-between w-50 flex-grow-1">

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
                      className="GenericButton tc dinLabel pv3 f7 mt3 ttu"
                      onClick={this.addNewRoom}
                      >
                      add room
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
                                      className="flex flex-row items-center self-center dinLabel f7 mid-gray pointer bn bg-transparent dim ttu">
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

                                    <div className="flex flex-row items-center justify-between w-50 flex-grow-1">

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

                  <div className="mt4">
                    { this.state.errors.roomImages && ( <p className="dinLabel red f6 o-70"> {this.state.errors.roomImages } </p> )}
                    <div className="ImageUploads__container relative w-40 ba bw1 flex items-center justify-center pv2 b--light-gray br2 flex-row">
                      <input
                        type="file"
                        name="roomImages"
                        className="absolute w-100 h-100 o-0 pointer"
                        onChange={this.handleImageChange}
                      />
                    <p className="dinLabel pa0 ma0 f7 gray ttu dib tc">
                        Upload an image
                      </p>
                    </div>
                    <div className="w-100 mt3">
                      <ul className="list pa0 ma0 flex flex-row overflow-x-scroll overflow-y-hidden h100 pb2">
                        {
                          Object.keys(this.state.notUploadedImages).map((imageUUID, key) => {
                            const newImage = this.state.notUploadedImages[imageUUID]
                            if (newImage === undefined || typeof newImage === 'undefined') return;
                            return (
                              <li key={key}>
                                <div className="RoomImagesContainer mr2 flex flex-column pb4">
                                  <img src={newImage.previewUrl} width="auto" height="270" />
                                  <button
                                    onClick={() => {
                                      this.removePreviewImage(imageUUID)
                                      }
                                    }
                                    className="flex flex-row items-center self-center dinLabel f7 mid-gray pointer bn bg-transparent dim ttu">
                                    delete
                                    <div className="ArrowIcon mh2"><TrashIcon /></div>
                                  </button>
                                </div>
                              </li>
                            )
                          })
                        }
                        {
                          Object.keys(this.state.uploadedImages).map((imageId, key) => {
                            const uploadedImage = this.state.uploadedImages[imageId]
                            if (uploadedImage === undefined || typeof uploadedImage === 'undefined') return;
                            return (
                              <li key={key}>
                                <div className="RoomImagesContainer mr2 flex flex-column pb4">
                                  <img src={uploadedImage.url} width="auto" height="270" />
                                  <button
                                    onClick={() => this.removeUploadedImage(imageId)}
                                    className="flex flex-row items-center self-center dinLabel f7 mid-gray pointer bn bg-transparent dim ttu">
                                    delete
                                    <div className="ArrowIcon mh2"><TrashIcon /></div>
                                  </button>
                                </div>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
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
                        <li className="flex flex-column flex-row-l items-center justify-between" key={key}>
                          <p className="dinLabel f6 ttu">
                            { room.name || roomUUID }
                          </p>
                          <div className="flex flex-column flex-column-reverse flex-row-l flex-row-reverse-l">
                            <p className="dinLabel f7 pa0 mh1">
                              <span className="ttu black-60">total: </span>
                              ${ room.roomTotals.totalCost }
                            </p>
                            <p className="dinLabel f7 pa0 mh1">
                              <span className="ttu black-60">total material: </span>
                              ${ room.roomTotals.totalMaterial }
                            </p>
                            <p className="dinLabel f7 pa0 mh1">
                              <span className="ttu black-60">total labor: </span>
                              ${ room.roomTotals.totalLabor }
                            </p>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className="flex flex-column flex-row-l items-center justify-between">
                  <ul className="list pa0 tl">
                    <li>
                      <p className="dinLabel f6">
                        <span className="ttu black-70">total labor: </span>
                        ${ this.state.totalLaborCost }
                      </p>
                    </li>
                    <li>
                      <p className="dinLabel f6">
                        <span className="ttu black-70">total material: </span>
                        ${ this.state.totalMaterialCost }
                      </p>
                    </li>
                    <li>
                      <p className="dinLabel f6">
                        <span className="ttu black-70">total cost: </span>
                        ${ this.state.totalCost }
                      </p>
                    </li>
                  </ul>
                  <div className="w-40">
                    <button className="GenericButton tc dinLabel pv3 f7 mt3 ttu" disabled={this.state.autoSaving} onClick={this.generateInvoice}>
                      generate invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
})

export default connect(mapStateToProps)(withStyles(styles)(CreateInvoice))
