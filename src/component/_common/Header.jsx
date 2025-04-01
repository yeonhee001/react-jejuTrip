import React from 'react'
import Arrow from '../icons/Arrow'
import List from '../icons/List'
import Search from '../icons/Search'


function Header() {
  return (
    <header>
      <h2><img src='/imgs/logo_blue.svg'/></h2>
      <Arrow/>

      {/* <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : "/img/no_image2.png"}/> */}

      <Search/>
      <List/>
    </header>
  )
}

export default Header