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

  // Elements class
  const counterWrapper =
    counter > 100 ? 'counters__container error' : 'counters__container'

  const counterInput =
    counter > 100 ? 'joke__number--input error' : 'joke__number--input'

  let counterButton = ''
  if (counter > 100) {
    counterButton = 'counter__button error'
  } else if (counter === 0) {
    counterButton = 'counter__button'
  } else {
    counterButton = 'counter__button'
  }

  return (
    <div className='printer__wrapper'>
      <div className={counterWrapper}>
        <button className={counterButton} id='decrement' onClick={decrement}>
          -
        </button>
        <input
          type='number'
          name='jokeCount'
          min='0'
          className={counterInput}
          onChange={(e: any) => setCounter(Number(e.target.value))}
          value={Number(counter)}
        />
        <button className={counterButton} id='increment' onClick={increment}>
          +
        </button>
      </div>
      <button
        className='save__button'
        onClick={saveFile}
        disabled={counter === 0}>
        Save Jokes
      </button>
      {counter > 100 && (
        <p className='error__message'>You can pick a number from 1 to 100.</p>
      )}
    </div>
  )
}

export default NumberOfJokes
