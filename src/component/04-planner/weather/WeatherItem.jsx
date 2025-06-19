import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherTemp from '../../_common/WeatherTemp';

function WeatherItem() {
    const [data, setDate] = useState([]);
    const instance = axios.create({
        baseURL : "http://localhost:3030/response"
        });
        
        useEffect(()=>{
        instance.get("./")
        .then((res)=>{
            setDate(res.data.body.items.item[0])
        })
        },[])

        const wf = Object.keys(data).filter(item => item.startsWith("wf")); //wf로 시작하는 값만 찾아줌
        
        function weatherIcon(wf){
            switch (wf){
                case "맑음":
                    return <img src='/imgs/weather_clear_01.png'/>
                case "구름많음":
                    return <img src='/imgs/weather_partly_cloudy_01.png'/>
                case "흐림":
                    return <img src='/imgs/weather_cloudy_01.png'/>
                case "흐리고 비":
                    return <img src='/imgs/weather_cloudy_rain_01.png'/>
            }
        }
    return (
        <div>
            <div><WeatherTemp tmn={"12"} tmx={"13"}/></div>
            <div className='weather_icon'>
                {weatherIcon(data.wf4Am)}
            </div>
        </div>
        
    )
}

export default WeatherItem