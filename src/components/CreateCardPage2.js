// import React, { useState } from 'react'
// import styled from 'styled-components/macro'
// import axios from 'axios'
// import PropTypes from 'prop-types'
// import { Redirect } from 'react-router-dom'
// import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd'
// import Page from '../common/Page'

// const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
// const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

// CreateCardPage.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired
// }

// export default function CreateCardPage({ title, onSubmit }) {

//   const [isCreated, setIsCreated] = useState(false)

//   function handleSubmit(event) {
//     event.preventDefault()
//     const form = event.target
//     const formData = new FormData(form)
//     const data = Object.fromEntries(formData)
//       data.tags = {
//         type: data.type,
//         size: data.size,
//         availability: data.availability
//       }
//       if (data.picture === '') {
//         onSubmit(data)
//         form.reset()
//         form.title.focus()
//         setIsCreated(true)
//       } else {
//         upload(formData.get('picture'))
//       .then(response => {
//         data.picture = response.data.url
//           onSubmit(data)
//           form.reset()
//           form.title.focus()
//           setIsCreated(true)
//       })
//       .catch(err => {
//         console.error(err)
//       })
//     }
//   }

//   function upload(file) {
//     const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

//     const formData = new FormData()

//     formData.append('file', file)
//     formData.append('upload_preset', PRESET)

//     return axios.post(url, formData, {
//       headers: {
//         'Content-type': 'multipart/form-data'
//       }
//     })
//   }

//   return (
//     isCreated ? <Redirect exact to="/"/> : 
//     <Page title={title}>
//       <FormStyled onSubmit={handleSubmit}>
//         <LabelStyled>
//           Title
//           <input name="title" />
//         </LabelStyled>
//         <LabelStyled>
//           Description
//           <textarea name="description" rows="4" cols="30" />
//         </LabelStyled>
//         <LabelStyled>
//           <section>
//           Picture<ImageAddStyled/>
//           </section>
//           <input name="picture" type="file" />
//         </LabelStyled>
//         <LabelStyled>
//           Email
//           <input name="email" type="email" />
//         </LabelStyled>
//         <TagsWrapper>
//           <LabelStyled>
//             Type
//             <SelectStyled name="type">
//               <OptionStyled value="Dog">Dog</OptionStyled>
//               <OptionStyled value="Cat">Cat</OptionStyled>
//               <OptionStyled value="Rabbit">Rabbit</OptionStyled>
//             </SelectStyled>
//           </LabelStyled>
//           <LabelStyled>
//             Size
//             <select name="size">
//               <option value="Small">Small</option>
//               <option value="Medium">Medium</option>
//               <option value="Large">Large</option>
//             </select>
//           </LabelStyled>
//           <LabelStyled>
//             Availability
//             <SelectStyled name="availability">
//               <option value="Flexible">Flexible</option>
//               <option value="Weekends">Weekends</option>
//               <option value="FixedDates">Fixed Dates</option>
//             </SelectStyled>
//           </LabelStyled>
//         </TagsWrapper>
//         <ButtonStyled>Create card</ButtonStyled>
//       </FormStyled>
//     </Page>
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
// import React, { useState } from 'react'
// import styled from 'styled-components/macro'
// import axios from 'axios'
// import PropTypes from 'prop-types'
// import { Redirect } from 'react-router-dom'
// import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd'
// import Page from '../common/Page'

// const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
// const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

// CreateCardPage.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired
// }

// export default function CreateCardPage({ title, onSubmit }) {

//   const [isCreated, setIsCreated] = useState(false)

//   function handleSubmit(event) {
//     event.preventDefault()
//     const form = event.target
//     const formData = new FormData(form)
//     const data = Object.fromEntries(formData)
//       data.tags = {
//         type: data.type,
//         size: data.size,
//         availability: data.availability
//       }
//       if (data.picture === '') {
//         onSubmit(data)
//         form.reset()
//         form.title.focus()
//         setIsCreated(true)
//       } else {
//         upload(formData.get('picture'))
//       .then(response => {
//         data.picture = response.data.url
//           onSubmit(data)
//           form.reset()
//           form.title.focus()
//           setIsCreated(true)
//       })
//       .catch(err => {
//         console.error(err)
//       })
//     }
//   }

//   function upload(file) {
//     const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

//     const formData = new FormData()

//     formData.append('file', file)
//     formData.append('upload_preset', PRESET)

//     return axios.post(url, formData, {
//       headers: {
//         'Content-type': 'multipart/form-data'
//       }
//     })
//   }

//   return (
//     isCreated ? <Redirect exact to="/"/> : 
//     <Page title={title}>
//       <FormStyled onSubmit={handleSubmit}>
//         <LabelStyled>
//           Title
//           <input name="title" />
//         </LabelStyled>
//         <LabelStyled>
//           Description
//           <textarea name="description" rows="4" cols="30" />
//         </LabelStyled>
//         <LabelStyled>
//           <section>
//           Picture<ImageAddStyled/>
//           </section>
//           <input name="picture" type="file" />
//         </LabelStyled>
//         <LabelStyled>
//           Email
//           <input name="email" type="email" />
//         </LabelStyled>
//         <TagsWrapper>
//           <LabelStyled>
//             Type
//             <SelectStyled name="type">
//               <OptionStyled value="Dog">Dog</OptionStyled>
//               <OptionStyled value="Cat">Cat</OptionStyled>
//               <OptionStyled value="Rabbit">Rabbit</OptionStyled>
//             </SelectStyled>
//           </LabelStyled>
//           <LabelStyled>
//             Size
//             <select name="size">
//               <option value="Small">Small</option>
//               <option value="Medium">Medium</option>
//               <option value="Large">Large</option>
//             </select>
//           </LabelStyled>
//           <LabelStyled>
//             Availability
//             <SelectStyled name="availability">
//               <option value="Flexible">Flexible</option>
//               <option value="Weekends">Weekends</option>
//               <option value="FixedDates">Fixed Dates</option>
//             </SelectStyled>
//           </LabelStyled>
//         </TagsWrapper>
//         <ButtonStyled>Create card</ButtonStyled>
//       </FormStyled>
//     </Page>
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
