import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { DocumentAdd } from 'styled-icons/typicons/DocumentAdd'
import { Paw } from 'styled-icons/fa-solid/Paw'
import { Home } from 'styled-icons/fa-solid/Home'
import { LogOut } from 'styled-icons/boxicons-regular/LogOut'

export default function NavbarLoggedIn() {
  return (
    <NavbarStyled>
      <NavLinkStyled exact to="/home">
        <HomeStyled />
      </NavLinkStyled>
      <NavLinkStyled to="/favorites">
        <PawStyled />
      </NavLinkStyled>
      <NavLinkStyled to="/newCard">
        <DocumentAddStyled />
      </NavLinkStyled>
      <NavLinkStyled to="/logout">
        <LogoutStyled />
      </NavLinkStyled>
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
  background-color: #949ca4;
  &.active {
    background: #0088cc;
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
  height: 35px;
  width: 35px;
`
const PawStyled = styled(Paw)`
  height: 35px;
  width: 35px;
`
const HomeStyled = styled(Home)`
  height: 35px;
  width: 35px;
`
const LogoutStyled = styled(LogOut)`
  height: 35px;
  width: 35px;
`
