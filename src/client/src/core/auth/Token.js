export default class Token {
  constructor(token) {
    this.setToken(token);
  }

  getToken() {
    const value = localStorage.getItem('token');
    console.log('get token: ', value)
    // localStorage.getItem will return null if it doesn't exist
    return value === null ? '' : value;
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('token', `Bearer ${token}`);
    }
  }

  clearToken() {
    localStorage.removeItem('token')
  }

  isEmpty() {
    return localStorage.getItem('token') === null;
  }
}