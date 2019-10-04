import React from 'react'
import Card from './Card'
import Filter from '../Filter'

export default function CardList({onBookmarkClick, pets, onSelectTag, tags}) {
  
  return (
    <>
      <Filter tags={tags} onClick={onSelectTag} />
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

