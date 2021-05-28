import React from 'react'
import Form from './Form'
import RandomJoke from './RandomJoke'
import Image from './Image'
import NumberOfJokes from './NumberOfJokes'

const Card = () => {
  return (
    <div className='card'>
      <div className='wrapper'>
        <Image />
        <RandomJoke />
        <Form />
        <NumberOfJokes />
      </div>
    </div>
  )
}

export default Card
