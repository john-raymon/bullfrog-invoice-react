import React, { Component } from 'react'
import { connect } from 'react-redux'

// Selectors
import getInvoicesToDo from '../state/selectors/getInvoicesToDo'

// Views
import ListButton from '../views/ListButton'

// Images
import searchIcon from '../images/search-icon.png';

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props, state } = this
    const invoicesToDo = () => {
      if (props.isLoading.invoicesToDo) {
        return (<p>Loading ... </p>)
      }
      if (props.isError.invoicesToDo) {
        return (<p>There seems to be an error</p>)
      }
      console.log('these are the invoices to do', props.invoicesToDo)
      return props.invoicesToDo.map((invoice, index) => {
        return (
          <li>
            <div className="flex flex-row items-center bb b--light-gray pv1">
              <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                { invoice.date }
              </p>
              <p className="dinLabel near-black f7 ma0 w-50 tracked-mega small-caps">
                { invoice.customer.name || 'No Name' }
              </p>
              <ListButton>
                CREATE INVOICE
              </ListButton >
            </div>
          </li>
        )
      })
    }
    return(
      <div className="flex flex-column w-100 measure-70 center pt5 ph4 mb4">
        <div className="flex flex-row w-100 items-start">
          <div className="w-50">
            <p className="dinTitle tl mid-gray pa0 ma0">
              Hello,
              <br/>
              get started now and
              <br/>
              <span className="blue lh-title b--blue bb bw2 pointer dim">create an invoice.</span>
            </p>
          </div>

          <div className="w-50 ba b--light-gray bw1 h5 br3 ph4 pt1 shadow-custom">
            <p className="dinLabel tr mid-gray mb0">
              Invoices To Do ({`0`})
            </p>
            <div className="w-100">
              <div className="flex flex-row items-center bb b--light-gray bw1 pb1">
                <p className="dinLabel mid-gray f7 ma0 w-25 tracked-mega">
                  DATE
                </p>
                <p className="dinLabel mid-gray f7 ma0 w-50 tracked-mega">
                  CUSTOMER
                </p>
              </div>
              <ul className="list ma0 pa0 overflow-scroll h4">
                { invoicesToDo() }
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-100 items-start pt4">
         <div className="w-50 pr4">
            <div className="w-100 ba b--light-gray bw1 h6 br3 ph4 pt1 shadow-custom">
              <p className="dinLabel tl mid-gray mb0">
                Previous Estimates ({`0`})
              </p>
              <div className="w-100 mt2">
                <ul className="list ma0 pa0 overflow-scroll h4">
                  <li>
                    <div className="flex flex-row items-center bb b--light-gray pv1">
                      <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                        03/16/19
                      </p>
                      <p className="dinLabel near-black f7 ma0 w-50 tracked-mega small-caps">
                        Alexson Wilson
                      </p>
                      <ListButton>
                        CREATE INVOICE
                      </ListButton >
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-50">
            <div className="w-100 ba b--light-gray bw1 h6 br3 ph4 pt1 shadow-custom">
              <div className="flex flex-row items-center bt- bl-0 br-0 bb b--light-gray mt3 mb2 w-70 pv1">
                <span>
                  <img src={searchIcon} width="16" height="auto" />
                </span>
                <input className="dinLabel pa0 ml2 tl mid-gray input-reset bn outline-0 flex-grow-1" type="text" placeholder="Find a Customer" />
              </div>
              <ul className="list ma0 pa0 overflow-scroll h4">
                <li>
                  <div className="flex flex-row justify-between items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega small-caps">
                      Alexson Wilson
                    </p>
                    <ListButton>
                      CREATE INVOICE
                    </ListButton >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { status, errors} = state
  const { dashboard: dashboardStatus } = status
  const { dashboard: dashboardErrors } = errors
  return {
    isLoading: {
      invoicesToDo: dashboardStatus.invoicesToDo
    },
    isError: {
      invoicesToDo: dashboardErrors.invoicesToDo
    },
    invoicesToDo: !(dashboardErrors.invoicesToDo && dashboardStatus.invoicesToDo) ? getInvoicesToDo(state) : []
  }
}

export default connect(mapStateToProps, null)(Dashboard)
