import React from 'react'

const DropDown = () => {
  return (
    <div>
      <div className='select__category--wrapper'>
        <label htmlFor='check' className='select__title'>
          Click me
        </label>
        <input type='checkbox' className='check' id='check' />
        <ul id='category__list'>
          <label htmlFor='check' className='category'>
            <li className='list__item'>Hello</li>
          </label>
          <label htmlFor='check' className='category'>
            <li className='list__item'>Greeting</li>
          </label>
          <label htmlFor='check' className='category'>
            <li className='list__item'>Salutation</li>
          </label>
        </ul>
      </div>
    </div>
  )
}

export default DropDown
