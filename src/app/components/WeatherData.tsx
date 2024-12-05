import { faDroplet, faTemperatureLow, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react'



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WeatherData({data}:any) {

  if(!data || data.weather.length==0)
    return null

  const state = data.weather[0].description;
  const temp = data.main.temp;
  const feels_like = data.main.feels_like;
  const wind = data.wind.speed;
  const name = data.name;
  const hum = data.main.humidity;
  let iconSrc;

  //console.log(data);
  switch (state) {
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
    <div className="bg-white rounded-2xl mx-auto mt-10 p-10">
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl text-wrap overflow-auto'>{name}</h1>
      <Image className='my-5' src={iconSrc} alt="lightning" width={70} height={60} />
      <div className='flex'>
        <h1 className='text-2xl md:text-4xl'>{temp} °C </h1>
      </div>
      
      <hr className=' w-[80%] my-3'/>
    </div>
    <div className='flex justify-between text-xl md:text-3xl'>
      <div className='text-center'>
        <FontAwesomeIcon icon={faTemperatureLow} className='  ' />
        <p>{feels_like}°</p>
      </div >
      <div className='text-center mx-6'>
        <FontAwesomeIcon icon={faWind} />
        <p>{wind} MPH</p>
      </div>
      <div className='text-center'>
        <FontAwesomeIcon icon={faDroplet} />
        <p>{hum} %</p>
      </div>
    </div>
    
    </div>
  )
}

export default WeatherData

//
