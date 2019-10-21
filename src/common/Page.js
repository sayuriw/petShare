import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Filter from '../components/Filter'

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default function Page({ title, children, tags, activeTag, onTagClick, showFilter=true }) {
  return (
    <PageStyled>
      <Header>
        <ImgStyled src={title} alt={title}/>
        {
          showFilter
            && <Filter tags={tags} activeTag={activeTag} onTagClick={onTagClick}/>
        }
      </Header>
        
      {children}
    </PageStyled>
  )
}

const PageStyled = styled.main`
  display: grid;
  grid-template-rows: 70px auto;
  align-content: flex-start;
  overflow: auto;
`
const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center; 
  /* background: #6f6f6f; */
  color: white;
  background-image: linear-gradient(45deg,#022f8a,#84a3e0)
`
const ImgStyled = styled.img`
  height: 50px;
`
