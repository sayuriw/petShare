import React  from 'react'
import Card from './Card'
import styled from 'styled-components'



export default function App() {

  // const [cards, setCards] = useState({
  //   "title": "Johny is looking for new friends",
  //   "description": "My dog Johnny is looking for new friends to take him for a stroll in the park or just chill in the garden. He is very friendly and gets along with other dogs just fine.",
  //   "tags": ["Dog", "Flexible", "Large"],
  //   "isBookmarked": "false"
  // })

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


