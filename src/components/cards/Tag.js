import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Tag.prototype = {
  text: PropTypes.string
}


export default function Tag({ text }) {
  return <TagStyled>{text}</TagStyled>
}

const TagStyled = styled.div`
  background-color: rgba(71,48,237,0.62);
  color: white;
  font-size: 18px;
  display: inline-block;
  border-radius: 5px;
  text-align: justify;
  margin-right: 10px;
  padding: 2px 10px;

`