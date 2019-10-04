import React, { useState } from 'react'
import styled from 'styled-components/macro'

export default function Filter ({onTagClick, tags}) {
  const [isPoped, setIsPoped] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  function togglePopup(tag) {
    if (selectedFilter === tag) {
      setIsPoped(!isPoped)
    }
    else {
      setSelectedFilter(tag)
      setIsPoped(true)
    }
  }
  function handleTagClick(event) {
    event.stopPropagation()
    const clickedTag = event.currentTarget.textContent
    onTagClick(selectedFilter, clickedTag )
  }
  

  return (
    <>
    <FilterWrapperStyled>
      <ButtonStyled onClick={event => {
        setIsPoped(false)
        setSelectedFilter(event.currentTarget.textContent)
        onTagClick('all')
      }}>all</ButtonStyled>
      { Object.keys(tags).map(tag => <ButtonStyled onClick={() => togglePopup(tag)}>{tag}</ButtonStyled>) }
    </FilterWrapperStyled>
    {isPoped && 
      <PopupStyled>
        { selectedFilter === 'all' || tags[selectedFilter].map(tag =>
          <TagButtonStyled onClick={handleTagClick}>{tag}</TagButtonStyled>
        )}
      </PopupStyled>
    }
    </>
  )
}

const FilterWrapperStyled = styled.div`
  display: flex;
`
const PopupStyled = styled.div`
  /* position: absolute; */
  display: flex;
  border-radius: 5px;

    
  `
const ButtonStyled = styled.button`
  background-color: #4730ED;
  color: white;
  font-size: 18px;
  padding: 2px 10px;
  border-radius: 5px;
  margin-top: 5px;
`
const TagButtonStyled = styled.button`
  background-color: #8d7ef4;
  color: white;
  font-size: 18px;
  padding: 2px 20px;
  margin: 1px;
  border-radius: 5px;
  :hover {
    background-color: hotpink;
  }
  `