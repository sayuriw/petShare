import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import Card from '../cards/Card'
import Tag from '../cards/Tag'
import cardImage from './defaultDog.jpeg'

const exampleCard = {
  picture:
    'https://res.cloudinary.com/petshare-de/image/upload/v1570451421/pets/johny_t8qadk.jpg',
  alt: 'happy dog',
  title: 'Johny is looking for new friends',
  description: 'My dog Johnny is looking for new friends to take him for a stroll in the park or just chill in the garden. He is very friendly and gets along with other dogs just fine.',
  tags: [ "Dog", "Large", "Weekends"],
  isBookmarked: false,
  email: 'sayuri.zz@gmail.com'
}

export default {
  title: 'card'
}
export const card = () => (
  <Card
    title={exampleCard.title}
    description={exampleCard.description}
    tags={exampleCard.tags.map(tag => (
      <Tag text={tag} key={tag} />
    ))}
    isBookmarked={boolean('isBookmarked', true)}
    onBookmarkClick={action('bookmark clicked')}
    onDeleteClick={action('delete is clicked')}
    picture={cardImage}
  />
)

export const tag = () => <Tag text="test" />
