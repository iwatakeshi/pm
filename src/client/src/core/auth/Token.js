export default class Token {
  constructor(token) {
    this.setToken(token);
  }

  getToken() {
    const value = localStorage.getItem('token');
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