import React from 'react'
import styled from 'styled-components/macro'


export default function FavoritesButton({onFavoritesClick}) {
   
 function handleFavoritesClick(event) {
   event.stopPropagation()
   onFavoritesClick()
 }

  return (
   <ButtonStyled onClick={handleFavoritesClick}>Favorites</ButtonStyled>
  )
}


const ButtonStyled = styled.button`
  display: flex;
  background-color: rgba(71,48,237,0.62);
  color: white;
  font-size: 18px;
  padding: 10px;
  margin: 20px 50px 0 50px;
  border-radius: 5px;
  justify-content: center;
`





