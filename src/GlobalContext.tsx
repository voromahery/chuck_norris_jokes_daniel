import React, { createContext, useCallback, useEffect, useState } from 'react'
import { jokesArray } from './jokesData'

interface JokeState {
  jokesData: [
    { firstName: string; lastName: string; category: string; joke: string }
  ]
  randomJoke:
    | { firstName: string; lastName: string; category: string; joke: string }
    | { firstName: string; lastName: string; category: never[]; joke: string }
  isLoading: boolean
  firstName: string
  lastName: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setFirstName: React.Dispatch<React.SetStateAction<string>>
  setLastName: React.Dispatch<React.SetStateAction<string>>
  fetchJoke: any
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

let initialState: JokeState = {
  jokesData: [{ firstName: '', lastName: '', category: '', joke: '' }],
  randomJoke: { firstName: '', lastName: '', category: '', joke: '' },
  isLoading: true,
  firstName: '',
  lastName: '',
  setIsLoading: () => null,
  setFirstName: () => null,
  setLastName: () => null,
  fetchJoke: () => null,
  category: '',
  setCategory: () => null,
}

const Context = createContext(initialState)

const GlobalContext: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const jokesData = [...jokesArray].filter(
    (joke) =>
      joke.category === category.toLowerCase() || joke.category === category
  )

  // Randomise jokes
  const [randomJoke, setRandomJoke] = useState({
    firstName: '',
    lastName: '',
    category: '',
    joke: '',
  })

  const fetchJokeByCategory = () => {
    const randomNumber = Math.floor(Math.random() * jokesData.length)

    let joke: any = jokesData[randomNumber]
    setRandomJoke(joke)

    // Edit the firstName and lastName in the data
    if (firstName.length !== 0 && firstName) {
      jokesData.forEach((joke) => (joke.firstName = firstName))
    } else {
      jokesData.forEach((joke) => (joke.firstName = 'Chuck'))
    }

    if (lastName.length !== 0 && lastName) {
      jokesData.forEach((joke) => (joke.lastName = lastName))
    } else {
      jokesData.forEach((joke) => (joke.lastName = 'Norris'))
    }
  }

  const fetchJoke = useCallback(async () => {
    setIsLoading(true)
    fetchJokeByCategory()
    setIsLoading(false)
    // eslint-disable-next-line
  }, [firstName, lastName, category])

  useEffect(() => {
    fetchJoke()
  }, [fetchJoke])

  return (
    <Context.Provider
      value={{
        jokesData: [{ firstName: '', lastName: '', category: '', joke: '' }],
        randomJoke,
        isLoading,
        setIsLoading,
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
