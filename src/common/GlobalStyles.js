import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`

:root {
    --background-grey: #EFEFEF;
    --blue:#014499;
    --grey:#6F6f6f;
    --highlight:#d81159;
    --white:#FFFFFF
}

  * {
    box-sizing: border-box;
  }

  html {
    background: white
  }
  
  body {
    margin: 0;
    background: var(--background-grey);
    font-family: 'Quicksand', sans-serif, Helvetica;
    color: #4F4F4F;
    font-size: 17px;   
  }
`

