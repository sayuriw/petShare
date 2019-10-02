import React from 'react'
import Card from './Card'

export default function CardList({onBookmarkClick, pets}) {
  
  return (
      <>
     {pets.map((pet, index) => (
      <Card
        key={index}
        tags={pet.tags}
        title={pet.title}
        description={pet.description}
        onBookmarkClick={() => onBookmarkClick(pet)}
        isBookmarked={pet.isBookmarked}
        picture={pet.picture}
      />
    ))} 
  </>
)
}

