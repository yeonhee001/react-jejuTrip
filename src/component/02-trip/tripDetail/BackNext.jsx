import React from 'react'
import Left_black from '../../icons/Left_black'
import Right_black from '../../icons/Right_black'
import { NavLink } from 'react-router-dom'

function BackNext() {
  return (
    <div className="backnext">
      <NavLink to="/"> <Left_black className={'btn1'}/>이전</NavLink>
      <NavLink to="/">이후<Right_black className={'btn2'}/></NavLink>
    </div>
  )
}

export default BackNext