import React, { useContext, useState } from 'react'
import { Context } from '../../GlobalContext'

const Form = () => {
  const { fetchJoke, firstName, lastName, setFirstName, setLastName } =
    useContext(Context)
  const [changingName, setChangingName] = useState(`${firstName} ${lastName}`)

  const getRandomJoke = () => {
    fetchJoke()
    setFirstName(changingName)
  }
  return (
    <div>
      <select>
        <option>HI</option>
      </select>
      <div>
        <span>
          Impersonate {firstName} {lastName}
        </span>
        <input
          type='text'
          value={changingName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChangingName(e.target.value)
          }
        />
      </div>
      <button onClick={getRandomJoke}>Draw a random {changingName} Joke</button>
    </div>
  )
}

export default Form
