'use client'
import { useState, useEffect, use } from "react";
import Header from "./components/Header";
import Loading from "./components/LoadingScreen";
import { getWeatherByCity, getForecastByLatitude, getWeatherByLatitude, getForecastByCity } from "./api/OpenWeatherMap";

export default function Home() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState([]);
  const [countryFlag, setCountryFlag] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [time, setTime] = useState('');
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [isLoading , setIsLoading] = useState(true);
  const [accessLocation, setAccessLocation] = useState(false);

  interface WeatherData {
    name: string;
    weather: any;
    sys: { country: string };
    main: { temp: number, humidity: number };
    wind: { speed: number };
    dt: number;
    timezone: number;
  };

  interface ForecastData {
    list: any;
  }


  //Pega a localização do usuário para mostrar o clima da cidade
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setAccessLocation(true);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } , (error) => {
      setIsLoading(false);
      setAccessLocation(false);
      console.log(error);
      alert("Erro ao acessar localização")
    }
    );
  }, []);

  //Pega o clima atual da cidade do usuário utilizando a latitude e a longitude
  useEffect(() => {
      setIsLoading(true);
    if(latitude !== 0 && longitude !== 0) {
      getWeatherByLatitude(latitude, longitude).then((response: WeatherData) => {
        if(response.weather === undefined) {
          alert('Cidade não encontrada');
          return;
        }
        setCityName(response.name);
        setWeather(response.weather);
        setWeatherIcon(response.weather[0].icon);
        setCountryFlag(response.sys.country);
        setTemperature(response.main.temp);
        setWind(response.wind.speed);
        setHumidity(response.main.humidity);
        setIsLoading(false);
      });
    }
  }
  , [latitude, longitude]);

  //Pega a previsão do tempo da cidade do usuário utilizando a latitude e a longitude
  useEffect(() => {
    if(latitude !== 0 && longitude !== 0) {
      getForecastByLatitude(latitude, longitude).then((response: ForecastData) => {
        if(response.list === undefined) {
          return;
        }
        setForecast(response.list);
      });
    }
  }
  , [latitude, longitude]);

  //Pega o clima e a previsão da cidade pesquisada pelo usuário utilizando o nome da cidade na pesquisa
  function searchCity(){
    setIsLoading(true);
    getWeatherByCity(city).then((response: WeatherData) => {
      if(response.weather === undefined) {
        alert('Cidade não encontrada');
        setIsLoading(false);
        return;
      }
      setCity('');
      setCityName(response.name);
      setWeather(response.weather);
      setWeatherIcon(response.weather[0].icon);
      setCountryFlag(response.sys.country);
      setTemperature(response.main.temp);
      setWind(response.wind.speed);
      setHumidity(response.main.humidity);
      setTime(new Date((response.dt + response.timezone) * 1000).toLocaleTimeString());
      setIsLoading(false);
    });
    getForecastByCity(city).then((response: ForecastData) => {
      if(response.list === undefined) {
        return;
      }
      setForecast(response.list);
    });
  }

  //Se o usuário não permitir o acesso à localização, mostra uma mensagem pedindo para permitir o acesso
  if(!accessLocation) {
    return (
      <div className="flex flex-col h-full">
        <Header setCity={setCity} city={city} searchCity={searchCity}/>
        <div className="flex items-center flex-grow">
          <h1 className="mx-auto text-3xl text-center font-bold mt-12 p-12">Por favor, permita o acesso à sua localização para visualizar o clima da sua cidade ou pesquise uma cidade acima</h1>  
        </div>
      </div>
    );
  }

  //Mostra a tela de carregamento enquanto os dados estão sendo carregados
  if(isLoading) {
    return (
      <div className="flex-col">
        <Header setCity={setCity} city={city} searchCity={searchCity}/>
        <Loading/>
      </div>
    );
  }


  return (
    <div className="flex-col ">
      {weather.length > 0 ?
      <div>
          {weather.map((w: { main: string }) => (
            w.main === 'Rain' ? <video src="rain.mp4" autoPlay loop muted className="object-cover w-full h-full fixed z-[-1] opacity-60"/> 
            : w.main === 'Clear' ? <video src="clear.mp4" autoPlay loop muted className="object-cover w-full h-full fixed z-[-1] opacity-60"/>
            : w.main === 'Clouds' ? <video src="clouds.mp4" autoPlay loop muted className="object-cover w-full h-full fixed z-[-1] opacity-60"/>
            : w.main === 'Snow' ? <video src="snow.mp4" autoPlay loop muted className="object-cover w-full h-full fixed z-[-1] opacity-60"/>
            : w.main === 'Drizzle' ? <video src="rain.mp4" autoPlay loop muted className="object-cover w-full h-full fixed z-[-1] opacity-60"/>
            : w.main === 'Thunderstorm' ? <video src="thunderstorm.mp4" autoPlay loop muted className="object-cover w-full h-full fixed z-[-1] opacity-60"/>
            : null
          ))}
      </div>
      : null}
      <Header setCity={setCity} city={city} searchCity={searchCity}/>
      {weather.length > 0 ? 
        <div className="flex flex-wrap">
          <div className="mx-auto flex  gap-4">
            <img src={`https://flagsapi.com/${countryFlag}/flat/64.png`}/>
            <h1 className="font-bold text-3xl my-auto">{cityName}</h1>
          </div>

          <div className="mt-12 basis-[100%]">
            <h1 className="font-bold 2xl:text-4xl lg:text-3xl md:text-2xl text-center">Clima Agora</h1>
            <img className="mx-auto 2xl:h-36 lg:h-32 md:h-24" src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}/>
            <h1 className="font-bold 2xl:text-3xl lg:text-2xl md:text-xl text-center">{temperature.toFixed(0)}°C</h1>
            <h1 className="text-2xl text-center mt-2">{time}</h1>
            {weather.map((w: { description: string }) => (
              <h1 key={w.description} className="font-bold 2xl:text-3xl lg:text-2xl md:text-xl text-center capitalize mt-2">{w.description}</h1>
            ))}
            <div className="flex justify-center mt-4 gap-8">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=""><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
                <h1 className="2xl:text-2xl lg:text-xl md:text-lg text-center">{wind.toFixed(0)} km/h</h1>
              </div>
             <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=""><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
                <h1 className="2xl:text-2xl lg:text-xl md:text-lg text-center">{humidity}%</h1>
             </div>
            </div>
          </div>
        </div>
      : null }
      <h1 className="mt-16 font-bold 2xl:text-4xl lg:text-3xl md:text-2xl text-center">Previsão</h1>
      <div className="flex flex-wrap justify-center items-center mb-24 p-8 2xl:gap-x-12 lg:gap-x-8 gap-x-4 gap-y-8 max-w-[80%] mx-auto">
        {forecast.length > 0 ?
          forecast.slice(0,10).map((f: { dt_txt: string, main: { temp: number }, weather: { description: string, icon: string }[] }) => (
            <div key={f.dt_txt} className="2xl:mt-8 lg:mt-2 flex-1 xl:flex-none self-stretch flex flex-col">
              <img className="mx-auto 2xl:h-36 lg:h-32 md:h-24" src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`}/>
              <h1 className="font-bold 2xl:text-3xl lg:text-2xl md:text-xl text-center mx-auto">{f.main.temp.toFixed(0)}°C</h1>
              <h1 className="font-bold 2xl:text-3xl lg:text-2xl md:text-xl text-center capitalize mt-2 mx-auto mb-2">{f.weather[0].description}</h1>
              <h1 className="text-2xl text-center mt-auto mx-auto">{f.dt_txt.split(' ')[1].slice(0,5)}</h1>
            </div>
          ))
        : null}
      </div>
    </div>
  );
}
