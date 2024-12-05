/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react'

function Forecast({data}:any) {
    if(!data || data.length==0)
        return null;
    console.log(data);
    let time = "";
    let temp = "";
    let iconSrc = "";

  return (
    <div className='flex justify-between'>
        {data.map((daily:any,index:any)=>{
          const date = new Date(daily.dt_txt)
          const hr = date.getHours();
          time = hr + ":00";
          temp = daily.main.temp;

          switch (daily.weather[0].description) {
            case "clear sky":
              iconSrc = "/sunny.gif";
              break;
        
            case "few clouds":
              iconSrc = "/cloud.gif";
              break;
        
            case "scattered clouds":
              iconSrc = "/cloud.gif";
              break;
        
            case "broken clouds":
              iconSrc = "/wind.gif";
              break;
        
            case "shower rain":
              iconSrc = "/heavy-rain.gif";
              break;
        
            case "rain":
              iconSrc = "/heavy-rain.gif";
              break;
        
            case "thunderstorm":
              iconSrc = "/lightning.gif";
              break;
        
            case "snow":
              iconSrc = "/snow.gif";
              break;
        
            case "mist":
              iconSrc = "/wind.gif";
              break;
        
            default:
              iconSrc = "/sunny.gif";
          }
          return (
          <div className='bg-white rounded-2xl w-[40%] p-2 text-center m-2' key={index}>
            <Image src={iconSrc} width={40} height={30} alt="" className='mx-auto' />
            <p>{time}</p>
            <p>{temp}°C</p>
          </div>
          )

        })}
    </div>
  )
}

export default Forecast