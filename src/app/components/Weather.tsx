/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import WeatherData from "./WeatherData";
import Forecast from "./Forecast";
import Loader from "./Loader";

  interface WeatherData {
    weather: WeatherCondition[];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
  }
  
  interface WeatherCondition {
    main: string;
  }

  interface ForecastData{
    list: Forecast[];
  }

  interface Forecast {
    dt_txt: string;
    main:{
      temp: number;
    }
  }

  interface WeatherState {
    weather: WeatherData;
    forecast?: ForecastData;
    
  }

function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherState>({
    weather: {
        weather: [],
        main: {
            temp: 0,
            feels_like: 0,
            humidity: 0,
            pressure: 0,
        },
        wind:{
            speed: 0,
        }
    }
  });
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [forecast, setForecast] = useState<ForecastData>();
  //const [searchLocation, setSearchLocation] = useState<string>("beirut");
  //const [iconUrl, setIconUrl] = useState<string>("");
  
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  /*const fetchData = async () => {
    try {
      const geocodeResp = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      
      console.log(geocodeResp);
      const { lat, lon } = geocodeResp.data[0];
      const resp = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );

      const iconResp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const iconData = iconResp.data;
      //console.log(iconData)
      const weather = iconData.weather[0].main;
      //console.log(weather)
      const data = resp.data;
      //console.log(data);

      const generateIcon = () => {
        switch (weather) {
          case "clear sky":
            setIconUrl("01");
            break;

          case "few clouds":
            setIconUrl("02");
            break;

          case "scattered clouds":
            setIconUrl("03");
            break;

          case "broken clouds":
            setIconUrl("04");
            break;

          case "shower rain":
            setIconUrl("09");
            break;

          case "rain":
            setIconUrl("10");
            break;

          case "thunderstorm":
            setIconUrl("11");
            break;

          case "snow":
            setIconUrl("13");
            break;

          case "mist":
            setIconUrl("50");
            break;

          default:
            setIconUrl("01");
        }
      };

      //const urlIc=`https://openweathermap.org/img/wn/${generateIcon}d@2x.png`;
      const maxHours = 12;
      const formattedData: WeatherData[] = data.hourly.time
        .slice(0, maxHours)
        .map((time: string, index: number) => ({
          hour: new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temp: data.hourly.temperature_2m[index],
          wind_spd: data.hourly.wind_speed_10m[index],
        }));
      setWeatherData(formattedData);
      //console.log(formattedData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[location] );

  useEffect(()=>{
    axios.get(weatherUrl).then((resp)=>{
      setWeatherData({weather: resp.data});
    })
  },[weatherUrl])
*/
  
const handleSearch =  (e:{preventDefault: ()=>void}) => {
    e.preventDefault();
    setLoading(true);
    axios.get(weatherUrl).then((resp)=>{
      
      setWeatherData({weather: resp.data});
      setLoading(false);

    });
    axios.get(forecastUrl).then((resp)=>{
      //console.log("resp:"+resp.data);
      setForecast(resp.data);
      setLoading(false);
    })

    
    
  };
    //console.log(weatherData);
    //console.log(forecast?.list.slice(0,3));


  return (
    <div className="md:w-[50%] w-[80%] mt-36 place-self-center">
      
      <form onSubmit={handleSearch}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            //value={searchLocation}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            type="submit"
            onClick={handleSearch}
            className="btn bg-inherit border-hidden border-inherit min-h-[2rem] h-[2rem]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>
      </form>
      
      {loading ?
        <Loader /> :
      
      
      
        <WeatherData data={weatherData.weather} />
      
      
    
      }
      
      <div className="mt-10 overflow-auto">
        <Forecast data={forecast?.list.slice(0,6)}/>
      </div>
    </div>
  );
}

export default Weather;
//<Image src={urlI} width={120} height={120} alt="icon"/>
