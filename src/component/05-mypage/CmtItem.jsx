import React from 'react'

function CmtItem({id, title, dateTime, postTitle}) {
  return (
    <div key={id} className='tab-content-reply'>
      <p>{title}</p>
      <span>{dateTime}</span>
      <span>{postTitle}</span>
    </div>
  )
}

export default CmtItem