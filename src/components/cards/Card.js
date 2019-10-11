import React, {useState} from 'react'
import styled from 'styled-components/macro'
import Img from './Img'
import ReactSVG from 'react-svg'
import petIcon from '../../data/paw-solid.svg'
import PropTypes from 'prop-types'
import Tag from './Tag'
import { Edit } from 'styled-icons/typicons/Edit'
import { DeleteForever } from 'styled-icons/material/DeleteForever'
import { Link } from 'react-router-dom'
import { Menu } from 'styled-icons/boxicons-regular/Menu'

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
 
export default function Card({id, picture, title, description, tags, email, isBookmarked, onBookmarkClick, onDeleteClick }) {
  
  const [isPopped, setIsPopped] = useState(false)
  
  function handleBookmarkClick(event) {
    event.stopPropagation() 
    onBookmarkClick() 
  }
  function handleDeleteClick(event) {
    event.stopPropagation() 
    setIsPopped(false)
    onDeleteClick() 
  }
function handleMenuClick() {
    setIsPopped(!isPopped)
}

  return (
  <CardStyled>
    <Img src={picture ? picture : petIcon}/>
    <MenuStyled onClick={handleMenuClick}/>
    {isPopped && <MenuWrapperStyled> 
        <DeleteSymbol onClick={handleDeleteClick}>Delete card</DeleteSymbol>
        <LinkStyled to={{ pathname: "/edit", editCardData: { title, description, email, picture, tags, id }}}><EditSymbol/></LinkStyled>
    </MenuWrapperStyled>} 
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
  border-radius: 5px;
  box-shadow: 0 10px 10px #0002;
  position: relative;
  `
const MenuStyled = styled(Menu)`
position: absolute;
height:35px;
width: 35px;
right: 10px;
`
const MenuWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: 32px;
`
const DeleteSymbol = styled(DeleteForever)`
  height:35px;
  width: 35px;
`
const EditSymbol = styled(Edit)`
  height:35px;
  width: 35px;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`
const TextAreaStyled = styled.div`
  margin: 10px;
  margin-bottom: 0;
  position: relative;
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



