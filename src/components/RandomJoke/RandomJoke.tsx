import React, { useContext } from 'react'
import { Context } from '../../GlobalContext'

const RandomJoke = () => {
  const { jokeData } = useContext(Context)
  return <p>{jokeData.joke}</p>
}

export default RandomJoke
