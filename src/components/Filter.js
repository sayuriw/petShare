import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FilterList } from 'styled-icons/material/FilterList'

export default function Filter ({activeTag, onTagClick, tags, isActive}) {
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
  }

  
  

  return (
    <>
    <FilterStyled active={isActive} onClick={handleFilterClick}>Filter<FilterIconStyled/></FilterStyled>
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
        <TagButtonStyled active={activeTag === tag ? true : false} onClick={handleTagClick} key={tag}>{tag}</TagButtonStyled>
        )}
      </PopupStyled>
     }
    
    </>
  )
}
const FilterStyled = styled.button`
  padding: 3px 8px;
  margin-top: 20px;
  margin: 10px;
  font-size: 18px;
  border-radius: 15px;
  color: var(--grey);
  background-color: var(--background-grey);
  outline: none;
  border: none;
   
`
const FilterWrapperStyled = styled.div`
  display: flex;
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
  margin: 1px;
  border-radius: 3px;
  background-color: ${({ active }) => (active ? '#8d7ef4' : '#FFFFFF')};
  border: black 1px solid; 
  `

const FilterIconStyled = styled(FilterList)`
  height:30px;
  width: 30px;
  border-radius: 5px;
  margin-left: 2px;
  color: var(--grey);
  background-color: var(--background-grey);
`

