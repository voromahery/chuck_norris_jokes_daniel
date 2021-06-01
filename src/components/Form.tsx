import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../GlobalContext'

const Form = () => {
  const {
    fetchJoke,
    firstName,
    lastName,
    category,
    setFirstName,
    setLastName,
    setCategory,
  } = useContext(Context)

  const categoryUrl = `http://api.icndb.com/categories`
  const [dynamicChangingName, setDynamicChangingName] = useState(
    firstName ? `${firstName} ${lastName}` : ''
  )

  const renamingCodition = firstName
    ? `${firstName} ${lastName}`
    : 'Chuck Norris'
  const [categoryList, setCategoryList] = useState([])
  const [openDropDown, setOpenDropDown] = useState(false)
  const [textToDisplay, setTextToDislay] = useState('Categories')

  const fetchingJokeCategory = async () => {
    const response = await fetch(categoryUrl)
    const data = await response.json()
    setCategoryList(data.value)
  }

  const getRandomJokeByName = () => {
    fetchJoke()
    let name = dynamicChangingName.split(' ')
    if (name.length === 2) {
      setFirstName(name[0])
      setLastName(name[1])
    }
    if (name.length === 1) {
      setFirstName(name[0])
      setLastName('')
    }
  }

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown)
  }

  const renamingCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDynamicChangingName(e.target.value)
  }

  const selectCategory = (e: any) => {
    toggleDropDown()
    const optionValue = e.target.value

    // Change the first character of the category into capital
    const capitalizedFirstLetter =
      optionValue.charAt(0).toUpperCase() + optionValue.slice(1)
    setCategory(optionValue && `limitTo=[${optionValue}]`)
    setTextToDislay(capitalizedFirstLetter)
  }

  useEffect(() => {
    fetchingJokeCategory()
  }, [])

  // Class conditions
  const customSelectTriggerClass = openDropDown
    ? 'custom__select--trigger open__trigger '
    : 'custom__select--trigger closed__trigger'

  const selectedOptionClass = category
    ? 'custom__select'
    : 'custom__select option__selected'

  const triggerCategoryClass = openDropDown
    ? 'category__list open'
    : 'category__list closed'

  return (
    <div className='form__wrapper'>
      <div className='customized__select--container'>
        <div className={selectedOptionClass}>
          <div className={customSelectTriggerClass} onClick={toggleDropDown}>
            {!openDropDown ? (
              <div className='trigger__closed--text'>
                {textToDisplay ? textToDisplay : 'Categories'}
              </div>
            ) : (
              <button
                className='trigger__open--text'
                onClick={selectCategory}
                value=''>
                Select category
              </button>
            )}
            <svg viewBox='0 0 1780 1017.4' fill='currentColor'>
              <path d='M1742.9 37.2l-.3-.3c-49.6-49.4-129.8-49.2-179.2.3L890.5 710.4v.2L216.7 37.4C193 13.9 160.9.7 127.5.6 57.3.4.2 57.2 0 127.5c-.1 33.8 13.2 66.3 37.1 90.2l768 766.3c50.1 45.8 127.3 44.2 175.4-3.7l762.4-763c49.5-49.8 49.5-130.3 0-180.1z'></path>
            </svg>
          </div>
          <ul className={triggerCategoryClass}>
            {categoryList.map((category) => (
              <li className='customized__select--option' key={category}>
                <button
                  className={
                    textToDisplay.toLowerCase() === category
                      ? 'option__button active__category'
                      : 'option__button'
                  }
                  value={category}
                  onClick={selectCategory}>
                  {category === 'nerdy' ? 'Nerdy' : 'Explicit'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='input__wrapper'>
        <input
          type='text'
          id='renaming'
          className='renaming__input'
          value={dynamicChangingName}
          onChange={renamingCharacter}
        />
        <label htmlFor='renaming' className='impersonating__text'>
          Impersonate {renamingCodition}
        </label>
      </div>
      <button className='draw__joke--button' onClick={getRandomJokeByName}>
        Draw a random{' '}
        {dynamicChangingName.trim() ? dynamicChangingName : renamingCodition}{' '}
        Joke
      </button>
    </div>
  )
}

export default Form
