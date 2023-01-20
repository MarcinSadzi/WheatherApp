export const getWeatherByCity = (city) => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=420bb413b780c8e82640dd68b8077e63&units=metric`
        )
        .then(resp => resp.json())
        .then(data => {
            const woeid = data.main;
            console.log(woeid)
        });
        
};






// https://api.openweathermap.org/data/2.5/weather?q=${city name}&appid={API key}



// 420bb413b780c8e82640dd68b8077e63

// export const getWeatherByCity = city => {
//     return fetch(
//       `https://www.metaweather.com/api/location/search/?query=${city}`
//     )
//     .then(resp => resp.json())
//     .then(data => {
//       const woeid = data[0].woeid;
//       return fetch(
//         `https://www.metaweather.com/api/location/${woeid}/`
//       ).then(resp => resp.json()).then(data => data)
//     });
//   }