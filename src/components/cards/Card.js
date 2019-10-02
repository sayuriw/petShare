import React from 'react'
import styled from 'styled-components/macro'
import Img from './Img'
import ReactSVG from 'react-svg'
import petIcon from '../data/paw-solid.svg'
import PropTypes from 'prop-types'
import Tag from './Tag'

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags:PropTypes.array.isRequired,
  isBookmarked: PropTypes.bool
}
Card.defaultProps = {
  isBookmarked: false
}
 
export default function Card({picture, alt, title, description, tags, isBookmarked, onBookmarkClick}) {

  
  
  function handleBookmarkClick(event) {
    event.stopPropagation() 
    onBookmarkClick() 
  }


  return (
  <CardStyled>
    <Img src={picture} alt={alt}/>   
    <TextAreaStyled>
    {tags.map(tag => <Tag text={tag}/>)}
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

const TextAreaStyled = styled.div`
  margin: 10px;
  position: relative;
`
const BookmarkStyled = styled.div`
  position: absolute;
  color: ${({ active }) => (active ? 'hotpink' : '#4730ED')};
  width: 40px;
  height: 40px;
  right: 15px;
  top: -5px;
`