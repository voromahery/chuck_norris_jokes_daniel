import React, { useContext } from 'react'
import { Context } from '../GlobalContext'
import chuckNorrisPhoto from '../assets/chuck-norris-photo.png'
import randomPhoto from '../assets/random-photo.png'

const Image = () => {
  const { firstName, lastName } = useContext(Context)
  const imageToDisplay = firstName === 'Chuck' ? chuckNorrisPhoto : randomPhoto
  return (
    <img
      style={{ display: 'none' }}
      src={imageToDisplay}
      alt={`${firstName} ${lastName}`}
    />
  )
}

export default Image
