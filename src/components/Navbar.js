import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  
  return (
    <NavbarStyled>
      <NavLinkStyled exact to="/">Home</NavLinkStyled>
      <NavLinkStyled to="/favorites">Favorites</NavLinkStyled>  
    </NavbarStyled>
  )
}

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1.5em;
  color: white;
  background-color: #4730ED;
  &.active {
    background: hotpink;
  }
`
const NavbarStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: 2px;
  position: relative;
  z-index: 1;
`