import React from 'react'
import PlaceItem from '../../_common/PlaceItem'
import TagBtn from '../../_common/TagBtn'

function SearchItem({item, searchListItem, checkbox}) {
    
  return (
  <label>
    <input 
    className='search_input'
    type='checkbox' 
    checked={searchListItem.some(i => i.contents_id === item.contentsid)}
    onChange={() => checkbox(item)}/>
        <div className='searchItem'>
          <div><TagBtn tagbtn={"선택"} className={"searchbtn"}/></div>
          <PlaceItem
          title={item.title}
          roadaddress={item.roadaddress}
          tag={item.tag}
          imgpath={item.repPhoto.photoid.imgpath}
          heartType={null}
          />
        </div>
  </label>
  )
}

export default SearchItem