import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = '/';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  console.log('the token object right now!', token)
  if (token) {
    req.set('authorization', `${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body, files) => {
    const fileUUIDs = Object.keys((files || {}))
    if (fileUUIDs.length > 0) {
      return superagent.post(`${API_ROOT}${url}`, body).attach("invoiceImages", files)
    }
    return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
  }
};

export default {
  Auth: {
    login: (email, password) =>
    requests.post('users/login', { email, password })
  },
  requests,
  setToken: _token => { token = _token; }
};
