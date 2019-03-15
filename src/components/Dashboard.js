import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="flex flex-column w-100 measure-70 center pt5 ph4">
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

          <div className="w-50 ba b--light-gray bw1 h5 br3 ph4 pt1">
            <p className="dinLabel tr mid-gray">
              Invoices To Do ({`0`})
            </p>
          </div>
        </div>
        <div className="flex flex-row w-100 items-start pt4">
         <div className="w-50 pr4">
            <div className="w-100 ba b--light-gray bw1 h5 br3 ph4 pt1">
              <p className="dinLabel tl mid-gray">
                Previous Estimates ({`0`})
              </p>
            </div>
          </div>
          <div className="w-50">
            <div className="w-100 ba b--light-gray bw1 h5 br3 ph4 pt1">
              <p className="dinLabel tl underline mid-gray">
                Find a Customer
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Dashboard;
