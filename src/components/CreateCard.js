import React from 'react'
import styled from 'styled-components/macro'

export default function CreateCard({onSubmit}) {
  
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    onSubmit(data)
    form.reset()
    form.title.focus()
  }
  
  return (
    
    <FormStyled onSubmit={handleSubmit}>
    <p>Create a new petCard</p>
        <LabelStyled>
          Title
          <input name="title" />
        </LabelStyled>
        <LabelStyled>
          Description
          <textarea name="description" rows="4" cols="30"/>
        </LabelStyled>
        <LabelStyled>
          Picture
          <input name="picture" type="file"/>
        </LabelStyled>
        <LabelStyled>
          Email
          <input name="email" type="email"/>
        </LabelStyled>
        <TagsWrapper>
          <LabelStyled>
            Type
            <SelectStyled name="type">
              <OptionStyled value="Dog">Dog</OptionStyled>
              <OptionStyled value="Cat">Cat</OptionStyled>
              <OptionStyled value="Rabbit">Rabbit</OptionStyled>
            </SelectStyled>
          </LabelStyled>
          <LabelStyled>
            Size
            <select name="size">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </LabelStyled>
          <LabelStyled>
            Availability
            <SelectStyled name="availability">
              <option value="Flexible">Flexible</option>
              <option value="Weekends">Weekends</option>
              <option value="FixedDates">Fixed Dates</option>
            </SelectStyled>
          </LabelStyled>
        </TagsWrapper>
        <ButtonStyled>Create card</ButtonStyled>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  display: grid;
  gap: 20px;
  padding: 20px;
`
const LabelStyled = styled.label`
  display: grid;
  gap: 10px;
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
const ButtonStyled = styled.button`
  padding: 10px;
  margin: 20px;
  font-size: 18px;
  border-radius: 3px;
  color: white;
  background-color: #6F6f6f;
`
