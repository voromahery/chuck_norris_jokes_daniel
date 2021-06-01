import React, { useContext } from 'react'
import { Context } from '../GlobalContext'
import chuckNorrisPhoto from '../assets/chuck-norris-photo.png'
import randomPhoto from '../assets/random-photo.png'
const RandomJoke = () => {
  const { jokeData, isLoading } = useContext(Context)
  const { firstName, lastName } = useContext(Context)
  const imageToDisplay =
    firstName === 'Chuck' || firstName === '' ? chuckNorrisPhoto : randomPhoto

  return (
    <>
      <img
        className='character__image'
        src={imageToDisplay}
        alt={`${firstName} ${lastName}`}
      />
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <q
          className='joke'
          dangerouslySetInnerHTML={{ __html: jokeData.joke }}></q>
      )}
    </>
  )
}

export default RandomJoke
