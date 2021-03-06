import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components/macro'
import { ImageAdd } from 'styled-icons/boxicons-regular/ImageAdd'
import Page from '../common/Page'
import createCard from '../images/CreateCard.png'
import petIcon from '../images/paw-solid.svg'
import { uploadPicture } from '../utils/cardServices'

CreateCardPage.propTypes = {
  editcardData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default function CreateCardPage({ editCardData, onSubmit }) {
  const [title, setTitle] = useState(editCardData.title || '')
  const [description, setDescription] = useState(editCardData.description || '')
  const [email, setEmail] = useState(editCardData.email || '')
  const [tags, setTags] = useState(editCardData.tags || '')
  const [picture, setPicture] = useState(editCardData.picture || '')
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
      title,
      description,
      email,
      tags,
      picture
    }

    editCardData.id ? onSubmit(editCardData.id, newEditCardData): onSubmit(data)
    
    setIsCreated(true)
  }

  function upload(event) {
    uploadPicture(event)
      .then(response => {
        setPicture(response.data.url)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return isCreated ? (
    <Redirect exact to="/" />
  ) : (
    <Page title={createCard} showFilter={false}>
      <Wrapper>
        <ImgStyled src={picture ? picture : petIcon} />
        <FormStyled onSubmit={handleSubmit}>
          <LabelStyled>
            Title
            <InputStyled
              name="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </LabelStyled>
          <LabelStyled>
            Description
            <TextAreaStyled
              name="description"
              value={description}
              onChange={event => setDescription(event.target.value)}
              rows="4"
              cols="30"
            />
          </LabelStyled>
          <LabelStyled>
            <section>
              Picture
              <ImageAddStyled />
            </section>
            <InputStyled name="picture" type="file" onChange={upload} />
          </LabelStyled>
          <LabelStyled>
            Email
            <InputStyled
              name="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </LabelStyled>
          <TagsWrapper>
            <LabelStyled>
              Type
              <SelectStyled
                name="type"
                defaultValue={tags.type}
                onChange={event =>
                  setTags({ ...tags, type: event.target.value })
                }>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
              </SelectStyled>
            </LabelStyled>
            <LabelStyled>
              Size
              <SelectStyled
                name="size"
                defaultValue={tags.size}
                onChange={event =>
                  setTags({ ...tags, size: event.target.value })
                }>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </SelectStyled>
            </LabelStyled>
            <LabelStyled>
              Availability
              <SelectStyled
                name="availability"
                defaultValue={tags.availavility}
                onChange={event =>
                  setTags({ ...tags, availability: event.target.value })
                }>
                <option value="Flexible">Flexible</option>
                <option value="Weekends">Weekends</option>
                <option value="FixedDates">Fixed Dates</option>
              </SelectStyled>
            </LabelStyled>
          </TagsWrapper>
          <ButtonStyled>send</ButtonStyled>
        </FormStyled>
      </Wrapper>
    </Page>
  )
}
const Wrapper = styled.div`
  margin: 15px;
  background-color: var(--white);
`
const ImgStyled = styled.img`
  height: 40vh;
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: var(--background-grey);
`
const FormStyled = styled.form`
  display: grid;
  gap: 25px;
  padding: 0;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`
const LabelStyled = styled.label`
  display: grid;
  gap: 10px;
`
const InputStyled = styled.input`
  width: 100%;
  font-size: 1rem;
  border: var(--grey) solid 1px;
  :focus {
    border: var(--blue) solid 1px;
  }
`
const TextAreaStyled = styled.textarea`
  width: 100%;
  font-size: 1rem;
  border: var(--grey) solid 1px;
  :focus {
    border: var(--blue) solid 1px;
  }
`

const ButtonStyled = styled.button`
  text-decoration: none;
  background-image: linear-gradient(45deg, #014499, #008ace);
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 16px;
  color: var(--white);
`
const ImageAddStyled = styled(ImageAdd)`
  height: 25px;
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

