import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Img from '../components/cards/Img'
import Page from '../common/Page'
import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd'
import logo from '../data/petshare.png'



export default function EditCardPage({editCardData, onSubmit}) {

  const [petDataTitle, setPetDataTitle] = useState(editCardData.title)
  const [petDataDescription, setPetDataDescription] = useState(editCardData.description)
  const [petDataEmail, setPetDataEmail] = useState(editCardData.email)
  function handleSubmit(event) {
    event.preventDefault()
    
  }

  return (
    <Page title={logo}>
      <Img src={editCardData.picture}/>
      <FormStyled onSubmit={handleSubmit}>
          <LabelStyled>
            Title
            <input name="title" value={petDataTitle} onChange={event => setPetDataTitle(event.target.value)} autoFocus />
          </LabelStyled>
          <LabelStyled>
            Description
            <textarea name="description" value={petDataDescription} onChange={event => setPetDataDescription(event.target.value)}rows="4" cols="30" />
          </LabelStyled>
          <LabelStyled>
            <section>
            Picture<ImageAddStyled/>
            </section>
            <input name="picture" type="file" />
          </LabelStyled>
          <LabelStyled>
            Email
            <input name="email" type="email" value={petDataEmail} onChange={event => setPetDataEmail(event.target.value)} />
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