function setToken(token) {
  localStorage.setItem('token', token)
}

function getUserFromToken() {
  const token = getToken()
  // Your editor may throw an error on atob in this line, ignore it.
	return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

function getToken() {
  let token = localStorage.getItem('token')
  if (token) {
    // Check if expired, remove if it is
    // Your editor may throw an error on atob in this line, ignore it.
    const payload = JSON.parse(atob(token.split('.')[1]))
    // JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      token = null
    }
  }
  return token
}

export {
  setToken,
  getToken,
  getUserFromToken
}