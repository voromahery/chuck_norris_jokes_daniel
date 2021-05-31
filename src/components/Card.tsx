import React from 'react'
import Form from './Form'
import RandomJoke from './RandomJoke'
import SaveJoke from './SaveJoke'
import DropDown from './DropDown'

const Card = () => {
  return (
    <div className='card'>
      <div className='wrapper'>
        <DropDown />
        <RandomJoke />
        <Form />
        <SaveJoke />
      </div>
    </div>
  )
}

export default Card
