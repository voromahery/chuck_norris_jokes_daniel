import React from 'react'
import Form from './Form'
import RandomJoke from './RandomJoke'
import Image from './Image'
import NumberOfJokes from './NumberOfJokes'

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
