import React from 'react'
import styled from 'styled-components/macro'
import Img from './Img'
import ReactSVG from 'react-svg'
import petIcon from '../../data/paw-solid.svg'
import PropTypes from 'prop-types'
import Tag from './Tag'

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags:PropTypes.object,
  isBookmarked: PropTypes.bool
}
Card.defaultProps = {
  isBookmarked: false
}
 
export default function Card({picture, alt, title, description, tags, email, isBookmarked, onBookmarkClick}) {

  
  
  function handleBookmarkClick(event) {
    event.stopPropagation() 
    onBookmarkClick() 
  }


  return (
  <CardStyled>
    <Img src={picture} alt={alt}/>   
    <TextAreaStyled>
    {Object.values(tags).map(tag => <Tag text={tag} key={tag}/>)}  
      <h1>{title}</h1>
      <p>{description}</p>
      <ButtonsAreaStyled>
      <BookmarkStyled onClick={handleBookmarkClick} active={isBookmarked}><ReactSVG src={petIcon}/></BookmarkStyled> 
      <ContactMeStyled href={"mailto:" + email}>Contact me</ContactMeStyled>
      </ButtonsAreaStyled>
    </TextAreaStyled>
  </CardStyled>
  )
}


const CardStyled = styled.section`
  background: #FFFFFF;
  margin-top: 30px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 10px 10px #0002;
  `

const TextAreaStyled = styled.div`
  margin: 10px;
  margin-bottom: 0;
`

const ButtonsAreaStyled = styled.div`
  position: relative;
  padding-bottom: 20px;
`
const BookmarkStyled = styled.div`
  position: absolute;
  color: ${({ active }) => (active ? 'hotpink' : '#4730ED')};
  width: 40px;
  height: 40px;
  right: 15px;
  top: -10px;
`
const ContactMeStyled = styled.a`
  text-decoration: none;
  padding-left: 20px;
`