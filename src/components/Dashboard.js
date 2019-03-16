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
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center bb b--light-gray pv1">
                    <p className="dinLabel near-black f7 ma0 w-25 tracked-mega">
                      03/16/19
                    </p>
                    <p className="dinLabel near-black f7 ma0 w-50 tracked-mega">
                      Alexson Wilson
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-100 items-start pt4">
         <div className="w-50 pr4">
            <div className="w-100 ba b--light-gray bw1 h5 br3 ph4 pt1 shadow-custom">
              <p className="dinLabel tl mid-gray">
                Previous Estimates ({`0`})
              </p>
            </div>
          </div>
          <div className="w-50">
            <div className="w-100 ba b--light-gray bw1 h5 br3 ph4 pt1 shadow-custom">
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
