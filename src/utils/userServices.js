//REGISTER SERVICES
export function getUser(id, data) {
  return fetchUsers({method: 'GET', id, data})
}

export function postUser(data) {
  return fetchUsers({ method: 'POST', data })
}

export function patchUser(id, data) {
  return fetchUsers({ method: 'PATCH', id, data })
}

export function deleteUser(id) {
  return fetchUsers({ method: 'DELETE', id })
}

function fetchUsers({ method = 'GET', id = '', data } = {}) {
  return fetch('/users/signup' + id, {
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
