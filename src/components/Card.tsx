import React from 'react'
import Form from './Form'
import RandomJoke from './RandomJoke'
import NumberOfJokes from './NumberOfJokes'

const Card = () => {
  return (
    <div className='card'>
      <div className='wrapper'>
        <RandomJoke />
        <Form />
        <NumberOfJokes />
      </div>
    </div>
  )
}

export default Card
