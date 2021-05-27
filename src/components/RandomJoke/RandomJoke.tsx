import React, { useContext } from 'react'
import { Context } from '../../GlobalContext'

const RandomJoke = () => {
  const { jokeData, isLoading } = useContext(Context)
  return <>{isLoading ? <h3>Loading...</h3> : <q>{jokeData.joke}</q>}</>
}

export default RandomJoke
