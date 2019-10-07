import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  
  return (
    <NavbarStyled>
      <NavLinkStyled exact to="/">Home</NavLinkStyled>
      <NavLinkStyled to="/favorites">Favorites</NavLinkStyled>  
      <NavLinkStyled to="/newCard">New card</NavLinkStyled>
    </NavbarStyled>
  )
}

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  color: white;
  border-radius: 3px;
  background-color: #6F6f6f;
  &.active {
    background: #8d7ef4;
  }
`
const NavbarStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: 1px;
  position: relative;
  z-index: 1;
`