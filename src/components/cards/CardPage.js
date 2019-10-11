import React from 'react'
import Card from './Card'
import Filter from '../Filter'
import Page from '../../common/Page'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import logo from '../../data/petshare.png'

CardPage.propTypes = {
  title: PropTypes.string.isRequired,
  onBookmarkClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  pets: PropTypes.array,
  onTagClick:PropTypes.func,
  tags:PropTypes.object,
  activeTag: PropTypes.string,
}  

export default function CardPage({ onBookmarkClick, onDeleteClick, onEditClick, pets, onTagClick, tags, activeTag}) {
  return (
    <Page title={logo}>
      <Scroller>
        <Filter tags={tags} activeTag={activeTag} onTagClick={onTagClick} />
      {pets.map((pet) => (
        <Card
          key={pet._id}
          id={pet._id}
          tags={pet.tags}
          title={pet.title}
          description={pet.description}
          onBookmarkClick={() => onBookmarkClick(pet)}
          onDeleteClick={() => onDeleteClick(pet)}
          onEditClick={() => onEditClick(pet)}
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