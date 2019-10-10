import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default function Page({ title, children }) {
  return (
    <PageStyled>
      <Header>{title}</Header>
      {children}
    </PageStyled>
  )
}

const PageStyled = styled.main`
  display: grid;
  grid-template-rows: 48px auto;
  align-content: flex-start;
  overflow: auto;
`
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #6f6f6f;;
  color: white;
`
