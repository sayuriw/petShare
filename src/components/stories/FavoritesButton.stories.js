import React from 'react'
import FavoritesButton from '../FavoritesButton'
import { action } from '@storybook/addon-actions'


export default {
  title: 'Favorites button'
}

export const favoritesButton = () => (

  <FavoritesButton onClick={action('bookmark clicked')}>Favorites</FavoritesButton>

)