import React, { useState } from 'react'
import styled from 'styled-components/macro'

export default function Filter ({onClick, tags}) {
  const [isPoped, setIsPoped] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  function closePopup() {
    setIsPoped(false)
  }

  function togglePopup(tag) {
    if (selectedFilter === tag) {
      setIsPoped(!isPoped)
    }
    else {
      setSelectedFilter(tag)
      setIsPoped(true)
    }
  }
  

  return (
    <>
    <FilterWrapperStyled>
      <button onClick={() => closePopup()}>all</button>
      { Object.keys(tags).map(tag => <button onClick={() => togglePopup(tag)}>{tag}</button>) }
    </FilterWrapperStyled>
    {isPoped && 
      <PopupStyled>
        { selectedFilter === 'all' || tags[selectedFilter].map(tag =>
          <ButtonStyled>{tag}</ButtonStyled>
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
  position: absolute;
  display: flex;
  border-radius: 5px;
  background-color: hotpink;
    
  `
const ButtonStyled = styled.button`
  background-color: rgba(71,48,237,0.62);
  color: white;
  font-size: 16px;
  padding: 2px 10px;
  border-radius: 5px;

`