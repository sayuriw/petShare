import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FilterList } from 'styled-icons/material/FilterList'

export default function Filter ({activeTag, onTagClick, tags}) { 
  const [isPopped, setIsPopped] = useState(false)
  const [tagIsPopped, setTagIsPopped] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  

  function togglePopup(tag) {
    if (selectedFilter === tag) {
      setTagIsPopped(!tagIsPopped)
      
    }
    else {
      setSelectedFilter(tag)
      setIsPopped(true)
    }
  }
  function handleTagClick(event) {
    event.stopPropagation()
    setTagIsPopped(!tagIsPopped)
    setIsPopped(!isPopped)
    const clickedTag = event.currentTarget.textContent
    onTagClick(selectedFilter, clickedTag )
  }

  function handleFilterClick() {
    setIsPopped(!isPopped)
  }

  return (
    <>
    <FilterStyled  onClick={handleFilterClick}>Filter<FilterIconStyled/></FilterStyled>
      <FilterWrapperStyled className="Navigation" isPopped={isPopped}> 
      <SelectorStyled onClick={event => {
        setIsPopped(false)
        setTagIsPopped(false)
        setSelectedFilter(event.currentTarget.textContent)
        onTagClick('all')
      }}>all</SelectorStyled>
      { Object.keys(tags).map(tag => <SelectorStyled onClick={() => togglePopup(tag)}key={tag}>{tag}</SelectorStyled>) }
    </FilterWrapperStyled>
      <TagWrapperStyled className="Navigation" isPopped={tagIsPopped}>
        { selectedFilter === 'all' || tags[selectedFilter].map(tag => 
        <PStyled active={activeTag === tag ? true : false} onClick={handleTagClick} key={tag}>{tag}</PStyled>
        )}
      </TagWrapperStyled>
    </>
  )
}
const FilterStyled = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
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
  flex-direction: column;
  background-color:var(--white);
  right: ${({ isPopped }) => (isPopped ? '-5px' : '-300px')};
  height: 38vh;
  text-align: left;
  padding: 5px 25px 5px 5px;
  border-radius: 5px;
  position: fixed;
  top: 65px;
  margin: 5px;
  transition: right 0.3s ease-in-out;
  z-index: 100;
`
const TagWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--white);
  right: ${({ isPopped }) => (isPopped ? '116px' : '-300px')};
  height: 30vh;
  text-align: left;
  padding: 5px 25px 5px 5px;
  border-radius: 5px;
  position: fixed;
  top: 60px;
  margin: 10px;
  transition: right 0.3s ease-in-out;
  z-index: 99;
`
const SelectorStyled = styled.p`
  font-size: 1.2rem;
  padding: 2px;
  color: #686469;
  text-decoration: none;
  transition: color 0.3s linear;
  background-color: #FFFFFF
`
const PStyled = styled.p`
  font-size: 1.2rem;
  padding: 0px;
  color: #686469;
  text-decoration: none;
  transition: color 0.3s linear;
  background-color: #FFFFFF
`
const FilterIconStyled = styled(FilterList)`
  height:30px;
  width: 30px;
  border-radius: 5px;
  margin-left: 2px;
  color: var(--grey);
  background-color: var(--background-grey);
` 
  

