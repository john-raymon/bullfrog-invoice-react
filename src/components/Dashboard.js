import React, { Component } from 'react'
import { connect } from 'react-redux'
import createUUID from '../util/createUUID'
import { NavLink } from 'react-router-dom'

// Selectors
import getAllInvoices from '../state/selectors/getAllInvoices'
import getInvoicesToDo from '../state/selectors/getInvoicesToDo'
import getCustomerSearchResults from '../state/selectors/getCustomerSearchResults'

// Views
import ListButton from '../views/ListButton'

// Images
import searchIcon from '../images/search-icon.png';

// Dashboard Actions
import { fetchKnackCustomers, fetchInvoicesToDo, fetchAllInvoices } from '../state/actions/dashboardActions'

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 0,
    overflowX: 'auto',
    overflowY: 'auto',
    height: "12rem"
  },
  header: {
    position: "sticky",
    top: 0
  },
  table: {
    minWidth: "100%"
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.state = {
      searchQuery: ''
    }
  }

  componentDidMount(){
    this.props.fetchAllInvoices()
  }

  handleSearchChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
    this.props.fetchKnackCustomers(this.state.searchQuery)
  }

  render() {
    const { props } = this
    const { classes } = props
    const invoicesToDo = () => {
      if (props.isLoading.invoicesToDo) {
        return (<p>Loading ... </p>)
      }
      if (props.isError.invoicesToDo) {
        return (<p>There seems to be an error</p>)
      }
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.invoicesToDo.map((invoice, key) => (
                  <TableRow key={key}>
                    <TableCell align="left">{invoice.date}</TableCell>
                    <TableCell align="left">{ invoice.customer.name || 'No Name' }</TableCell>
                    <TableCell align="left">
                      <NavLink to={`/invoices/new/${createUUID()}?customer_id=${invoice.customer.id}`}>
                        <ListButton>
                          create invoice
                        </ListButton>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      )
    }
    const customerSearchResults = () => {
      if (props.isLoading.customers) {
        return (<p>Loading</p>)
      }
      if (props.isError.customers) {
        return (<p>There seems to be an error</p>)
      }
      if (!props.customers.length && this.state.searchQuery.trim()) {
        return (
          <p>We could find any customers on Knack relating to your search.</p>
        )
      }
      return props.customers.map((customer, index) => {
        return (
          <li key={index}>
            <div className="flex flex-row justify-between items-center bb b--light-gray pv1">
              <p className="dinLabel near-black f7 ma0 w-50 tracked-mega small-caps">
                {customer.customerName}
              </p>
              <NavLink to={`/invoices/new/${createUUID()}?customer_id=${customer.id}`}>
                <ListButton>
                  create invoice
                </ListButton>
              </NavLink>
            </div>
          </li>
        )
      })
    }

    const allInvoices = () => {
      if (props.isLoading.allInvoices) {
        return (<p>Loading</p>)
      }
      if (props.isError.allInvoices) {
        return (<p>There seems to be an error</p>)
      }
      if (!props.allInvoices.length) {
        return (
          <p>There are no invoices.</p>
        )
      }
      return (
        <Paper className={classes.root} style={{ height: "20rem" }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Invoice Name</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.allInvoices.map((invoice, key) => (
                  <TableRow key={key}>
                    <TableCell align="left">{invoice.invoiceName}</TableCell>
                    <TableCell align="left">
                      <NavLink to={`/invoices/${(invoice.isDraft ? 'new' : 'pdf')}/${invoice.invoiceUUID}`}>
                        <ListButton>
                          { invoice.isDraft ? 'cont. draft' : 'view pdf' }
                        </ListButton>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      )
    }

    return(
      <div className="flex flex-column w-100 measure-80 center pt5-l ph3 mb4">
        <div className="flex flex-column flex-row-l w-100 items-start">
          <div className="w-100 w-50-l">
            <p className="dinTitle tl mid-gray pa0 mb4 ma0-l">
              Hello,
              <br/>
              get started now and
              <br/>
              <NavLink to={`/invoices/new/${createUUID()}`}>
                <span className="blue lh-title b--blue bb bw2 pointer dim">create an invoice.</span>
              </NavLink>
            </p>
          </div>

          <div className="w-100 w-50-l ba b--light-gray bw1 h-auto br3 pt1 shadow-custom overflow-hidden">
            <p className="dinLabel tr mid-gray mb0 ph3">
              Invoices To Do ({props.invoicesToDo.length ||`0`})
            </p>
            <div className="w-100 flex-grow-1 mt2">
              { invoicesToDo() }
            </div>
          </div>
        </div>
        <div className="flex flex-column flex-row-l w-100 items-start pt4">
          <div className="w-100 pr0 w-50-l pb4 pb0-l pr4-l">
            <div className="w-100 ba b--light-gray bw1 br3 pt1 shadow-custom overflow-hidden">
              <p className="dinLabel tl mid-gray mb0 ph4">
                Previous Invoices ({props.allInvoices.length || '0'})
              </p>
              <div className="w-100 flex-grow-1 mt2">
                { allInvoices() }
              </div>
            </div>
          </div>
          <div className="w-100 w-50-l">
            <div className="w-100 ba b--light-gray bw1 h6 br3 ph4 pt1 shadow-custom">
              <div className="flex flex-row items-center bt- bl-0 br-0 bb b--light-gray mt3 mb2 w-70 pv1">
                <span>
                  <img src={searchIcon} width="16" height="auto" />
                </span>
                <input
                  onChange={this.handleSearchChange}
                  className="dinLabel pa0 ml2 tl mid-gray input-reset bn outline-0 flex-grow-1"
                  type="text"
                  name="searchQuery"
                  placeholder="Find a Customer"
                  value={this.state.searchQuery}
                  />
              </div>
              <ul className="list mt2 mb0 mh0 pa0 overflow-scroll h5">
                {customerSearchResults()}
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
      invoicesToDo: dashboardStatus.invoicesToDo,
      customers: dashboardStatus.customers,
      allInvoices: dashboardStatus.allInvoices
    },
    isError: {
      invoicesToDo: dashboardErrors.invoicesToDo,
      customers: dashboardErrors.customers,
      allInvoices: dashboardErrors.allInvoices
    },
    invoicesToDo: !(dashboardErrors.invoicesToDo && dashboardStatus.invoicesToDo) ? getInvoicesToDo(state) : [],
    customers: !(dashboardErrors.customers && dashboardStatus.customers) ? getCustomerSearchResults(state) : [],
    allInvoices: !(dashboardErrors.allInvoices && dashboardStatus.allInvoices) ? getAllInvoices(state) : []
  }
}

export default connect(mapStateToProps, { fetchKnackCustomers, fetchInvoicesToDo, fetchAllInvoices })(withStyles(styles)(Dashboard))
