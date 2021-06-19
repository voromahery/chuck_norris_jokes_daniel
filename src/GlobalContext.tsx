import React, { createContext, useCallback, useEffect, useState } from 'react'

interface JokeState {
  isLoading: boolean
  jokeData: any
  firstName: string
  lastName: string
  setFirstName: React.Dispatch<React.SetStateAction<string>>
  setLastName: React.Dispatch<React.SetStateAction<string>>
  fetchJoke: any
  category: string
  baseUrl: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

let initialState: JokeState = {
  baseUrl: '',
  isLoading: true,
  jokeData: {},
  firstName: '',
  lastName: '',
  setFirstName: () => null,
  setLastName: () => null,
  fetchJoke: () => null,
  category: '',
  setCategory: () => null,
}

const Context = createContext(initialState)

const GlobalContext: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [jokeData, setJokeData] = useState({})
  const [category, setCategory] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const baseUrl = 'https://api.icndb.com/'
  const nameQuery = firstName && `firstName=${firstName}&lastName=${lastName}`
  const jokeUrl = `${baseUrl}jokes/random?${nameQuery}&${category}`

  const fetchJoke = useCallback(async () => {
    setIsLoading(true)
    const getJoke = await fetch(jokeUrl)
    const data = await getJoke.json()
    setJokeData(data.value)
    setIsLoading(false)
  }, [jokeUrl])

  useEffect(() => {
    fetchJoke()
  }, [firstName, lastName, fetchJoke])

  return (
    <Context.Provider
      value={{
        baseUrl,
        jokeData,
        isLoading,
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
