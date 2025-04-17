import React, { useState } from 'react'
import TagBtn from '../../_common/TagBtn'

function CategoryItem({data, category, title, onClick }) {
    const [check, setCheck] = useState(null);

    return (
        <form>
            <div className='searchbox'>
                <h2 className='category'>{category}</h2>
                {title.map((item, i) =>
                <div key={i}>
                    <h3 className='address'>{item}</h3>
                    {data[item].map((city)=>
                    <label>
                        <input 
                        className="taginput" 
                        type="radio" 
                        name={item} 
                        checked={check === city} 
                        onChange={() => setCheck(city)} 
                        onClick={() => onClick(city)}
                        />
                        <TagBtn tagbtn={city} />
                    </label>
                    )}
                </div>
                )}
            </div>
        </form>
    )
}
export default CategoryItem