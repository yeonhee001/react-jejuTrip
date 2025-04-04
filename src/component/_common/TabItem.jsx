import React from 'react'

function TabItem({ imgUrl, title, dateTime }) {
  const imgSrc = imgUrl ? imgUrl :'/imgs/common_noimage_01.png';
  
  return (
    <div className='tabitem'>
      <p><img src={imgSrc} /></p>
      <div>
        <p>{title}</p>
        <span>{dateTime}</span>
      </div>
    </div>
  )
}

export default TabItem