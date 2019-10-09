import React from 'react'
import Card from './Card'
import Filter from '../Filter'
import styled from 'styled-components/macro'
import Page from '../../common/Page'

export default function CardPage({ title, onBookmarkClick, onDeleteClick, pets, onTagClick, tags, activeTag}) {
  
  return (
    <Page title={title}>
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
  </Page>
)
}

const WrapperStyled = styled.section`
  display: grid;
  grid-template-rows: 40px auto;
`