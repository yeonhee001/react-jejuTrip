import React from 'react'
import Plane from '../../icons/Plane'
import CardItem from '../CardItem'
import { plan } from '../../../api';
import SvgLine from './SvgLine';

function TicketRead({idx, topbarright, ticketdate}) {
    const { planData } = plan();
    
    return (
    <div className="ticketline" style={{overflow:'hidden', borderRadius:"10px"}}>
        <div className='ticket'>
            <div className='tickettop'>
                <div className='ticketpadding'>
                    <div className='topbar'>
                        <span>{`Day ${idx+1}`}</span>
                        <span className='ticketdate'>{ticketdate}</span>
                        <Plane className={"plane"}/>
                        <span className='topbarright'>{topbarright}</span>
                    </div>
                    {planData?.item?.days[idx]?.plans?.map((item, i)=>
                    <ul className='tickebox' key={i}> {/* Day 1 */}
                        <li className='liItem'>
                            <div className='liLine'>
                            <div className='liNum'><span>{i+1}</span></div>
                                <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(0, 0, 0, 0.3)" stroke-width="2"/>
                                </svg>
                            </div>
                            <CardItem item={item}/>
                        </li>
                    </ul>
                    )}
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
    </div>
)
}

export default TicketRead