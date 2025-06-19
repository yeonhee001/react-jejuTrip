import React from 'react'
import Left_black from '../icons/Left_black'

function SearchBar({showBackBtn, placeholder, submitbtn, onClick}) {
  return (
    <form className='searchbar'>
      {showBackBtn && <Left_black className={'search-back'} onClick={() => { onClick() }}/>}
      <input type="text" placeholder={placeholder} name='search' />
      <button type="submit">{submitbtn}</button>
    </form>
  )
}

export default SearchBar