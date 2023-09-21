const apiKey = `c4f0c64a230b4c90aad145739232009`
const button = document.querySelector(`#submitButton`)
const input = document.querySelector(`#textInput`)




button.addEventListener('click', async ()=> {
    let search = input.value
    console.log(search)

    let forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${search}&aqi=no`
    let forecastData = await axios.get(forecastURL)
   

//Display Location and Last Updated
    let locationName = forecastData.data.location.name
    let locationRegion = forecastData.data.location.region
    let locationCountry = forecastData.data.location.country
    if ((locationCountry == "USA United States of America") || (locationCountry == "United States of America")) {locationCountry = `USA`}
    document.querySelector(`#cityName`).innerHTML = `${locationName}, ${locationRegion}, ${locationCountry}`

    let lastUpdated = forecastData.data.current.last_updated
    console.log(lastUpdated)
    document.querySelector(`#last-updated`).innerHTML += `${lastUpdated}`

//display current Weather
    let currentConditions = forecastData.data.current.condition.text
    let currentConditionsIcon = forecastData.data.current.condition.icon
    let currentTempF = forecastData.data.current.temp_f
    let currentFeelsLikeF = forecastData.data.current.feelslike_f
    let currentHumidity = forecastData.data.current.humidity
    let currentPrecipitationIn = forecastData.data.current.precip_in

    document.querySelector(`#current-condition`).innerHTML = `${currentConditions}`
    document.querySelector(`#current-condition-icon`).innerHTML = `<img src="${currentConditionsIcon}">`
    document.querySelector(`#actual-temp`).querySelector(`.data`).innerHTML = `${currentTempF} F`  
    document.querySelector(`#feels-like`).querySelector(`.data`).innerHTML = `${currentFeelsLikeF} F`
    document.querySelector(`#humidity`).querySelector(`.data`).innerHTML = `${currentHumidity}%`
    document.querySelector(`#precipitation`).querySelector(`.data`).innerHTML = `${currentPrecipitationIn} in`
    
//Display Forecast Weather
    let forecastConditions = forecastData.data.forecast.forecastday[0].day.condition.text
    let forecastConditionsIcon = forecastData.data.forecast.forecastday[0].day.condition.icon
    let forecastHighOfF = forecastData.data.forecast.forecastday[0].day.maxtemp_f
    let forecastLowOfF = forecastData.data.forecast.forecastday[0].day.mintemp_f
    let forecastWillItRain = forecastData.data.forecast.forecastday[0].day.daily_chance_of_rain
    let forecastWillItSnow = forecastData.data.forecast.forecastday[0].day.daily_chance_of_snow

    document.querySelector(`#forecast-condition`).innerHTML = `${forecastConditions}`
    document.getElementById('forecast-icon').innerHTML = `<img src="${forecastConditionsIcon}">`
    document.querySelector(`#high-of`).querySelector(`.data`).innerHTML = `${forecastHighOfF} F`  
    document.querySelector(`#low-of`).querySelector(`.data`).innerHTML = `${forecastLowOfF} F`
    document.querySelector(`#chance-of-rain`).querySelector(`.data`).innerHTML = `${forecastWillItRain}%`
    document.querySelector(`#chance-of-snow`).querySelector(`.data`).innerHTML = `${forecastWillItSnow}%`

//Hourly forecast
    let forecastArray = forecastData.data.forecast.forecastday[0].hour
    console.log(forecastArray)
    let currentHour = parseInt((lastUpdated.slice(-5)).substring(0,2))
    console.log(currentHour)
    for (i=(currentHour+1); i<(forecastArray.length); i++) {
        let displayTime = (forecastArray[i].time).substring(11,16)
        document.querySelector(".hourly-forecast-table").innerHTML += `<div class="forecast-table-item hourly-time">${displayTime}</div>`
        document.querySelector(".hourly-forecast-table").innerHTML += `<div class="forecast-table-item hourly-temp">${forecastArray[i].temp_f} F</div>`
    }
})

