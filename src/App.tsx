import React from 'react'
import RandomJoke from './components/RandomJoke'
import SaveJoke from './components/SaveJoke'
import Form from './components/Form'
function App() {
  return (
    <div className='App'>
      <div className='card'>
        <div className='wrapper'>
          <RandomJoke />
          <Form />
          <SaveJoke />
        </div>
      </div>
    </div>
  )
}

export default App
