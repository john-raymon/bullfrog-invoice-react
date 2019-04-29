import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { attemptLogin } from '../state/actions/authActions'
import Arrow from '../images/arrow';
import logo from '../images/small_logo.png';

class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    const locationState = this.props.location.state
    if (this.props.isAuth) {
      if (locationState) {
        this.props.push(this.props.location.state.from);
      } else {
        this.props.push('/');
      }
    }
  }

  login () {
    this.props.attemptLogin(this.state.email, this.state.password).catch((error) => {
      if (error.response.statusCode === 401 || error.response.statusCode === 403) {
        alert('Your email or password is incorrect')
        console.log('this is the error ----->', error)
        return;
      }
      alert('there was an error')
      console.log('this is the error ----->', error)
    })
  }

  componentDidUpdate() {
    const locationState = this.props.location.state
    if (this.props.isAuth) {
      if (locationState) {
        this.props.push(this.props.location.state.from);
      } else {
        this.props.push('/');
      }
    }
  }

  render() {
    return(
      <div className="w-100 vh-100 flex flex-column ph2 justify-center flex-row-l items-center measure-1024 center">
        <div className="fl w-90 w-50-l flex flex-column items-center">
          <p className="self-start dinTitle">
            Welcome back,
            <br />
            Sign in.
            <span className="db mt3">
              <img src={logo} width="25%" height="auto" alt="" />
            </span>
          </p>
        </div>
        <div className="fl w-90 w-50-l flex flex-column items-center">
          <div className="self-start w-100 measure ph3">
            <input className="InputField" type="email" name="email" value={this.state.email} placeholder="Knack Email" onChange={this.handleChange}/>
            <input className="InputField" type="password" name="password" value={this.state.password} placeholder="Knack Password" onChange={this.handleChange}/>
            <button
              className="flex flex-row items-center dinLabel f7 blue self-start pointer bn bg-transparent mt3"
              onClick={this.login}
              disabled={this.props.loading}>
              SIGN IN <div className="ArrowIcon mh2"><Arrow /></div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({isAuth: state.auth.isAuth, loading: state.status.authLoading}), { push,
  test: () => ({type: "CHANGE"}),
  attemptLogin
 })(Login);
