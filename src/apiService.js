export const getWeatherByCity = (city) => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=420bb413b780c8e82640dd68b8077e63&units=metric&lang=pl`
        )
        .then(resp => resp.json()).then(data => data)
    ;
}





