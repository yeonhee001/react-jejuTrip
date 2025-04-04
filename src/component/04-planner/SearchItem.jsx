import React, { useState } from 'react'
import TagBtn from '../../component/_common/TagBtn'

function SearchItem({data, category, title}) {
    const [check, setCheck] = useState(null);
    console.log(data);
    

    return (
        <form action="">
            <div className='searchbox'>
                <h2 className='category'>{category}</h2>
                {title.map((item, i) =>
                    <div key={i}>
                        <h3 className='address'>{item}</h3>
                        {
                            data[item].map((city)=>
                                <label>
                                    <input className="taginput" type="radio" name={item} checked={check === city} onChange={() => setCheck(city)}/>
                                    <TagBtn tagbtn={city} />
                                </label>
                            )
                        }
                    </div>
                )}
            </div>
        </form>
    )
}
export default SearchItem