import React from 'react'
import Card from './Card'
import { pets } from './pets'

export default function CardList() {
  
  return (
      <>
     {pets.map((pet, index) => (
      <Card
        key={index}
        tags={pet.tags}
        title={pet.title}
        description={pet.description}
        isBookmarked={pet.isBookmarked}
        picture={pet.picture}
      />
    ))} 
  </>
)
}

