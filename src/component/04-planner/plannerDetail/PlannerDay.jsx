import React from 'react'
import { mode } from '../../../api';

function PlannerDay({setCalendar, tripDay}) {
    const { enterEditMode, isEditMode } = mode();

    return (
        <>
        {isEditMode ? (
            <button onClick={() => {
                setCalendar((prev) => !prev);
                enterEditMode();
                }}
                className='trip_date'>
                { tripDay && `${tripDay[0]} - ${tripDay[tripDay.length-1]}`}
            </button>
        ):(
            <div className='trip_date'>{ tripDay && `${tripDay[0]} - ${tripDay[tripDay.length-1]}`}</div>
        )}
        </>
    )
}

export default PlannerDay