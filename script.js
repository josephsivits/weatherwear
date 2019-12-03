let appId='938d5203026ed823e4ac92e60bc816a7';
let units='imperial';
let searchMethod='zip';

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){
    console.log(resultFromServer);

    let weatherDescriptionHeader = document.getElementById('weatherDescHeader');
    let temperatureElement = document.getElementById('temp');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentImg');

    // weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weawther[0].icon + '.png';
    let resultDescription = resultFromServer.weather[0].description;

    let maxTemp = Math.floor(resultFromServer.main.temp_max);
    wear(maxTemp);

    // gives capital letter
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176 F';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
}

function wear(temp){
    if(temp < 40) recommendedWear.innerHTML = 'Because it is ' + temp + '&#176 F forcasted high, you should wear a heavy coat and dress with layers.';
    if(temp>=40 && temp <50) recommendedWear.innerHTML = 'Because it is ' + temp + '&#176 F forcasted high, you should layer and wear sweaters.';
    if(temp>=50 && temp <60) recommendedWear.innerHTML = 'Because it is ' + temp + '&#176 F forcasted high, you should wear a jacket with a sweater or longsleeve underneath';
    if(temp>=60 && temp<70) recommendedWear.innerHTML = 'Because it is ' + temp + '&#176 F forcasted high, you should wear a longlseeve t-shirt or a hoodie.';
    if(temp>=70 && temp<80)recommendedWear.innerHTML = 'Because it is ' + temp + '&#176 F forcasted high, you can either wear shorts or pants, longsleeve or T-shirt.';
    if(temp>=80) recommendedWear.innerHTML = 'Because it is ' + temp + '&#176 F forcasted high, you should wear shorts.';
}

document.getElementById("searchBtn").addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);

    
})

