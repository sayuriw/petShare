import React, { useState } from 'react'
import styled from 'styled-components/macro'

export default function Filter ({onTagClick, tags}) {
  const [isPopped, setIsPopped] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  function togglePopup(tag) {
    if (selectedFilter === tag) {
      setIsPopped(!isPopped)
    }
    else {
      setSelectedFilter(tag)
      setIsPopped(true)
    }
  }
  function handleTagClick(event) {
    event.stopPropagation()
    const clickedTag = event.currentTarget.textContent
    onTagClick(selectedFilter, clickedTag )
  }

  function handleFilterClick() {
    setIsPopped(!isPopped)
    console.log(isPopped)
  }
  

  return (
    <>
    <FilterStyled onClick={handleFilterClick}>Filters</FilterStyled>
     {isPopped && <FilterWrapperStyled> 
      <ButtonStyled onClick={event => {
        setIsPopped(false)
        setSelectedFilter(event.currentTarget.textContent)
        onTagClick('all')
      }}>all</ButtonStyled>
      { Object.keys(tags).map(tag => <ButtonStyled onClick={() => togglePopup(tag)}key={tag}>{tag}</ButtonStyled>) }
    </FilterWrapperStyled>}
     {isPopped && 
      <PopupStyled>
        { selectedFilter === 'all' || tags[selectedFilter].map(tag =>
          <TagButtonStyled onClick={handleTagClick} key={tag}>{tag}</TagButtonStyled>
        )}
      </PopupStyled>
     }
    
    </>
  )
}
const FilterStyled = styled.button`
  padding-top: 5px;
  padding-bottom: 25px;
  margin: 20px;
  font-size: 18px;
  border-radius: 3px;
  border: black 1px solid; 
`
const FilterWrapperStyled = styled.div`
  display: flex;
  margin: 10px 0 5px 20px;
`
const PopupStyled = styled.div`
  display: flex;
  margin-left: 20px;  
  `

const ButtonStyled = styled.button`
  color: black;
  font-size: 18px;
  padding: 2px 10px;
  margin-top: 5px;
  border: none;

`
const TagButtonStyled = styled.button`
  color: black;
  font-size: 18px;
  padding: 2px 20px;
  margin: 1px;
  border-radius: 3px;
  border: black 1px solid; 
  :hover {
    background-color: hotpink;
  }
  `