import React from 'react'
import PlaceItem from '../../component/_common/PlaceItem'
import TripFilter from '../../component/02-trip/tripList/TripFilter'

function TripList() {
  return (
    
    <div>
      <div className="triptitle">
        관광지
      </div>
      <div>

      </div>
      <TripFilter/>
      <PlaceItem title={''} roadaddress={''}/>
    </div>
  )
}

export default TripList