import React, { useState } from 'react'

function Search (props) {
  const [searchValue, setSearchValue] = useState('')
  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value)
  }
  const resetInputField = () => {
    setSearchValue('')
  }
  const callSearchFunciton = e => {
    e.preventDefault()
    props.search(searchValue)
    resetInputField()
  }
  return (
    <form className='search'>
      <input
        type='text'
        value={searchValue}
        onChange={handleSearchInputChanges}
      />
      <button onClick={callSearchFunciton}>submit</button>
    </form>
  )
}

export default Search
