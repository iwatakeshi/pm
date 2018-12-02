import Token from './Token';
import axios from 'axios';

export default class Authenticator {
  constructor(token) {
    this._token = new Token(token);
  }

  authenticate(token) {
    if (typeof token === 'string') {
      this._token.setToken(token)
      axios.defaults.headers.common['Authorization'] = this._token.getToken();
      return true;
    }


    axios.defaults.headers.common['Authorization'] = this._token.getToken();
    if (this._token.isEmpty()) {
      this.deauthenticate();
    }

    return this._token.isEmpty();
  }

  deauthenticate() {
    this._token.clearToken();
    delete axios.defaults.headers.common['Authorization'];
  }

  isAuthenticated() {
    return !this._token.isEmpty();
  }
}