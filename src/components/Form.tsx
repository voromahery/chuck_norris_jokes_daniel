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
    setFirstName(name[0])
    setLastName(name[1])
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
    <div>
      <select onChange={selectCategory}>
        <option value=''>Select category</option>
        {categoryList.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      <div>
        <span>
          Impersonate {firstName} {lastName}
        </span>
        <input type='text' value={changingName} onChange={renaming} />
      </div>
      <button onClick={getRandomJoke}>Draw a random {changingName} Joke</button>
    </div>
  )
}

export default Form
