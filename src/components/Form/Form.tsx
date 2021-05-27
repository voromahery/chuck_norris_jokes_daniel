import React, { useContext } from 'react'
import { Context } from '../../GlobalContext'

const Form = () => {
  const { fetchJoke, firstName, lastName } = useContext(Context)
  return (
    <div>
      <select>
        <option>HI</option>
      </select>
      <div>
        <span>
          Impersonate {firstName} {lastName}
        </span>
        <input type='text' />
      </div>
      <button onClick={fetchJoke}>
        Draw a random {firstName} {lastName} Joke
      </button>
    </div>
  )
}

export default Form
