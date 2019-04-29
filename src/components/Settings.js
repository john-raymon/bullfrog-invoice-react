import React, { Component, Fragment, CreateRef } from 'react'
import { connect } from 'react-redux'

// Selectors
import getSettings from '../state/selectors/getSettings'

// Utils
import compareKeys from '../util/compareWhitelistedKeys.js'
import agent from '../util/agent'

// Redux Actions
import { fetchSettings } from '../state/actions/applicationActions'



class Settings extends Component {

  constructor(props) {
    super(props)
    console.log('settings is', this.props.globals)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      companyName: '',
      companyPhoneNumber: '',
      companyEmail: '',
      companyAddress: '',
      companyCityState: '',
      companyZip: '',
      companyOpeningStatement: '',
      requestPending: false
    }
  }
  componentDidMount() {
    const {
      companyName,
      companyPhoneNumber,
      companyEmail,
      companyAddress,
      companyCityState,
      companyZip,
      companyOpeningStatement
    } = this.props.globals.settings
    this.setState({
      ...this.state,
      companyName,
      companyPhoneNumber,
      companyEmail,
      companyAddress,
      companyCityState,
      companyZip,
      companyOpeningStatement
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (compareKeys(prevProps.globals.settings, this.props.globals.settings, Object.keys(this.state))) {
      const {
        companyName,
        companyPhoneNumber,
        companyEmail,
        companyAddress,
        companyCityState,
        companyZip,
        companyOpeningStatement
      } = this.props.globals.settings
      this.setState({
        ...this.state,
        companyName,
        companyPhoneNumber,
        companyEmail,
        companyAddress,
        companyCityState,
        companyZip,
        companyOpeningStatement
      })
    }
  }

  handleChange(e){
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    this.setState({
      ...this.state,
      requestPending: true
    })
    const {
      companyName,
      companyPhoneNumber,
      companyEmail,
      companyAddress,
      companyCityState,
      companyZip,
      companyOpeningStatement
    } = this.state
    agent.setToken(this.props.token)
    agent.requests.post('settings/update', {
      companyName,
      companyPhoneNumber,
      companyEmail,
      companyAddress,
      companyCityState,
      companyZip,
      companyOpeningStatement
    })
    .then(() => {
      this.setState({
        ...this.state,
        requestPending: false
      })
      return this.props.fetchSettings()
    }).catch((err) => {
      this.setState({
        ...this.state,
        requestPending: false
      })
      console.log('There was an error caught in handleSubmit of Settings', { ...err })
    })
  }

  render() {

    return (
      <div className="flex flex-column measure-70 center pt5 mb5">

        <div className="flex flex-row w100">

          <div className="flex flex-column w-100 ph4 w-60-l pr5">

            <p className="dinTitle pa0 ma0 f2 mb1">
              Settings
            </p>
            <p className="dinLabel pa0 ma0 f5 mb3 mid-gray">
              The settings below will configure the company header rendered on the <span className="ttu">pdf</span>s
            </p>

            <input
              className="InputField"
              type="text"
              name="companyName"
              placeholder="Enter the company name here"
              value={this.state.companyName}
              onChange={this.handleChange}
            />
            <label htmlFor="companyName">
              <p className="dinLabel pa0 ma0 mb3 f6">
                Company Name
              </p>
            </label>

            <input
              className="InputField"
              type="text"
              name="companyPhoneNumber"
              placeholder="Enter the company's phone number"
              value={this.state.companyPhoneNumber}
              onChange={this.handleChange}
            />
            <label htmlFor="companyPhoneNumber">
              <p className="dinLabel pa0 ma0 mb3 f6">
                Company Phone Number
              </p>
            </label>

            <input
              className="InputField"
              type="text"
              name="companyEmail"
              placeholder="Enter the company's email"
              value={this.state.companyEmail}
              onChange={this.handleChange}
            />
            <label htmlFor="companyEmail">
              <p className="dinLabel pa0 ma0 mb3 f6">
              Company Email
              </p>
            </label>

            <input
              className="InputField"
              type="text"
              name="companyAddress"
              placeholder="Enter the company address"
              value={this.state.companyAddress}
              onChange={this.handleChange}
            />
            <label htmlFor="companyAddress">
              <p className="dinLabel pa0 ma0 mb3 f6">
                Company Address
              </p>
            </label>

            <input
              className="InputField"
              type="text"
              name="companyCityState"
              placeholder="City, State"
              value={this.state.companyCityState}
              onChange={this.handleChange}
            />
            <label htmlFor="companyCityState">
              <p className="dinLabel pa0 ma0 mb3 f6">
                City, State
              </p>
            </label>

            <input
              className="InputField"
              type="text"
              name="companyZip"
              placeholder="Zip Code"
              value={this.state.companyZip}
              onChange={this.handleChange}
            />
            <label htmlFor="companyZip">
              <p className="dinLabel pa0 ma0 mb3 f6">
                Zip Code
              </p>
            </label>

            <textarea
              className="InputField ph4 pt2"
              type="text"
              name="companyOpeningStatement"
              placeholder="Enter the opening statement"
              onChange={this.handleChange}
              defaultValue="Enter the opening statement"
              value={this.state.companyOpeningStatement}
            >
            </textarea>
            <label htmlFor="companyOpeningStatement">
              <p className="dinLabel pa0 ma0 mb3 f6">
                Opening Statement
              </p>
            </label>

            <div className="w-40">
              <button
                className="GenericButton tc dinLabel pv3 f7 mt3 ttu"
                disabled={
                  this.props.isLoading.globals.settings ||
                  this.props.isError.globals.settings ||
                  this.state.requestPending
                }
                onClick={this.handleSubmit}
              >
                save settings
              </button>
            </div>

          </div>

        </div>

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

export default connect(mapStateToProps, { fetchSettings })(Settings)
