import React, { useState }from 'react'
import styled from 'styled-components/macro'
import ReactSVG from 'react-svg'
import petIcon from '../data/paw-solid.svg'
import PropTypes from 'prop-types'

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags:PropTypes.array.isRequired,
  isBookmarked: PropTypes.bool
}
Card.defaultProps = {
  isBookmarked: false
}
 
export default function Card({picture, alt, title, description}) {

  const [isBookmarked, setIsBookmarked] = useState(false)
  
  function handleBookmarkClick(event) {
    event.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }


  return (
  <CardStyled>
    <ImgStyled src={picture} alt={alt}/>   
    <TextAreaStyled>
    <BookmarkStyled onClick={handleBookmarkClick} active={isBookmarked}><ReactSVG src={petIcon}/></BookmarkStyled> 
      <h1>{title}</h1>
      <p>{description}</p>
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