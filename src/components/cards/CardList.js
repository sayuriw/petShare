import React from 'react'
//import styled from 'styled-components/macro'
import Card from './Card'


export default function CardsList({cards}) {
  return (
    <>
    {cards.map((card) => (
      <Card
        title={card.title}
        description={card.description}
        isBookmarked={card.isBookmarked}
      />
    ))}
  </>
)
}

