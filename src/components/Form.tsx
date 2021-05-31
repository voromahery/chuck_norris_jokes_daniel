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
  const [changingName, setChangingName] = useState(`${firstName} ${lastName}`)
  const [categoryList, setCategoryList] = useState([])
  const [openDropDown, setOpenDropDown] = useState(false)
  const [textToDisplay, setTextToDislay] = useState('Category')

  const getRandomJoke = () => {
    fetchJoke()
    let name = changingName.split(' ')
    if (name.length === 2) {
      setFirstName(name[0])
      setLastName(name[1])
    }
    if (name.length === 1) {
      setFirstName(name[0])
      setLastName('')
    }
  }

  const fetchingCategory = async () => {
    const response = await fetch(categoryUrl)
    const data = await response.json()
    setCategoryList(data.value)
  }

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown)
  }

  const renaming = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangingName(e.target.value)
  }

  const selectCategory = (e: any) => {
    toggleDropDown()
    const optionValue = e.target.value
    const capitalizedFirstLetter =
      optionValue.charAt(0).toUpperCase() + optionValue.slice(1)
    setCategory(optionValue && `limitTo=[${optionValue}]`)
    setTextToDislay(optionValue ? capitalizedFirstLetter : 'Category')
  }

  useEffect(() => {
    fetchingCategory()
  }, [])

  return (
    <div className='form__wrapper'>
      <div className='customized__select--container'>
        <div
          className={
            category ? 'custom__select' : 'custom__select option__selected'
          }>
          <div
            className={
              openDropDown
                ? 'custom__select--trigger open__trigger '
                : 'custom__select--trigger closed__trigger'
            }
            onClick={toggleDropDown}>
            {!openDropDown ? (
              <div className='trigger__closed--text'>{textToDisplay}</div>
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
          <ul
            className={
              openDropDown ? 'category__list open' : 'category__list closed'
            }>
            {categoryList.map((category) => (
              <li className='customized__select--option' key={category}>
                <button
                  className='option__button'
                  value={category}
                  onClick={selectCategory}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='input__wrapper'>
        <span className='impersonating__text'>
          Impersonate {firstName} {lastName}
        </span>
        <input
          type='text'
          className='renaming__input'
          value={changingName}
          onChange={renaming}
        />
      </div>
      <button className='draw__joke--button' onClick={getRandomJoke}>
        Draw a random {changingName} Joke
      </button>
    </div>
  )
}

export default Form
