import agent from '../../util/agent'

export const attemptLogin = (email, password) => dispatch => {
  return dispatch({
    type: "LOGIN",
    payload: agent.Auth.login(email, password)
  })
}
