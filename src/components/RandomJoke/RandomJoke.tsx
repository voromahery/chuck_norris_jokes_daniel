import React, { useContext } from 'react'
import { Context } from '../../GlobalContext'

const RandomJoke = () => {
  const { jokeData } = useContext(Context)
  return <q>{jokeData.joke}</q>
}

export default RandomJoke
