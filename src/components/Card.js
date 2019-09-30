import React, { useState }from 'react'
import styled from 'styled-components/macro'
import ReactSVG from 'react-svg'
import petIcon from '../data/paw-solid.svg'
 

export default function Card() {

  const [isBookmarked, setIsBookmarked] = useState(false)
  
  function handleBookmarkClick(event) {
    event.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  return (
  <CardStyled>

    <ImgStyled src="https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1576&q=80" alt="happy dog"/>   
    <TextAreaStyled>
    <BookmarkStyled onClick={handleBookmarkClick} active={isBookmarked}><ReactSVG src={petIcon}/></BookmarkStyled>
      <TagStyled>Dog</TagStyled>
      <TagStyled>Flexible</TagStyled>
      <TagStyled>Large</TagStyled>
      <h1>Johny is looking for new friends</h1>
      <p>My dog Johnny is looking for new friends to take
him for a stroll in the park or just chill in the  
garden. He is very friendly and gets along with
other dogs just fine.</p>
    </TextAreaStyled>
  </CardStyled>
  )
}


const CardStyled = styled.section`
  background: #FFFFFF;
  margin: 20px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-radius: 5px;
  box-shadow: 0 10px 10px #0002;
  `

const ImgStyled = styled.img`
  height: 40vh;
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`
const TextAreaStyled = styled.div`
  margin: 10px;
  position: relative;
`
const BookmarkStyled = styled.div`
  position: absolute;
  color: ${({ active }) => (active ? 'hotpink' : '#4730ED')};
  width: 40px;
  height: 40px;
  right: 30px;
  top: 5px;
`
const TagStyled = styled.div`
  background-color: rgba(71,48,237,0.62);
  display: inline-block;
  border-radius: 5px;
  text-align: justify;
  margin-right: 10px;
  padding: 2px 10px;

`