import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`

:root {
    --background-grey: #EFEFEF;
    --blue:#83b0ea;
    --grey:#6F6f6f;
    --highlight:#e6e04a;
    --white:#FFFFFF
}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: var(--background-grey);
    font-family: Helvetica;
    font-size: 17px;
  }
`

