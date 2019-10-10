import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Img from '../components/cards/Img'
import Page from '../common/Page'
import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd'
import logo from '../data/petshare.png'
// import axios from 'axios'

// const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
// const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function EditCardPage({editCardData, onSubmit}) {

  const [title, setTitle] = useState(editCardData.title)
  const [description, setDescription] = useState(editCardData.description)
  const [email, setEmail] = useState(editCardData.email)

  function handleSubmit(event) {
    event.preventDefault()
    console.log(editCardData)
    const newEditCardData = {
      ...editCardData,
          title, description, email
    }
    console.log(editCardData)
    onSubmit(editCardData._id, newEditCardData)
  }
  
//   function handleSubmit(event) {
//     event.preventDefault()
//     const form = event.target
//     const formData = new FormData(form)
//     const data = Object.fromEntries(formData)
//     const newEditCardData = {
//       ...editCardData,
//           title, description, email
//     }
      
//     if (data.picture === '') {
//     onSubmit(editCardData.id, newEditCardData)
//   } else {
//     upload(formData.get('picture'))
//   .then(response => {
//     newEditCardData.picture = response.data.url
//     onSubmit(editCardData.id, newEditCardData)
//   })
//   .catch(err => {
//     console.error(err)
//   })
//  }
// }
// function upload(file) {
//   const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

//   const formData = new FormData()

//   formData.append('file', file)
//   formData.append('upload_preset', PRESET)

//   return axios.post(url, formData, {
//     headers: {
//       'Content-type': 'multipart/form-data'
//     }
//   })
// }

  return (
    <Page title={logo}>
      <Img src={editCardData.picture}/>
      <FormStyled onSubmit={handleSubmit}>
          <LabelStyled>
            Title
            <input name="title" value={title} onChange={event => setTitle(event.target.value)} autoFocus />
          </LabelStyled>
          <LabelStyled>
            Description
            <textarea name="description" value={description} onChange={event => setDescription(event.target.value)}rows="4" cols="30" />
          </LabelStyled>
          <LabelStyled>
            <section>
            Picture<ImageAddStyled/>
            </section>
            <input name="picture" type="file" />
          </LabelStyled>
          <LabelStyled>
            Email
            <input name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
          </LabelStyled>
          <ButtonStyled>Edit card</ButtonStyled>
        </FormStyled>
      </Page>
  )
}

const FormStyled = styled.form`
  display: grid;
  gap: 25px;
  padding: 20px;
`
const LabelStyled = styled.label`
  display: grid;
  gap: 10px;
`
const ButtonStyled = styled.button`
  padding: 10px;
  margin: 20px;
  font-size: 18px;
  border-radius: 3px;
  color: white;
  background-color: #6f6f6f;
`
const ImageAddStyled = styled(ImageAdd)`
  height:25px;
  width: 25px;
  margin-left: 5px;
`