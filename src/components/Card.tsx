import React from 'react'
import Form from './Form'
import RandomJoke from './RandomJoke'
import SaveJoke from './SaveJoke'

const Card = () => {
  return (
    <div className='card'>
      <div className='wrapper'>
        <RandomJoke />
        <Form />
        <SaveJoke />
      </div>
    </div>
  )
}

export default Card
