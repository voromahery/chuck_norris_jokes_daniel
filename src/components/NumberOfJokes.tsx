import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../GlobalContext'

const NumberOfJokes = () => {
  const { firstName, lastName, category } = useContext(Context)
  const [counter, setCounter] = useState(0)
  const [jokeToPrint, setJokeToPrint] = useState([])

  const multipleJokeUrl = `http://api.icndb.com/jokes/random/${counter}?firstName=${firstName}&lastName=${lastName}&${category}`

  const increment = () => {
    setCounter(counter + 1)
  }

  const decrement = () => {
    // Limit the number into 0
    if (counter > 0) {
      setCounter(counter - 1)
    } else {
      setCounter(0)
    }
  }

  const saveMultipleJoke = async () => {
    const response = await fetch(multipleJokeUrl)
    const data = await response.json()
    setJokeToPrint(data.value)
  }

  useEffect(() => {
    saveMultipleJoke()
  }, [counter, firstName, lastName])

  console.log(jokeToPrint)

  let saveFile = () => {
    saveMultipleJoke()

    // Get the joke in the jokeToPrint
    const item = jokeToPrint.map(
      (joke: { id: number; joke: string; categories: string[] }) =>
        '-' + joke.joke + '\r\n'
    )
    const textToPrint = item

    // Convert the text in the joke into BLOB
    const ConvertIntoBLOB = new Blob(textToPrint, { type: 'text/plain' })
    const defaultFileName = 'savedjoke.txt'

    let link = document.createElement('a')
    link.download = defaultFileName

    if (window.webkitURL !== null) {
      link.href = window.webkitURL.createObjectURL(ConvertIntoBLOB)
    } else {
      link.href = window.URL.createObjectURL(ConvertIntoBLOB)
      link.style.display = 'none'
      document.body.appendChild(link)
    }

    link.click()
  }

  return (
    <div>
      <div className={counter > 100 ? 'error' : 'counters-container'}>
        <button onClick={decrement}>-</button>
        <input
          type='number'
          name='jokeNumber'
          onChange={(e: any) => setCounter(Number(e.target.value))}
          value={Number(counter)}
        />
        <button onClick={increment}>+</button>
      </div>
      <button onClick={saveFile} disabled={counter === 0}>
        Save Jokes
      </button>
    </div>
  )
}

export default NumberOfJokes
