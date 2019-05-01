import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, PDFDownloadLink } from '@react-pdf/renderer';

// Utils
import createUUID from '../util/createUUID'
import agent from '../util/agent'

// Images
import logo from '../images/small_logo.png';

// Selectors
import getSettings from '../state/selectors/getSettings'

// Redux Actions
import { fetchSettings } from '../state/actions/applicationActions'

const calculateRoomMeasurements = (length, width, height) => {
  let SFFloor = 0
  let SFCeiling = 0
  let SFWalls = 0

  let SFWallsCeiling = 0
  let SFWallsFloorCeiling = 0

  let LFFloorPerim = 0
  let LFCeilingPerim = 0

  let LFFloorCeilingPerim = 0

  SFFloor = length * width
  SFCeiling = length * width
  SFWalls = ((length * height) + (width * height)) * 2

  SFWallsCeiling = SFWalls + SFCeiling
  SFWallsFloorCeiling = SFWalls + SFFloor + SFCeiling

  LFFloorPerim = (length * 2) + (width * 2)
  LFCeilingPerim = (length * 2) + (width * 2)

  LFFloorCeilingPerim = LFFloorPerim + LFCeilingPerim
  return {
    SFFloor,
    SFCeiling,
    SFWalls,
    SFWallsCeiling,
    SFWallsFloorCeiling,
    LFFloorPerim,
    LFCeilingPerim,
    LFFloorCeilingPerim
  }
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: "row",
    padding: 40,
    width: "100%",
    alignItems: 'center'
  },
  smallText: {
    fontSize: 10,
    paddingBottom: 1,
  }
});

const PDFdocument = ({
  companyName,
  companyPhoneNumber,
  companyEmail,
  companyZip,
  companyAddress,
  companyCityState,
  companyOpeningStatement,
  allRooms,
  allImages,
  fullName,
  address,
  cityState,
  zipCode,
  insuranceCarrier,
  policyNumber,
  invoiceUUID,
  totalCost
  }) => {
  
  return (
    <Document
      title={`Invoice for ${fullName} - $${totalCost}`}>
      <Page size="LETTER" style={styles.page}>

        <View style={[styles.headerContainer, { justifyContent: "space-between" }]} fixed>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={{ width: 35}}>
              <Image
                src={logo}
                style={{width: "100%"}}
              />
            </View>

            <View style={{ marginLeft: "2%" }}>
              <Text
                style={styles.smallText}
              >
                { companyName }
              </Text>
              <Text style={styles.smallText}>
                {`Telephone | ${companyPhoneNumber}`}
              </Text>
              <Text style={styles.smallText}>
                {`Billing Email | ${companyEmail}`}
              </Text>
              <Text style={styles.smallText}>
                {`Mailing Address | ${companyAddress} ${companyCityState} ${companyZip}`}
              </Text>
            </View>
          </View>

          <Image
            src={`/invoices/${invoiceUUID}/qr`}
            style={{width: 30}}
          />
        </View>

        <View style={{ flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Customer Name
            </Text>
            <Text style={[styles.smallText, {width: "70%", flexWrap: "wrap"}]}>
              { fullName }
            </Text>
          </View>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Property Address
            </Text>
            <View style={{flexDirection: "column", width: "70%"}}>
              <Text style={styles.smallText}>
                { address }
              </Text>
              <Text style={styles.smallText}>
                { `${cityState} ${zipCode}` }
              </Text>
            </View>
          </View>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Insurance Carrier
            </Text>
            <Text style={[styles.smallText, {width: "70%", flexWrap: "wrap"}]}>
              { insuranceCarrier }
            </Text>
          </View>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Policy Number
            </Text>
            <Text style={[styles.smallText, {width: "70%", flexWrap: "wrap"}]}>
              { policyNumber }
            </Text>
          </View>
          <Text style={[styles.smallText, { width: "80%", borderTop: "1 solid black", alignSelf: "center", paddingTop: 10 }]}>
            { companyOpeningStatement }
          </Text>
        </View>

        <View style={{ flexDirection: "column", width: "90%", alignSelf: "center", minHeight: 500 }} break>
          {
            allRooms.map((room) => {
              return (
                <View style={{ flexDirection: "column", width:"100%", marginBottom: 30}}>
                  <View style={{flexDirection: "row", justifyContent: "space-between", borderBottom: "1 solid black", paddingBottom: 5, marginBottom: 8 }}>
                    <Text style={styles.smallText}>
                      { room.name }
                    </Text>
                    <Text style={styles.smallText}>
                      {`L: ${room.length} | W: ${room.width } | H: ${room.height}` }
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Square Footage of Floor
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.SFFloor} sq. ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Square Footage of Ceiling
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.SFCeiling} sq. ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Square Footage of Walls
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.SFWalls} sq. ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Square Footage of Walls & Ceiling
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.SFWallsCeiling} sq. ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Square Footage of Walls, Floor & Ceiling
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.SFWallsFloorCeiling} sq. ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Linear Footage of Floor Perimeter
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.LFFloorPerim} ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Linear Footage of Ceiling Perimeter
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.LFCeilingPerim} ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>
                      Linear Footage of Floor & Ceiling Perimeter
                    </Text>
                    <Text style={styles.smallText}>
                      {`${room.LFFloorCeilingPerim} ft.`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "center", borderBottom: "1 solid gray", paddingBottom: 5, marginTop: 10, marginBottom: 5}}>
                    <Text style={[styles.smallText, {width: "20%"}]}>
                      Qty
                    </Text>
                    <Text style={[styles.smallText, {width: "50%"}]}>
                      Description
                    </Text>
                    <Text style={[styles.smallText, {width: "10%"}]}>
                      Labor Cost
                    </Text>
                    <Text style={[styles.smallText, {width: "10%"}]}>
                      Unit Cost
                    </Text>
                    <Text style={[styles.smallText, {width: "10%", textAlign: "right"}]}>
                      Total
                    </Text>
                  </View>
                  {
                    room.lineItems.map((item) => {
                      return (
                        <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 10}}>
                          <Text style={[styles.smallText, {width: "20%"}]}>
                            {`${item.quantity} ${item.uom}`}
                          </Text>
                          <Text style={[styles.smallText, {width: "50%", flexWrap: "wrap", paddingRight: 1 }]}>
                            { item.description }
                          </Text>
                          <Text style={[styles.smallText, {width: "10%"}]}>
                            ${ item.laborCost }
                          </Text>
                          <Text style={[styles.smallText, {width: "10%"}]}>
                            ${ item.materialCost }
                          </Text>
                          <Text style={[styles.smallText, {width: "10%", textAlign: "right"}]}>
                            ${ item.total }
                          </Text>
                        </View>
                      )
                    })
                  }
                  <View style={{flexDirection: "row", justifyContent: "space-between", borderBottom: "1 solid black", paddingBottom: 5, marginBottom: 5 }}>
                    <Text style={styles.smallText}>
                      {`Totals - ${room.name}`}
                    </Text>
                    <Text style={styles.smallText}>
                      {`Labor Totals: $${room.roomTotals.totalLabor} | Unit Totals: $${room.roomTotals.totalMaterial} | Totals: $${room.roomTotals.totalCost}`}
                    </Text>
                  </View>
                </View>
              )
            })
          }

        </View>

        <View style={{ flexDirection: "column", width: "90%", alignSelf: "center"}} break>
          <Text style={[styles.smallText, { marginBottom: 10 }]} fixed>
            { allImages.length > 0 && 'Images'}
          </Text>
          <View style={{ flexDirection: "row", width: "100%", alignSelf: "center", flexWrap: "wrap" }} break>
            {
              allImages.map((url) =>
                <Image
                  src={url}
                  style={{width: "40%", marginRight: 10, marginBottom: 10}}
                />
              )
            }
          </View>
        </View>


        <View style={{ flexDirection: "column", width: "90%", alignSelf: "center", minHeight: 500}} break>
          <Text style={[styles.smallText, { textAlign: "right", textDecoration: "underline"}]}>
            Totals
          </Text>
          {
            allRooms.map((room) => {
              return (
                <View style={{ flexDirection: "row", marginBottom: 2, justifyContent: "space-between" }}>
                  <Text style={[styles.smallText, { marginRight: 20 }]}>
                    { room.name }
                  </Text>
                  <Text style={styles.smallText}>
                    ${room.roomTotals.totalCost}
                  </Text>
                </View>
              )
            })
          }
          <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
            <Text style={[styles.smallText, { marginRight: 20 }]}>
              Total Amount
            </Text>
            <Text style={styles.smallText}>
              ${totalCost}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "column", width: "80%", position: "absolute", bottom: 0, borderTop: "1 solid gray", paddingVertical: 10, marginBottom: 10, alignSelf: "center"}} fixed>
          <Text style={[styles.smallText, { color: "gray", textAlign: "center" }]} render={({ pageNumber, totalPages }) => (
            `Invoice for ${ fullName } - Invoice ID : ${invoiceUUID}`
          )} />
        </View>
      </Page>
    </Document>
  )
}

class PDFInvoice extends Component {

  constructor(props) {
    super(props)
    this.state = {
      invoice: null
    }
  }

  componentDidMount() {
    console.log('the invoiceid is', this.props.match.params)
    agent.setToken(this.props.token)
    agent.requests.get(`invoices/${this.props.match.params.invoiceId}`).then(({invoice}) => {
      // succesfully updated invoice
      this.setState({
        invoice
      })
    }).catch((err) => {
      if (err.status === 404) {
        // redirect to dashboard with error since pdf does not exist
        this.props.history.push("/")
        this.setState({
          invoice: null
        })
      }
    })
  }

  render() {
    const { companyName, companyPhoneNumber } = this.props.globals.settings
    let allRooms = []
    let allImages = []
    let customer = {}
    let claim = {}
    let invoiceUUID = ''
    let totalCost = ''
    let pdfFileName = `${createUUID()}.pdf`
    if (this.state.invoice) {
      const roomIds = Object.keys(this.state.invoice.rooms || {})
      const roomsById = this.state.invoice.rooms
      allRooms = roomIds.map((uuid) => {
        const room = roomsById[uuid]
        const roomLineItemsIds = Object.keys(room.lineItems)
        const roomLineItemsById = room.lineItems
        const roomLineItems = roomLineItemsIds.map((uuid) => roomLineItemsById[uuid])
        const roomMeasurements = calculateRoomMeasurements(room.length, room.width, room.height)
        return {
          ...roomMeasurements,
          ...room,
          lineItems: roomLineItems
        }
      })

      const imageIds = Object.keys(this.state.invoice.images || {})
      const imagesById = this.state.invoice.images
      allImages = imageIds.map((uuid) => imagesById[uuid].url)

      customer = this.state.invoice.customer
      claim = this.state.invoice.claim
      invoiceUUID = this.state.invoice.id
      totalCost = this.state.invoice.totalCost

      pdfFileName = `${customer.fullName.replace(/\s+/g, '')}-${invoiceUUID}.pdf`
    }
    return (
      <div className="flex flex-column justify-center pv4 ph2 w-100">
        <PDFDownloadLink
        document={
          <PDFdocument
            {...this.props.globals.settings}
            allRooms={allRooms || []}
            allImages={allImages}
            {...customer}
            {...claim}
            invoiceUUID={invoiceUUID}
            totalCost={totalCost}
            pdfVersion="VERSION_1"
          />
        }
        fileName={pdfFileName}
        className="dinTitle f4 mid-gray center mv4"
        key={createUUID()}
        >
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
        <PDFViewer height="800px" className="center w-90 w-60-l" key={createUUID()}>
          <PDFdocument
            {...this.props.globals.settings}
            allRooms={allRooms || []}
            allImages={allImages}
            {...customer}
            {...claim}
            invoiceUUID={invoiceUUID}
            totalCost={totalCost}
            pdfVersion="VERSION_1"
          />
        </PDFViewer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { status, errors, auth } = state
  const { settings: settingsStatus } = status.globals
  const { settings: settingsError } = errors.globals
  return {
    isLoading: {
      globals: {
        settings: settingsStatus
      }
    },
    isError: {
      globals: {
        settings:settingsError
      }
    },
    globals: {
      settings: getSettings(state)
    },
    token: auth.token
  }
}

export default connect(mapStateToProps, { fetchSettings })(PDFInvoice)
// export default PDFInvoice
