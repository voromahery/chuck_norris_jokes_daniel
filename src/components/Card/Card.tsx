import React from 'react'
import Form from '../Form/Form'
import RandomJoke from '../RandomJoke/RandomJoke'
import Image from '../Image/Image'
import NumberOfJokes from '../NumberOfJokes/NumberOfJokes'

const Card = () => {
  return (
    <div>
      <Image />
      <RandomJoke />
      <Form />
      <NumberOfJokes />
    </div>
  )
}

export default Card
