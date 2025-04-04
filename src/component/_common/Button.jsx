import React from 'react'

function Button({className, btn}) {
    return (
        <div className={`${className} btn`}>{btn}</div>
    )
}

export default Button