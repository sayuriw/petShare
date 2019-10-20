import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { DocumentAdd } from 'styled-icons/typicons/DocumentAdd'
import { Paw } from 'styled-icons/fa-solid/Paw'
import { Home } from 'styled-icons/fa-solid/Home'
export default function Navbar() {
  
  return (
    <NavbarStyled>
      <NavLinkStyled to="/home"><HomeStyled/></NavLinkStyled>
      <NavLinkStyled to="/favorites"><PawStyled/></NavLinkStyled>  
      <NavLinkStyled to="/newCard"><DocumentAddStyled/></NavLinkStyled>
      <NavLinkStyled exact to="/">login</NavLinkStyled>
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
    background: #83b0ea;
  }
`
const NavbarStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: 1px;
  position: relative;
  z-index: 1;
`

const DocumentAddStyled = styled(DocumentAdd)`
  height:35px;
  width: 35px;
`
const PawStyled = styled(Paw)`
  height:35px;
  width: 35px;
`
const HomeStyled = styled(Home)`
  height:35px;
  width: 35px;
`

