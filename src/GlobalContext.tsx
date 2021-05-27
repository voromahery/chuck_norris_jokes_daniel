import React, { createContext, useReducer, useEffect } from 'react'

const Context = createContext('')
const GlobalContext: React.FC = ({ children }) => {
  return <Context.Provider value={''}>{children}</Context.Provider>
}

export { Context, GlobalContext }
