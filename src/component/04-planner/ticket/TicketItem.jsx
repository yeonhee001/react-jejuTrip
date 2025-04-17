import React from 'react'
import TicketEdit from './TicketEdit';
import TicketRead from './TicketRead';
import TicketPick from './TicketPick';
import { mode } from '../../../api';

function TicketItem({idx, topbarright, btnName, ticketdate, data, setEdit}) {
    const { isEditMode } = mode();

    return (
    <>
    { isEditMode === true && ( //수정모드 
        <TicketEdit idx={idx} topbarright={topbarright} ticketdate={ticketdate} btnName={btnName} setEdit={setEdit}/>
    )}
    { isEditMode === false && ( //읽기모드
        <TicketRead idx={idx} topbarright={topbarright} ticketdate={ticketdate}/>
    )}
    { isEditMode === null && ( //추천모드
        <TicketPick idx={idx} topbarright={topbarright} ticketdate={ticketdate} btnName={btnName} data={data}/>
    )}
    </>
    )
}

export default TicketItem