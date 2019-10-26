import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Menu } from 'styled-icons/boxicons-regular/Menu'
import { Edit } from 'styled-icons/boxicons-solid/Edit'
import { Heart } from 'styled-icons/icomoon/Heart'
import { DeleteForever } from 'styled-icons/material/DeleteForever'
import petIcon from '../../images/paw-solid.svg'
import Img from './Img'
import Tag from './Tag'

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.object,
  isBookmarked: PropTypes.bool,
  picture: PropTypes.string,
  email: PropTypes.string,
  onBookmarkClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}
Card.defaultProps = {
  isBookmarked: false
}

export default function Card({
  id,
  picture,
  title,
  description,
  tags,
  email,
  isBookmarked,
  onBookmarkClick,
  onDeleteClick
}) {
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
      <Img src={picture ? picture : petIcon} />
      <MenuStyled onClick={handleMenuClick} />
      {isPopped && (
        <MenuWrapperStyled>
          <DeleteSymbol onClick={handleDeleteClick}>Delete card</DeleteSymbol>
          <LinkStyled
            to={{
              pathname: '/edit',
              editCardData: { title, description, email, picture, tags, id }
            }}>
            <EditSymbol />
          </LinkStyled>
        </MenuWrapperStyled>
      )}
      <TextAreaStyled>
        <h3>{title}</h3>
        <p>{description}</p>
        {Object.values(tags).map(tag => (
          <Tag text={tag} key={tag} />
        ))}
        <ButtonsAreaStyled>
          <BookmarkStyled onClick={handleBookmarkClick} active={isBookmarked}>
            <Heart/>
          </BookmarkStyled>
          <ContactMeStyled href={'mailto:' + email}>CONTACT</ContactMeStyled>
        </ButtonsAreaStyled>
      </TextAreaStyled>
    </CardStyled>
  )
}

const CardStyled = styled.section`
  background: var(--white);
  border-radius: 5px;
  box-shadow: 0 10px 10px #0002;
  position: relative;
`
const MenuStyled = styled(Menu)`
  position: absolute;
  height: 45px;
  width: 45px;
  right: 10px;
  padding: 5px;
`
const MenuWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 51px;
  top: -1px;
`
const DeleteSymbol = styled(DeleteForever)`
  height: 45px;
  width: 45px;
  padding: 5px;
`
const EditSymbol = styled(Edit)`
  height: 45px;
  width: 45px;
  padding: 5px;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #4F4F4F;
`
const TextAreaStyled = styled.div`
  margin: 10px;
  margin-bottom: 0;
  position: relative;
`
const ButtonsAreaStyled = styled.div`
  position: relative;
  padding: 20px 0;
  margin-top: 10px;
`
const BookmarkStyled = styled.div`
  position: absolute;
  color: ${({ active }) => (active ? 'var(--highlight)' : 'var(--blue)')};
  width: 35px;
  height: 35px;
  right: 9px;
  top: 7px;
`
const ContactMeStyled = styled.a`
  text-decoration: none;
  background-image: linear-gradient(45deg, #014499, #008ace);
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 16px;
  color: var(--white);
`
