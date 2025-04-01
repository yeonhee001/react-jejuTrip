import React from 'react'
import List from '../icons/List'
import Search from '../icons/Search'


function Header() {
  return (
    <header>
      <h2><img src='/imgs/logo_blue.svg'/></h2>
      <Search/>
      <List/>
    </header>
  )
}

export default Header