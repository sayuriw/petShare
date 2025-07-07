import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const PetsContext = createContext()
const UsersContext = createContext()

export const usePets = () => {
  const context = useContext(PetsContext)
  if (!context) {
    throw new Error('usePets must be used within a PetsProvider')
  }
  return context
}

export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}

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

Provider.propTypes = {
  children: PropTypes.node.isRequired
}

export { PetsContext, UsersContext }

