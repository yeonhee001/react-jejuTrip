import React, { useState } from 'react'

function TabMenu({ tabTitle, onTabChange }) {
    const [addClass, setAddClass] = useState(0);
    
    function clickEvent(index) {
        setAddClass(index);
        if(onTabChange) {
            onTabChange(index);
        }
    }

    return (
        <div className='tabmenu'>
            {
                tabTitle.map((item, i) => (
                    <div key={i}
                         className={i === addClass ? 'active' : ''}
                         onClick={() => clickEvent(i)}>
                        {item}
                    </div>
                ))
            }
        </div>
    )
}

export default TabMenu