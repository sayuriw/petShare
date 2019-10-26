import axios from 'axios'

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
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

//upload pictures

export function uploadPicture(event) {
  const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
  const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

  const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

  const formData = new FormData()

  formData.append('file', event.target.files[0])
  formData.append('upload_preset', PRESET)

  return axios.post(url, formData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}
