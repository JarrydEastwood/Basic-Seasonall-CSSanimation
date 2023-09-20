import React, {useState} from 'react';
import {locationDetails} from './data';
import './backgrounds.css'


export default function Weather() {

  // const [location, setLocation] = useState([]); //useState hook to initialize the state to an empty array
  const [newSunrise, setSunrise] = useState<string>();
  const [newSunset, setSunset] = useState<string>();
  const [newMaxTemp, setMaxTemp] = useState<string>();
  const [newMinTemp, setMinTem] = useState<string>();
  const [newRainfall, setRainfall] = useState<string>();
  const [newSnowfall, setstoreSnowfall] = useState<string>();
  const [datacheck, setDataCheck] = useState<boolean>();
  const [storeTravelLocation, setTravelLocation] = useState<number>();
  const [backgroundClass, setbackgroundClass] = useState<string>();
  
  const getData = async (id) => {
    const travelLocation = id;
    console.log("This is travelLocation " + travelLocation);
    setTravelLocation(travelLocation);
    const travelLat = locationDetails.locations[travelLocation].lat;
    const travelLong = locationDetails.locations[travelLocation].long;
    const weatherDateStart = locationDetails.locations[travelLocation].winterStartDate;
    const weatherDateEnd = locationDetails.locations[travelLocation].winterEndDate;

    const weatherQuery = await fetch("https://archive-api.open-meteo.com/v1/era5?latitude=" +
    travelLat +
    "&longitude=" +
    travelLong +
    "&start_date=" +
    weatherDateStart +
    "&end_date=" +
    weatherDateEnd +
    "&timezone=auto&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum"
    );
    const weatherResponse = await weatherQuery.json();
    console.log("This is weather Response");
    console.log(weatherResponse);

    var item = weatherResponse.daily;
        
    var calcMaxTemp = item.temperature_2m_max;
    var calcMinTemp = item.temperature_2m_min;
    var calcRainfall = item.rain_sum;
    var calcSnowfall = item.snowfall_sum;
    var calcSunrise = item.sunrise;
    var calcSunset = item.sunset;


    var avgMaxTemp = calcMaxTemp.reduce((a, b) => a + b) / calcMaxTemp.length;
    var avgMinTemp = calcMinTemp.reduce((a, b) => a + b) / calcMinTemp.length;
    var avgRainfall = calcRainfall.reduce((a, b) => a + b) / calcRainfall.length;
    var avgSnowfall = calcSnowfall.reduce((a, b) => a + b) / calcSnowfall.length;


    const avgSunrise = calcSunrise[45].slice(-5);
    const avgSunset = calcSunset[45].slice(-5);
    const storeMaxTemp = avgMaxTemp.toFixed(1);
    const storeMinTemp = avgMinTemp.toFixed(1);
    const storeRainfall = avgRainfall.toFixed(2);
    const storeSnowfall = avgSnowfall.toFixed(2);

    setSunrise(avgSunrise)
    setSunset(avgSunset)
    setMaxTemp(storeMaxTemp)
    setMinTem(storeMinTemp)
    setRainfall(storeRainfall)
    setstoreSnowfall(storeSnowfall)
    setDataCheck(true);
    setbackgroundClass("w-screen h-screen overflow-hidden " + locationDetails.locations[travelLocation].className);
    console.log("This is backgroundClass " + backgroundClass);
    
    };
  
  return(
    <>

<div className={backgroundClass}>
  
        <div className="w-1/2 mx-auto flex flex-wrap overflow-y-hidden">

        <div className="flex flex-row">

            <button onClick={() => getData(0)}
            className="basis-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[0].city}
            </button>

            <button onClick={() => getData(1)}      
            className="basis-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[1].city}
            </button>

            <button onClick={() => getData(2)}      
            className="basis-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[2].city}
            </button>

        </div>

        <div className="flex flex-row">

            <button onClick={() => getData(3)}
            className="basis-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[3].city}
            </button>

            <button onClick={() => getData(4)}
            className="basis-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[4].city}
            </button>

            <button onClick={() => getData(5)}
            className="basis-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[5].city}
            </button>
        
        </div>

        <div className="flex flex-row">
            
            <button onClick={() => getData(6)}
            className="basis-1/4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[6].city}
            </button>

            <button onClick={() => getData(7)}
            className="basis-1/4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[7].city}
            </button>

            <button onClick={() => getData(8)}
            className="basis-1/4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[8].city}
            </button>

            <button onClick={() => getData(9)}
            className="basis-1/4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 my-4 mx-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {locationDetails.locations[9].city}
            </button>

        </div>

        </div>

        {datacheck ? 
        

        <div className="w-full max-w-sm p-4 mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <h5 className="mb-4 text-xl font-medium text-gray-500">Data for {locationDetails.locations[storeTravelLocation].city} </h5>
        <ul role="list" className="space-y-5 my-7">
        
            <li className="flex space-x-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-10 h-10 text-blue-600 "  aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
            </svg>
                <span className="text-black">{newSunrise}</span>
            </li>

            <li className="flex space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-10 h-10 text-blue-600 "  aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>        
            </svg>
                <span className="text-black">{newSunset}</span>
            </li>

            <li className="flex space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-10 h-10 text-blue-600 "  aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z"/> <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z"/>
            </svg>
                <span className="text-black">{newMaxTemp}</span>
            </li>

            <li className="flex space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-10 h-10 text-blue-600 "  aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z"/> <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z"/>
            </svg>
                <span className="text-black">{newMinTemp}</span>
            </li>

            <li className="flex space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-10 h-10 text-blue-600 "  aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z"/>
            </svg>
                <span className="text-black">{newRainfall}</span>
            </li>

            <li className="flex space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-10 h-10 text-blue-600 "  aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973z"/>
            </svg>
                <span className="text-black">{newSnowfall}</span>
            </li>
        

        </ul>
    </div>
      : ''}


</div>
    </>
  )
};