import React from 'react'
import Card from './Card'
import Filter from '../Filter'
import styled from 'styled-components/macro'

export default function CardList({ onBookmarkClick, pets, onTagClick, tags, activeTag}) {
  
  return (
    <WrapperStyled>
      <Filter tags={tags} activeTag={activeTag}onTagClick={onTagClick} />
     {pets.map((pet, index) => (
      <Card
        key={index}
        tags={pet.tags}
        title={pet.title}
        description={pet.description}
        onBookmarkClick={() => onBookmarkClick(pet)}
        isBookmarked={pet.isBookmarked}
        picture={pet.picture}
        email={pet.email}
      />
    ))} 
  </WrapperStyled>
)
}

const WrapperStyled = styled.section`
  display: grid;
  grid-template-rows: 40px auto;
`