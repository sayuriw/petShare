import React from 'react'
import styled from 'styled-components/macro'
import Img from './Img'
import ReactSVG from 'react-svg'
import petIcon from '../../data/paw-solid.svg'
import PropTypes from 'prop-types'
import Tag from './Tag'
import { Edit } from 'styled-icons/typicons/Edit'
import deleteIcon from '../../data/trash-alt-solid.svg'
import { Link } from 'react-router-dom'

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags:PropTypes.object,
  isBookmarked: PropTypes.bool,
  picture: PropTypes.string,
  email: PropTypes.string,
  onBookmarkClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}
Card.defaultProps = {
  isBookmarked: false
}
 
export default function Card({_id, picture, title, description, tags, email, isBookmarked, onBookmarkClick, onDeleteClick, onEditClick}) {

  
  
  function handleBookmarkClick(event) {
    event.stopPropagation() 
    onBookmarkClick() 
  }
  function handleDeleteClick(event) {
    event.stopPropagation() 
    onDeleteClick() 
  }

  return (
  <CardStyled>
    <Img src={picture ? picture : petIcon}/>   
    <TextAreaStyled>
    {Object.values(tags).map(tag => <Tag text={tag} key={tag}/>)}  
      <DeleteStyled onClick={handleDeleteClick}><ReactSVG src={deleteIcon}/></DeleteStyled>
      <Link to={{ pathname: "/edit", editCardData: { title, description, email, picture, tags, id: _id }}}><EditSymbol/></Link>
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
  border-radius: 5px;
  box-shadow: 0 10px 10px #0002;
  `

const TextAreaStyled = styled.div`
  margin: 10px;
  margin-bottom: 0;
  position: relative;
`

const DeleteStyled = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: -5px;
  top: -10px;
  color: #83b0ea;
`

const ButtonsAreaStyled = styled.div`
  position: relative;
  padding-bottom: 20px;
`

const BookmarkStyled = styled.div`
  position: absolute;
  color: ${({ active }) => (active ? '#e6e04a' : '#83b0ea')};
  width: 40px;
  height: 40px;
  right: 15px;
  top: -10px;
`
const ContactMeStyled = styled.a`
  text-decoration: none;
  padding-left: 20px;
  color: #83b0ea;
`
const EditSymbol = styled(Edit)`
  height:35px;
  width: 35px;
`