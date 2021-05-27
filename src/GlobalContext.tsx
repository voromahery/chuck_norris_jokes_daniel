import React, { createContext, useReducer, useEffect, useState } from 'react'

type State = {
  jokeData: any
  dispatch: React.Dispatch<any>
  firstName: string
  lastName: string
  setFirstName: any
  setLastName: any
  fetchJoke: any
}

let initialState: State = {
  jokeData: {},
  dispatch: () => null,
  firstName: '',
  lastName: '',
  setFirstName: () => null,
  setLastName: () => null,
  fetchJoke: () => null,
}

type JokeProperties = {
  type: string
  value: {
    id: number
    joke: string
    categories: string[]
  }
}

type Action = { type: 'RESOLVED'; payload: JokeProperties }

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'RESOLVED':
      return {
        ...state,
        jokeData: action.payload,
      }

    default:
      return state
  }
}

const Context = createContext(initialState)

const GlobalContext: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [firstName, setFirstName] = useState('Chuck')
  const [lastName, setLastName] = useState('Norris')
  const jokeUrl = `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`

  async function fetchJoke() {
    const getJoke = await fetch(jokeUrl)
    const data = await getJoke.json()

    dispatch({ type: 'RESOLVED', payload: data.value })
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <Context.Provider
      value={{
        jokeData: state.jokeData,
        dispatch,
        firstName,
        lastName,
        setFirstName,
        setLastName,
        fetchJoke,
      }}>
      {children}
    </Context.Provider>
  )
}

export { Context, GlobalContext }
