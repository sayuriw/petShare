import React from 'react'
import Card from './Card'
import Filter from '../Filter'
import Page from '../../common/Page'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

CardPage.propTypes = {
  title: PropTypes.string.isRequired,
  onBookMarkClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  pets: PropTypes.array,
  onTagsClick:PropTypes.func,
  tags:PropTypes.object,
  activeTag: PropTypes.string,
}
  

export default function CardPage({ title, onBookmarkClick, onDeleteClick, pets, onTagClick, tags, activeTag}) {
  
  return (
    <Page title={title}>
      <Scroller>
        <Filter tags={tags} activeTag={activeTag}onTagClick={onTagClick} />
      {pets.map((pet, index) => (
        <Card
          key={index}
          tags={pet.tags}
          title={pet.title}
          description={pet.description}
          onBookmarkClick={() => onBookmarkClick(pet)}
          onDeleteClick={() => onDeleteClick(pet)}
          isBookmarked={pet.isBookmarked}
          picture={pet.picture}
          email={pet.email}
        />
      ))}
      </Scroller> 
   </Page>
  )
}
const Scroller = styled.div`
display: grid;
gap: 20px;
overflow-y: auto;
scroll-behavior: smooth;
padding: 20px 10px;
`