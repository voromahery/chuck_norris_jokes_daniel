import React, { useState } from 'react'

const NumberOfJokes = () => {
  const [counter, setCounter] = useState(0)
  const [jokeToPrint, setJokeToPrint] = useState('')

  const multipleJokeUrl = `http://api.icndb.com/jokes/random/${counter}`

  const increment = () => {
    setCounter(counter + 1)
  }

  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    } else {
      setCounter(0)
    }
  }

  const saveMultipleJoke = async (e: React.MouseEvent<HTMLElement>) => {
    const response = await fetch(multipleJokeUrl)
    const data = await response.json()
    setJokeToPrint(data.value)
  }

  return (
    <div>
      <div className={counter > 100 ? 'error' : 'counters-container'}>
        <button onClick={decrement}>-</button>
        <div>{counter}</div>
        <button onClick={increment}>+</button>
      </div>
      <button onClick={saveMultipleJoke}>Save Jokes</button>
    </div>
  )
}

export default NumberOfJokes
