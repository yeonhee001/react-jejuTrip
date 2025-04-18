import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import CardItem from '../CardItem'
import Plane from '../../icons/Plane'
import Btn2Popup from '../../popups/Btn2Popup';
import SvgLine from './SvgLine';

function TicketPick({idx, topbarright, ticketdate, btnName, data}) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
    <div className="ticketline" style={{overflow:'hidden', borderRadius:"10px"}}>
        <div className='ticket'>
            <div className='tickettop'>
                <div className='ticketpadding'>
                <div className='topbar'>
                <span>{`Day ${idx+1}`}</span>
                <span className='ticketdate'>{ticketdate}</span>
                <Plane className={"plane"}/>
                <button className='topbarright'>{topbarright}</button>
            </div>
            {data?.days[idx]?.plans?.map((item, i) => {
                const labelToKey = {
                    "관광지": "tour",
                    "음식점": "food",
                    "축제/행사" : "festival",
                    "쇼핑": "shopping",
                };
                const type = labelToKey[item.contents_label]
            return (
                <ul className="tickebox" key={i}>
                    <li className="liItem">
                        <div className="liLine">
                        <div className="liNum">
                            <span>{i + 1}</span>
                        </div>
                        <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(0, 0, 0, 0.3)" stroke-width="2"/>
                        </svg>
                        </div>
                        <NavLink to={`/trip/triplist/${type}/tripdetail/${item.contents_id}`}>
                        <CardItem item={item} />
                        </NavLink>
                    </li>
                </ul>
            );
            })}
            </div>
            </div>
           <SvgLine/>
            <div className='ticketbottom'>
                <div className='ticketpadding'>
                    <div className='barcode'>
                    <img className='barcode_img' src='/imgs/Letsgo_barcode.svg' alt='바코드' />
                    </div>
                </div>
            </div>
        </div>
        <Btn2Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} type={"trip"} />
    </div>
    )
}

export default TicketPick