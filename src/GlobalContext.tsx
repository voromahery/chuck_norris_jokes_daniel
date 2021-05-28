import { stat } from 'fs'
import React, { createContext, useReducer, useEffect, useState } from 'react'

type State = {
  isLoading: boolean
  jokeData: any
  dispatch: React.Dispatch<any>
  firstName: string
  lastName: string
  setFirstName: React.Dispatch<React.SetStateAction<string>>
  setLastName: React.Dispatch<React.SetStateAction<string>>
  fetchJoke: any
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

let initialState: State = {
  isLoading: true,
  jokeData: {},
  dispatch: () => null,
  firstName: '',
  lastName: '',
  setFirstName: () => null,
  setLastName: () => null,
  fetchJoke: () => null,
  category: '',
  setCategory: () => null,
}

type JokeProperties = {
  type: string
  value: {
    id: number
    joke: string
    categories: string[]
  }
}

type Action =
  | { type: 'RESOLVED'; payload: JokeProperties }
  | { type: 'LOADING' }

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'RESOLVED':
      return {
        ...state,
        isLoading: false,
        jokeData: action.payload,
      }

    default:
      return state
  }
}

const Context = createContext(initialState)

const GlobalContext: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [category, setCategory] = useState('')
  const [firstName, setFirstName] = useState('Chuck')
  const [lastName, setLastName] = useState('Norris')
  const jokeUrl = `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}&${category}`

  const fetchJoke = async () => {
    let isLoading = true
    dispatch({ type: 'LOADING' })
    const getJoke = await fetch(jokeUrl)
    const data = await getJoke.json()
    dispatch({ type: 'RESOLVED', payload: data.value })
    return (isLoading = false)
  }
  console.log(state.jokeData.categories)
  useEffect(() => {
    fetchJoke()
  }, [firstName, lastName])

  return (
    <Context.Provider
      value={{
        isLoading: state.isLoading,
        jokeData: state.jokeData,
        dispatch,
        firstName,
        lastName,
        setFirstName,
        setLastName,
        fetchJoke,
        category,
        setCategory,
      }}>
      {children}
    </Context.Provider>
  )
}

export { Context, GlobalContext }
