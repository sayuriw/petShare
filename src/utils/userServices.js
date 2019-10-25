//REGISTER SERVICES

export function postUser(data) {
  return fetchLoginUsers({ method: 'POST', data })
}

export function patchRegisterUser(id, data) {
  return fetchLoginUsers({ method: 'PATCH', id, data })
}

export function deleteUser(id) {
  return fetchLoginUsers({ method: 'DELETE', id })
}

function fetchLoginUsers({ method = 'GET', id = '', data } = {}) {
  return fetch('/users/signup/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}
//LOGIN SERVICES
export function fetchUserLogin(data) {
  return fetch('/Users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

//VERIFY USER
export function verifyUser(data) {
  return fetch('/users/verify?token=' + data).then(res => res.json())
}

//LOGOUT
export function logoutUser(data) {
  return fetch('users/logout?token=' + data).then(res => res.json())
}

//LOCAL STORAGE
export function getFromStorage(key) {
  if (!key) {
    return null
  }
  try {
    const valueStr = localStorage.getItem(key)
    if (valueStr) {
      return JSON.parse(valueStr)
    }
    return null
  } catch (err) {
    return null
  }
}

export function setToStorage(key, obj) {
  if (!key) {
    console.error('Error: key is missing')
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj))
  } catch (err) {
    console.error(err)
  }
}

// EDIT USER (HANDLE BOOKMARKS)

export function updateUser(id, data) {
  return fetch('users/' + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

export function getCurrentUser(id, data) {
  return fetch('users/' + id, {
    method: 'GET',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}
