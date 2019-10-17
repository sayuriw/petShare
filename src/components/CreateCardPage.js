import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Img from '../components/cards/Img'
import PropTypes from 'prop-types'
import Page from '../common/Page'
import { Redirect } from 'react-router-dom'
import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd'
import logo from '../data/petshare.png'
import axios from 'axios'
import petIcon from '../data/paw-solid.svg'

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET



export default function CreateCardPage({editCardData, onSubmit}) {

  const [title, setTitle] = useState(editCardData.title ? editCardData.title : '' )
  const [description, setDescription] = useState(editCardData.description ? editCardData.description : '')
  const [email, setEmail] = useState(editCardData.email ? editCardData.email : '')
  const [tags, setTags] = useState(editCardData.tags ? editCardData.tags : '')
  const [picture, setPicture] = useState(editCardData.picture ? editCardData.picture : '')
  const [isCreated, setIsCreated] = useState(false)
  
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
        data.tags = {
          type: data.type,
          size: data.size,
          availability: data.availability
        }
    data.picture = picture
    const newEditCardData = {
      ...editCardData,
          title, description, email, tags, picture
    }
      
  //   if (data.picture === '' && editCardData.id) {
  //   onSubmit(editCardData.id, newEditCardData)
  //   setIsCreated(true)
  // } else {
  //   upload(formData.get('picture'))
  // .then(response => {
  //   newEditCardData.picture = response.data.url
  //   onSubmit(editCardData.id, newEditCardData)
  
    if (editCardData.id) {
      onSubmit(editCardData.id, newEditCardData)
      setIsCreated(true)
    } else {
      onSubmit(data)
      setIsCreated(true)
 }
}
function upload(event) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

  const formData = new FormData()


  formData.append('file', event.target.files[0])
  formData.append('upload_preset', PRESET)

  axios.post(url, formData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
  .then(response => {
    setPicture(response.data.url)
  })
  .catch(err => {
    console.error(err)
  })
}

  return (
    isCreated ? <Redirect exact to="/" /> :
    <Page title={logo}>
      <Img src={picture ? picture : petIcon }/>
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
            <input name="picture" type="file" onChange={upload} />
          </LabelStyled>
          <LabelStyled>
            Email
            <input name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
          </LabelStyled>
          <TagsWrapper>
          <LabelStyled>
            Type
            <SelectStyled name="type" onChange={event => setTags({...tags, type: event.target.value})}>
              <OptionStyled value="Dog"selected={"Dog" === tags.type}>Dog</OptionStyled>
              <OptionStyled value="Cat"selected={"Cat" === tags.type}>Cat</OptionStyled>
              <OptionStyled value="Rabbit"selected={"Rabbit" === tags.type}>Rabbit</OptionStyled>
            </SelectStyled>
          </LabelStyled>
          <LabelStyled>
            Size
            <select name="size" onChange={event => setTags({...tags, size: event.target.value})}>
              <option value="Small" selected={"Small" === tags.size}>Small</option>
              <option value="Medium" selected={"Medium" === tags.size}>Medium</option>
              <option value="Large" selected={"Large" === tags.size}>Large</option>
            </select>
          </LabelStyled>
          <LabelStyled>
            Availability
            <SelectStyled name="availability" onChange={event => setTags({...tags, availability: event.target.value})}>
              <option value="Flexible" selected={"Flexible" === tags.availability}>Flexible</option>
              <option value="Weekends" selected={"Weekends" === tags.availability}>Weekends</option>
              <option value="FixedDates" selected={"FixedDates" === tags.availability}>Fixed Dates</option>
            </SelectStyled>
          </LabelStyled>
        </TagsWrapper>
          <ButtonStyled>send</ButtonStyled>
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
const TagsWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`
const SelectStyled = styled.select`
  display: grid;
`
const OptionStyled = styled.option`
  display: grid;
`
// import React, { useState } from 'react'
// import styled from 'styled-components/macro'
// import Img from '../components/cards/Img'
// import Page from '../common/Page'
// import { Redirect } from 'react-router-dom'
// import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd'
// import logo from '../data/petshare.png'
// import axios from 'axios'

// const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
// const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

// export default function EditCardPage({editCardData, onSubmit}) {

//   const [title, setTitle] = useState(editCardData.title)
//   const [description, setDescription] = useState(editCardData.description)
//   const [email, setEmail] = useState(editCardData.email)
//   const [tags, setTags] = useState(editCardData.tags)
//   const [isCreated, setIsCreated] = useState(false)
  
//   function handleSubmit(event) {
//     event.preventDefault()
//     const form = event.target
//     const formData = new FormData(form)
//     const data = Object.fromEntries(formData)
//     const newEditCardData = {
//       ...editCardData,
//           title, description, email, tags
//     }
      
//     if (data.picture === '') {
//     onSubmit(editCardData.id, newEditCardData)
//     setIsCreated(true)
//   } else {
//     upload(formData.get('picture'))
//   .then(response => {
//     newEditCardData.picture = response.data.url
//     onSubmit(editCardData.id, newEditCardData)
//     setIsCreated(true)
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

//   return (
//     isCreated ? <Redirect exact to="/" /> :
//     <Page title={logo}>
//       <Img src={editCardData.picture}/>
//       <FormStyled onSubmit={handleSubmit}>
//           <LabelStyled>
//             Title
//             <input name="title" value={title} onChange={event => setTitle(event.target.value)} autoFocus />
//           </LabelStyled>
//           <LabelStyled>
//             Description
//             <textarea name="description" value={description} onChange={event => setDescription(event.target.value)}rows="4" cols="30" />
//           </LabelStyled>
//           <LabelStyled>
//             <section>
//             Picture<ImageAddStyled/>
//             </section>
//             <input name="picture" type="file" />
//           </LabelStyled>
//           <LabelStyled>
//             Email
//             <input name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
//           </LabelStyled>
//           <TagsWrapper>
//           <LabelStyled>
//             Type
//             <SelectStyled name="type" onChange={event => setTags({...tags, type: event.target.value})}>
//               <OptionStyled value="Dog"selected={"Dog" === tags.type}>Dog</OptionStyled>
//               <OptionStyled value="Cat"selected={"Cat" === tags.type}>Cat</OptionStyled>
//               <OptionStyled value="Rabbit"selected={"Rabbit" === tags.type}>Rabbit</OptionStyled>
//             </SelectStyled>
//           </LabelStyled>
//           <LabelStyled>
//             Size
//             <select name="size" onChange={event => setTags({...tags, size: event.target.value})}>
//               <option value="Small" selected={"Small" === tags.size}>Small</option>
//               <option value="Medium" selected={"Medium" === tags.size}>Medium</option>
//               <option value="Large" selected={"Large" === tags.size}>Large</option>
//             </select>
//           </LabelStyled>
//           <LabelStyled>
//             Availability
//             <SelectStyled name="availability" onChange={event => setTags({...tags, availability: event.target.value})}>
//               <option value="Flexible" selected={"Flexible" === tags.availability}>Flexible</option>
//               <option value="Weekends" selected={"Weekends" === tags.availability}>Weekends</option>
//               <option value="FixedDates" selected={"FixedDates" === tags.availability}>Fixed Dates</option>
//             </SelectStyled>
//           </LabelStyled>
//         </TagsWrapper>
//           <ButtonStyled>Edit card</ButtonStyled>
//         </FormStyled>
//       </Page>
//   )
// }

// const FormStyled = styled.form`
//   display: grid;
//   gap: 25px;
//   padding: 20px;
// `
// const LabelStyled = styled.label`
//   display: grid;
//   gap: 10px;
// `
// const ButtonStyled = styled.button`
//   padding: 10px;
//   margin: 20px;
//   font-size: 18px;
//   border-radius: 3px;
//   color: white;
//   background-color: #6f6f6f;
// `
// const ImageAddStyled = styled(ImageAdd)`
//   height:25px;
//   width: 25px;
//   margin-left: 5px;
// `
// const TagsWrapper = styled.section`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   margin-top: 10px;
// `
// const SelectStyled = styled.select`
//   display: grid;
// `
// const OptionStyled = styled.option`
//   display: grid;
// `
