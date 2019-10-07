export function getCards() {
  return fetchCards()
}

export function postCard(data) {
  return fetchCards({ method: 'POST', data })
}

export function patchCard(id, data) {
  return fetchCards({ method: 'PATCH', id, data })
}

export function deleteCard(id) {
  return fetchCards({ method: 'DELETE', id })
}

function fetchCards({ method = 'GET', id = '', data } = {}) {
  return fetch('/cards/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}