import React  from 'react'
import Card from './Card'
import styled from 'styled-components'



export default function App() {

  return (
    <>
      <AppStyled>
        <Card/>
      </AppStyled>
    </>

  );
}
const AppStyled = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  `


