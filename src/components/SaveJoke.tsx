import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../GlobalContext'
import { jokesArray } from '../jokesData'

const NumberOfJokes = () => {
  const { firstName, lastName, category, setIsLoading, isLoading } =
    useContext(Context)
  const [counter, setCounter] = useState(0)
  const [jokesToPrint, setJokesToPrint] = useState([])

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

  let newJokes: any = [...jokesArray].filter(
    (joke) =>
      joke.category === category.toLowerCase() || joke.category === category
  )

  newJokes.length = counter
  const saveMultipleJoke = useCallback(async () => {
    setJokesToPrint(newJokes)

    // eslint-disable-next-line
  }, [setJokesToPrint, counter])

  useEffect(() => {
    saveMultipleJoke()
  }, [counter, firstName, lastName, category, saveMultipleJoke])

  let saveFile = () => {
    setIsLoading(true)
    setTimeout(() => {
      saveMultipleJoke()

      // Get the joke in the jokesToPrint
      const item = jokesToPrint.map(
        (joke: {
          joke: string
          categories: string[]
          firstName: string
          lastName: string
        }) => '-' + joke.joke + '\r\n'
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
      setIsLoading(false)
      link.click()
    }, 3000)
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
        <label htmlFor='jokeCount'>
          <input
            type='number'
            name='jokeCount'
            min='0'
            className={counterInput}
            onChange={(e: any) => setCounter(Number(e.target.value))}
            value={Number(counter)}
          />
        </label>
        <button className={counterButton} id='increment' onClick={increment}>
          +
        </button>
      </div>
      <button
        className='save__button'
        onClick={saveFile}
        disabled={counter === 0 || counter > 100}>
        {isLoading ? 'Loading...' : 'Save Jokes'}
      </button>
      {counter > 100 && (
        <p className='error__message'>You can pick a number from 1 to 100.</p>
      )}
    </div>
  )
}

export default NumberOfJokes
