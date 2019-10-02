import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import Card from './Card'
import cardImage from '../data/images/johny.jpg'


export default {
  title: 'card'
}
export const card = () => (
  <Card
        key="index"
        title="Johny is looking for friends"
        description="My dog Johnny is looking for new friends to take him for a stroll in the park or just chill in the garden. He is very friendly and gets along with other dogs just fine."
        tags={["one", "two", "three"]}
        isBookmarked={boolean('isBookmarked', true)} 
        onBookmarkClick={action('bookmark clicked')} 
        picture={cardImage}
      />
) 
