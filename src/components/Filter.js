import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { FilterList } from 'styled-icons/material/FilterList'
import { CancelCircle } from 'styled-icons/icomoon/CancelCircle'

Filter.propTypes = {
  activeTag: PropTypes.string,
  onTagClick: PropTypes.func,
  tags: PropTypes.object
}

export default function Filter({ activeTag, onTagClick, tags }) {
  const [isSelectorPopupOpen, setIsSelectorPopupOpen] = useState(false)
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
  const [selectedSelector, setSelectedSelector] = useState('all')

  useEffect(() => {
    isSelectorPopupOpen || setIsFilterPopupOpen(false)
  }, [isSelectorPopupOpen])

  function openFilterPopup(selector) {
    setIsFilterPopupOpen(true)
    setSelectedSelector(selector)
  }

  function resetFilter() {
    setSelectedSelector('all')
    onTagClick('all')
    setIsSelectorPopupOpen(false)
  }

  function handleTagClick(selectedSelector, tag) {
    setIsSelectorPopupOpen(false)
    setIsFilterPopupOpen(false)
    onTagClick(selectedSelector, tag)
  }

  return (
    <>
      <CancelStyled onClick={resetFilter} />
      <FilterStyled
        onClick={() => setIsSelectorPopupOpen(!isSelectorPopupOpen)}>
        Filter
        <FilterIconStyled />
      </FilterStyled>
      <FilterWrapperStyled
        className="Navigation"
        isPopped={isSelectorPopupOpen}>
        <SelectorStyled onClick={resetFilter}>all</SelectorStyled>
        {Object.keys(tags).map(selector => (
          <SelectorStyled
            onClick={() => openFilterPopup(selector)}
            key={selector}>
            {selector}
          </SelectorStyled>
        ))}
      </FilterWrapperStyled>
      <TagWrapperStyled className="Navigation" isPopped={isFilterPopupOpen}>
        {selectedSelector === 'all' ||
          tags[selectedSelector].map(tag => (
            <PStyled
              active={activeTag === tag}
              onClick={() => handleTagClick(selectedSelector, tag)}
              key={tag}>
              {tag}
            </PStyled>
          ))}
      </TagWrapperStyled>
    </>
  )
}
const CancelStyled = styled(CancelCircle)`
  height: 45px;
  width: 45px;
  padding: 5px;
  margin-right: 6px;
  color: var(--background-grey);
`

const FilterStyled = styled.button`
  position: absolute;
  top: 8px;
  right: 47px;
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
  background-color: var(--white);
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
  transition: right 0.1s ease-in-out;
  z-index: 99;
`
const SelectorStyled = styled.p`
  font-size: 1.2rem;
  padding: 2px;
  color: #686469;
  text-decoration: none;
  transition: color 0.3s linear;
  background-color: #ffffff;
`
const PStyled = styled.p`
  font-size: 1.2rem;
  padding: 0px;
  color: #686469;
  text-decoration: none;
  transition: color 0.3s linear;
  background-color: #ffffff;
`
const FilterIconStyled = styled(FilterList)`
  height: 30px;
  width: 30px;
  border-radius: 5px;
  margin-left: 2px;
  color: var(--grey);
  background-color: var(--background-grey);
`
