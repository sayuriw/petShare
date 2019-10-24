import React, { useState, useContext, useEffect } from 'react'

export const PetsContext = React.createContext([[], () => {}])
export const UsersContext = React.createContext([[], () => {}])

export default function Provider({ children }) {
  
  const [pets, setPets] = useState([])
  const [users, setUsers] = useState([])
  
  return (
      <UsersContext.Provider value={[users, setUsers]}>
        <PetsContext.Provider value={[pets, setPets]}>
          {children}
        </PetsContext.Provider>  
      </UsersContext.Provider>
  )
}

