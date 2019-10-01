import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import Card from './Card'
import johny from '../data/images/johny.jpg'


export default {
  title: 'card'
}
export const card = () => (
  <Card
        key="index"
        title="title"
        description="description"
        tags={["tags"]}
        isBookmarked={boolean('isBookmarked', true)} 
        onBookmarkClick={action('bookmark clicked')} 
        picture={johny}
      />
)


  
