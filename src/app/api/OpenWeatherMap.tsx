//Nas consultas forma inseridos os parâmetros lang=pt_br para retornar os dados em português e units=metric para retornar os dados em Celsius.

export function getWeatherByLatitude(latitude: number, longitude: number): Promise<any> {    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
    return fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        return data;
    })
    .catch((error) => {
        console.log(error);
    } );
}

export function getForecastByLatitude(latitude: number, longitude: number): Promise<any> {
    const currentForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
    return(fetch(currentForecastUrl)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log(error);
    } ));
}

export function getWeatherByCity(city: string) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
    return(fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log(error);
    } ));
}

export function getForecastByCity(city: string) {
    const currentForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=pt_br&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
    return(fetch(currentForecastUrl)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log(error);
    } ));
}