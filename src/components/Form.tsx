import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../GlobalContext'

const Form = () => {
  const {
    fetchJoke,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    setCategory,
  } = useContext(Context)
  const categoryUrl = `http://api.icndb.com/categories`
  const [changingName, setChangingName] = useState(`${firstName} ${lastName}`)
  const [categoryList, setCategoryList] = useState([])

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

  const renaming = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangingName(e.target.value)
  }

  const selectCategory = (e: any) => {
    setCategory(e.target.value && `limitTo=[${e.target.value}]`)
  }

  useEffect(() => {
    fetchingCategory()
  }, [])

  return (
    <div className='form__wrapper'>
      <select className='joke__category' onChange={selectCategory}>
        <option value=''>Select category</option>
        {categoryList.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
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
