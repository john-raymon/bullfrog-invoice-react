import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

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
  companyOpeningStatement
  }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.headerContainer} fixed>

          <View style={{ width: "10%"}}>
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

        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Customer Name
            </Text>
            <Text style={[styles.smallText, {width: "70%", flexWrap: "wrap"}]}>
              { "John Mendez" }
            </Text>
          </View>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Property Address
            </Text>
            <View style={{flexDirection: "column", width: "70%"}}>
              <Text style={styles.smallText}>
                { "11 ChestNut Circle" }
              </Text>
              <Text style={styles.smallText}>
                { "HollyWood, Fl 33026 " }
              </Text>
            </View>
          </View>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Insurance Carrier
            </Text>
            <Text style={[styles.smallText, {width: "70%", flexWrap: "wrap"}]}>
              { "Gieco" }
            </Text>
          </View>
          <View style={{flexDirection: "row", width: "80%", alignSelf: "center", paddingVertical: 20}}>
            <Text style={[styles.smallText, {width: "30%"}]}>
              Policy Number
            </Text>
            <Text style={[styles.smallText, {width: "70%", flexWrap: "wrap"}]}>
              { "555555" }
            </Text>
          </View>
          <Text style={[styles.smallText, { width: "80%", borderTop: "1 solid black", alignSelf: "center", paddingTop: 10 }]}>
            { companyOpeningStatement }
          </Text>
        </View>


        <View style={{ flexDirection: "column", width: "80%", position: "absolute", bottom: 10, borderTop: "1 solid gray", paddingVertical: 10, alignSelf: "center"}} fixed>
          <Text style={[styles.smallText, { color: "gray", textAlign: "center" }]} render={({ pageNumber, totalPages }) => (
            `Customer Name Page ${pageNumber} / ${totalPages === undefined ? pageNumber : totalPages }`
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
        // redirect to pdf detailed version since invoice can no longer be updated
        this.setState({
          invoice: null
        })
      }
    })
  }

  render() {
    const { companyName, companyPhoneNumber } = this.props.globals.settings
    if (this.state.invoice) {
      const roomIds = Object.keys(this.state.invoice.rooms || {})
      const room = roomIds.length > 0 && this.state.invoice.rooms[roomIds[0]]
      console.log('the measurements are', calculateRoomMeasurements(room.length, room.width, room.height))

    }
    return (
      <div className="flex justify-center pv4">
        <PDFViewer height="800px" className="center w-60" key={createUUID()}>
          <PDFdocument
            {...this.props.globals.settings}
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
