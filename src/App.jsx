
import './App.css'
import search from './assets/search.png';
import clear from './assets/clear.png';
import fewCloud from './assets/few cloud.png';
import scatterCloud from './assets/scattered cloud.png';
import brockenCloud from './assets/brocken cloud.png';
import showerRain from './assets/rain shower.png';
import rain from './assets/rain.png';
import nightRain from './assets/rain n.png';
import thunderStorm from './assets/thunder.png';
import snow from './assets/snow.png';
import mist from './assets/mist.png'
import humidity from './assets/humidity.png';
import winding from './assets/wind.png';
import night from './assets/night.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
const WeatherDetails = ({city,country,temp,latt,lang,hum,ws,icon}) => {
  return (
   <>
   <div className="weather">
    <img src={icon} alt="" />
    <h2 className='temp'>{temp}°C</h2>
    <h1 className='city'>{city}</h1>
    <h4 className="country">{country}</h4>
   </div>
   <div className="loc">
    <div className="lat">
      <h5>Lattitude</h5>
      <p>{latt}</p>
    </div>
    <div className="lan">
      <h5>Longitude</h5>
      <p>{lang}</p>
    </div>

   </div>
   <div className="speed">
    <div className="humidity">
      <img src={humidity} alt="" />
      <p>{hum}%</p>
    </div>
    <div className="winding">
      <img src={winding} alt="" />
      <p>{ws}km/h</p>
    </div>

   </div>
   
   </>
  )
}


function App() {
const [text,setText]=useState('coimbatore');
const [place,setPlace]=useState();
const [country,setCountry]=useState('IN');
const [temp,setTemp]=useState(4);
const [lattitude,setLattitude]=useState(84.15);
const [langitude,setLangitude]=useState(78.18);
const [hum,setHum]=useState(55);
const [ws,setWs]=useState(1.2);
const[icon,setIcon]=useState(clear);
const[cnf,setCnf]=useState(false);
const[loading,setLoading]=useState(false);

const weathericons={
  "01d":clear,
  "01n":night,
  "02d":fewCloud,
  "02n":fewCloud,
  "03d":scatterCloud,
  "03n":scatterCloud,
  "04d":brockenCloud,
  "04n":brockenCloud,
  "09d":showerRain,
  "09n":showerRain,
  "10d":rain,
  "10n":nightRain,
  "11d":thunderStorm,
  "11n":thunderStorm,
  "12d":snow,
  "12n":snow,
  "50d":mist,
  "50n":mist,
}

function cityhandle(e){
  setText(e.target.value) ;
}
useEffect(()=>{
weathersearch();
},[]);

function keyhandle(e){
if(e.key=="Enter"){
  weathersearch();
}


}
const weathersearch=async ()=>{
  let apikey='2cd5f2d2c96623bbd407704ca8ceef28';
  try {
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
  setLoading(true);
  const result= await axios.get(url);

  
  setPlace(result.data.name)  ;
  setCountry(result.data.sys.country);
  setLattitude(result.data.coord.lat);
  setLangitude(result.data.coord.lon);
  setTemp(result.data.main.temp);
  setWs(result.data.wind.speed);
  setHum(result.data.main.humidity);
  setIcon(weathericons [result.data.weather[0].icon]);
  setLoading(false);
  setCnf(false);
    
  } catch (error) {
    
    if(error.response.data.cod==404){
      setCnf(true);
   
    }
    
  }
  finally{
  setLoading(false);
  }
  
  
    
}
  return (
    <>
      <div className="weather-container">
        <div className="input-field">
          <input type="text" placeholder='Seach City. . .' value={text} onChange={cityhandle} onKeyDown={keyhandle}/>
         <img src={search} alt="" onClick={weathersearch} />
        </div>
        {cnf && !loading &&<div className="cnf">City Not Found !</div>}
       {loading && <div className="loader"><div className="loading"></div> <marquee behavior="" direction="left" ><p>Fetching Weather Conditions</p></marquee></div>} 
       {!loading && !cnf && <WeatherDetails city={place} country={country} temp={temp} latt={lattitude} lang={langitude} hum={hum} ws={ws} icon={icon}/>}
       
      <div className="copyright">
        Design & Developed by <br />
        <a target='_blank' href="https://appsail-50022521443.development.catalystappsail.in/">Sj Developer</a>
      </div>

      </div>
    </>
  )
}

export default App
