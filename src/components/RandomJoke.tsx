import React, { useContext } from 'react'
import { Context } from '../GlobalContext'
import chuckNorrisPhoto from '../assets/chuck-norris-photo.webp'
import randomPhoto from '../assets/random-photo.webp'
const RandomJoke = () => {
  const { jokeData, isLoading, firstName, lastName } = useContext(Context)
  const imageToDisplay =
    (firstName.toLowerCase() === 'chuck' &&
      lastName.toLowerCase() === 'norris') ||
    firstName === ''
      ? chuckNorrisPhoto
      : randomPhoto

  return (
    <>
      <img
        className='character__image'
        src={imageToDisplay}
        alt={firstName ? `${firstName} ${lastName}` : 'Chuck Norris'}
      />
      {isLoading ? (
        <h3 className='loader'>Loading...</h3>
      ) : (
        <q
          className='joke'
          dangerouslySetInnerHTML={{ __html: jokeData.joke }}></q>
      )}
    </>
  )
}

export default RandomJoke
